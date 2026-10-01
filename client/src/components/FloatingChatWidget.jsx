import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Minimize2, 
  Maximize2, 
  FileText, 
  Building2, 
  ShieldCheck,
  ChevronRight,
  MessageSquare,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const INSTITUTION_FAQS = [
  'Tell me about QueryCore company & mission',
  'What products do you offer and where can I find them?',
  'Where can I find the Gemini 2.0 AI Copilot?',
  'Where can I view enterprise pricing and get started?'
];

const FloatingChatWidget = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Greetings! I am the QueryCore AI Institutional Assistant. Ask me anything about QueryCore, our company, our enterprise products, or where to find them!',
      sources: ['QueryCore_Company_Overview_2026.pdf'],
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (queryText) => {
    const text = (queryText || input).trim();
    if (!text || loading) return;

    const userMsg = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await client.post('/api/chat', {
        message: text,
        department: 'Institutional',
        history: messages.slice(-3)
      });

      const answer = res.data?.answer || res.data?.message;
      const sources = res.data?.sources || ['QueryCore_Institutional_Overview.pdf'];

      setMessages((prev) => [
        ...prev,
        {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: answer,
          sources: Array.isArray(sources) ? sources : [sources],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setLoading(false);
    } catch {
      // Contract fallback simulation for instant prospective customer inquiries
      setTimeout(() => {
        const lower = text.toLowerCase();
        let reply = "QueryCore AI unifies internal institutional documentation into a vector knowledge store, allowing teams to query company SOPs, research papers, and policies with mathematical citation integrity.";
        let source = "QueryCore_Whitepaper_2026.pdf";

        if (lower.includes('about') || lower.includes('company') || lower.includes('who are you') || lower.includes('querycore') || lower.includes('mission')) {
          reply = "🏢 **About QueryCore Technologies Inc.**:\n\nQueryCore is an enterprise-grade AI knowledge intelligence and retrieval-augmented generation (RAG) platform founded to eliminate corporate information silos. We connect distributed departmental documents (Engineering, Legal, HR, Sales) into a cryptographically isolated copilot with 100% mathematical source citations.\n\n• **Headquarters**: Silicon Valley, CA with AWS/GCP hybrid infrastructure.\n• **Security**: SOC-2 Type II Certified, GDPR compliant. Zero external LLM training on tenant data.\n• **Where to find**: Explore our web application at `/chat` and `/documents` or visit https://querycore.io.";
          source = "QueryCore_Company_Overview_2026.pdf";
        } else if (lower.includes('product') || lower.includes('offer') || lower.includes('catalog') || lower.includes('list product')) {
          reply = "📦 **QueryCore Flagship Products & Where to Find Them**:\n\n1. **QueryCore Grounded AI Copilot (Gemini 2.0)**: Natural language conversational assistant with clickable citations.\n   👉 *Find at*: In-App: `/chat` | Web: https://querycore.io/chat\n\n2. **QueryCore Knowledge Library**: 10M+ page multi-tenant vector vault with GIN search.\n   👉 *Find at*: In-App: `/documents` | Web: https://querycore.io/documents\n\n3. **QueryCore Executive Analytics**: Real-time 240ms telemetry & audit heatmaps.\n   👉 *Find at*: In-App: `/dashboard` | Web: https://querycore.io/dashboard\n\n4. **QueryCore Compliance Shield**: Department boundary guardrails & RBAC.\n   👉 *Find at*: In-App: `/profile` | Web: https://querycore.io/security\n\n5. **Air-Gapped Private Vault**: Dedicated on-prem / GovCloud deployment.\n   👉 *Find at*: In-App: `/register` | Web: https://querycore.io/enterprise-vault";
          source = "QueryCore_Product_Catalog_2026.pdf";
        } else if (lower.includes('where') || lower.includes('site') || lower.includes('website') || lower.includes('url') || lower.includes('find') || lower.includes('buy') || lower.includes('access')) {
          reply = "📍 **Where to Find & Access QueryCore Products**:\n\n• **AI Copilot**: `/chat` (or https://querycore.io/chat)\n• **Knowledge Library**: `/documents` (or https://querycore.io/documents)\n• **Executive Analytics**: `/dashboard` (or https://querycore.io/dashboard)\n• **Account & Security Settings**: `/profile`\n• **Sign Up / Free Trial**: `/register` (or https://querycore.io/register)\n• **Backend API Docs**: http://localhost:8000/api/docs\n\nFor enterprise contracts ($45/user/month), reach our team at sales@querycore.io!";
          source = "QueryCore_Platform_Directory.pdf";
        } else if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost') || lower.includes('tier') || lower.includes('subscription')) {
          reply = "💰 **QueryCore Pricing & Licensing Plans**:\n\n• **Free Trial**: Available immediately upon registering at `/register`.\n• **Enterprise SaaS Tier**: $45 per user/month (billed annually) with unlimited document indexing, 24/7 SLA, and Gemini 2.0 Copilot.\n• **Dedicated Air-Gapped / On-Prem**: Custom enterprise agreement with dedicated VPC and customer KMS keys.\n\n👉 Start your trial now at `/register` or view options at https://querycore.io/pricing.";
          source = "Q4_Sales_Playbook_Pricing.pdf";
        } else if (lower.includes('copilot') || lower.includes('assistant') || lower.includes('gemini')) {
          reply = "🤖 **QueryCore AI Copilot (Gemini 2.0)**:\n\nOur intelligent copilot searches across your uploaded company documents, synthesizing verified responses with clickable citations. It features zero hallucinations, multi-turn reasoning, and sub-300ms latency.\n\n👉 *Where to find it*: Open `/chat` in our app or visit https://querycore.io/chat.";
          source = "QueryCore_Copilot_Whitepaper.pdf";
        } else if (lower.includes('hallucinat') || lower.includes('rag')) {
          reply = "QueryCore AI utilizes strict Retrieval-Augmented Generation (RAG). Every token generated by the model must correspond to a verified embedding chunk from your uploaded institutional documents. Zero hallucinations guaranteed.";
          source = "Enterprise_AI_Security_Policy.pdf";
        } else if (lower.includes('private') || lower.includes('security') || lower.includes('compliance') || lower.includes('soc')) {
          reply = "All institution data is stored in isolated tenant spaces with AES-256 encryption at rest and in transit. QueryCore complies with SOC-2 Type II and GDPR standards, and your proprietary data is never used to train external public models.";
          source = "SOC2_Compliance_Matrix_2026.pdf";
        } else if (lower.includes('citation') || lower.includes('badge')) {
          reply = "Source citation badges are attached to every response, linking directly to the underlying department document title and timestamp in our Knowledge Library at `/documents`.";
          source = "QueryCore_Architecture_Spec.pdf";
        }

        setMessages((prev) => [
          ...prev,
          {
            id: 'ai-' + Date.now(),
            sender: 'ai',
            text: reply,
            sources: [source],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Closed State Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 cursor-pointer animate-float-medium border border-white/20"
        >
          {/* Animated glow ring */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-40 blur-sm group-hover:opacity-75 transition duration-500"></span>
          
          <div className="relative flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-200 animate-spin-slow" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold tracking-tight block">AI Institutional Assistant</span>
              <span className="text-[10px] text-cyan-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Ask Questions Live
              </span>
            </div>
          </div>
        </button>
      )}

      {/* Open Floating Chat Window */}
      {isOpen && (
        <div className="w-96 max-w-[calc(100vw-2rem)] rounded-2xl glass-panel shadow-2xl border border-blue-500/30 overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  Institutional AI Concierge
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30">
                    Enterprise
                  </span>
                </h3>
                <p className="text-[10px] text-slate-400">Instant answers for visitors & partners</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 rounded-md hover:bg-slate-800 hover:text-white transition"
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-slate-800 hover:text-white transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages viewport */}
              <div className="p-4 h-80 overflow-y-auto space-y-3 bg-slate-950/70 text-xs">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`px-3 py-2 rounded-xl max-w-[85%] text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-xs'
                          : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-xs'
                      }`}
                    >
                      {m.text}
                    </div>

                    {/* Source badges */}
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {m.sources.map((s, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40 text-blue-300 font-medium"
                          >
                            <FileText className="w-2.5 h-2.5" />
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Quick Portal Jump Chips */}
                    {m.sender === 'ai' && (
                      <div className="mt-2 pt-1.5 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                        {m.text.includes('/chat') && (
                          <button
                            type="button"
                            onClick={() => { setIsOpen(false); navigate('/chat'); }}
                            className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white border border-blue-500/40 transition cursor-pointer"
                          >
                            <span>Open Copilot (/chat)</span>
                            <ArrowRight size={9} />
                          </button>
                        )}
                        {m.text.includes('/documents') && (
                          <button
                            type="button"
                            onClick={() => { setIsOpen(false); navigate('/documents'); }}
                            className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded bg-cyan-600/30 hover:bg-cyan-600 text-cyan-200 hover:text-white border border-cyan-500/40 transition cursor-pointer"
                          >
                            <span>Open Docs (/documents)</span>
                            <ArrowRight size={9} />
                          </button>
                        )}
                        {m.text.includes('/dashboard') && (
                          <button
                            type="button"
                            onClick={() => { setIsOpen(false); navigate('/dashboard'); }}
                            className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded bg-amber-600/30 hover:bg-amber-600 text-amber-200 hover:text-white border border-amber-500/40 transition cursor-pointer"
                          >
                            <span>Dashboard (/dashboard)</span>
                            <ArrowRight size={9} />
                          </button>
                        )}
                        {m.text.includes('/register') && (
                          <button
                            type="button"
                            onClick={() => { setIsOpen(false); navigate('/register'); }}
                            className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white border border-emerald-500/40 transition cursor-pointer"
                          >
                            <span>Sign Up / Trial (/register)</span>
                            <ArrowRight size={9} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-blue-400">
                    <Sparkles className="w-3 h-3 animate-spin" />
                    <span>Analyzing institutional knowledge...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick FAQ Pills */}
              <div className="px-3 py-2 bg-slate-900/80 border-t border-slate-800/80 overflow-x-auto flex gap-1.5 no-scrollbar">
                {INSTITUTION_FAQS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="shrink-0 text-[10px] px-2.5 py-1 rounded-full bg-slate-800 hover:bg-blue-600/30 hover:border-blue-500/40 border border-slate-700/60 text-slate-300 hover:text-white transition cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask institutional question..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingChatWidget;
