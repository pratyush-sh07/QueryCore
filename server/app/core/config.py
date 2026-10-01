import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    APP_NAME: str = "QueryCore API"
    APP_ENV: str = "production"
    DEBUG: bool = False
    
    # JWT & Authentication
    SECRET_KEY: str = "super-secret-querycore-enterprise-jwt-key-change-in-production-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours
    
    # Database (defaults to SQLite for frictionless local/test development, overridden by env for PostgreSQL in docker)
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./querycore.db")
    
    # Redis
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:80",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ]
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
