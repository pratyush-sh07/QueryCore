import time
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db.session import get_db

router = APIRouter(prefix="/api/health", tags=["Health & Observability"])

_start_time = time.time()

@router.get("")
async def health_check(db: Session = Depends(get_db)):
    """
    Kubernetes / Docker health and readiness check probe.
    Verifies database connectivity and service availability.
    """
    db_status = "healthy"
    try:
        db.execute(text("SELECT 1"))
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"

    is_ready = db_status == "healthy"
    status_code = status.HTTP_200_OK if is_ready else status.HTTP_503_SERVICE_UNAVAILABLE

    return JSONResponse(
        status_code=status_code,
        content={
            "status": "pass" if is_ready else "fail",
            "service": "querycore-api",
            "version": "1.0.0",
            "uptime_seconds": round(time.time() - _start_time, 2),
            "checks": {
                "database": db_status
            }
        }
    )
