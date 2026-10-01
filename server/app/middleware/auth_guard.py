from typing import List, Optional
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.security import decode_access_token
from app.models.user import User
from app.models.audit import AuditLog

# HTTP Bearer scheme
security_scheme = HTTPBearer(auto_error=False)

async def get_current_user(
    request: Request,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_scheme),
    db: Session = Depends(get_db)
) -> User:
    """
    Auth Guardrail Dependency:
    Extracts Bearer JWT from Authorization header, validates signature,
    checks token expiration, and loads the user from the database.
    """
    if not credentials or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication credentials were not provided or invalid.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = credentials.credentials
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user_id: Optional[str] = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Malformed token claims.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account no longer exists.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account has been deactivated.",
        )
    
    return user

class RequireRole:
    """
    Role-Based Access Control (RBAC) Guardrail:
    Restricts endpoint access to users possessing specific authorized roles.
    """
    def __init__(self, allowed_roles: List[str]):
        self.allowed_roles = allowed_roles

    def __call__(self, current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Requires one of roles: {', '.join(self.allowed_roles)}",
            )
        return current_user

class DepartmentGuardrail:
    """
    Enterprise Department Boundary Guardrail:
    Validates that users can only access confidential departmental knowledge
    belonging to their department, unless the user has administrative privileges.
    """
    @staticmethod
    def verify_department_access(user: User, target_department: str) -> bool:
        if user.role == "admin":
            return True
        if target_department in ("All", "General", user.department):
            return True
        return False

    @staticmethod
    def enforce(user: User, target_department: str, db: Session, resource_id: Optional[str] = None):
        if not DepartmentGuardrail.verify_department_access(user, target_department):
            # Log security violation in audit log
            audit_entry = AuditLog(
                user_id=user.id,
                action="CROSS_DEPARTMENT_ACCESS_DENIED",
                resource_type="document",
                resource_id=resource_id,
                department=target_department,
                status="DENIED",
                details={
                    "user_dept": user.department,
                    "target_dept": target_department,
                    "reason": "Department isolation policy enforced"
                }
            )
            db.add(audit_entry)
            db.commit()

            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied: Department isolation guardrail prevents '{user.department}' users from accessing '{target_department}' data.",
            )
