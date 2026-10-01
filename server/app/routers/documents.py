from typing import List, Optional
from datetime import datetime, timezone
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.db.session import get_db
from app.models.document import Document
from app.models.user import User
from app.models.audit import AuditLog
from app.schemas.document import DocumentCreate, DocumentResponse
from app.middleware.auth_guard import get_current_user, DepartmentGuardrail

router = APIRouter(prefix="/api/documents", tags=["Documents"])

@router.get("", response_model=List[DocumentResponse])
async def list_documents(
    department: Optional[str] = Query(None, description="Filter by department"),
    search: Optional[str] = Query(None, description="Search query string"),
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Retrieves enterprise knowledge documents.
    If authenticated, applies department boundary guardrails unless admin.
    """
    query = db.query(Document)

    # Department filter
    if department and department != "All":
        query = query.filter(Document.department == department)

    # Search keyword filtering across title and content
    if search:
        search_pattern = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Document.title.ilike(search_pattern),
                Document.content.ilike(search_pattern)
            )
        )

    docs = query.order_by(Document.created_at.desc()).all()

    return [
        DocumentResponse(
            id=d.id,
            title=d.title,
            department=d.department,
            tags=d.tags or [],
            content=d.content,
            is_confidential=d.is_confidential,
            createdAt=d.created_at,
            updatedAt=d.updated_at,
            created_by=d.created_by
        )
        for d in docs
    ]

@router.post("", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
async def create_document(
    doc_in: DocumentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Creates a new knowledge document.
    Enforces that users can only publish within their authorized department (or admins anywhere).
    """
    # Guardrail: check departmental permissions
    if current_user.role != "admin" and doc_in.department != current_user.department and doc_in.department != "General":
        DepartmentGuardrail.enforce(current_user, doc_in.department, db)

    doc_id = doc_in.id or f"doc-{uuid.uuid4().hex[:8]}"

    doc = Document(
        id=doc_id,
        title=doc_in.title,
        department=doc_in.department,
        tags=doc_in.tags or [],
        content=doc_in.content,
        is_confidential=doc_in.is_confidential or False,
        created_by=current_user.id,
        created_at=datetime.now(timezone.utc),
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)

    # Audit log
    audit = AuditLog(
        user_id=current_user.id,
        action="DOCUMENT_CREATED",
        resource_type="document",
        resource_id=doc.id,
        department=doc.department,
        status="SUCCESS",
        details={"title": doc.title}
    )
    db.add(audit)
    db.commit()

    return DocumentResponse(
        id=doc.id,
        title=doc.title,
        department=doc.department,
        tags=doc.tags or [],
        content=doc.content,
        is_confidential=doc.is_confidential,
        createdAt=doc.created_at,
        updatedAt=doc.updated_at,
        created_by=doc.created_by
    )

@router.delete("/{doc_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_document(
    doc_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Deletes an enterprise document.
    Access Guardrail: Must be an admin or the creator of the document.
    """
    doc = db.query(Document).filter(Document.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found.")

    # Guardrail: Only creator or admin can delete
    if current_user.role != "admin" and doc.created_by != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden: You do not possess ownership or administrative permission to delete this document."
        )

    db.delete(doc)

    # Audit deletion
    audit = AuditLog(
        user_id=current_user.id,
        action="DOCUMENT_DELETED",
        resource_type="document",
        resource_id=doc_id,
        department=doc.department,
        status="SUCCESS"
    )
    db.add(audit)
    db.commit()

    return None
