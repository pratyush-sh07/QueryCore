import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import {
  FileText, Bot, ShieldCheck, TrendingUp,
  Activity, ArrowUpRight, Sparkles,
  Database, CheckCircle2, Zap, BarChart3, Users,
  Globe, ArrowRight, RefreshCw, Cpu, Lock,
  Image as ImageIcon, X, FolderOpen, ExternalLink
} from 'lucide-react';

/* ─── Animated counter hook ─── */
function useCountUp(target, duration = 1600, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start || typeof target !== 'number') return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return val;
}

/* ─── Mini sparkline generator ─── */
function Sparkline({ data, color = '#d9b482', height = 36 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120, h = height;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4)}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" style={{ overflow: 'visible' }}>
      <polyline points={pts} stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <circle
        cx={(data.length - 1) / (data.length - 1) * w}
        cy={h - ((data[data.length - 1] - min) / range) * (h - 4)}
        r="3"
        fill={color}
      />
    </svg>
  );
}

/* ─── Circular progress ring ─── */
function Ring({ pct, color, size = 64, stroke = 5, label }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} fill="none"/>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(.4,0,.2,1)' }}
        />
      </svg>
      {label && <span className="text-[10px] font-mono text-[#c4b5a3]">{label}</span>}
    </div>
  );
}

/* ─── Animated progress bar ─── */
function Bar({ pct, color, label, value }) {
  const [w, setW] = useState(0);
  useEffect(() => { setTimeout(() => setW(pct), 300); }, [pct]);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[11px]">
        <span className="text-[#c4b5a3]">{label}</span>
        <span className="font-mono font-bold" style={{ color }}>{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-black/40 overflow-hidden border border-white/5">
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width:`${w}%`, background: color }}/>
      </div>
    </div>
  );
}

/* ─── Live pulse dot ─── */
const LiveDot = ({ color = '#22c55e' }) => (
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: color }}/>
    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: color }}/>
  </span>
);

/* ─── Hover Photo Card Component ─── */
function InteractivePhotoCard({ normalImg, hoverImg, title, subtitle, dept, size = 'normal', onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-1.5 shadow-xl select-none"
      style={{
        border: hovered ? '1px solid rgba(217, 180, 130, 0.65)' : '1px solid rgba(217, 180, 130, 0.22)',
        background: 'rgba(20, 22, 30, 0.85)',
        height: size === 'tall' ? '280px' : '180px',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(217, 180, 130, 0.25)' : 'none',
      }}
    >
      {/* Normal Image */}
      <img
        src={normalImg}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
        style={{
          opacity: hovered ? 0 : 0.65,
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          filter: 'brightness(0.65) saturate(0.85) sepia(0.15)',
        }}
      />

      {/* Hover Image Crossfade */}
      <img
        src={hoverImg}
        alt={title + ' hover'}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
        style={{
          opacity: hovered ? 0.9 : 0,
          transform: hovered ? 'scale(1.06)' : 'scale(1.02)',
          filter: 'brightness(0.8) saturate(1.05)',
        }}
      />

      {/* Warm beige / dark vignette */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(16, 18, 25, 0.95) 0%, rgba(217, 180, 130, 0.2) 60%, transparent 100%)'
            : 'linear-gradient(to top, rgba(16, 18, 25, 0.88) 0%, transparent 70%)',
        }}
      />

      {/* Badge tag */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-md font-bold transition-all"
          style={{
            background: hovered ? 'rgba(217, 180, 130, 0.9)' : 'rgba(16, 18, 25, 0.8)',
            color: hovered ? '#12151f' : '#eedfc8',
            border: '1px solid rgba(217, 180, 130, 0.35)',
          }}
        >
          {dept}
        </span>
      </div>

      {/* Click for Info Hint */}
      <div className="absolute top-3 right-3 z-10">
        <span
          className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-black/60 text-[#ffdca8] border border-[#d9b482]/40 transition-opacity"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          Click to View Hub →
        </span>
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-3 left-3.5 right-3.5 z-10 transition-transform duration-300">
        <h4 className="text-sm font-bold text-[#faf6ef] tracking-tight group-hover:text-[#ffdca8] transition-colors">
          {title}
        </h4>
        <p className="text-[11px] text-[#c4b5a3] line-clamp-1 mt-0.5">{subtitle}</p>

        <div
          className="flex items-center gap-1.5 mt-2 text-[10px] font-semibold text-[#ffdca8] overflow-hidden transition-all duration-300"
          style={{ maxHeight: hovered ? '20px' : '0px', opacity: hovered ? 1 : 0 }}
        >
          <span>Explore Knowledge Vector Hub</span>
          <ArrowRight size={11} className="text-[#d9b482]" />
        </div>
      </div>
    </div>
  );
}

