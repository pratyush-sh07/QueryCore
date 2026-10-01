from typing import List, Optional
from pydantic import BaseModel

class ChatRequest(BaseModel):
    query: str
    department: Optional[str] = "All"
    history: Optional[List[dict]] = []

class CitedSource(BaseModel):
    id: str
    title: str
    department: str
    snippet: str

class ChatResponse(BaseModel):
    answer: str
    department: str
    sources: List[CitedSource] = []
    guardrail_status: str = "VERIFIED"
