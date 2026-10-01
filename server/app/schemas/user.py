from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class UserBase(BaseModel):
    email: EmailStr
    fullName: str
    department: str = "Engineering"

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    fullName: str
    department: str = "Engineering"
    role: Optional[str] = "member"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    fullName: str
    department: str
    role: str
    is_active: bool

    class Config:
        from_attributes = True

class AuthResponse(BaseModel):
    token: str
    user: UserResponse