/* ─── Mock datasets ─── */
const SPARK = {
  docs:     [4, 5, 6, 5, 7, 8, 9, 8, 10, 11, 12, 13, 14],
  queries:  [320, 410, 390, 580, 620, 710, 680, 820, 910, 1020, 1180, 1320, 1428],
  accuracy: [98.1, 98.4, 98.9, 99.1, 99.2, 99.4, 99.5, 99.6, 99.7, 99.8, 99.8, 99.9, 99.8],
  users:    [310, 380, 420, 510, 580, 640, 690, 730, 775, 800, 820, 837, 847],
};

const DEPT_COLORS = {
  Legal: '#f59e0b', Engineering: '#38bdf8', HR: '#c084fc', Sales: '#34d399', Finance: '#fbbf24',
};

const ACTIVITIES = [
  { action:'Knowledge Base Ingestion',    doc:'Enterprise AI Security & Compliance Policy 2026', dept:'Legal',       time:'2m ago',  status:'Indexed',  icon: Database },
  { action:'Copilot Query Answered',       doc:'AWS EKS Deployment & Helm Chart Standards',       dept:'Engineering', time:'18m ago', status:'Grounded', icon: Bot },
  { action:'Policy Document Updated',      doc:'Employee Onboarding & Benefits Handbook 2026',    dept:'HR',          time:'1h ago',  status:'Indexed',  icon: FileText },
  { action:'Sales Collateral Indexed',     doc:'Q4 Enterprise Sales Playbook & Pricing Tiers',    dept:'Sales',       time:'3h ago',  status:'Indexed',  icon: FileText },
  { action:'Compliance Audit Completed',   doc:'SOC-2 Type II Audit Report — Tenant Isolation',   dept:'Legal',       time:'5h ago',  status:'Verified', icon: ShieldCheck },
];

const DEPT_USAGE = [
  { dept:'Engineering', queries: 540, pct: 85,  color:'#38bdf8' },
  { dept:'HR',          queries: 312, pct: 62,  color:'#c084fc' },
  { dept:'Legal',       queries: 298, pct: 58,  color:'#f59e0b' },
  { dept:'Sales',       queries: 278, pct: 54,  color:'#34d399' },
];

