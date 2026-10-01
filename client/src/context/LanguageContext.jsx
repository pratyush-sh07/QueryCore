import React, { createContext, useContext, useState, useEffect } from 'react';

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' }
];

export const TRANSLATIONS = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.knowledge': 'Knowledge Base',
    'nav.copilot': 'AI Copilot',
    'nav.profile': 'Profile & Security',
    'nav.signIn': 'Sign In',
    'nav.getStarted': 'Get Started',
    'nav.dept': 'Dept',
    'nav.operational': 'All Systems Operational',
    'nav.platform': 'Platform',
    'nav.products': 'Products',
    'nav.liveDemo': 'Live Demo',
    'nav.enterprise': 'Enterprise',

    // Hero Section
    'hero.badge': 'ENTERPRISE AI · GEMINI 2.0 RAG ENGINE · LIVE',
    'hero.title1': "Your company's memory,",
    'hero.title2': 'finally searchable.',
    'hero.desc': 'QueryCore AI turns siloed HR manuals, legal policies, and architecture docs into one verified copilot.',
    'hero.sourceNote': 'Every answer cites its exact source.',
    'hero.engageBtn': 'Engage AI Copilot',
    'hero.tourBtn': 'Watch Platform Tour',
    'hero.statRAG': 'Sub-300ms RAG',
    'hero.statSOC': 'SOC-2 Type II',
    'hero.statRBAC': 'RBAC Multi-Tenant',
    'hero.statZeroHalluc': 'Zero Hallucinations',
    'hero.statClients': '100+ Enterprises',

    // Features & Modals
    'features.tag': 'Platform Features & Domain Knowledge',
    'features.title': 'Hover & Click to explore each domain',
    'features.subtitle': 'Click any domain to inspect product specifications, company architecture, and live portal links.',
    'features.clickHint': 'Click for info',
    'features.viewSpecs': 'View specs, company & where to find →',

    // Copilot Chat
    'chat.title': 'Ask anything across your enterprise corpus',
    'chat.subtitle': 'Powered by Gemini 2.0 and high-density semantic vector search. Every answer includes verified document citation badges.',
    'chat.placeholder': 'Ask a question about HR, legal, sales or architecture docs...',
    'chat.askBtn': 'Ask',
    'chat.thinking': 'Thinking...',
    'chat.synthesizing': 'Synthesizing grounded response from vector store...',
    'chat.scope': 'Scope',
    'chat.allDepts': 'All Departments',
    'chat.zeroHalluc': 'Zero Hallucination',
    'chat.verifiedCitations': 'Verified Citations',
    'chat.clearHistory': 'Clear conversation history?',
    'chat.securityNote': 'QueryCore AI synthesizes answers only from verified company documents. Zero external data exposure.',

    // Dashboard Hubs
    'dash.hubsTitle': 'Enterprise Knowledge Hubs',
    'dash.hubsSubtitle': '(Hover over photos to reveal active vector views)',
    'dash.exploreAll': 'Explore All',
    'dash.viewHub': 'Click to View Hub →',
    'dash.browseVault': 'Browse Vault',
    'dash.askCopilot': 'Ask Copilot Now',
    'dash.indexedFiles': 'Indexed Files',
    'dash.vectorChunks': 'Vector Chunks',
    'dash.precision': 'RAG Precision',
    'dash.latency': 'Query Latency',

    // Floating Widget
    'widget.title': 'AI Institutional Assistant',
    'widget.live': 'Ask Questions Live',
    'widget.header': 'Institutional AI Concierge',
    'widget.welcome': 'Greetings! I am the QueryCore AI Institutional Assistant. Ask me anything about QueryCore, global enterprise companies, products, or where to find them!',
    'widget.inputPlaceholder': 'Ask institutional question...',
    'widget.analyzing': 'Analyzing institutional knowledge...'
  },

  hi: {
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.knowledge': 'ज्ञान भंडार',
    'nav.copilot': 'एआई कोपायलट',
    'nav.profile': 'प्रोफ़ाइल एवं सुरक्षा',
    'nav.signIn': 'साइन इन करें',
    'nav.getStarted': 'शुरू करें',
    'nav.dept': 'विभाग',
    'nav.operational': 'सभी प्रणालियाँ चालू हैं',
    'nav.platform': 'प्लेटफ़ॉर्म',
    'nav.products': 'उत्पाद',
    'nav.liveDemo': 'लाइव डेमो',
    'nav.enterprise': 'एंटरप्राइज',

    // Hero Section
    'hero.badge': 'एंटरप्राइज एआई · जेमिनी 2.0 RAG इंजन · लाइव',
    'hero.title1': 'आपकी कंपनी की याददाश्त,',
    'hero.title2': 'अब पूरी तरह खोजने योग्य।',
    'hero.desc': 'क्वेरीकोर एआई एचआर नियमावली, कानूनी नीतियों और इंजीनियरिंग दस्तावेजों को एक सत्यापित कोपायलट में बदल देता है।',
    'hero.sourceNote': 'प्रत्येक उत्तर अपने सटीक स्रोत का संदर्भ देता है।',
    'hero.engageBtn': 'एआई कोपायलट शुरू करें',
    'hero.tourBtn': 'प्लेटफ़ॉर्म टूर देखें',
    'hero.statRAG': '300ms से कम RAG',
    'hero.statSOC': 'SOC-2 टाइप II प्रमाणित',
    'hero.statRBAC': 'RBAC मल्टी-टेनेंट',
    'hero.statZeroHalluc': 'शून्य गलत जानकारी',
    'hero.statClients': '100+ बड़े उद्यम',

    // Features & Modals
    'features.tag': 'प्लेटफ़ॉर्म सुविधाएँ और डोमेन ज्ञान',
    'features.title': 'प्रत्येक डोमेन को देखने के लिए क्लिक करें',
    'features.subtitle': 'उत्पाद विनिर्देश, कंपनी वास्तुकला और लाइव पोर्टल लिंक देखने के लिए किसी भी डोमेन पर क्लिक करें।',
    'features.clickHint': 'जानकारी के लिए क्लिक करें',
    'features.viewSpecs': 'विवरण, कंपनी और उत्पाद लिंक देखें →',

    // Copilot Chat
    'chat.title': 'अपने एंटरप्राइज संग्रह में कुछ भी पूछें',
    'chat.subtitle': 'जेमिनी 2.0 और उच्च-घनत्व वेक्टर खोज द्वारा संचालित। प्रत्येक उत्तर में सत्यापित उद्धरण शामिल हैं।',
    'chat.placeholder': 'एचआर, कानूनी, बिक्री या तकनीकी नीतियों के बारे में प्रश्न पूछें...',
    'chat.askBtn': 'पूछें',
    'chat.thinking': 'सोच रहा है...',
    'chat.synthesizing': 'वेक्टर स्टोर से सत्यापित उत्तर तैयार किया जा रहा है...',
    'chat.scope': 'दायरा',
    'chat.allDepts': 'सभी विभाग',
    'chat.zeroHalluc': 'शून्य भ्रांति',
    'chat.verifiedCitations': 'सत्यापित उद्धरण',
    'chat.clearHistory': 'बातचीत का इतिहास हटाएं?',
    'chat.securityNote': 'क्वेरीकोर एआई केवल सत्यापित कंपनी दस्तावेजों से उत्तर देता है। बाहरी डेटा सुरक्षित है।',

    // Dashboard Hubs
    'dash.hubsTitle': 'एंटरप्राइज ज्ञान हब',
    'dash.hubsSubtitle': '(सक्रिय वेक्टर दृश्य देखने के लिए फ़ोटो पर होवर करें)',
    'dash.exploreAll': 'सभी देखें',
    'dash.viewHub': 'हब देखने के लिए क्लिक करें →',
    'dash.browseVault': 'दस्तावेज़ वॉल्ट खोलें',
    'dash.askCopilot': 'कोपायलट से अभी पूछें',
    'dash.indexedFiles': 'सूचीबद्ध फ़ाइलें',
    'dash.vectorChunks': 'वेक्टर खंड',
    'dash.precision': 'RAG सटीकता',
    'dash.latency': 'प्रतिक्रिया समय',

    // Floating Widget
    'widget.title': 'एआई संस्थागत सहायक',
    'widget.live': 'लाइव प्रश्न पूछें',
    'widget.header': 'संस्थागत एआई कंसीयर्ज',
    'widget.welcome': 'नमस्ते! मैं क्वेरीकोर एआई सहायक हूँ। मुझसे क्वेरीकोर, वैश्विक कंपनियों (अमेज़न, गूगल, आदि) या उत्पादों के बारे में कुछ भी पूछें!',
    'widget.inputPlaceholder': 'संस्थागत प्रश्न पूछें...',
    'widget.analyzing': 'ज्ञान आधार का विश्लेषण किया जा रहा है...'
  },

  es: {
    // Navigation
    'nav.dashboard': 'Panel',
    'nav.knowledge': 'Base de Conocimiento',
    'nav.copilot': 'Copiloto IA',
    'nav.profile': 'Perfil y Seguridad',
    'nav.signIn': 'Iniciar Sesión',
    'nav.getStarted': 'Comenzar',
    'nav.dept': 'Depto',
    'nav.operational': 'Sistemas Operativos',
    'nav.platform': 'Plataforma',
    'nav.products': 'Productos',
    'nav.liveDemo': 'Demostración',
    'nav.enterprise': 'Empresa',

    // Hero Section
    'hero.badge': 'IA EMPRESARIAL · MOTOR RAG GEMINI 2.0 · ACTIVO',
    'hero.title1': 'La memoria de tu empresa,',
    'hero.title2': 'finalmente accesible.',
    'hero.desc': 'QueryCore IA convierte manuales de RRHH, contratos legales y arquitectura en un copiloto verificado.',
    'hero.sourceNote': 'Cada respuesta cita su fuente exacta.',
    'hero.engageBtn': 'Iniciar Copiloto IA',
    'hero.tourBtn': 'Ver Recorrido',
    'hero.statRAG': 'RAG < 300ms',
    'hero.statSOC': 'SOC-2 Tipo II',
    'hero.statRBAC': 'RBAC Multi-Inquilino',
    'hero.statZeroHalluc': 'Cero Alucinaciones',
    'hero.statClients': '100+ Empresas',

    // Features
    'features.tag': 'Funciones y Conocimiento de Dominio',
    'features.title': 'Explora cada dominio con un clic',
    'features.subtitle': 'Haz clic en cualquier dominio para ver especificaciones y portales en vivo.',
    'features.clickHint': 'Clic para información',
    'features.viewSpecs': 'Ver especificaciones y enlaces →',

    // Copilot Chat
    'chat.title': 'Pregunta lo que sea en tu corpus empresarial',
    'chat.subtitle': 'Impulsado por Gemini 2.0 y búsqueda vectorial. Cada respuesta incluye citas verificadas.',
    'chat.placeholder': 'Haz una pregunta sobre RRHH, legal, ventas o arquitectura...',
    'chat.askBtn': 'Preguntar',
    'chat.thinking': 'Pensando...',
    'chat.synthesizing': 'Sintetizando respuesta verificada desde la base vectorial...',
    'chat.scope': 'Alcance',
    'chat.allDepts': 'Todos los Departamentos',
    'chat.zeroHalluc': 'Cero Alucinación',
    'chat.verifiedCitations': 'Citas Verificadas',
    'chat.clearHistory': '¿Borrar historial de conversación?',
    'chat.securityNote': 'QueryCore IA sintetiza respuestas solo desde documentos verificados.',

    // Dashboard Hubs
    'dash.hubsTitle': 'Centros de Conocimiento Empresarial',
    'dash.hubsSubtitle': '(Pasa el cursor sobre las fotos para ver vistas vectoriales)',
    'dash.exploreAll': 'Explorar Todo',
    'dash.viewHub': 'Clic para ver centro →',
    'dash.browseVault': 'Explorar Bóveda',
    'dash.askCopilot': 'Preguntar al Copiloto',
    'dash.indexedFiles': 'Archivos Indexados',
    'dash.vectorChunks': 'Fragmentos Vectoriales',
    'dash.precision': 'Precisión RAG',
    'dash.latency': 'Latencia de Consulta',

    // Floating Widget
    'widget.title': 'Asistente Institucional IA',
    'widget.live': 'Preguntas en Vivo',
    'widget.header': 'Conserje Institucional IA',
    'widget.welcome': '¡Saludos! Soy el Asistente Institucional de QueryCore. ¡Pregúntame sobre QueryCore, empresas globales (Amazon, Google) o productos!',
    'widget.inputPlaceholder': 'Pregunta algo institucional...',
    'widget.analyzing': 'Analizando base de conocimiento...'
  },

  fr: {
    'nav.dashboard': 'Tableau de bord',
    'nav.knowledge': 'Base de connaissances',
    'nav.copilot': 'Copilote IA',
    'nav.profile': 'Profil & Sécurité',
    'nav.signIn': 'Connexion',
    'nav.getStarted': 'Commencer',
    'nav.dept': 'Dép.',
    'nav.operational': 'Systèmes opérationnels',
    'hero.badge': 'IA D’ENTREPRISE · MOTEUR RAG GEMINI 2.0 · ACTIF',
    'hero.title1': 'La mémoire de votre entreprise,',
    'hero.title2': 'enfin interrogeable.',
    'hero.desc': 'QueryCore IA unifie manuels RH, politiques juridiques et architecture en un copilote vérifié.',
    'hero.sourceNote': 'Chaque réponse cite sa source exacte.',
    'hero.engageBtn': 'Lancer le Copilote IA',
    'hero.tourBtn': 'Visite de la plateforme',
    'features.tag': 'Fonctionnalités et Domaines',
    'features.title': 'Cliquez pour explorer chaque domaine',
    'features.subtitle': 'Consultez les spécifications des produits et les liens du portail.',
    'chat.title': 'Posez vos questions sur votre corpus d’entreprise',
    'chat.subtitle': 'Propulsé par Gemini 2.0 et la recherche vectorielle sémantique.',
    'chat.placeholder': 'Posez une question sur RH, juridique, ventes ou cloud...',
    'chat.askBtn': 'Demander',
    'chat.thinking': 'Réflexion...',
    'dash.hubsTitle': 'Centres de Connaissances d’Entreprise',
    'dash.exploreAll': 'Tout explorer',
    'dash.browseVault': 'Parcourir le coffre-fort',
    'dash.askCopilot': 'Demander au Copilote',
    'widget.title': 'Assistant IA Institutionnel',
    'widget.welcome': 'Bonjour ! Je suis l’assistant institutionnel QueryCore. Posez-moi des questions sur QueryCore, les grandes entreprises et leurs produits.'
  },

  de: {
    'nav.dashboard': 'Dashboard',
    'nav.knowledge': 'Wissensdatenbank',
    'nav.copilot': 'KI-Copilot',
    'nav.profile': 'Profil & Sicherheit',
    'nav.signIn': 'Anmelden',
    'nav.getStarted': 'Jetzt starten',
    'nav.dept': 'Abt.',
    'nav.operational': 'Alle Systeme betriebsbereit',
    'hero.badge': 'ENTERPRISE KI · GEMINI 2.0 RAG-ENGINE · LIVE',
    'hero.title1': 'Das Unternehmensgedächtnis,',
    'hero.title2': 'endlich durchsuchbar.',
    'hero.desc': 'QueryCore KI verwandelt isolierte Handbücher und Richtlinien in einen verifizierten Copiloten.',
    'hero.sourceNote': 'Jede Antwort zitiert ihre exakte Quelle.',
    'hero.engageBtn': 'KI-Copilot starten',
    'hero.tourBtn': 'Plattform-Tour ansehen',
    'features.tag': 'Plattform-Funktionen & Fachbereiche',
    'features.title': 'Klicken Sie auf einen Bereich für Details',
    'chat.title': 'Fragen Sie den gesamten Unternehmensdatenbestand',
    'chat.subtitle': 'Unterstützt von Gemini 2.0 und dichter semantischer Vektorsuche.',
    'chat.placeholder': 'Frage zu HR, Recht, Vertrieb oder Architektur stellen...',
    'chat.askBtn': 'Fragen',
    'chat.thinking': 'Denkt nach...',
    'dash.hubsTitle': 'Unternehmens-Wissens-Hubs',
    'dash.exploreAll': 'Alle anzeigen',
    'dash.browseVault': 'Tresor durchsuchen',
    'dash.askCopilot': 'Copilot befragen',
    'widget.title': 'Institutioneller KI-Assistent',
    'widget.welcome': 'Guten Tag! Ich bin der institutionelle KI-Assistent von QueryCore. Fragen Sie mich nach QueryCore, Unternehmen oder Produkten!'
  },

  ja: {
    'nav.dashboard': 'ダッシュボード',
    'nav.knowledge': 'ナレッジベース',
    'nav.copilot': 'AIコパイロット',
    'nav.profile': 'プロファイルとセキュリティ',
    'nav.signIn': 'ログイン',
    'nav.getStarted': '今すぐ開始',
    'nav.dept': '部門',
    'nav.operational': '全システム正常稼働中',
    'hero.badge': 'エンタープライズAI · GEMINI 2.0 RAGエンジン · 稼働中',
    'hero.title1': '組織の記憶が、',
    'hero.title2': 'ついに検索可能に。',
    'hero.desc': 'QueryCore AIはサイロ化した人事マニュアルや法務規程を検証済みのコパイロットに統合します。',
    'hero.sourceNote': 'すべての回答に正確な引用元が付与されます。',
    'hero.engageBtn': 'AIコパイロットを開始',
    'hero.tourBtn': 'ツアーを見る',
    'features.tag': '機能とドメインナレッジ',
    'features.title': 'クリックして各ドメインを探索',
    'chat.title': '社内コーパスから何でも質問',
    'chat.subtitle': 'Gemini 2.0と高密度セマンティック検索を搭載。',
    'chat.placeholder': '人事、法務、営業、またはシステム規程について質問...',
    'chat.askBtn': '送信',
    'chat.thinking': '思考中...',
    'dash.hubsTitle': 'エンタープライズ ナレッジハブ',
    'dash.exploreAll': 'すべて表示',
    'dash.browseVault': '文書保管庫を開く',
    'dash.askCopilot': '今すぐ質問',
    'widget.title': 'AI機関アシスタント',
    'widget.welcome': 'こんにちは！QueryCore AIアシスタントです。QueryCore、グローバル企業、製品について何でもお尋ねください！'
  },

  ar: {
    'nav.dashboard': 'لوحة التحكم',
    'nav.knowledge': 'قاعدة المعرفة',
    'nav.copilot': 'مساعد الذكاء الاصطناعي',
    'nav.profile': 'الملف الشخصي والأمان',
    'nav.signIn': 'تسجيل الدخول',
    'nav.getStarted': 'ابدأ الآن',
    'nav.dept': 'القسم',
    'nav.operational': 'جميع الأنظمة تعمل بكفاءة',
    'hero.badge': 'ذكاء اصطناعي للمؤسسات · محرك GEMINI 2.0 RAG · مباشر',
    'hero.title1': 'ذاكرة شركتك،',
    'hero.title2': 'أصبحت قابلة للبحث أخيرًا.',
    'hero.desc': 'يحول QueryCore AI مستندات الموارد البشرية واللوائح القانونية إلى مساعد مؤسسي موثوق.',
    'hero.sourceNote': 'كل إجابة تستند إلى مصدرها الدقيق.',
    'hero.engageBtn': 'تشغيل مساعد الذكاء الاصطناعي',
    'hero.tourBtn': 'جولة في المنصة',
    'features.tag': 'الميزات والمعرفة المؤسسية',
    'features.title': 'انقر لاستكشاف كل مجال',
    'chat.title': 'اسأل أي شيء عبر مستندات مؤسستك',
    'chat.subtitle': 'مدعوم بنموذج Gemini 2.0 والبحث الدلالي المتقدم.',
    'chat.placeholder': 'اطرح سؤالاً حول الموارد البشرية أو الشؤون القانونية أو المبيعات...',
    'chat.askBtn': 'إرسال',
    'chat.thinking': 'جارٍ التفكير...',
    'dash.hubsTitle': 'مراكز المعرفة المؤسسية',
    'dash.exploreAll': 'استكشاف الكل',
    'dash.browseVault': 'تصفح الخزينة',
    'dash.askCopilot': 'اسأل المساعد الآن',
    'widget.title': 'المساعد المؤسسي الذكي',
    'widget.welcome': 'مرحبًا! أنا مساعد QueryCore المؤسسي. اسألني عن QueryCore أو الشركات العالمية ومنتجاتها!'
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('querycore_lang') || 'en';
  });

  const setLanguage = (langCode) => {
    if (LANGUAGES.some(l => l.code === langCode)) {
      setCurrentLang(langCode);
      localStorage.setItem('querycore_lang', langCode);
      document.documentElement.lang = langCode;
      document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
    }
  };

  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  const t = (key, fallback = '') => {
    const langDict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    if (langDict[key]) return langDict[key];
    if (TRANSLATIONS.en[key]) return TRANSLATIONS.en[key];
    return fallback || key;
  };

  const selectedLanguage = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, t, languages: LANGUAGES, selectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
