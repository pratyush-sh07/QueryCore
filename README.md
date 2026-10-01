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

## Core Capabilities & Innovations

### 1. Interactive Domain & Product Specification Modal
* On the landing page (`client/src/pages/Home.jsx`), clicking any domain card triggers an executive **Product Specification Modal**.
* **9 Interactive Domains**: Team Collaboration, Engineering, Legal & Compliance, Analytics, Knowledge Library, AI Copilot, Mobile Access, Desktop Platform, and Enterprise Vault.
* Details include core capability checklists, verified technical throughput, encryption standards (AES-256 / BYOK), compliance standards (SOC-2 Type II, GDPR, HIPAA), direct **"Launch in Portal"** routes (`/chat`, `/documents`, `/dashboard`), and sample prompt triggers.

### 2. Universal Company & Product Intelligence Engine
* Equipped in both the global **Floating AI Concierge** (`FloatingChatWidget.jsx`) and full-page **Copilot** (`Chat.jsx`).
* **Instant Corporate & Product Profiles**:
  * **Amazon / AWS**: AWS (EC2, S3, Bedrock, SageMaker), Prime, Alexa/Echo smart home, Kindle, Zoox robotics.
  * **Google / Alphabet**: Gemini AI, Google Cloud Platform (GCP), Workspace, Android, Pixel hardware, YouTube.
  * **Apple**: iPhone & iOS, Mac / MacBook (M-series silicon), iPad, Vision Pro, Apple Watch.
  * **Microsoft**: Azure, Copilot 365, Windows 11, Xbox ecosystem, GitHub.
  * **Meta**: Facebook, Instagram, WhatsApp, Meta Quest 3 VR, Ray-Ban Meta glasses, Llama 3 models.
  * **OpenAI**: ChatGPT, GPT-4o, DALL·E 3, Sora.
  * **Tesla**: EVs (Model 3/Y/S/X, Cybertruck), FSD Supervised, Megapack, Optimus robot.
  * **NVIDIA**: Blackwell B200, Hopper H100, GeForce RTX 40-series, CUDA, Omniverse.
  * **QueryCore Technologies**: Complete company specs, enterprise SaaS pricing ($45/user/mo), and portal routes.
  * *Dynamic entity synthesis*: Automatically generates corporate profiles and product directories for any arbitrary commercial company (Nike, Boeing, Stripe, Shopify, etc.).
* **Fuzzy Typo Tolerance**: Accurately recognizes and resolves misspelled brand queries (e.g., `amamzon`, `amazn`, `googl`, `msft`, `aapl`).
* **Direct Official Store & Website Navigation**: Generates clickable button chips under responses routing customers directly to official websites, product stores, and cloud portals.

### 3. Multi-Language Internationalization (i18n) & Language Selector
* **Global Language Toggle**: Interactive dropdown selector (`LanguageSelector.jsx`) available in both the public landing page header (`Home.jsx`) and the authenticated application top navbar (`Navbar.jsx`).
* **7 Supported Languages**:
  * English (`en` 🇺🇸)
  * Hindi / हिन्दी (`hi` 🇮🇳)
  * Spanish / Español (`es` 🇪🇸)
  * French / Français (`fr` 🇫🇷)
  * German / Deutsch (`de` 🇩🇪)
  * Japanese / 日本語 (`ja` 🇯🇵)
  * Arabic / العربية (`ar` 🇸🇦 — includes automatic bidirectional `dir="rtl"` layout support)
* **Persistent Preferences**: Saves user selection to `localStorage` (`'querycore_lang'`) with reactive state management across all routes via `LanguageContext.jsx`.
* **Instant UI Translation**: Seamlessly localizes hero headlines, action buttons, portal navigation, platform section links, status badges, and AI chatbot interface labels.

---

## Repository Structure

```
QueryCore/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Automated CI: Linting, Unit Tests, Docker Checks
│       └── deploy.yml             # Automated CD: Container registry publish & staging
├── client/                        # React 19 + Vite frontend application
│   ├── src/                       # UI components, pages, context, and API clients
│   │   ├── components/            # FloatingChatWidget, Navbar, ProtectedRoute
│   │   ├── pages/                 # Home (interactive modals), Chat, Documents, Dashboard
│   │   └── utils/                 # companyKnowledge.js (Universal company & product intelligence)
│   ├── Dockerfile                 # Multi-stage production Nginx container
│   ├── nginx.conf                 # SPA routing and API reverse-proxy configuration
│   ├── package.json
│   └── README.md                  # Comprehensive client documentation
├── database/                      # Database schema and seed data
│   ├── schema.sql                 # PostgreSQL DDL, tables, constraints, indexes & triggers
│   └── seed.sql                   # Baseline admin user, mock employees, & knowledge docs
├── server/                        # FastAPI backend application
│   ├── app/
│   │   ├── core/                  # Security (bcrypt, JWT), gemini_service, rate limiting
│   │   ├── db/                    # SQLAlchemy database engine and auto-seeder
│   │   ├── middleware/            # Auth guardrails, RBAC, department boundaries
│   │   ├── models/                # SQLAlchemy ORM models (User, Document, AuditLog)
│   │   ├── routers/               # Endpoints: auth, documents, chat, dashboard, health
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