// Interactive department photo showcase
const DEPARTMENT_GALLERY = [
  {
    id: 'legal',
    title: 'Legal & Risk Compliance',
    subtitle: 'GDPR, SOC-2 Mandates & Contracts',
    dept: 'Legal Core',
    deptFilter: 'Legal',
    normalImg: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=700&q=80',
    hoverImg: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=700&q=80',
    overview: 'Cryptographically verified institutional repository holding regulatory compliance guidelines, confidentiality agreements, data processing addendums (DPAs), and SOC-2 Type II audit reports.',
    stats: { docs: '128 Files', vectors: '2.4M Embeddings', accuracy: '99.9% Grounded', latency: '210ms' },
    keyDocs: [
      'Enterprise AI Security & Compliance Policy 2026.pdf',
      'SOC-2 Type II Audit Report — Tenant Isolation.pdf',
      'GDPR Data Processing & Privacy Addendum.pdf'
    ],
    sampleQuery: 'What are our SOC-2 and AI compliance policies regarding LLM training data?',
    color: '#f59e0b'
  },
  {
    id: 'engineering',
    title: 'Cloud Systems Architecture',
    subtitle: 'Kubernetes, microservices & telemetry',
    dept: 'Engineering',
    deptFilter: 'Engineering',
    normalImg: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=700&q=80',
    hoverImg: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=700&q=80',
    overview: 'High-density technical repository covering microservices topology, AWS EKS cluster deployment Helm charts, mTLS security protocols, and CI/CD pipelines.',
    stats: { docs: '342 Files', vectors: '8.1M Embeddings', accuracy: '99.8% Grounded', latency: '190ms' },
    keyDocs: [
      'AWS EKS Deployment & Helm Chart Standards.pdf',
      'Microservices Cloud Architecture & mTLS Tokens.pdf',
      'Automated CI/CD Pipeline & Test Coverage Mandates.pdf'
    ],
    sampleQuery: 'What are the microservices deployment standards for AWS EKS?',
    color: '#38bdf8'
  },
  {
    id: 'hr',
    title: 'Workforce Onboarding',
    subtitle: 'Annual benefits, PTO and culture manual',
    dept: 'Human Resources',
    deptFilter: 'HR',
    normalImg: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80',
    hoverImg: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=700&q=80',
    overview: 'People operations knowledge base containing employee handbooks, PTO guidelines, 401(k) matching policies, annual wellness stipends, and remote workplace guidelines.',
    stats: { docs: '84 Files', vectors: '1.2M Embeddings', accuracy: '99.9% Grounded', latency: '180ms' },
    keyDocs: [
      'Employee Onboarding & Benefits Handbook 2026.pdf',
      'Annual PTO & Paid Leave Allowance Schedule.pdf',
      'Health, Vision & Dental Coverage Matrix.pdf'
    ],
    sampleQuery: 'What are the annual employee benefits, PTO allowances, and wellness stipends?',
    color: '#c084fc'
  },
  {
    id: 'sales',
    title: 'Global Revenue Strategy',
    subtitle: 'Pricing models & enterprise playbook',
    dept: 'Sales & Growth',
    deptFilter: 'Sales',
    normalImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80',
    hoverImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80',
    overview: 'Commercial intelligence vector store detailing enterprise SaaS licensing ($45/user/month), volume discount schedules, executive escalation protocols, and sales playbooks.',
    stats: { docs: '196 Files', vectors: '3.6M Embeddings', accuracy: '99.7% Grounded', latency: '220ms' },
    keyDocs: [
      'Q4 Enterprise Sales Playbook & Pricing Tiers.pdf',
      'Enterprise SaaS Master Service Agreement.pdf',
      'Multi-Tenant SLA Contract & Dedicated VPC Pricing.pdf'
    ],
    sampleQuery: 'What is the enterprise pricing model, discount tiers, and subscription SLA?',
    color: '#34d399'
  }
];

