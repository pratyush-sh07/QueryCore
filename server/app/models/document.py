import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, Boolean, DateTime, JSON
from app.db.base import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(String(100), primary_key=True, default=lambda: f"doc-{uuid.uuid4().hex[:8]}")
    title = Column(String(255), nullable=False)
    department = Column(String(100), nullable=False, index=True)
    tags = Column(JSON, default=list, nullable=False)
    content = Column(Text, nullable=False)
    is_confidential = Column(Boolean, default=False, nullable=False)
    created_by = Column(String(36), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
