import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime, JSON
from app.db.base import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), nullable=True, index=True)
    action = Column(String(100), nullable=False, index=True) # LOGIN, ACCESS_DOCUMENT, DENIED_CROSS_DEPT, etc.
    resource_type = Column(String(100), nullable=False)
    resource_id = Column(String(100), nullable=True)
    department = Column(String(100), nullable=True)
    status = Column(String(50), nullable=False, default="SUCCESS") # SUCCESS, DENIED, FAILED
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    details = Column(JSON, default=dict, nullable=False)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False, index=True)
