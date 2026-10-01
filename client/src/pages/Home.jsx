import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles, Bot, FileText, ShieldCheck, ArrowRight,
  Database, Cpu, Zap, CheckCircle2, Building2,
  Search, Play, X, TrendingUp, TrendingDown,
  Users, Globe, BarChart3, Layers, ExternalLink
} from 'lucide-react';
import FloatingChatWidget from '../components/FloatingChatWidget';
import CosmicCanvas from '../components/CosmicCanvas';

/* ─────────────────────────────────────────
   PHOTO POOLS — hover-swap galleries
───────────────────────────────────────── */
const HERO_PHOTOS = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1920&q=80',
];

const GALLERY_PHOTOS = [
  { src:'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=700&q=80', hover:'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=700&q=80', label:'Team Collaboration' },
  { src:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=700&q=80', hover:'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=700&q=80', label:'Engineering' },
  { src:'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=700&q=80', hover:'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=700&q=80', label:'Legal & Compliance' },
  { src:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80', hover:'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=700&q=80', label:'Analytics' },
];

const PRODUCT_PHOTOS = [
  { src:'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80', hover:'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=600&q=80', label:'Mobile Access', tag:'iOS · Android' },
  { src:'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80', hover:'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=600&q=80', label:'Desktop Platform', tag:'Web · Electron' },
  { src:'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=600&q=80', hover:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80', label:'Enterprise Vault', tag:'On-Prem · Cloud' },
];

/* ─────────────────────────────────────────
   LIVE STOCK TICKER DATA
───────────────────────────────────────── */
const STOCKS = [
  { sym:'MSFT',  name:'Microsoft',    price:423.18, change:+2.34, pct:+0.56 },
  { sym:'GOOGL', name:'Alphabet',     price:178.42, change:-1.12, pct:-0.62 },
  { sym:'AAPL',  name:'Apple',        price:226.84, change:+3.91, pct:+1.75 },
  { sym:'AMZN',  name:'Amazon',       price:198.57, change:+0.88, pct:+0.45 },
  { sym:'META',  name:'Meta',         price:567.31, change:+8.24, pct:+1.47 },
  { sym:'NVDA',  name:'NVIDIA',       price:121.63, change:-2.41, pct:-1.94 },
  { sym:'TSLA',  name:'Tesla',        price:249.92, change:+5.17, pct:+2.11 },
  { sym:'CRM',   name:'Salesforce',   price:312.44, change:+1.63, pct:+0.52 },
];

/* ─────────────────────────────────────────
   COMPANY STATS
───────────────────────────────────────── */
const COMPANIES = [
  { name:'Nexus Aerospace',  employees:'124,500', revenue:'$18.2B', docs:'82,400',  dept:'Engineering' },
  { name:'Axiom Health',     employees:'67,800',  revenue:'$9.6B',  docs:'54,100',  dept:'Legal' },
  { name:'Horizon Capital',  employees:'12,200',  revenue:'$4.1B',  docs:'31,750',  dept:'Finance' },
  { name:'Vertex Global',    employees:'209,000', revenue:'$31.5B', docs:'143,200', dept:'HR' },
];

/* ─────────────────────────────────────────
   RAG DEMO
───────────────────────────────────────── */
const QUESTIONS = [
  { dept:'Legal',       query:'What SOC-2 data residency policies apply to AI models?',  src:'SOC2_Compliance_2026.pdf',    lat:'310ms' },
  { dept:'Engineering', query:'What are our EKS Helm deployment standards?',              src:'Cloud_Architecture_Spec.pdf', lat:'380ms' },
  { dept:'HR',          query:'What is our annual PTO and wellness stipend policy?',      src:'Employee_Handbook_2026.pdf',  lat:'275ms' },
  { dept:'Sales',       query:'What are enterprise tier pricing thresholds?',             src:'Sales_Playbook_Q4.pdf',       lat:'340ms' },
];
const ANSWERS = [
  'QueryCore AI enforces SOC-2 Type II standards. All enterprise tenant data is cryptographically isolated — your proprietary documents are never used to train external models.',
  'Production microservices deploy via standardized Helm charts on AWS EKS. All inter-service comms require mTLS + JWT bearer authorization with 80% automated test coverage.',
  'Full-time employees receive 25 annual PTO days plus corporate holidays. Health, dental, and vision coverage begins Day 1 with a $1,200 annual wellness stipend.',
  'Standard SaaS tier is $45/user/month billed annually. Custom on-premises vector DB deployments require MSA countersigned by VP or C-level executive.',
];

/* ─────────────────────────────────────────
   DOMAIN & PRODUCT SPECIFICATIONS DATA
───────────────────────────────────────── */
const DOMAIN_DETAILS = {
  'Team Collaboration': {
    title: 'Team Collaboration Hub',
    subtitle: 'Cross-functional synchronization without departmental silos',
    badge: 'QueryCore Sync',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80',
    company: 'QueryCore Technologies Inc.',
    productName: 'QueryCore Team Sync & Workspace Hub',
    overview: 'QueryCore Team Collaboration unifies dispersed engineering, product, legal, and operational teams into a shared context graph. Instead of knowledge getting trapped in Slack threads or email chains, documents are dynamically indexed and shared with role-aware privacy controls.',
    capabilities: [
      'Multi-team document synchronization with real-time updates',
      'Context-aware knowledge threads eliminating repeated questions',
      'Department-level permission boundaries and zero-trust sharing',
      'Seamless integration with Slack, Microsoft Teams, Notion, and Google Drive'
    ],
    technicalSpecs: {
      'SLA Availability': '99.99% Uptime',
      'Latency': '< 240ms retrieval',
      'Security': 'AES-256 at rest, TLS 1.3 in transit',
      'Access Scope': 'Universal or Department-Gated'
    },
    siteUrl: '/documents',
    webUrl: 'https://querycore.io/products/collaboration',
    sampleQuery: 'How do our cross-functional teams share confidential architecture RFCs without leaks?'
  },
  'Engineering': {
    title: 'Engineering & DevOps Engine',
    subtitle: 'Container architectures, Helm charts, and microservice contracts',
    badge: 'QueryCore DevHub',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    company: 'QueryCore Technologies Inc.',
    productName: 'QueryCore Engineering Knowledge Core',
    overview: 'Purpose-built for DevOps and software engineering teams. QueryCore Engineering indexes cloud architecture diagrams, Kubernetes Helm manifests, API Swagger schemas, CI/CD pipelines, and internal RFCs so developers can troubleshoot and build faster.',
    capabilities: [
      'Automated AWS EKS & Kubernetes deployment standard enforcement',
      'Microservice contract verification and API endpoint discovery',
      'Automated code quality & test coverage policies (80%+ SLA threshold)',
      'Direct integration with GitHub, GitLab, and ArgoCD'
    ],
    technicalSpecs: {
      'Deployment Target': 'AWS EKS / Helm 3 / Docker Compose',
      'API Framework': 'FastAPI + Uvicorn Async',
      'Test Coverage Policy': '80% automated unit/integration threshold',
      'Token Auth': 'JWT Bearer RS256/HS256'
    },
    siteUrl: '/documents',
    webUrl: 'https://querycore.io/products/engineering',
    sampleQuery: 'What are our microservices deployment standards for AWS EKS clusters?'
  },
  'Legal & Compliance': {
    title: 'Legal & Governance Shield',
    subtitle: 'SOC-2 Type II, GDPR, and zero-trust data isolation guardrails',
    badge: 'QueryCore Shield',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    company: 'QueryCore Technologies Inc.',
    productName: 'QueryCore Enterprise Compliance Shield',
    overview: 'QueryCore Compliance Shield acts as an unyielding guardrail for institutional legal, IP, and compliance teams. It guarantees that corporate intellectual property and employee records are never shared with public frontier models or leaked across departmental boundaries.',
    capabilities: [
      'SOC-2 Type II and GDPR cryptographic tenant isolation',
      'Department boundary isolation guardrails preventing unauthorized cross-team access',
      'Zero external model training guarantee — queries are processed in private memory',
      'Immutable audit logging tracking every document access and query event'
    ],
    technicalSpecs: {
      'Certification': 'SOC-2 Type II & GDPR Compliant',
      'Data Isolation': 'Zero-Trust Cryptographic Partitioning',
      'Model Training': '100% Never Used for External LLM Training',
      'Audit Logging': 'PostgreSQL JSONB Immutable Audit Trails'
    },
    siteUrl: '/documents',
    webUrl: 'https://querycore.io/security',
    sampleQuery: 'What are our SOC-2 and AI compliance policies regarding LLM training data?'
  },
  'Analytics': {
    title: 'Executive Intelligence & Analytics',
    subtitle: 'Real-time telemetry, query throughput, and latency tracking',
    badge: 'QueryCore Telemetry',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    company: 'QueryCore Technologies Inc.',
    productName: 'QueryCore Executive Analytics Suite',
    overview: 'Provides C-level executives, department heads, and compliance officers complete observability into institutional knowledge retrieval. Monitor which documents are queried most, identify institutional knowledge gaps, and verify 240ms sub-second response times.',
    capabilities: [
      'Live ping and API latency tracking (average 220ms–240ms)',
      'Document indexing velocity and departmental volume heatmaps',
      'Audit log visualization with anomaly and violation detection',
      'Executive compliance reports and knowledge gap diagnostics'
    ],
    technicalSpecs: {
      'Query Telemetry': 'Real-time WebSocket & REST Metrics',
      'Storage Engine': 'PostgreSQL + Redis In-Memory Cache',
      'Audit Retention': 'Configurable (up to 7 years regulatory compliance)',
      'Visualization': 'Interactive SVG telemetry charts'
    },
    siteUrl: '/dashboard',
    webUrl: 'https://querycore.io/dashboard',
    sampleQuery: 'What is our current cluster retrieval latency and active document count?'
  },
  'Knowledge Library': {
    title: 'Knowledge Library & Vector Vault',
    subtitle: 'Over 10M+ indexed pages across PDFs, contracts, and manuals',
    badge: 'QueryCore Vault',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80',
    company: 'QueryCore Technologies Inc.',
    productName: 'QueryCore Multi-Tenant Vector Vault',
    overview: 'The foundational data layer of QueryCore. The Knowledge Library indexes structured and unstructured institutional records — from multi-page PDF benefit guides and customer contracts to markdown technical RFCs — making them instantaneously searchable by semantic meaning.',
    capabilities: [
      'Hybrid semantic vector search + BM25 keyword matching',
      'Departmental filtering (HR, Engineering, Legal, Sales, Finance)',
      'One-click document indexing with automatic tag classification',
      'Granular document deletion and ownership permission checks'
    ],
    technicalSpecs: {
      'Index Capacity': '10,000,000+ Enterprise Pages',
      'Search Types': 'Dense Embeddings + GIN Full-Text Search',
      'Supported Formats': 'PDF, DOCX, TXT, Markdown, JSON, HTML',
      'Storage Isolation': 'Per-Tenant & Per-Department Partitioning'
    },
    siteUrl: '/documents',
    webUrl: 'https://querycore.io/documents',
    sampleQuery: 'What are the employee onboarding benefits and healthcare provisions for 2026?'
  },
  'AI Copilot': {
    title: 'AI Copilot & Grounding Engine',
    subtitle: 'Gemini 2.0-powered intelligent copilot with mathematical citations',
    badge: 'QueryCore Copilot',
    image: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=1200&q=80',
    company: 'QueryCore Technologies Inc.',
    productName: 'QueryCore Grounded AI Copilot (Gemini 2.0)',
    overview: 'The conversational interface of QueryCore. Powered by Google Gemini 2.0 Flash and deep Retrieval-Augmented Generation (RAG), the Copilot answers natural language questions with 100% verifiable source citations. If information is not in your verified documents, the copilot will not invent answers.',
    capabilities: [
      'Zero-hallucination verification against uploaded company records',
      'Exact clickable source citation badges on every answer',
      'Department-scoped conversation contexts and historical memory',
      'Interactive prompt recommendations and instant answer playback'
    ],
    technicalSpecs: {
      'Foundation Model': 'Google Gemini 2.0 Flash / Pro Hybrid',
      'Grounding Algorithm': 'Mathematical Cosine RAG Alignment',
      'Citation Integrity': '100% Document-Referenced Badges',
      'Response Latency': '< 300ms First-Token Time'
    },
    siteUrl: '/chat',
    webUrl: 'https://querycore.io/chat',
    sampleQuery: 'What is our corporate policy for PTO rollover and healthcare coverage start date?'
  },
  'Mobile Access': {
    title: 'QueryCore Mobile Companion',
    subtitle: 'Enterprise intelligence on iOS and Android with offline caching',
    badge: 'QueryCore Mobile',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    company: 'QueryCore Technologies Inc.',
    productName: 'QueryCore Mobile Edition (iOS & Android)',
    overview: 'Access your enterprise copilot on the move. Built for executives and frontline team members, QueryCore Mobile delivers instant voice and text search across company documentation with local biometric encryption and secure offline caching.',
    capabilities: [
      'Biometric authentication (FaceID & TouchID)',
      'Offline document cache with auto-sync when online',
      'Instant voice search with speech-to-text synthesis',
      'Real-time push notifications for compliance updates'
    ],
    technicalSpecs: {
      'Platforms': 'iOS 16+, Android 12+, PWA Web Client',
      'Sync Protocol': 'Differential Delta WebSocket Sync',
      'Security': 'Hardware Secure Enclave / KeyStore Integration'
    },
    siteUrl: '/chat',
    webUrl: 'https://querycore.io/mobile',
    sampleQuery: 'How can our field team access emergency SOPs offline on mobile devices?'
  },
  'Desktop Platform': {
    title: 'QueryCore Desktop Workstation',
    subtitle: 'System-wide shortcut bar, local file indexing, and multi-monitor layout',
    badge: 'QueryCore Desktop',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80',
    company: 'QueryCore Technologies Inc.',
    productName: 'QueryCore Desktop Platform (Electron / Native)',
    overview: 'The desktop power-user experience for QueryCore. Summon the enterprise copilot from anywhere with a global keyboard shortcut (Ctrl+Space), drag-and-drop local folders for immediate vector indexing, and run multi-window side-by-side document comparisons.',
    capabilities: [
      'Global system hotkey for instant spotlight search',
      'Drag-and-drop batch document upload and vectorization',
      'Multi-window split screen document & copilot interface',
      'Low-memory background daemon with minimal CPU overhead'
    ],
    technicalSpecs: {
      'Platforms': 'macOS (Apple Silicon & Intel), Windows 11, Linux',
      'Framework': 'Electron + React 19 + Rust Core Engine',
      'Hotkeys': 'Customizable global system shortcuts'
    },
    siteUrl: '/documents',
    webUrl: 'https://querycore.io/desktop',
    sampleQuery: 'How do I index a folder of engineering PDF manuals from my desktop?'
  },
  'Enterprise Vault': {
    title: 'QueryCore Air-Gapped Enterprise Vault',
    subtitle: 'On-premise deployment with customer-managed encryption keys',
    badge: 'QueryCore Vault On-Prem',
    image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=1200&q=80',
    company: 'QueryCore Technologies Inc.',
    productName: 'QueryCore Air-Gapped Private Enterprise Vault',
    overview: 'For defense, healthcare, government, and banking institutions requiring strict data sovereignty. QueryCore can be deployed entirely inside your private VPC, Kubernetes cluster, or disconnected air-gapped on-premise datacenter with customer-managed KMS encryption keys.',
    capabilities: [
      '100% air-gapped deployment with zero internet egress required',
      'Customer-Managed Encryption Keys (CMEK / BYOK)',
      'Local on-prem vector databases (Milvus, Qdrant, PgVector)',
      'Enterprise SSO via Okta, SAML 2.0, Azure AD, and PingIdentity'
    ],
    technicalSpecs: {
      'Deployment': 'AWS GovCloud, Azure Government, or Bare-Metal',
      'Encryption': 'FIPS 140-2 Level 3 Hardware Security Module',
      'Compliance': 'FedRAMP Ready, HIPAA, ITAR, SOC-2 Type II'
    },
    siteUrl: '/register',
    webUrl: 'https://querycore.io/enterprise-vault',
    sampleQuery: 'What are the architecture requirements for on-premise air-gapped vector store deployment?'
  }
};

/* ─────────────────────────────────────────
   HOVER-SWAP PHOTO CARD
───────────────────────────────────────── */
function HoverPhotoCard({ src, hover, label, tag, children, className = '', style = {}, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative overflow-hidden rounded-2xl cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-500/40 ${className}`}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Base photo */}
      <img src={src} alt={label}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
        style={{ filter: hovered ? 'brightness(0.28) saturate(0.5)' : 'brightness(0.45) saturate(0.7)', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}/>
      {/* Hover photo crossfade */}
      {hover && (
        <img src={hover} alt={label + ' hover'}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          style={{ opacity: hovered ? 1 : 0, filter: 'brightness(0.35) saturate(0.6)', transform: hovered ? 'scale(1.08)' : 'scale(1.02)' }}/>
      )}
      {/* Gradient overlay */}
      <div className="absolute inset-0 transition-all duration-500"
        style={{ background: hovered
          ? 'linear-gradient(to top, rgba(14, 165, 233, 0.75) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)'
          : 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}/>
      {/* Content */}
      {children || (
        <div className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-300" style={{ transform: hovered ? 'translateY(0)' : 'translateY(4px)' }}>
          {tag && <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase block mb-1">{tag}</span>}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white group-hover:text-cyan-100 transition-colors">{label}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity">
              Click for info
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 overflow-hidden" style={{ maxHeight: hovered ? '24px' : '0', transition: 'max-height 0.3s ease', opacity: hovered ? 1 : 0 }}>
            <ArrowRight size={12} className="text-cyan-200"/>
            <span className="text-xs text-cyan-100 font-semibold">View specs, company & where to find →</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   ANIMATED STOCK TICKER
───────────────────────────────────────── */
function StockTicker() {
  const [prices, setPrices] = useState(STOCKS.map(s => ({ ...s })));
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(s => {
        const delta = (Math.random() - 0.48) * 2.5;
        const newPrice = Math.max(10, s.price + delta);
        const newChange = s.change + delta * 0.3;
        const newPct = (newChange / newPrice) * 100;
        return { ...s, price: newPrice, change: newChange, pct: newPct };
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden" style={{ background: 'rgba(8,10,18,0.9)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="flex animate-marquee gap-0" style={{ width: 'max-content' }}>
        {[...prices, ...prices].map((s, i) => (
          <div key={i} className="flex items-center gap-3 px-8 py-3 border-r" style={{ borderColor: 'rgba(255,255,255,0.04)', whiteSpace: 'nowrap' }}>
            <span className="text-xs font-mono font-bold text-white">{s.sym}</span>
            <span className="text-xs font-mono text-slate-300">${s.price.toFixed(2)}</span>
            <span className={`text-[11px] font-mono flex items-center gap-0.5 ${s.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {s.change >= 0 ? <TrendingUp size={10}/> : <TrendingDown size={10}/>}
              {s.pct >= 0 ? '+' : ''}{s.pct.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PHONE MOCKUP
───────────────────────────────────────── */
function PhoneMockup({ className = '', style = {} }) {
  return (
    <div className={`relative ${className}`} style={style}>
      {/* Phone frame */}
      <div className="relative mx-auto" style={{ width: '160px', height: '320px' }}>
        <div className="absolute inset-0 rounded-[2.5rem] border-4 shadow-2xl" style={{ borderColor: '#1e2433', background: 'linear-gradient(145deg, #1a1f2e, #0d1117)', boxShadow: '0 40px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)' }}/>
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full" style={{ background: '#0d1117', zIndex: 2 }}/>
        {/* Screen content */}
        <div className="absolute inset-2 rounded-[2rem] overflow-hidden" style={{ background: '#0a0c14' }}>
          {/* Status bar */}
          <div className="flex justify-between px-3 pt-5 pb-2">
            <span className="text-[8px] font-mono text-slate-400">9:41</span>
            <div className="flex gap-1">
              <div className="w-3 h-1.5 rounded-sm bg-emerald-400"/>
            </div>
          </div>
          {/* App header */}
          <div className="px-3 pb-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-4 h-4 rounded" style={{ background: 'linear-gradient(135deg,#2563eb,#06b6d4)' }}/>
              <span className="text-[9px] font-bold text-white">QueryCore</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <Search size={8} className="text-slate-500"/>
              <span className="text-[8px] text-slate-500">Ask anything...</span>
            </div>
          </div>
          {/* Chat bubbles */}
          <div className="px-2.5 py-3 flex flex-col gap-2">
            <div className="self-end px-2 py-1 rounded-xl text-[7px] text-white max-w-[80%]" style={{ background: 'rgba(37,99,235,0.6)' }}>What's our PTO policy?</div>
            <div className="self-start px-2 py-1.5 rounded-xl text-[7px] leading-relaxed max-w-[85%]" style={{ background: 'rgba(255,255,255,0.06)', color: '#cbd5e1' }}>
              25 days PTO annually + $1,200 wellness stipend...
            </div>
            <div className="self-start px-1.5 py-1 rounded flex items-center gap-1" style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}>
              <FileText size={6} className="text-cyan-400"/>
              <span className="text-[6px] font-mono text-cyan-300">Employee_Handbook.pdf</span>
            </div>
          </div>
          {/* Bottom input */}
          <div className="absolute bottom-4 left-2 right-2">
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="text-[7px] text-slate-500 flex-1">Message...</span>
              <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#2563eb,#06b6d4)' }}>
                <ArrowRight size={7} className="text-white"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN HOME COMPONENT
══════════════════════════════════════════ */
export default function Home() {
  const navigate = useNavigate();
  const [activeQ, setActiveQ]   = useState(0);
  const [sim, setSim]           = useState(false);
  const [mousePos, setMousePos] = useState({ x: 760, y: 400 });
  const [heroImg, setHeroImg]   = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);

  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    // Auto-cycle hero background
    const heroTimer = setInterval(() => setHeroImg(p => (p + 1) % HERO_PHOTOS.length), 6000);
    return () => { window.removeEventListener('mousemove', h); clearInterval(heroTimer); };
  }, []);

  const pick = (idx) => { setActiveQ(idx); setSim(true); setTimeout(() => setSim(false), 500); };

  return (
    <div className="min-h-screen bg-[#10131a] text-[#f7f2ea] overflow-x-hidden" style={{ fontFamily:"'Plus Jakarta Sans', sans-serif" }}>

      {/* ══════════════════════════════════════════
          FLOATING NAVBAR
      ══════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4">
        <nav className="max-w-7xl mx-auto rounded-2xl px-6 py-3.5 flex items-center justify-between"
          style={{ background:'rgba(20, 23, 33, 0.88)', backdropFilter:'blur(24px)', border:'1px solid rgba(217, 180, 130, 0.22)', boxShadow:'0 20px 60px rgba(0,0,0,0.6)' }}>
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md" style={{ background:'linear-gradient(135deg, #d9b482, #c4975f, #8c6032)' }}>
              <Sparkles className="text-[#14110d]" size={17}/>
            </div>
            <span className="font-extrabold text-[#faf6ef] text-sm tracking-tight">QueryCore AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-xs font-medium text-[#b8a692]">
            <a href="#features" className="hover:text-[#faf6ef] transition-colors">Platform</a>
            <a href="#products" className="hover:text-[#faf6ef] transition-colors">Products</a>
            <a href="#demo"     className="hover:text-[#faf6ef] transition-colors">Live Demo</a>
            <a href="#stats"    className="hover:text-[#faf6ef] transition-colors">Enterprise</a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login"
              className="text-xs font-semibold text-[#eedfc8] hover:text-white px-4 py-2 rounded-xl transition-colors">
              Sign In
            </Link>
            <Link to="/register"
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#14110d] flex items-center gap-1.5 hover:scale-105 transition-transform shadow-lg"
              style={{ background:'linear-gradient(90deg, #d9b482, #f5e4cc, #c4975f)', boxShadow:'0 0 25px rgba(217, 180, 130, 0.35)' }}>
              Get Started <ArrowRight size={13}/>
            </Link>
          </div>
        </nav>
      </header>

      {/* ══════════════════════════════════════════
          HERO — AUTO-CYCLING PHOTO BG + PARTICLE CANVAS
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Auto-cycling background photos with crossfade */}
        {HERO_PHOTOS.map((url, i) => (
          <img key={url} src={url} alt="" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms]"
            style={{ opacity: heroImg === i ? 1 : 0, filter:'brightness(0.25) saturate(0.6)' }}/>
        ))}

        {/* Particle canvas on top */}
        <CosmicCanvas />

        {/* Cursor spotlight */}
        <div className="pointer-events-none absolute inset-0 z-[3] transition-all duration-200"
          style={{ background:`radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37,99,235,0.2), transparent 65%)` }}/>

        {/* Vignette */}
        <div className="absolute inset-0 z-[2]"
          style={{ background:'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 65%, rgba(10,11,15,1) 100%)' }}/>

        {/* Hero content */}
        <div className="relative z-[5] text-center max-w-4xl mx-auto px-4 pt-28 pb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold text-[#f5e4cc]"
            style={{ background:'rgba(217,180,130,0.15)', border:'1px solid rgba(217,180,130,0.3)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d9b482] animate-pulse"/>
            ENTERPRISE AI · GEMINI 2.0 RAG ENGINE · LIVE
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-[#faf6ef] mb-6">
            Your company's memory,<br/>
            <span className="block mt-1" style={{ fontFamily:'Georgia,serif', fontStyle:'italic', fontWeight:400, background:'linear-gradient(90deg, #f5e4cc, #d9b482, #eedfc8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              finally searchable.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#c4b5a3] max-w-2xl mx-auto mb-10 leading-relaxed">
            QueryCore AI turns siloed HR manuals, legal policies, and architecture docs into one verified copilot.
            <span className="text-[#faf6ef] font-semibold"> Every answer cites its exact source.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/chat"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-[#14110d] flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-xl"
              style={{ background:'linear-gradient(90deg, #d9b482, #f5e4cc, #c4975f)', boxShadow:'0 0 40px rgba(217,180,130,0.45)' }}>
              <Bot size={16}/> Engage AI Copilot
            </Link>
            <button onClick={() => setVideoOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold text-[#eedfc8] flex items-center justify-center gap-2 hover:scale-105 transition-transform"
              style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(217,180,130,0.25)', backdropFilter:'blur(10px)' }}>
              <Play size={14} className="text-[#d9b482]"/> Watch Platform Tour
            </button>
          </div>

          {/* Stat pills */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {[
              { icon:<Zap size={13} className="text-cyan-400"/>,       label:'Sub-300ms RAG' },
              { icon:<ShieldCheck size={13} className="text-emerald-400"/>, label:'SOC-2 Type II' },
              { icon:<Building2 size={13} className="text-purple-400"/>,   label:'RBAC Multi-Tenant' },
              { icon:<CheckCircle2 size={13} className="text-blue-400"/>,  label:'Zero Hallucinations' },
              { icon:<Globe size={13} className="text-amber-400"/>,         label:'100+ Enterprises' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-slate-200"
                style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(12px)' }}>
                {s.icon} {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-2 text-slate-400 text-xs font-mono">
          <span className="tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent animate-pulse"/>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LIVE STOCK TICKER
      ══════════════════════════════════════════ */}
      <StockTicker />

      {/* ══════════════════════════════════════════
          HOVER-SWAP PHOTO FEATURE GRID
      ══════════════════════════════════════════ */}
      <section id="features" className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Platform Features & Domain Knowledge</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">Hover & Click to explore each domain</h2>
            <p className="text-sm text-slate-400 mt-2">Click any domain to inspect product specifications, company architecture, and live portal links.</p>
          </div>

          {/* 2-wide top row + 2-wide bottom row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {GALLERY_PHOTOS.map((p, i) => (
              <HoverPhotoCard key={i} src={p.src} hover={p.hover} label={p.label}
                className="h-64"
                style={{ border:'1px solid rgba(255,255,255,0.06)' }}
                onClick={() => setSelectedDomain(p.label)}
              />
            ))}
          </div>

          {/* Wide highlight strip */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <HoverPhotoCard
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80"
              hover="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=80"
              label="Knowledge Library" tag="10M+ Pages Indexed"
              className="lg:col-span-2 h-64"
              style={{ border:'1px solid rgba(255,255,255,0.06)' }}
              onClick={() => setSelectedDomain('Knowledge Library')}
            />
            <HoverPhotoCard
              src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=600&q=80"
              hover="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
              label="AI Copilot" tag="Gemini 2.0 Powered"
              className="h-64"
              style={{ border:'1px solid rgba(255,255,255,0.06)' }}
              onClick={() => setSelectedDomain('AI Copilot')}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRODUCTS — PHONE + DESKTOP + VAULT
      ══════════════════════════════════════════ */}
      <section id="products" className="py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background:'linear-gradient(180deg, #0a0b0f 0%, #0d1220 50%, #0a0b0f 100%)' }}/>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Available On Every Device</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">One platform. Any surface.</h2>
            <p className="text-sm text-slate-400 mt-2">Click any client surface to view deployment architectures and direct download links.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            {/* Phone */}
            <div
              className="flex flex-col items-center gap-6 group cursor-pointer"
              onClick={() => setSelectedDomain('Mobile Access')}
            >
              <div className="relative transform group-hover:-translate-y-4 transition-transform duration-500">
                <PhoneMockup style={{ filter:'drop-shadow(0 40px 60px rgba(37,99,235,0.3))' }}/>
                {/* Floating glow ring */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full blur-xl opacity-60"
                  style={{ background:'radial-gradient(ellipse, rgba(37,99,235,0.7), transparent)' }}/>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-white text-base mb-1 group-hover:text-cyan-300 transition-colors">Mobile App</h3>
                <p className="text-xs text-slate-400">iOS · Android · Offline sync</p>
                <span className="inline-block mt-2 text-[10px] font-mono text-cyan-400 underline">Click to view specs →</span>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setSelectedDomain('Mobile Access'); }}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white hover:scale-105 transition-transform"
                style={{ background:'rgba(37,99,235,0.2)', border:'1px solid rgba(37,99,235,0.4)' }}
              >
                View Mobile Specs →
              </button>
            </div>

            {/* Center product photos - tall card */}
            <HoverPhotoCard
              src={PRODUCT_PHOTOS[1].src} hover={PRODUCT_PHOTOS[1].hover}
              label={PRODUCT_PHOTOS[1].label} tag={PRODUCT_PHOTOS[1].tag}
              className="h-[420px] transform hover:-translate-y-4 transition-transform duration-500"
              style={{ border:'1px solid rgba(255,255,255,0.08)', boxShadow:'0 40px 80px rgba(0,0,0,0.5)' }}
              onClick={() => setSelectedDomain('Desktop Platform')}
            />

            {/* Vault product */}
            <HoverPhotoCard
              src={PRODUCT_PHOTOS[2].src} hover={PRODUCT_PHOTOS[2].hover}
              label={PRODUCT_PHOTOS[2].label} tag={PRODUCT_PHOTOS[2].tag}
              className="h-80 transform group-hover:-translate-y-4 transition-transform duration-500"
              style={{ border:'1px solid rgba(255,255,255,0.06)' }}
              onClick={() => setSelectedDomain('Enterprise Vault')}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ENTERPRISE STATS — Company Cards
      ══════════════════════════════════════════ */}
      <section id="stats" className="relative py-24 px-4 sm:px-6 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
          alt="" className="absolute inset-0 w-full h-full object-cover"
          style={{ filter:'brightness(0.1) saturate(0.3)' }}/>
        <div className="absolute inset-0" style={{ background:'rgba(10,11,15,0.75)' }}/>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Enterprise Adoption</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">Trusted at scale</h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">QueryCore AI powers institutional knowledge for Fortune 500 teams globally.</p>
          </div>

          {/* Global stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {[
              { val:'4.2M+',  label:'Documents Indexed',  icon:<FileText size={20} className="text-cyan-400"/> },
              { val:'820K+',  label:'Daily AI Queries',    icon:<Bot size={20} className="text-purple-400"/> },
              { val:'99.97%', label:'Uptime SLA',          icon:<Zap size={20} className="text-emerald-400"/> },
              { val:'127',    label:'Enterprise Clients',   icon:<Building2 size={20} className="text-amber-400"/> },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-6 text-center hover:-translate-y-2 transition-transform duration-300"
                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', backdropFilter:'blur(12px)' }}>
                <div className="flex justify-center mb-3">{s.icon}</div>
                <div className="text-3xl font-extrabold text-white mb-1">{s.val}</div>
                <div className="text-xs text-slate-400 font-mono">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Company cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COMPANIES.map((c, i) => (
              <div key={i} className="rounded-2xl p-5 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
                style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', backdropFilter:'blur(10px)' }}>
                {/* Company avatar */}
                <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center font-bold text-sm text-white"
                  style={{ background:`linear-gradient(135deg, hsl(${i*70+200},70%,40%), hsl(${i*70+230},60%,55%))` }}>
                  {c.name.slice(0,2).toUpperCase()}
                </div>
                <h4 className="text-sm font-bold text-white mb-3">{c.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1"><Users size={10}/> Employees</span>
                    <span className="text-slate-200 font-mono">{c.employees}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1"><BarChart3 size={10}/> Revenue</span>
                    <span className="text-slate-200 font-mono">{c.revenue}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1"><FileText size={10}/> Docs</span>
                    <span className="text-cyan-300 font-mono">{c.docs}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor:'rgba(255,255,255,0.06)' }}>
                  <span className="text-[10px] font-mono text-slate-500">{c.dept} Dept</span>
                  <CheckCircle2 size={12} className="text-emerald-400"/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LIVE RAG DEMO TERMINAL
      ══════════════════════════════════════════ */}
      <section id="demo" className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Interactive Demo</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Verifiable Grounding, Live</h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">Click any query — watch QueryCore retrieve and cite the exact document.</p>
          </div>

          <div className="rounded-3xl overflow-hidden"
            style={{ background:'rgba(10,14,26,0.9)', border:'1px solid rgba(96,165,250,0.2)', backdropFilter:'blur(24px)', boxShadow:'0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
            {/* Chrome bar */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b" style={{ borderColor:'rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70"/><div className="w-3 h-3 rounded-full bg-amber-500/70"/><div className="w-3 h-3 rounded-full bg-emerald-500/70"/>
                </div>
                <span className="ml-2 font-mono text-[11px] text-slate-400">docusync-rag://v2.0 · Gemini 2.0 Flash</span>
              </div>
              <span className="text-emerald-400 text-[11px] font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
                LIVE · {QUESTIONS[activeQ].lat}
              </span>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-6">
                {QUESTIONS.map((q, i) => (
                  <button key={i} onClick={() => pick(i)}
                    className="p-3.5 rounded-xl text-left transition-all cursor-pointer text-xs hover:scale-[1.02]"
                    style={{
                      background: activeQ===i ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.03)',
                      border: activeQ===i ? '1px solid rgba(96,165,250,0.5)' : '1px solid rgba(255,255,255,0.06)',
                      boxShadow: activeQ===i ? '0 8px 25px rgba(37,99,235,0.2)' : 'none',
                    }}>
                    <span className="font-mono text-[10px] uppercase tracking-wider mb-1.5 block"
                      style={{ color: activeQ===i ? '#67e8f9' : '#64748b' }}>{q.dept}</span>
                    <p className="font-medium leading-snug line-clamp-2" style={{ color: activeQ===i ? '#f1f5f9' : '#94a3b8' }}>{q.query}</p>
                  </button>
                ))}
              </div>

              <div className="rounded-2xl p-5" style={{ background:'rgba(0,0,0,0.5)', border:'1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-3 pb-3 border-b" style={{ borderColor:'rgba(255,255,255,0.05)' }}>
                  <Sparkles size={13}/> Copilot Answer · Retrieval-Augmented Generation
                </div>
                {sim ? (
                  <div className="py-8 flex items-center justify-center gap-3 text-xs text-cyan-300 font-mono">
                    <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"/>
                    Executing cosine similarity search across tenant vectors...
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-slate-200 leading-relaxed mb-4">{ANSWERS[activeQ]}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <FileText size={11} className="text-cyan-400"/>
                      <span className="text-[11px] font-mono text-slate-500">Verified Source:</span>
                      <span className="text-[11px] px-3 py-1 rounded-full font-mono font-semibold flex items-center gap-1.5"
                        style={{ background:'rgba(37,99,235,0.15)', border:'1px solid rgba(96,165,250,0.3)', color:'#93c5fd' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"/>
                        {QUESTIONS[activeQ].src}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA SECTION — photo background
      ══════════════════════════════════════════ */}
      <section className="relative py-32 px-4 sm:px-6 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1920&q=80"
          alt="" className="absolute inset-0 w-full h-full object-cover"
          style={{ filter:'brightness(0.15) saturate(0.4)' }}/>
        <div className="absolute inset-0" style={{ background:'linear-gradient(135deg, rgba(37,99,235,0.3), rgba(99,102,241,0.2), transparent)' }}/>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Ready to transform your<br/>
            <span style={{ fontFamily:'Georgia,serif', fontStyle:'italic', fontWeight:400, background:'linear-gradient(90deg,#93c5fd,#67e8f9)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              enterprise knowledge?
            </span>
          </h2>
          <p className="text-slate-300 text-sm mb-10 leading-relaxed">Join 127+ enterprise institutions already using QueryCore AI to eliminate knowledge silos.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register"
              className="px-8 py-4 rounded-xl text-sm font-bold text-[#14110d] hover:scale-105 transition-transform shadow-xl"
              style={{ background:'linear-gradient(90deg, #d9b482, #f5e4cc, #c4975f)', boxShadow:'0 0 40px rgba(217,180,130,0.4)' }}>
              Start Free Trial
            </Link>
            <Link to="/dashboard"
              className="px-8 py-4 rounded-xl text-sm font-semibold text-[#eedfc8] hover:scale-105 transition-transform"
              style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(217,180,130,0.25)', backdropFilter:'blur(12px)' }}>
              View Dashboard →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 px-6 text-center text-xs text-slate-500 font-mono"
        style={{ borderColor:'rgba(255,255,255,0.05)', background:'#06080e' }}>
        © 2026 QueryCore AI · Enterprise AI Hackathon · Gemini 2.0 RAG · Grounded, Verified, Cited
      </footer>

      {/* Video modal */}
      {videoOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{ background:'rgba(0,0,0,0.9)', backdropFilter:'blur(8px)' }}
          onClick={() => setVideoOpen(false)}>
          <div className="relative rounded-2xl overflow-hidden w-full max-w-3xl mx-4"
            style={{ border:'1px solid rgba(255,255,255,0.1)' }}
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setVideoOpen(false)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition">
              <X size={16}/>
            </button>
            <img src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=1200&q=80"
              alt="Demo" className="w-full object-cover" style={{ height:'420px' }}/>
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
              <div className="w-18 h-18 w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background:'rgba(37,99,235,0.85)', backdropFilter:'blur(10px)' }}>
                <Play size={26} className="text-white ml-1"/>
              </div>
              <p className="text-sm font-semibold text-white">QueryCore AI — Platform Tour</p>
              <p className="text-xs text-slate-300">Backend integration in progress — Demo coming soon</p>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          DOMAIN & PRODUCT SPECIFICATION MODAL
      ══════════════════════════════════════════ */}
      {selectedDomain && DOMAIN_DETAILS[selectedDomain] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          style={{ background: 'rgba(5, 7, 12, 0.88)', backdropFilter: 'blur(20px)' }}
          onClick={() => setSelectedDomain(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-[#0f121a] my-8 text-left"
            style={{ boxShadow: '0 30px 90px rgba(0,0,0,0.8), 0 0 50px rgba(217, 180, 130, 0.15)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Photo Header */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden">
              <img
                src={DOMAIN_DETAILS[selectedDomain].image}
                alt={selectedDomain}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f121a] via-[#0f121a]/60 to-transparent" />
              <button
                onClick={() => setSelectedDomain(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition border border-white/20 cursor-pointer z-10"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                    {DOMAIN_DETAILS[selectedDomain].badge}
                  </span>
                  <span className="text-[10px] font-mono text-amber-300/90 font-semibold">
                    {DOMAIN_DETAILS[selectedDomain].company}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  {DOMAIN_DETAILS[selectedDomain].productName}
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  {DOMAIN_DETAILS[selectedDomain].subtitle}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[68vh] overflow-y-auto">
              {/* Product & Domain Overview */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-2">
                  <Building2 size={13} className="text-amber-400" />
                  <span>Company Architecture & Product Overview</span>
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                  {DOMAIN_DETAILS[selectedDomain].overview}
                </p>
              </div>

              {/* Key Capabilities */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2.5 flex items-center gap-2">
                  <Sparkles size={13} className="text-cyan-400" />
                  <span>Core Capabilities & Workflow Features</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DOMAIN_DETAILS[selectedDomain].capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-200">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-2">
                  <Cpu size={13} className="text-slate-400" />
                  <span>Enterprise Security & Deployment Specs</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {Object.entries(DOMAIN_DETAILS[selectedDomain].technicalSpecs || {}).map(([key, val], i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{key}</p>
                      <p className="text-xs font-bold text-white mt-1">{val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Where to Find This Product */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-cyan-500/10 border border-amber-500/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold block mb-1">
                      Where to Find & Test This Product
                    </span>
                    <p className="text-xs text-slate-200">
                      Direct App Portal: <span className="text-cyan-300 font-mono font-bold">{DOMAIN_DETAILS[selectedDomain].siteUrl}</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Official Product URL: <span className="text-slate-300 underline font-mono">{DOMAIN_DETAILS[selectedDomain].webUrl}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const target = DOMAIN_DETAILS[selectedDomain].siteUrl;
                      setSelectedDomain(null);
                      navigate(target);
                    }}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#14110d] bg-gradient-to-r from-[#e6c89c] to-[#d9b482] hover:opacity-95 transition shadow-lg shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Launch in Portal</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

              {/* Interactive Sample Copilot Query */}
              <div className="p-4 rounded-2xl bg-[#141824] border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <Bot size={18} className="text-cyan-300" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-300 uppercase font-semibold">Test In AI Copilot</span>
                    <p className="text-xs text-slate-200 italic mt-0.5">"{DOMAIN_DETAILS[selectedDomain].sampleQuery}"</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const q = DOMAIN_DETAILS[selectedDomain].sampleQuery;
                    setSelectedDomain(null);
                    navigate(`/chat?q=${encodeURIComponent(q)}`);
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-cyan-200 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 shrink-0 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Ask Copilot Now</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#0a0c12] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400 font-mono">
                QueryCore Technologies Inc. · Grounded RAG Platform
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setSelectedDomain(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const target = DOMAIN_DETAILS[selectedDomain].siteUrl;
                    setSelectedDomain(null);
                    navigate(target);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Open Product Page</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <FloatingChatWidget />

      {/* Marquee keyframe injected globally */}
      <style>{`
        @keyframes marquee { from { transform:translateX(0) } to { transform:translateX(-50%) } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        .animate-float-slow   { animation: floatUp 7s ease-in-out infinite; }
        .animate-float-medium { animation: floatUp 5s ease-in-out infinite; }
        .animate-float-fast   { animation: floatUp 3.5s ease-in-out infinite; }
        @keyframes floatDown { 0%,100%{transform:translateY(0)} 50%{transform:translateY(14px)} }
        .animate-float-reverse { animation: floatDown 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
