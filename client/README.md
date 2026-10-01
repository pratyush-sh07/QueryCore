# QueryCore — Frontend Client Application

QueryCore's enterprise web client is built with **React 19**, **Vite**, **Tailwind CSS**, and **Lucide React**. It delivers an executive-grade user interface for organizational knowledge intelligence, retrieval-augmented generation (RAG), and zero-trust departmental guardrails.

---

## Key Frontend Features

### 1. Interactive Domain & Product Specification Modal
On the homepage (`src/pages/Home.jsx`), all feature and product cards are interactive:
* **9 Interactive Domains Covered**:
  * *Team Collaboration* (Multi-tenant knowledge workspaces)
  * *Engineering* (Technical architecture, Helm charts, EKS)
  * *Legal & Compliance* (SOC-2 Type II, GDPR, HIPAA guardrails)
  * *Analytics* (Real-time telemetry, 240ms ping monitoring)
  * *Knowledge Library* (Vector vault, 10M+ document indexing)
  * *AI Copilot* (Gemini 2.0 grounded RAG assistant)
  * *Mobile Access* (Responsive touch-optimized interface)
  * *Desktop Platform* (Enterprise workstation layout)
  * *Enterprise Vault* (Air-gapped on-premise / GovCloud deployment)
* **Modal Specifications**:
  * High-resolution visual headers with animated badges.
  * Core capability checklists with verified technical metrics.
  * Ingestion throughput, encryption specs (AES-256 / BYOK), and compliance standards.
  * Direct **"Launch in Portal"** navigation buttons and **"Ask Copilot Now"** sample query pills.

### 2. Universal Company & Product Intelligence Engine (`src/utils/companyKnowledge.js`)
An intelligent knowledge engine integrated into both the **Floating AI Concierge** and the **Full Copilot Page**:
* **Global Company Profiles**:
  * **Amazon / AWS**: AWS (EC2, S3, Bedrock, SageMaker), Retail & Prime Video, Echo/Alexa devices, Kindle, Zoox robotics.
  * **Google / Alphabet**: Gemini AI, Google Cloud Platform (GCP), Workspace, Android, Pixel hardware, YouTube.
  * **Apple**: iPhone & iOS, Mac / MacBook (M-series Apple Silicon), iPad, Apple Vision Pro, Apple Watch.
  * **Microsoft**: Azure Cloud, Copilot 365, Windows 11, Xbox ecosystem, GitHub.
  * **Meta**: Facebook, Instagram, WhatsApp, Meta Quest 3 VR, Ray-Ban Meta glasses, Llama 3 open models.
  * **OpenAI**: ChatGPT (Free/Plus/Enterprise), GPT-4o, DALL·E 3, Sora.
  * **Tesla**: EVs (Model 3/Y/S/X, Cybertruck), Full Self-Driving (FSD), Powerwall/Megapack, Optimus robot.
  * **NVIDIA**: Blackwell B200, Hopper H100, GeForce RTX 40-series, CUDA, Omniverse.
  * **QueryCore Technologies**: Complete company specs, enterprise SaaS plans, and in-app routes.
  * *Dynamic fallback*: Generates complete corporate profiles and product directories for any arbitrary company (Nike, Boeing, Stripe, Shopify, etc.).
* **Typo & Misspelling Tolerance**: Intelligently handles typos (e.g. `amamzon`, `amazn`, `googl`, `msft`, `aapl`).
* **Direct Clickable Store & Website Buttons**: Generates direct links under AI responses to official websites, product configurators, and cloud portals.

### 3. Floating Institutional AI Concierge (`src/components/FloatingChatWidget.jsx`)
* Accessible globally across all pages in the bottom right corner.
* Instant response generation with fallback simulation when offline.
* Quick-action portal jump chips (`/chat`, `/documents`, `/dashboard`, `/register`).
* Clean formatting with `whitespace-pre-line` and corporate intelligence badges.

### 4. Full Enterprise Copilot (`src/pages/Chat.jsx`)
* Multi-department conversational grounding (Engineering, HR, Sales, Legal, Institutional).
* Clickable citation badges with confidence scores (`99.8% Grounded`).
* Real-time query parameter pre-fill support (`?q=...`) for instant cross-page exploration.

### 5. Multi-Page Enterprise Portal
* **Document Library (`src/pages/Documents.jsx`)**: Filter, preview, and search organizational documents.
* **Executive Dashboard (`src/pages/Dashboard.jsx`)**: Real-time response times, queries processed, token savings, and system health.
* **Compliance & Profile (`src/pages/Profile.jsx`)**: User authentication, departmental permissions, and audit log monitoring.

---

## Directory Structure

```
client/
├── public/                 # Static assets and icons
├── src/
│   ├── api/                # Axios API client configured with auth interceptors
│   │   └── client.js
│   ├── components/         # Reusable UI components
│   │   ├── FloatingChatWidget.jsx  # Floating AI Concierge with company intelligence
│   │   ├── Navbar.jsx              # Navigation header with auth controls
│   │   └── ProtectedRoute.jsx      # Route guard enforcing login and roles
│   ├── context/            # React context providers
│   │   └── AuthContext.jsx         # User authentication & token management
│   ├── pages/              # Main route views
│   │   ├── Chat.jsx                # Full-page AI Copilot with department grounding
│   │   ├── Dashboard.jsx           # Executive telemetry & ROI metrics
│   │   ├── Documents.jsx           # Document management vault & search
│   │   ├── Home.jsx                # Landing page with interactive domain modals
│   │   ├── Login.jsx               # Sign-in portal
│   │   ├── Profile.jsx             # User profile & compliance status
│   │   └── Register.jsx            # Account creation & trial onboarding
│   ├── utils/              # Helper utilities
│   │   └── companyKnowledge.js     # Universal company & product intelligence engine
│   ├── App.jsx             # Route definitions and application shell
│   ├── index.css           # Global Tailwind CSS directives
│   └── main.jsx            # Application entrypoint
├── Dockerfile              # Production multi-stage build with Nginx
├── nginx.conf              # Reverse proxy & SPA routing configuration
├── package.json            # Dependencies and scripts
└── vite.config.js          # Vite build configuration
```

---

## Getting Started

### Prerequisites
* Node.js (v18 or higher)
* npm (v9 or higher)

### Installation & Development
```bash
# Install dependencies
npm install

# Start local development server (http://localhost:5173)
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```
