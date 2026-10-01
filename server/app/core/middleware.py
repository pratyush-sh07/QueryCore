import time
from collections import defaultdict
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response, JSONResponse
from app.core.config import settings

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """
    Enterprise Security Guardrail:
    Attaches security-focused HTTP headers to protect against clickjacking,
    MIME-sniffing, XSS, and unencrypted transport vulnerabilities.
    """
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        return response

class RateLimitMiddleware(BaseHTTPMiddleware):
    """
    API Protection Guardrail:
    Applies per-client sliding window rate limiting to guard against DoS / credential brute force.
    """
    def __init__(self, app, max_requests: int = 120, window_seconds: int = 60):
        super().__init__(app)
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.client_requests = defaultdict(list)

    async def dispatch(self, request: Request, call_next):
        # Skip health endpoints from rate limits
        if request.url.path.endswith("/health"):
            return await call_next(request)

        client_ip = request.client.host if request.client else "unknown"
        now = time.time()
        
        # Clean expired timestamps
        timestamps = self.client_requests[client_ip]
        self.client_requests[client_ip] = [t for t in timestamps if now - t < self.window_seconds]

        if len(self.client_requests[client_ip]) >= self.max_requests:
            return JSONResponse(
                status_code=429,
                content={
                    "error": "Rate limit exceeded",
                    "detail": f"Too many requests. Limit is {self.max_requests} requests per {self.window_seconds}s.",
                    "guardrail": "API_RATE_LIMITER"
                },
                headers={"Retry-After": str(self.window_seconds)}
            )

        self.client_requests[client_ip].append(now)
        return await call_next(request)
