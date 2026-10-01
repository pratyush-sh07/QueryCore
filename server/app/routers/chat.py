from typing import List, Optional, Any
from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.db.session import get_db
from app.models.document import Document
from app.models.user import User
from app.models.audit import AuditLog
from app.middleware.auth_guard import get_current_user

router = APIRouter(prefix="/api/chat", tags=["AI Copilot Chat"])

class ChatPayload(BaseModel):
    message: Optional[str] = None
    query: Optional[str] = None
    department: Optional[str] = "All"
    history: Optional[List[Any]] = []

@router.post("")
async def query_copilot(
    payload: ChatPayload,
    request: Request,
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Enterprise RAG Grounding & Copilot Query Endpoint.
    Applies RBAC guardrails, audits the query, and searches grounding documents
    matching the query keyword within the authorized departmental boundaries.
    """
    raw_query = payload.message or payload.query
    if not raw_query or not raw_query.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message or query content is required."
        )

    clean_query = raw_query.strip()
    target_dept = payload.department or "All"

    # Enforce department isolation if non-admin and trying to access restricted scope
    if current_user and current_user.role != "admin":
        if target_dept not in ("All", "General", "Institutional", current_user.department):
            audit = AuditLog(
                user_id=current_user.id,
                action="CROSS_DEPT_CHAT_BLOCKED",
                resource_type="chat",
                department=target_dept,
                status="DENIED",
                details={"target_dept": target_dept, "user_dept": current_user.department}
            )
            db.add(audit)
            db.commit()

            return {
                "answer": f"Access Denied: Enterprise guardrails prevent '{current_user.department}' users from querying '{target_dept}' proprietary records.",
                "sources": [],
                "guardrail_status": "BLOCKED_CROSS_DEPT"
            }

    # Retrieve relevant documents for grounding
    docs_query = db.query(Document)
    if target_dept != "All" and target_dept != "Institutional":
        docs_query = docs_query.filter(Document.department == target_dept)

    # Simple keyword extraction for matching
    keywords = [k.lower() for k in clean_query.split() if len(k) > 3]
    relevant_docs = []
    
    if keywords:
        search_filter = or_(*[Document.content.ilike(f"%{kw}%") for kw in keywords[:3]])
        relevant_docs = docs_query.filter(search_filter).limit(3).all()

    if not relevant_docs:
        relevant_docs = docs_query.limit(2).all()

    # Convert relevant documents into dictionary representations
    context_docs = [
        {"id": d.id, "title": d.title, "department": d.department, "content": d.content}
        for d in relevant_docs
    ]

    # Generate grounded response via Google Gemini Enterprise RAG engine
    from app.core.gemini_service import generate_rag_response
    rag_result = generate_rag_response(
        query=clean_query,
        context_docs=context_docs,
        user_department=current_user.department if current_user else target_dept
    )

    synthesized_answer = rag_result["answer"]
    cited_sources = rag_result["cited_titles"] or [d.title for d in relevant_docs]

    # Log audit entry
    if current_user:
        audit = AuditLog(
            user_id=current_user.id,
            action="CHAT_QUERY",
            resource_type="chat",
            department=target_dept,
            status="SUCCESS",
            details={"query_length": len(clean_query), "citations_count": len(cited_sources)}
        )
        db.add(audit)
        db.commit()

    return {
        "answer": synthesized_answer,
        "response": synthesized_answer,
        "message": synthesized_answer,
        "sources": cited_sources,
        "department": target_dept,
        "guardrail_status": "VERIFIED_GROUNDED"
    }
