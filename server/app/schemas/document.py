from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

class DocumentBase(BaseModel):
    title: str
    department: str
    tags: List[str] = []
    content: str
    is_confidential: Optional[bool] = False

class DocumentCreate(DocumentBase):
    id: Optional[str] = None

class DocumentResponse(DocumentBase):
    id: str
    createdAt: datetime
    updatedAt: Optional[datetime] = None
    created_by: Optional[str] = None

    class Config:
        from_attributes = True
