# QueryCore — Enterprise Knowledge Copilot & RAG Platform

QueryCore is an enterprise-grade AI knowledge base and retrieval-augmented generation (RAG) system with role-based access control (RBAC), departmental data isolation guardrails, containerized multi-service architecture, and automated CI/CD deployment pipelines.

---

## Architecture Overview

```
                            +-------------------------+
                            |       Web Client        |
                            |   (React 19 + Vite +    |
                            |   Tailwind + Lucide)    |
                            +------------+------------+
                                         |
                                         | Reverse Proxy (Nginx)
                                         v
                            +-------------------------+
                            |     QueryCore API       |
                            |  (FastAPI + Python 3.11)|
                            +------------+------------+
                                         |
           +-----------------------------+-----------------------------+
           |                             |                             |
           v                             v                             v
+--------------------+         +--------------------+         +--------------------+
|  PostgreSQL 16 DB  |         |   Redis 7 Cache    |         |  AI Grounding &    |
| (Relational/Audit/ |         | (Session Store /   |         | RAG Citation Engine|
| Vector Store)      |         |  Rate Limiting)    |         | (Department Scope) |
+--------------------+         +--------------------+         +--------------------+
```

---

## Repository Structure

```
QueryCore/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Automated CI: Linting, Unit Tests, Docker Checks
│       └── deploy.yml             # Automated CD: Container registry publish & staging
├── client/                        # React + Vite frontend application
│   ├── src/                       # UI components, pages, context, and API clients
│   ├── Dockerfile                 # Multi-stage production Nginx container
│   ├── nginx.conf                 # SPA routing and API reverse-proxy configuration
│   └── package.json
├── database/                      # Database schema and seed data
│   ├── schema.sql                 # PostgreSQL DDL, tables, constraints, indexes & triggers
│   └── seed.sql                   # Baseline admin user, mock employees, & knowledge docs
├── server/                        # FastAPI backend application
│   ├── app/
│   │   ├── core/                  # Security (bcrypt, JWT), config, rate limiting & headers
│   │   ├── db/                    # SQLAlchemy database engine and auto-seeder
│   │   ├── middleware/            # Auth guardrails, RBAC, department boundaries
│   │   ├── models/                # SQLAlchemy ORM models (User, Document, AuditLog)
│   │   ├── routers/               # Endpoints: auth, documents, chat, health
│   │   └── schemas/               # Pydantic validation schemas
│   ├── tests/                     # Pytest suite: auth, guardrails, documents, health
│   ├── Dockerfile                 # Multi-stage Python 3.11 container
│   └── requirements.txt
├── docker-compose.yml             # Full-stack multi-container orchestration
├── docker-compose.prod.yml        # Production override with resource limits
└── README.md                      # System documentation and operational runbook
```

---

## Security & Auth Guardrails

1. **Authentication**:
   - Industry-standard bcrypt password hashing (`rounds=12`).
   - Stateless JWT tokens (HS256/RS256) with expiration and subject claims.
   - Bearer token authentication required on sensitive API endpoints.

2. **Role-Based Access Control (RBAC)**:
   - Three privilege tiers: `admin`, `member`, and `guest`.
   - Administrative overrides for managing organizational schemas and documents.

3. **Department Boundary Isolation**:
   - Zero-trust department boundary guardrails (`Engineering`, `HR`, `Sales`, `Legal`).
   - Cross-department document publishing or confidential chat queries by non-admin members are automatically blocked and logged to the `audit_logs` table.

4. **Security Hardening**:
   - Rate limiting per IP to mitigate brute-force and DoS vectors.
   - Enterprise security headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Content-Security-Policy`, and `Strict-Transport-Security`.

---

## Quickstart with Docker Compose

To launch the complete environment (PostgreSQL, Redis, FastAPI server, and React client):

```bash
docker compose up -d --build
```

Access the services:
- **Client Application**: [http://localhost:3000](http://localhost:3000)
- **Backend API & Swagger Docs**: [http://localhost:8000/api/docs](http://localhost:8000/api/docs)
- **Health Check Probe**: [http://localhost:8000/api/health](http://localhost:8000/api/health)

To view running services and logs:
```bash
docker compose ps
docker compose logs -f
```

---

## Running Locally Without Docker

### 1. Backend Server

```bash
cd server
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 2. Frontend Client

```bash
cd client
npm install
npm run dev
```

### 3. Running Backend Tests

```bash
cd server
pytest -v
```

---

## Pre-Configured Demo Credentials

The database auto-seeds with these test accounts:

| Email | Password | Role | Department |
| :--- | :--- | :--- | :--- |
| `admin@querycore.io` | `Password123!` | `admin` | Engineering |
| `engineer@querycore.io` | `Password123!` | `member` | Engineering |
| `hr@querycore.io` | `Password123!` | `member` | HR |
| `legal@querycore.io` | `Password123!` | `member` | Legal |
