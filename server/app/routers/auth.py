from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User
from app.models.audit import AuditLog
from app.schemas.user import UserCreate, UserLogin, AuthResponse, UserResponse
from app.core.security import hash_password, verify_password, create_access_token
from app.middleware.auth_guard import get_current_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate, request: Request, db: Session = Depends(get_db)):
    """
    Registers a new corporate user account and issues a JWT token.
    Validates email uniqueness and hashes password with bcrypt.
    """
    existing_user = db.query(User).filter(User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists.",
        )

    user = User(
        email=user_in.email,
        hashed_password=hash_password(user_in.password),
        full_name=user_in.fullName,
        department=user_in.department,
        role=user_in.role or "member",
        is_active=True,
        created_at=datetime.now(timezone.utc),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Issue access token
    token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role, "department": user.department})

    # Audit log entry
    audit = AuditLog(
        user_id=user.id,
        action="USER_REGISTERED",
        resource_type="auth",
        department=user.department,
        status="SUCCESS",
        ip_address=request.client.host if request.client else None,
        details={"email": user.email}
    )
    db.add(audit)
    db.commit()

    return AuthResponse(
        token=token,
        user=UserResponse(
            id=user.id,
            email=user.email,
            fullName=user.full_name,
            department=user.department,
            role=user.role,
            is_active=user.is_active
        )
    )

@router.post("/login", response_model=AuthResponse)
async def login(credentials: UserLogin, request: Request, db: Session = Depends(get_db)):
    """
    Authenticates user credentials and generates a signed JWT bearer token.
    Enforces password verification and updates last login timestamp.
    """
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not verify_password(credentials.password, user.hashed_password):
        # Audit failed login attempt
        audit = AuditLog(
            user_id=user.id if user else None,
            action="LOGIN_FAILED",
            resource_type="auth",
            status="FAILED",
            ip_address=request.client.host if request.client else None,
            details={"email": credentials.email, "reason": "Invalid credentials"}
        )
        db.add(audit)
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive. Contact system administrator.",
        )

    # Update last login
    user.last_login_at = datetime.now(timezone.utc)
    token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role, "department": user.department})

    # Audit successful login
    audit = AuditLog(
        user_id=user.id,
        action="LOGIN_SUCCESS",
        resource_type="auth",
        department=user.department,
        status="SUCCESS",
        ip_address=request.client.host if request.client else None,
        details={"email": user.email}
    )
    db.add(audit)
    db.commit()

    return AuthResponse(
        token=token,
        user=UserResponse(
            id=user.id,
            email=user.email,
            fullName=user.full_name,
            department=user.department,
            role=user.role,
            is_active=user.is_active
        )
    )

@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """Returns the authenticated profile of the current user."""
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        fullName=current_user.full_name,
        department=current_user.department,
        role=current_user.role,
        is_active=current_user.is_active
    )