/* ═════════════════════════════════════════════
   MAIN DASHBOARD COMPONENT
═════════════════════════════════════════════ */
export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [docCount, setDocCount] = useState(14);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [liveTime, setLiveTime] = useState(new Date());
  const [pingMs, setPingMs] = useState(247);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedHub, setSelectedHub] = useState(null);

  /* Count-up animations */
  const animDocs    = useCountUp(docCount, 1600, pageLoaded);
  const animQueries = useCountUp(1428,     2000, pageLoaded);
  const animUsers   = useCountUp(847,      1800, pageLoaded);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await client.get('/api/documents');
        const docs = Array.isArray(res.data) ? res.data : (res.data?.documents || []);
        if (docs.length > 0) setDocCount(docs.length);
        else {
          const local = localStorage.getItem('querycore_documents');
          if (local) setDocCount(JSON.parse(local).length);
        }
      } catch {
        const local = localStorage.getItem('querycore_documents');
        if (local) setDocCount(JSON.parse(local).length);
      }
    };
    fetchDocs();

    const t = setTimeout(() => setPageLoaded(true), 200);
    const clock = setInterval(() => setLiveTime(new Date()), 1000);
    const ping = setInterval(() => setPingMs(220 + Math.floor(Math.random() * 70)), 3000);

    return () => {
      clearTimeout(t);
      clearInterval(clock);
      clearInterval(ping);
    };
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const deptName = user?.department || 'Engineering';

  return (
    <div className="relative min-h-screen text-[#f7f2ea]">
      {/* Background full-bleed office photo with warm grading */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.16, filter: 'brightness(0.35) saturate(0.6) sepia(0.25)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 10%, rgba(217, 180, 130, 0.12) 0%, transparent 60%), linear-gradient(to bottom, rgba(16, 19, 26, 0.7) 0%, rgba(16, 19, 26, 0.98) 100%)',
          }}
        />
      </div>

      {/* Main dashboard content */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 space-y-7 max-w-7xl mx-auto">

        {/* ══════════════════════════════════════════
            HERO WELCOME BANNER — Warm Parchment & Gold
        ══════════════════════════════════════════ */}
        <div
          className="relative overflow-hidden rounded-[26px] p-6 md:p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(35, 30, 24, 0.85) 0%, rgba(25, 23, 20, 0.9) 60%, rgba(18, 20, 28, 0.92) 100%)',
            border: '1px solid rgba(217, 180, 130, 0.25)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(245, 230, 211, 0.15)',
          }}
        >
          {/* Background photograph inside hero banner */}
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ opacity: 0.12, filter: 'sepia(0.3) saturate(0.8)' }}
          />

          {/* Ambient warm glows */}
          <div
            className="absolute -top-16 -right-16 w-72 h-72 rounded-full blur-3xl pointer-events-none animate-pulse"
            style={{ background: 'rgba(217, 180, 130, 0.15)' }}
          />
          <div
            className="absolute -bottom-16 left-24 w-60 h-60 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(196, 151, 95, 0.12)' }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-[#f5e4cc]"
                  style={{ background: 'rgba(217, 180, 130, 0.15)', border: '1px solid rgba(217, 180, 130, 0.3)' }}
                >
                  <LiveDot color="#e6c89c" />
                  <Sparkles size={12} className="text-[#d9b482]" />
                  <span>QueryCore AI · Enterprise Suite</span>
                </div>
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono text-emerald-300"
                  style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)' }}
                >
                  <Zap size={10} /> {pingMs}ms latency
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold text-[#faf6ef] tracking-tight">
                Good {liveTime.getHours() < 12 ? 'morning' : liveTime.getHours() < 17 ? 'afternoon' : 'evening'},{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #f5e4cc, #d9b482, #eedfc8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {user?.fullName || 'Enterprise Leader'}
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-[#b8a692] max-w-2xl leading-relaxed">
                Your organizational intelligence copilot is synchronized with verified documents across{' '}
                <span className="text-[#f5e4cc] font-semibold">{deptName}</span> and all departments.
                Last synchronized: <span className="font-mono text-[#d9b482]">{liveTime.toLocaleTimeString()}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleRefresh}
                className="p-2.5 rounded-xl text-[#b8a692] hover:text-white transition hover:scale-110 cursor-pointer"
                style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(217, 180, 130, 0.2)' }}
                title="Refresh Metrics"
              >
                <RefreshCw size={15} className={refreshing ? 'animate-spin text-[#d9b482]' : ''} />
              </button>

              <Link
                to="/chat"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#14110d] flex items-center gap-2 hover:scale-105 transition shadow-lg"
                style={{
                  background: 'linear-gradient(90deg, #d9b482, #f5e4cc, #c4975f)',
                  boxShadow: '0 0 25px rgba(217, 180, 130, 0.35)',
                }}
              >
                <Bot size={15} /> Launch Copilot
              </Link>

              <Link
                to="/documents"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#eedfc8] flex items-center gap-2 hover:scale-105 hover:text-white transition"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(217, 180, 130, 0.25)',
                }}
              >
                <FileText size={15} className="text-[#d9b482]" /> Upload Doc
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            ANIMATED METRIC CARDS — Warm Luxury Aesthetic
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 — Documents */}
          <div
            className="rounded-2xl p-5 group hover:-translate-y-1.5 transition-all duration-300 cursor-default"
            style={{
              background: 'rgba(22, 24, 34, 0.82)',
              border: '1px solid rgba(217, 180, 130, 0.22)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[11px] font-mono text-[#b8a692] uppercase tracking-wider mb-0.5">Documents</p>
                <div className="text-3xl font-extrabold text-[#faf6ef] tabular-nums">{animDocs.toLocaleString()}</div>
              </div>
              <div
                className="p-2.5 rounded-xl"
                style={{ background: 'rgba(217, 180, 130, 0.12)', border: '1px solid rgba(217, 180, 130, 0.3)' }}
              >
                <Database size={18} className="text-[#d9b482]" />
              </div>
            </div>
            <Sparkline data={SPARK.docs} color="#d9b482" />
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400">
              <TrendingUp size={11} /> +14% this week
            </div>
          </div>

          {/* Card 2 — Queries */}
          <div
            className="rounded-2xl p-5 group hover:-translate-y-1.5 transition-all duration-300 cursor-default"
            style={{
              background: 'rgba(22, 24, 34, 0.82)',
              border: '1px solid rgba(192, 132, 252, 0.22)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[11px] font-mono text-[#b8a692] uppercase tracking-wider mb-0.5">Copilot Queries</p>
                <div className="text-3xl font-extrabold text-[#faf6ef] tabular-nums">{animQueries.toLocaleString()}</div>
              </div>
              <div
                className="p-2.5 rounded-xl"
                style={{ background: 'rgba(192, 132, 252, 0.12)', border: '1px solid rgba(192, 132, 252, 0.3)' }}
              >
                <Bot size={18} className="text-purple-300" />
              </div>
            </div>
            <Sparkline data={SPARK.queries} color="#c084fc" />
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400">
              <TrendingUp size={11} /> +24% today
            </div>
          </div>

          {/* Card 3 — Accuracy */}
          <div
            className="rounded-2xl p-5 group hover:-translate-y-1.5 transition-all duration-300 cursor-default"
            style={{
              background: 'rgba(22, 24, 34, 0.82)',
              border: '1px solid rgba(52, 211, 153, 0.22)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[11px] font-mono text-[#b8a692] uppercase tracking-wider mb-0.5">Grounding Accuracy</p>
                <div className="text-3xl font-extrabold text-[#faf6ef]">99.8%</div>
              </div>
              <Ring pct={99.8} color="#34d399" size={52} stroke={4} />
            </div>
            <Sparkline data={SPARK.accuracy} color="#34d399" height={32} />
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400">
              <ShieldCheck size={11} /> Zero hallucinations
            </div>
          </div>

          {/* Card 4 — Active users */}
          <div
            className="rounded-2xl p-5 group hover:-translate-y-1.5 transition-all duration-300 cursor-default"
            style={{
              background: 'rgba(22, 24, 34, 0.82)',
              border: '1px solid rgba(245, 158, 11, 0.22)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[11px] font-mono text-[#b8a692] uppercase tracking-wider mb-0.5">Active Users</p>
                <div className="text-3xl font-extrabold text-[#faf6ef] tabular-nums">{animUsers.toLocaleString()}</div>
              </div>
              <div
                className="p-2.5 rounded-xl"
                style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)' }}
              >
                <Users size={18} className="text-amber-400" />
              </div>
            </div>
            <Sparkline data={SPARK.users} color="#f59e0b" />
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400">
              <TrendingUp size={11} /> +9% this month
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            HOVER PHOTO GALLERY — Department Vector Bases
        ══════════════════════════════════════════ */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ImageIcon size={16} className="text-[#d9b482]" />
              <h2 className="text-sm font-bold text-[#faf6ef] tracking-tight">
                Enterprise Knowledge Hubs
              </h2>
              <span className="text-[10px] font-mono text-[#b8a692] hidden sm:inline">
                (Hover over photos to reveal active vector views)
              </span>
            </div>
            <Link
              to="/documents"
              className="text-xs font-semibold text-[#d9b482] hover:text-[#fff0dc] flex items-center gap-1 transition"
            >
              <span>Explore All</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEPARTMENT_GALLERY.map((card, idx) => (
              <InteractivePhotoCard
                key={idx}
                title={card.title}
                subtitle={card.subtitle}
                dept={card.dept}
                normalImg={card.normalImg}
                hoverImg={card.hoverImg}
                onClick={() => setSelectedHub(card)}
              />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            MIDDLE ROW — Activity Feed + Dept Usage + System
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Live Activity Feed */}
          <div
            className="lg:col-span-2 rounded-2xl p-5"
            style={{
              background: 'rgba(22, 24, 34, 0.82)',
              border: '1px solid rgba(217, 180, 130, 0.16)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-[#d9b482]" />
                <h2 className="text-sm font-bold text-[#faf6ef]">Live Synchronization Feed</h2>
                <LiveDot color="#34d399" />
              </div>
              <Link to="/documents" className="text-[11px] font-semibold text-[#d9b482] hover:text-[#fff0dc] flex items-center gap-1 transition">
                View All <ArrowUpRight size={12}/>
              </Link>
            </div>

            <div className="space-y-2.5">
              {ACTIVITIES.map((item, idx) => {
                const Icon = item.icon;
                const deptColor = DEPT_COLORS[item.dept] || '#c4b5a3';
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.01] hover:bg-white/[0.04] cursor-default group"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${deptColor}18`, border: `1px solid ${deptColor}35` }}
                    >
                      <Icon size={14} style={{ color: deptColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#faf6ef] truncate">{item.doc}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-[#8c7b69]">{item.action}</span>
                        <span className="text-[#594d40]">·</span>
                        <span className="text-[10px] font-semibold" style={{ color: deptColor }}>{item.dept}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-semibold"
                        style={{
                          background: item.status === 'Grounded' ? 'rgba(217, 180, 130, 0.15)' : 'rgba(52, 211, 153, 0.15)',
                          color: item.status === 'Grounded' ? '#eedfc8' : '#6ee7b7',
                          border: item.status === 'Grounded' ? '1px solid rgba(217, 180, 130, 0.35)' : '1px solid rgba(52, 211, 153, 0.35)',
                        }}
                      >
                        {item.status}
                      </span>
                      <span className="text-[10px] text-[#8c7b69] font-mono hidden sm:block">{item.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column — Department Usage & Status */}
          <div className="space-y-4">
            {/* Department Usage */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'rgba(22, 24, 34, 0.82)',
                border: '1px solid rgba(217, 180, 130, 0.16)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 size={15} className="text-[#d9b482]" />
                <h2 className="text-sm font-bold text-[#faf6ef]">Department Usage</h2>
              </div>
              <div className="space-y-3.5">
                {DEPT_USAGE.map((d, i) => (
                  <Bar key={i} pct={d.pct} color={d.color} label={d.dept} value={`${d.queries} q/day`} />
                ))}
              </div>
            </div>

            {/* System Status */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'rgba(22, 24, 34, 0.82)',
                border: '1px solid rgba(217, 180, 130, 0.16)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Globe size={15} className="text-emerald-400" />
                <h2 className="text-sm font-bold text-[#faf6ef]">System Health</h2>
                <LiveDot color="#34d399" />
              </div>
              <div className="space-y-2.5">
                {[
                  { label:'RAG Engine',      status:'Operational', color:'#34d399' },
                  { label:'Vector Store',    status:'Operational', color:'#34d399' },
                  { label:'Gemini 2.0 API',  status:'Operational', color:'#34d399' },
                  { label:'Auth Service',    status:'Operational', color:'#34d399' },
                  { label:'Doc Ingestion',   status:`${pingMs}ms`,  color:'#d9b482' },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs py-1.5 border-b last:border-0"
                    style={{ borderColor: 'rgba(255, 255, 255, 0.04)' }}
                  >
                    <span className="text-[#b8a692]">{s.label}</span>
                    <span className="font-mono font-semibold flex items-center gap-1.5" style={{ color: s.color }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            BOTTOM ROW — Security + Quick Actions + RAG Rings
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* AI Guardrails */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: 'rgba(22, 24, 34, 0.82)',
              border: '1px solid rgba(52, 211, 153, 0.18)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck size={16} className="text-emerald-400" />
              <h2 className="text-sm font-bold text-[#faf6ef]">Enterprise AI Guardrails</h2>
            </div>
            <div className="space-y-2.5">
              {[
                { title:'Zero External Training',  desc:'Queries isolated in private tenant space' },
                { title:'Strict Source Citations', desc:'Every response includes exact doc badges' },
                { title:'RBAC Dept Scoping',       desc:'HR, Eng, Legal, Sales — fully isolated' },
                { title:'SOC-2 Type II Compliant', desc:'Cryptographic tenant data isolation' },
                { title:'JWT Token Expiry',        desc:'Auto-revoked every 24h for security' },
              ].map((g, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl"
                  style={{ background: 'rgba(52, 211, 153, 0.04)', border: '1px solid rgba(52, 211, 153, 0.12)' }}
                >
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-[#faf6ef]">{g.title}</p>
                    <p className="text-[10px] text-[#8c7b69] mt-0.5">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: 'rgba(22, 24, 34, 0.82)',
              border: '1px solid rgba(217, 180, 130, 0.16)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Zap size={15} className="text-[#d9b482]" />
              <h2 className="text-sm font-bold text-[#faf6ef]">Quick Workspace Actions</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { to:'/chat',      icon: Bot,       label:'Ask Copilot', color:'#d9b482', bg:'rgba(217, 180, 130, 0.12)' },
                { to:'/documents', icon: FileText,   label:'Upload Doc',  color:'#38bdf8', bg:'rgba(56, 189, 248, 0.12)' },
                { to:'/documents', icon: Database,   label:'Knowledge',   color:'#c084fc', bg:'rgba(192, 132, 252, 0.12)' },
                { to:'/profile',   icon: Lock,       label:'My Profile',  color:'#34d399', bg:'rgba(52, 211, 153, 0.12)' },
              ].map((a, i) => {
                const Icon = a.icon;
                return (
                  <Link
                    key={i}
                    to={a.to}
                    className="flex flex-col items-center gap-2.5 p-4 rounded-xl transition-all hover:-translate-y-1 hover:scale-105"
                    style={{ background: a.bg, border: `1px solid ${a.color}35` }}
                  >
                    <div className="p-2.5 rounded-xl" style={{ background: `${a.color}22` }}>
                      <Icon size={18} style={{ color: a.color }} />
                    </div>
                    <span className="text-[11px] font-semibold text-[#f5e4cc]">{a.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mini chart */}
            <div className="mt-5 pt-4 border-t" style={{ borderColor: 'rgba(217, 180, 130, 0.12)' }}>
              <p className="text-[10px] font-mono text-[#b8a692] mb-2 uppercase tracking-wider">Today's Query Volume</p>
              <Sparkline data={[80, 120, 95, 180, 220, 190, 260, 310, 280, 340, 390, 420, 460]} color="#d9b482" height={40}/>
            </div>
          </div>

          {/* Performance Rings */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: 'rgba(22, 24, 34, 0.82)',
              border: '1px solid rgba(217, 180, 130, 0.16)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Cpu size={15} className="text-[#d9b482]" />
              <h2 className="text-sm font-bold text-[#faf6ef]">RAG Performance</h2>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { pct:99.8, color:'#34d399', label:'Accuracy' },
                { pct:97,   color:'#d9b482', label:'Uptime' },
                { pct:88,   color:'#38bdf8', label:'Retrieval' },
              ].map((r, i) => (
                <Ring key={i} pct={pageLoaded ? r.pct : 0} color={r.color} size={64} stroke={5} label={r.label}/>
              ))}
            </div>

            <div className="space-y-2.5">
              <Bar pct={pageLoaded ? 82 : 0} color="#d9b482" label="P50 Latency" value="247ms"/>
              <Bar pct={pageLoaded ? 61 : 0} color="#38bdf8" label="P95 Latency" value="380ms"/>
              <Bar pct={pageLoaded ? 45 : 0} color="#c084fc" label="Token Usage"  value="68% budget"/>
            </div>

            <div
              className="mt-4 pt-4 border-t flex items-center justify-between text-[11px]"
              style={{ borderColor: 'rgba(217, 180, 130, 0.12)' }}
            >
              <span className="text-[#8c7b69] font-mono">Model: Gemini 2.0 Flash</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <LiveDot color="#34d399" /> Operational
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════
          KNOWLEDGE VECTOR HUB MODAL
      ══════════════════════════════════════════ */}
      {selectedHub && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          style={{ background: 'rgba(5, 7, 12, 0.88)', backdropFilter: 'blur(20px)' }}
          onClick={() => setSelectedHub(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-[#0f121a] my-8 text-left"
            style={{ boxShadow: '0 30px 90px rgba(0,0,0,0.8), 0 0 50px rgba(217, 180, 130, 0.15)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Photo Header */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden">
              <img
                src={selectedHub.normalImg}
                alt={selectedHub.title}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.55) saturate(1.1)' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, #0f121a 0%, rgba(15, 18, 26, 0.4) 60%, transparent 100%)' }}
              />

              <button
                type="button"
                onClick={() => setSelectedHub(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white transition cursor-pointer border border-white/10"
              >
                <X size={16} />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span
                  className="inline-block text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-2"
                  style={{ background: 'rgba(217, 180, 130, 0.25)', color: '#ffdca8', border: '1px solid rgba(217, 180, 130, 0.4)' }}
                >
                  {selectedHub.dept} · Vector Knowledge Base
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {selectedHub.title}
                </h3>
                <p className="text-xs text-amber-200/80 mt-0.5">{selectedHub.subtitle}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs text-slate-300">
              <p className="text-slate-300 leading-relaxed text-sm">
                {selectedHub.overview}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">Indexed Files</span>
                  <span className="text-sm font-bold text-white mt-0.5 block">{selectedHub.stats.docs}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">Vector Chunks</span>
                  <span className="text-sm font-bold text-cyan-300 mt-0.5 block">{selectedHub.stats.vectors}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">RAG Precision</span>
                  <span className="text-sm font-bold text-emerald-400 mt-0.5 block">{selectedHub.stats.accuracy}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">Query Latency</span>
                  <span className="text-sm font-bold text-amber-300 mt-0.5 block">{selectedHub.stats.latency}</span>
                </div>
              </div>

              {/* Verified Key Documents */}
              <div>
                <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                  <FileText size={12} />
                  <span>Grounding Source Documents in this Vector Hub</span>
                </h4>
                <div className="space-y-1.5">
                  {selectedHub.keyDocs.map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs"
                    >
                      <div className="flex items-center gap-2 text-slate-200 font-mono text-[11px]">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        <span className="truncate">{doc}</span>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 shrink-0">
                        Verified RAG
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Grounded Query */}
              <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
                  Sample Grounded Query:
                </span>
                <p className="text-xs text-amber-100 font-medium italic">
                  "{selectedHub.sampleQuery}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setSelectedHub(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const dept = selectedHub.deptFilter;
                    setSelectedHub(null);
                    navigate(`/documents?dept=${dept}`);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <FolderOpen size={13} />
                  <span>Browse {selectedHub.deptFilter} Vault</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const q = selectedHub.sampleQuery;
                    setSelectedHub(null);
                    navigate(`/chat?q=${encodeURIComponent(q)}`);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-[#14110d] transition shadow-lg flex items-center gap-1.5 cursor-pointer hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #f5e4cc, #d9b482)' }}
                >
                  <Bot size={13} />
                  <span>Ask Copilot Now</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
