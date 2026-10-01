import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool
from sqlalchemy.orm import sessionmaker
from app.db.base import Base
from app.db.session import get_db
from app.main import app
from app.core.security import hash_password, create_access_token
from app.models import User, Document, AuditLog

# Use in-memory SQLite database with StaticPool for test isolation
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def db_session():
    """Create fresh database tables for each test function."""
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()

    # Preload default test users
    admin_user = User(
        id="test-admin-uuid",
        email="admin@querycore.io",
        hashed_password=hash_password("Password123!"),
        full_name="Admin Test",
        department="Engineering",
        role="admin",
        is_active=True
    )
    eng_user = User(
        id="test-eng-uuid",
        email="engineer@querycore.io",
        hashed_password=hash_password("Password123!"),
        full_name="Engineer Test",
        department="Engineering",
        role="member",
        is_active=True
    )
    hr_user = User(
        id="test-hr-uuid",
        email="hr@querycore.io",
        hashed_password=hash_password("Password123!"),
        full_name="HR Test",
        department="HR",
        role="member",
        is_active=True
    )
    session.add_all([admin_user, eng_user, hr_user])

    # Preload sample documents
    doc1 = Document(
        id="doc-eng-1",
        title="Engineering Deployment Manual",
        department="Engineering",
        tags=["Kubernetes", "CI/CD"],
        content="All deployments on AWS EKS use Helm charts with automated CI.",
        created_by=eng_user.id
    )
    doc2 = Document(
        id="doc-hr-1",
        title="HR Benefits Overview",
        department="HR",
        tags=["Benefits", "PTO"],
        content="Employees receive 25 days annual PTO.",
        created_by=hr_user.id
    )
    session.add_all([doc1, doc2])
    session.commit()

    yield session

    session.close()
    Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def client(db_session):
    """Test client overriding the get_db dependency."""
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()

@pytest.fixture
def admin_token():
    return create_access_token(data={"sub": "test-admin-uuid", "email": "admin@querycore.io", "role": "admin", "department": "Engineering"})

@pytest.fixture
def eng_token():
    return create_access_token(data={"sub": "test-eng-uuid", "email": "engineer@querycore.io", "role": "member", "department": "Engineering"})

@pytest.fixture
def hr_token():
    return create_access_token(data={"sub": "test-hr-uuid", "email": "hr@querycore.io", "role": "member", "department": "HR"})
