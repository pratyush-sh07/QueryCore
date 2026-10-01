from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.middleware import SecurityHeadersMiddleware, RateLimitMiddleware
from app.db.init_db import init_db
from app.routers import auth, documents, chat, health

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: initialize database tables and seed baseline data
    init_db()
    yield
    # Shutdown logic if needed

app = FastAPI(
    title=settings.APP_NAME,
    description="QueryCore Enterprise AI Knowledge Base & Copilot Backend API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
    lifespan=lifespan
)

# 1. Custom Security Headers Guardrail
app.add_middleware(SecurityHeadersMiddleware)

# 2. Rate Limiting Protection Guardrail
app.add_middleware(RateLimitMiddleware, max_requests=settings.RATE_LIMIT_PER_MINUTE)

# 3. Cross-Origin Resource Sharing (CORS) Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Authorization"],
)

# 4. Include Modular API Routers
app.include_router(health.router)
app.include_router(auth.router)
app.include_router(documents.router)
app.include_router(chat.router)

@app.get("/")
def root():
    return {
        "service": "QueryCore Enterprise API",
        "status": "operational",
        "documentation": "/api/docs"
    }
