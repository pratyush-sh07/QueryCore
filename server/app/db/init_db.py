from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.db.base import Base
from app.db.session import engine, SessionLocal
from app.models.user import User
from app.models.document import Document
from app.core.security import hash_password

INITIAL_DOCUMENTS = [
    {
        "id": "doc-1",
        "title": "Enterprise AI Security & Compliance Policy 2026",
        "department": "Legal",
        "tags": ["Security", "Compliance", "GDPR", "AI-Safety"],
        "content": "All enterprise AI tools and copilot sessions must adhere to SOC-2 Type II standards. Data processed through large language models must not be used for external training without explicit data isolation agreements. Internal access controls apply based on role-based access control (RBAC).",
        "created_at": datetime.fromisoformat("2026-09-18T10:30:00+00:00")
    },
    {
        "id": "doc-2",
        "title": "Employee Onboarding & Benefits Guide",
        "department": "HR",
        "tags": ["Benefits", "Health", "PTO", "Onboarding"],
        "content": "Full-time employees receive 25 days of annual paid time off (PTO) alongside standard corporate holidays. Comprehensive health, dental, and vision insurance begins on day 1 of employment. Annual wellness stipend is $1,200.",
        "created_at": datetime.fromisoformat("2026-09-22T14:15:00+00:00")
    },
    {
        "id": "doc-3",
        "title": "Microservices Deployment & Cloud Architecture",
        "department": "Engineering",
        "tags": ["Kubernetes", "CI/CD", "FastAPI", "Vite"],
        "content": "Services are deployed on AWS EKS using Helm charts. Production deployments require passing automated unit and integration tests with at least 80% coverage. All API endpoints must authenticate via JWT bearer tokens.",
        "created_at": datetime.fromisoformat("2026-09-28T09:00:00+00:00")
    },
    {
        "id": "doc-4",
        "title": "Q4 Enterprise Sales Playbook & Pricing Tiers",
        "department": "Sales",
        "tags": ["Sales", "Pricing", "B2B", "Contracts"],
        "content": "DocuSync AI enterprise tier is priced at $45 per user/month billed annually. Custom deployment and on-prem vector databases require an enterprise agreement signed by a VP or C-level executive.",
        "created_at": datetime.fromisoformat("2026-09-30T16:45:00+00:00")
    }
]

def init_db(db: Session = None):
    """Initializes tables and populates seed data if empty."""
    Base.metadata.create_all(bind=engine)
    
    close_after = False
    if db is None:
        db = SessionLocal()
        close_after = True

    try:
        # Check admin existence
        admin = db.query(User).filter(User.email == "admin@querycore.io").first()
        if not admin:
            admin = User(
                email="admin@querycore.io",
                hashed_password=hash_password("Password123!"),
                full_name="Admin Operator",
                department="Engineering",
                role="admin",
                is_active=True
            )
            db.add(admin)

        # Check engineer existence
        engineer = db.query(User).filter(User.email == "engineer@querycore.io").first()
        if not engineer:
            engineer = User(
                email="engineer@querycore.io",
                hashed_password=hash_password("Password123!"),
                full_name="Sarah Chen",
                department="Engineering",
                role="member",
                is_active=True
            )
            db.add(engineer)

        # Check documents
        doc_count = db.query(Document).count()
        if doc_count == 0:
            for d in INITIAL_DOCUMENTS:
                doc = Document(
                    id=d["id"],
                    title=d["title"],
                    department=d["department"],
                    tags=d["tags"],
                    content=d["content"],
                    created_at=d["created_at"],
                    created_by=admin.id if admin else None
                )
                db.add(doc)

        db.commit()
    finally:
        if close_after:
            db.close()
