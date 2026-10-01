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
    'nav.video': 'Video Tour',
    'nav.liveDemo': 'Live Demo',
    'nav.enterprise': 'Enterprise',
    'nav.workspaceHub': 'Workspace Hub',
    'nav.logout': 'Sign Out',

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

    // Video Section
    'video.badge': 'EXECUTIVE BRIEFING · ENTERPRISE AI',
    'video.title': 'How Enterprise AI Actually Works',
    'video.subtitle': 'Watch how Retrieval-Augmented Generation (RAG) and Gemini 2.0 eliminate hallucinations while preserving enterprise data sovereignty.',
    'video.selectTopic': 'Select Video Topic',
    'video.openModal': 'Watch HD Platform Tour',
    'video.watchNow': 'Watch Masterclass',

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

    // Dashboard Hubs & Stats
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
    'dash.goodMorning': 'Good morning',
    'dash.goodAfternoon': 'Good afternoon',
    'dash.goodEvening': 'Good evening',
    'dash.quickActions': 'Quick Actions',

    // Knowledge Base Documents
    'docs.title': 'Organizational Knowledge Base',
    'docs.subtitle': 'Browse, search, and ingest company documents for grounded AI Copilot retrieval',
    'docs.search': 'Search documents by title, tags or content...',
    'docs.upload': 'Upload Document',
    'docs.allDepts': 'All Departments',

    // Profile & Auth
    'profile.title': 'Profile & Security',
    'profile.subtitle': 'Manage your institutional access, role-based scope, and API tokens',
    'profile.save': 'Save Changes',
    'profile.token': 'API Bearer Token',
    'profile.copy': 'Copy Token',
    'profile.copied': 'Copied!',
    'auth.signIn': 'Sign In',
    'auth.register': 'Create Account',
    'auth.email': 'Work Email',
    'auth.password': 'Password',
    'auth.fullName': 'Full Name',
    'auth.department': 'Department',
    'auth.backHome': 'Back to Home',
    'auth.welcomeBack': 'Sign in to QueryCore',
    'auth.welcomeSub': 'Enterprise Knowledge Copilot',
    'auth.joinTeam': 'Join QueryCore Enterprise',
    'auth.instantDemo': 'Instant Demo Access',
    'auth.noAccount': "Don't have an account?",
    'auth.haveAccount': 'Already have an account?',

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
    'nav.video': 'वीडियो टूर',
    'nav.liveDemo': 'लाइव डेमो',
    'nav.enterprise': 'एंटरप्राइज',
    'nav.workspaceHub': 'कार्यक्षेत्र हब',
    'nav.logout': 'साइन आउट',

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

    // Video Section
    'video.badge': 'कार्यकारी विवरण · एंटरप्राइज एआई',
    'video.title': 'एंटरप्राइज एआई वास्तव में कैसे काम करता है',
    'video.subtitle': 'देखें कि कैसे RAG और जेमिनी 2.0 डेटा गोपनीयता बनाए रखते हुए सटीक और विश्वसनीय उत्तर देते हैं।',
    'video.selectTopic': 'वीडियो विषय चुनें',
    'video.openModal': 'एचडी टूर देखें',
    'video.watchNow': 'मास्टरक्लास देखें',

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

    // Dashboard Hubs & Stats
    'dash.hubsTitle': 'एंटरप्राइज ज्ञान हब',
    'dash.hubsSubtitle': '(सक्रिय वेक्टर दृश्य देखने के लिए फ़ोटो पर होवर करें)',
    'dash.exploreAll': 'सभी देखें',
    'dash.viewHub': 'हब देखने के लिए क्लिक करें →',
    'dash.browseVault': 'दस्तावेज़ वॉल्ट खोलें',
    'dash.askCopilot': 'कोपायलट से पूछें',
    'dash.indexedFiles': 'इंडेक्स की गई फाइलें',
    'dash.vectorChunks': 'वेक्टर चंक्स',
    'dash.precision': 'RAG सटीकता',
    'dash.latency': 'प्रतिक्रिया समय',
    'dash.goodMorning': 'शुभ प्रभात',
    'dash.goodAfternoon': 'शुभ दोपहर',
    'dash.goodEvening': 'शुभ संध्या',
    'dash.quickActions': 'त्वरित कार्रवाइयां',

    // Knowledge Base Documents
    'docs.title': 'संगठनात्मक ज्ञान भंडार',
    'docs.subtitle': 'कंपनी के दस्तावेज़ खोजें, देखें और एआई कोपायलट के लिए जोड़ें',
    'docs.search': 'शीर्षक, टैग या सामग्री द्वारा खोजें...',
    'docs.upload': 'दस्तावेज़ अपलोड करें',
    'docs.allDepts': 'सभी विभाग',

    // Profile & Auth
    'profile.title': 'प्रोफ़ाइल एवं सुरक्षा',
    'profile.subtitle': 'अपनी संस्थागत पहुंच, भूमिका और एपीआई टोकन प्रबंधित करें',
    'profile.save': 'परिवर्तन सहेजें',
    'profile.token': 'एपीआई बियरर टोकन',
    'profile.copy': 'टोकन कॉपी करें',
    'profile.copied': 'कॉपी हो गया!',
    'auth.signIn': 'साइन इन करें',
    'auth.register': 'खाता बनाएं',
    'auth.email': 'कार्य ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.fullName': 'पूरा नाम',
    'auth.department': 'विभाग',
    'auth.backHome': 'होम पर वापस जाएं',
    'auth.welcomeBack': 'क्वेरीकोर में साइन इन करें',
    'auth.welcomeSub': 'एंटरप्राइज नॉलेज कोपायलट',
    'auth.joinTeam': 'क्वेरीकोर से जुड़ें',
    'auth.instantDemo': 'तत्काल डेमो पहुंच',
    'auth.noAccount': 'खाता नहीं है?',
    'auth.haveAccount': 'पहले से खाता है?',

    // Floating Widget
    'widget.title': 'एआई संस्थागत सहायक',
    'widget.live': 'सीधे प्रश्न पूछें',
    'widget.header': 'संस्थागत एआई द्वारपाल',
    'widget.welcome': 'नमस्ते! मैं क्वेरीकोर एआई संस्थागत सहायक हूँ। मुझसे क्वेरीकोर, वैश्विक कंपनियों, उत्पादों या उनके लिंक के बारे में कुछ भी पूछें!',
    'widget.inputPlaceholder': 'संस्थागत प्रश्न पूछें...',
    'widget.analyzing': 'संस्थागत ज्ञान का विश्लेषण हो रहा है...'
  },

  es: {
    // Navigation
    'nav.dashboard': 'Panel de Control',
    'nav.knowledge': 'Base de Conocimiento',
    'nav.copilot': 'Copiloto IA',
    'nav.profile': 'Perfil y Seguridad',
    'nav.signIn': 'Iniciar Sesión',
    'nav.getStarted': 'Comenzar',
    'nav.dept': 'Depto',
    'nav.operational': 'Todos los Sistemas Operativos',
    'nav.platform': 'Plataforma',
    'nav.products': 'Productos',
    'nav.video': 'Tour en Video',
    'nav.liveDemo': 'Demo en Vivo',
    'nav.enterprise': 'Empresarial',
    'nav.workspaceHub': 'Centro de Trabajo',
    'nav.logout': 'Cerrar Sesión',

    // Hero Section
    'hero.badge': 'IA EMPRESARIAL · MOTOR RAG GEMINI 2.0 · EN VIVO',
    'hero.title1': 'La memoria de su empresa,',
    'hero.title2': 'finalmente accesible.',
    'hero.desc': 'QueryCore AI transforma manuales de RRHH, políticas legales y arquitectura en un copiloto verificado.',
    'hero.sourceNote': 'Cada respuesta cita su fuente exacta.',
    'hero.engageBtn': 'Activar Copiloto IA',
    'hero.tourBtn': 'Ver Tour de la Plataforma',
    'hero.statRAG': 'RAG <300ms',
    'hero.statSOC': 'SOC-2 Tipo II',
    'hero.statRBAC': 'Multi-Inquilino RBAC',
    'hero.statZeroHalluc': 'Cero Alucinaciones',
    'hero.statClients': '100+ Corporaciones',

    // Video Section
    'video.badge': 'INFORME EJECUTIVO · IA EMPRESARIAL',
    'video.title': 'Cómo Funciona Realmente la IA Empresarial',
    'video.subtitle': 'Descubra cómo la Generación Aumentada por Recuperación (RAG) y Gemini 2.0 eliminan alucinaciones protegiendo la soberanía de sus datos.',
    'video.selectTopic': 'Seleccionar Tema de Video',
    'video.openModal': 'Ver Tour HD de la Plataforma',
    'video.watchNow': 'Ver Masterclass',

    // Features & Modals
    'features.tag': 'Funciones y Conocimiento de Dominios',
    'features.title': 'Pase el cursor y haga clic para explorar',
    'features.subtitle': 'Haga clic en cualquier dominio para ver especificaciones técnicas, arquitectura y enlaces en vivo.',
    'features.clickHint': 'Clic para información',
    'features.viewSpecs': 'Ver especificaciones, empresa y enlaces →',

    // Copilot Chat
    'chat.title': 'Pregunte cualquier dato de su empresa',
    'chat.subtitle': 'Impulsado por Gemini 2.0 y búsqueda vectorial semántica. Cada respuesta incluye citas verificadas.',
    'chat.placeholder': 'Pregunte sobre RRHH, legal, ventas o documentos técnicos...',
    'chat.askBtn': 'Consultar',
    'chat.thinking': 'Analizando...',
    'chat.synthesizing': 'Sintetizando respuesta fundamentada desde el almacén vectorial...',
    'chat.scope': 'Alcance',
    'chat.allDepts': 'Todos los Departamentos',
    'chat.zeroHalluc': 'Cero Alucinación',
    'chat.verifiedCitations': 'Citas Verificadas',
    'chat.clearHistory': '¿Borrar historial de chat?',
    'chat.securityNote': 'QueryCore AI responde únicamente a partir de documentos verificados. Cero exposición externa.',

    // Dashboard Hubs & Stats
    'dash.hubsTitle': 'Centros de Conocimiento Empresarial',
    'dash.hubsSubtitle': '(Pase el cursor sobre las fotos para ver vectores activos)',
    'dash.exploreAll': 'Explorar Todo',
    'dash.viewHub': 'Ver Centro →',
    'dash.browseVault': 'Explorar Bóveda',
    'dash.askCopilot': 'Consultar al Copiloto',
    'dash.indexedFiles': 'Archivos Indexados',
    'dash.vectorChunks': 'Fragmentos Vectoriales',
    'dash.precision': 'Precisión RAG',
    'dash.latency': 'Latencia de Consulta',
    'dash.goodMorning': 'Buenos días',
    'dash.goodAfternoon': 'Buenas tardes',
    'dash.goodEvening': 'Buenas noches',
    'dash.quickActions': 'Acciones Rápidas',

    // Knowledge Base Documents
    'docs.title': 'Base de Conocimiento Organizacional',
    'docs.subtitle': 'Busque, explore y cargue documentos empresariales para el copiloto de IA',
    'docs.search': 'Buscar documentos por título, etiquetas o contenido...',
    'docs.upload': 'Subir Documento',
    'docs.allDepts': 'Todos los Departamentos',

    // Profile & Auth
    'profile.title': 'Perfil y Seguridad',
    'profile.subtitle': 'Gestione su acceso institucional, alcance por rol y tokens de API',
    'profile.save': 'Guardar Cambios',
    'profile.token': 'Token Portador API',
    'profile.copy': 'Copiar Token',
    'profile.copied': '¡Copiado!',
    'auth.signIn': 'Iniciar Sesión',
    'auth.register': 'Crear Cuenta',
    'auth.email': 'Correo Corporativo',
    'auth.password': 'Contraseña',
    'auth.fullName': 'Nombre Completo',
    'auth.department': 'Departamento',
    'auth.backHome': 'Volver al Inicio',
    'auth.welcomeBack': 'Bienvenido a QueryCore',
    'auth.welcomeSub': 'Copiloto de Conocimiento Empresarial',
    'auth.joinTeam': 'Únase a QueryCore',
    'auth.instantDemo': 'Acceso Demo Inmediato',
    'auth.noAccount': '¿No tiene una cuenta?',
    'auth.haveAccount': '¿Ya tiene una cuenta?',

    // Floating Widget
    'widget.title': 'Asistente Institucional IA',
    'widget.live': 'Consultas en Vivo',
    'widget.header': 'Conserje de IA Institucional',
    'widget.welcome': '¡Saludos! Soy el Asistente Institucional de QueryCore. ¡Pregúnteme sobre QueryCore, empresas globales, productos o dónde encontrarlos!',
    'widget.inputPlaceholder': 'Haga una pregunta institucional...',
    'widget.analyzing': 'Analizando base de conocimiento...'
  },

  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de Bord',
    'nav.knowledge': 'Base de Connaissances',
    'nav.copilot': 'Copilote IA',
    'nav.profile': 'Profil & Sécurité',
    'nav.signIn': 'Connexion',
    'nav.getStarted': 'Démarrer',
    'nav.dept': 'Dép.',
    'nav.operational': 'Systèmes Opérationnels',
    'nav.platform': 'Plateforme',
    'nav.products': 'Produits',
    'nav.video': 'Visite Vidéo',
    'nav.liveDemo': 'Démo en Direct',
    'nav.enterprise': 'Entreprise',
    'nav.workspaceHub': 'Espace de Travail',
    'nav.logout': 'Se Déconnecter',

    // Hero Section
    'hero.badge': 'IA D’ENTREPRISE · MOTEUR RAG GEMINI 2.0 · EN DIRECT',
    'hero.title1': 'La mémoire de votre entreprise,',
    'hero.title2': 'enfin accessible.',
    'hero.desc': 'QueryCore AI unifie manuels RH, politiques juridiques et architectures en un copilote vérifié.',
    'hero.sourceNote': 'Chaque réponse cite sa source exacte.',
    'hero.engageBtn': 'Lancer le Copilote IA',
    'hero.tourBtn': 'Voir la Visite Guidée',
    'hero.statRAG': 'RAG <300ms',
    'hero.statSOC': 'SOC-2 Type II',
    'hero.statRBAC': 'Multi-Tenant RBAC',
    'hero.statZeroHalluc': 'Zéro Hallucination',
    'hero.statClients': '100+ Grandes Entreprises',

    // Video Section
    'video.badge': 'BRIEFING EXÉCUTIF · IA D’ENTREPRISE',
    'video.title': 'Le Fonctionnement Réel de l’IA d’Entreprise',
    'video.subtitle': 'Découvrez comment RAG et Gemini 2.0 éliminent les hallucinations tout en protégeant la souveraineté de vos données.',
    'video.selectTopic': 'Choisir le Sujet Vidéo',
    'video.openModal': 'Voir la Démo HD',
    'video.watchNow': 'Regarder la Masterclass',

    // Features & Modals
    'features.tag': 'Fonctionnalités & Connaissances Métiers',
    'features.title': 'Survolez et cliquez pour explorer chaque domaine',
    'features.subtitle': 'Cliquez pour examiner les spécifications techniques, l’architecture et les liens en direct.',
    'features.clickHint': 'Cliquez pour voir',
    'features.viewSpecs': 'Voir spécifications, entreprise & liens →',

    // Copilot Chat
    'chat.title': 'Interrogez l’ensemble de vos documents d’entreprise',
    'chat.subtitle': 'Propulsé par Gemini 2.0 et la recherche vectorielle sémantique. Citations vérifiées incluses.',
    'chat.placeholder': 'Posez une question sur les RH, le juridique ou la technique...',
    'chat.askBtn': 'Envoyer',
    'chat.thinking': 'Réflexion...',
    'chat.synthesizing': 'Synthèse de la réponse vérifiée à partir du vector store...',
    'chat.scope': 'Portée',
    'chat.allDepts': 'Tous les Départements',
    'chat.zeroHalluc': 'Zéro Hallucination',
    'chat.verifiedCitations': 'Citations Vérifiées',
    'chat.clearHistory': 'Effacer l’historique des messages ?',
    'chat.securityNote': 'QueryCore AI synthétise uniquement à partir de documents internes vérifiés. Zéro fuite de données.',

    // Dashboard Hubs & Stats
    'dash.hubsTitle': 'Pôles de Connaissances Entreprise',
    'dash.hubsSubtitle': '(Survolez les photos pour afficher la vue vectorielle)',
    'dash.exploreAll': 'Tout Explorer',
    'dash.viewHub': 'Ouvrir le Pôle →',
    'dash.browseVault': 'Explorer le Coffre',
    'dash.askCopilot': 'Consulter le Copilote',
    'dash.indexedFiles': 'Fichiers Indexés',
    'dash.vectorChunks': 'Fragments Vectoriels',
    'dash.precision': 'Précision RAG',
    'dash.latency': 'Latence Requête',
    'dash.goodMorning': 'Bonjour',
    'dash.goodAfternoon': 'Bon après-midi',
    'dash.goodEvening': 'Bonsoir',
    'dash.quickActions': 'Actions Rapides',

    // Knowledge Base Documents
    'docs.title': 'Base de Connaissances de l’Organisation',
    'docs.subtitle': 'Recherchez, parcourez et intégrez des documents d’entreprise pour le copilote IA',
    'docs.search': 'Rechercher par titre, étiquettes ou contenu...',
    'docs.upload': 'Téléverser un Document',
    'docs.allDepts': 'Tous les Départements',

    // Profile & Auth
    'profile.title': 'Profil & Sécurité',
    'profile.subtitle': 'Gérez vos accès institutionnels, périmètres de rôle et jetons API',
    'profile.save': 'Enregistrer',
    'profile.token': 'Jeton Porteur API',
    'profile.copy': 'Copier le Jeton',
    'profile.copied': 'Copié !',
    'auth.signIn': 'Connexion',
    'auth.register': 'Créer un Compte',
    'auth.email': 'Email Professionnel',
    'auth.password': 'Mot de Passe',
    'auth.fullName': 'Nom Complet',
    'auth.department': 'Département',
    'auth.backHome': 'Retour à l’Accueil',
    'auth.welcomeBack': 'Bienvenue sur QueryCore',
    'auth.welcomeSub': 'Copilote de Connaissances d’Entreprise',
    'auth.joinTeam': 'Rejoindre QueryCore',
    'auth.instantDemo': 'Accès Démo Instantané',
    'auth.noAccount': 'Pas encore de compte ?',
    'auth.haveAccount': 'Vous avez déjà un compte ?',

    // Floating Widget
    'widget.title': 'Assistant IA Institutionnel',
    'widget.live': 'Questions en Direct',
    'widget.header': 'Concierge IA d’Entreprise',
    'widget.welcome': 'Bonjour ! Je suis l’assistant institutionnel QueryCore. Posez-moi des questions sur QueryCore, les grandes entreprises et leurs produits !',
    'widget.inputPlaceholder': 'Poser une question institutionnelle...',
    'widget.analyzing': 'Analyse des données en cours...'
  },

  de: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.knowledge': 'Wissensdatenbank',
    'nav.copilot': 'KI-Copilot',
    'nav.profile': 'Profil & Sicherheit',
    'nav.signIn': 'Anmelden',
    'nav.getStarted': 'Loslegen',
    'nav.dept': 'Abt.',
    'nav.operational': 'Alle Systeme Betriebsbereit',
    'nav.platform': 'Plattform',
    'nav.products': 'Produkte',
    'nav.video': 'Video-Tour',
    'nav.liveDemo': 'Live-Demo',
    'nav.enterprise': 'Enterprise',
    'nav.workspaceHub': 'Arbeitsbereich',
    'nav.logout': 'Abmelden',

    // Hero Section
    'hero.badge': 'ENTERPRISE KI · GEMINI 2.0 RAG-ENGINE · LIVE',
    'hero.title1': 'Das Gedächtnis Ihres Unternehmens,',
    'hero.title2': 'endlich durchsuchbar.',
    'hero.desc': 'QueryCore AI verwandelt fragmentierte HR-Richtlinien, Rechtsdokumente und Architekturpläne in einen geprüften Copiloten.',
    'hero.sourceNote': 'Jede Antwort zitiert ihre exakte Quelle.',
    'hero.engageBtn': 'KI-Copilot starten',
    'hero.tourBtn': 'Plattform-Tour ansehen',
    'hero.statRAG': '<300ms RAG',
    'hero.statSOC': 'SOC-2 Typ II zertifiziert',
    'hero.statRBAC': 'Mandantenfähiges RBAC',
    'hero.statZeroHalluc': 'Keine Halluzinationen',
    'hero.statClients': '100+ Großunternehmen',

    // Video Section
    'video.badge': 'EXECUTIVE BRIEFING · ENTERPRISE KI',
    'video.title': 'Wie Enterprise-KI wirklich funktioniert',
    'video.subtitle': 'Erfahren Sie, wie RAG und Gemini 2.0 Halluzinationen eliminieren und gleichzeitig Ihre Datensouveränität wahren.',
    'video.selectTopic': 'Videothema wählen',
    'video.openModal': 'HD-Plattform-Tour starten',
    'video.watchNow': 'Masterclass ansehen',

    // Features & Modals
    'features.tag': 'Plattform-Funktionen & Domänenwissen',
    'features.title': 'Hover & Klick zum Erkunden der Domänen',
    'features.subtitle': 'Klicken Sie auf eine Domäne für Spezifikationen, Architektur und Live-Links.',
    'features.clickHint': 'Klick für Infos',
    'features.viewSpecs': 'Spezifikationen & Firmenlinks ansehen →',

    // Copilot Chat
    'chat.title': 'Fragen Sie alles aus Ihrem Unternehmensbestand',
    'chat.subtitle': 'Angetrieben durch Gemini 2.0 und semantische Vektorsuche mit geprüften Quellenzitaten.',
    'chat.placeholder': 'Frage zu HR, Recht, Vertrieb oder Technik stellen...',
    'chat.askBtn': 'Fragen',
    'chat.thinking': 'Analysiert...',
    'chat.synthesizing': 'Synthetisiere fundierte Antwort aus dem Vektorspeicher...',
    'chat.scope': 'Bereich',
    'chat.allDepts': 'Alle Abteilungen',
    'chat.zeroHalluc': 'Null Halluzination',
    'chat.verifiedCitations': 'Verifizierte Zitate',
    'chat.clearHistory': 'Chatverlauf löschen?',
    'chat.securityNote': 'QueryCore AI stützt sich ausschließlich auf geprüfte Unternehmensdokumente. Keine externe Datenweitergabe.',

    // Dashboard Hubs & Stats
    'dash.hubsTitle': 'Enterprise-Wissenshubs',
    'dash.hubsSubtitle': '(Über Fotos hovern für aktive Vektorenansicht)',
    'dash.exploreAll': 'Alle ansehen',
    'dash.viewHub': 'Hub öffnen →',
    'dash.browseVault': 'Tresor durchsuchen',
    'dash.askCopilot': 'Copilot befragen',
    'dash.indexedFiles': 'Indexierte Dateien',
    'dash.vectorChunks': 'Vektor-Chunks',
    'dash.precision': 'RAG-Präzision',
    'dash.latency': 'Abfragelatenz',
    'dash.goodMorning': 'Guten Morgen',
    'dash.goodAfternoon': 'Guten Tag',
    'dash.goodEvening': 'Guten Abend',
    'dash.quickActions': 'Schnellaktionen',

    // Knowledge Base Documents
    'docs.title': 'Organisatorische Wissensdatenbank',
    'docs.subtitle': 'Unternehmensdokumente suchen, ansehen und für den KI-Copiloten hochladen',
    'docs.search': 'Dokumente nach Titel, Tags oder Inhalt durchsuchen...',
    'docs.upload': 'Dokument hochladen',
    'docs.allDepts': 'Alle Abteilungen',

    // Profile & Auth
    'profile.title': 'Profil & Sicherheit',
    'profile.subtitle': 'Verwalten Sie Unternehmenszugänge, Rollen und API-Tokens',
    'profile.save': 'Änderungen speichern',
    'profile.token': 'API-Bearer-Token',
    'profile.copy': 'Token kopieren',
    'profile.copied': 'Kopiert!',
    'auth.signIn': 'Anmelden',
    'auth.register': 'Konto erstellen',
    'auth.email': 'Geschäftliche E-Mail',
    'auth.password': 'Passwort',
    'auth.fullName': 'Vollständiger Name',
    'auth.department': 'Abteilung',
    'auth.backHome': 'Zurück zur Startseite',
    'auth.welcomeBack': 'Willkommen bei QueryCore',
    'auth.welcomeSub': 'Enterprise Knowledge Copilot',
    'auth.joinTeam': 'Bei QueryCore mitmachen',
    'auth.instantDemo': 'Sofortiger Demo-Zugang',
    'auth.noAccount': 'Noch kein Konto?',
    'auth.haveAccount': 'Bereits registriert?',

    // Floating Widget
    'widget.title': 'Institutioneller KI-Assistent',
    'widget.live': 'Live Fragen stellen',
    'widget.header': 'Institutioneller KI-Concierge',
    'widget.welcome': 'Guten Tag! Ich bin der institutionelle QueryCore-Assistent. Fragen Sie mich zu QueryCore, globalen Unternehmen und Produkten!',
    'widget.inputPlaceholder': 'Institutionelle Frage stellen...',
    'widget.analyzing': 'Unternehmenswissen wird analysiert...'
  },

  ja: {
    // Navigation
    'nav.dashboard': 'ダッシュボード',
    'nav.knowledge': 'ナレッジベース',
    'nav.copilot': 'AIコパイロット',
    'nav.profile': 'プロファイルとセキュリティ',
    'nav.signIn': 'ログイン',
    'nav.getStarted': '使ってみる',
    'nav.dept': '部署',
    'nav.operational': '全システム正常稼働中',
    'nav.platform': 'プラットフォーム',
    'nav.products': '製品一覧',
    'nav.video': 'ビデオツアー',
    'nav.liveDemo': 'ライブデモ',
    'nav.enterprise': 'エンタープライズ',
    'nav.workspaceHub': 'ワークスペース',
    'nav.logout': 'ログアウト',

    // Hero Section
    'hero.badge': 'エンタープライズAI · GEMINI 2.0 RAGエンジン · 稼働中',
    'hero.title1': '企業の蓄積された記憶を、',
    'hero.title2': '今すぐ検索可能に。',
    'hero.desc': 'QueryCore AIは、人事規定・法務規約・設計書をひとつの検証済みコパイロットへと統合します。',
    'hero.sourceNote': 'すべての回答に正確な参照元ドキュメントを明記。',
    'hero.engageBtn': 'AIコパイロットを開始',
    'hero.tourBtn': 'プラットフォームツアーを見る',
    'hero.statRAG': '300ms以下 RAG',
    'hero.statSOC': 'SOC-2 Type II準拠',
    'hero.statRBAC': 'マルチテナントRBAC',
    'hero.statZeroHalluc': 'ハルシネーション皆無',
    'hero.statClients': '100+ 導入企業',

    // Video Section
    'video.badge': 'エグゼクティブ概要 · エンタープライズAI',
    'video.title': 'エンタープライズAIの実際の仕組み',
    'video.subtitle': 'RAGとGemini 2.0が社内データの主権を守りながら、いかにハルシネーションを排除するかを動画でご覧ください。',
    'video.selectTopic': '動画トピックを選択',
    'video.openModal': 'HDツアーを視聴',
    'video.watchNow': 'マスタークラスを見る',

    // Features & Modals
    'features.tag': 'プラットフォーム機能と専門領域',
    'features.title': 'ホバー＆クリックで各ドメインを探索',
    'features.subtitle': '製品仕様、社内アーキテクチャ、実際のポータルリンクを確認できます。',
    'features.clickHint': 'クリックで詳細',
    'features.viewSpecs': '仕様・企業詳細・リンクを見る →',

    // Copilot Chat
    'chat.title': '社内コーパス全域から瞬時に検索・質問',
    'chat.subtitle': 'Gemini 2.0と高密度ベクトル検索を搭載。すべての回答に引用元バッジが付きます。',
    'chat.placeholder': '人事、法務、営業、設計書について何でも質問してください...',
    'chat.askBtn': '質問する',
    'chat.thinking': '推論中...',
    'chat.synthesizing': '社内ベクトルストアから検証済み回答を合成中...',
    'chat.scope': '範囲',
    'chat.allDepts': '全部署',
    'chat.zeroHalluc': 'ハルシネーション防止',
    'chat.verifiedCitations': '検証済み引用',
    'chat.clearHistory': 'チャット履歴を消去しますか？',
    'chat.securityNote': 'QueryCore AIは社内承認文書のみから回答を生成します。外部流出はありません。',

    // Dashboard Hubs & Stats
    'dash.hubsTitle': 'エンタープライズ・ナレッジハブ',
    'dash.hubsSubtitle': '(写真にホバーしてアクティブなベクトルを表示)',
    'dash.exploreAll': 'すべて表示',
    'dash.viewHub': 'ハブを開く →',
    'dash.browseVault': '保管庫を開く',
    'dash.askCopilot': 'コパイロットに質問',
    'dash.indexedFiles': '索引済みファイル',
    'dash.vectorChunks': 'ベクトルチャンク',
    'dash.precision': 'RAG精度',
    'dash.latency': '検索レイテンシ',
    'dash.goodMorning': 'おはようございます',
    'dash.goodAfternoon': 'こんにちは',
    'dash.goodEvening': 'こんばんは',
    'dash.quickActions': 'クイックアクション',

    // Knowledge Base Documents
    'docs.title': '組織ナレッジベース',
    'docs.subtitle': '社内ドキュメントの検索・閲覧・AIコパイロット向けインポート',
    'docs.search': 'タイトル、タグ、内容で検索...',
    'docs.upload': 'ドキュメントをアップロード',
    'docs.allDepts': '全部署',

    // Profile & Auth
    'profile.title': 'プロファイルとセキュリティ',
    'profile.subtitle': '企業アカウント権限、部署スコープ、APIトークンの管理',
    'profile.save': '変更を保存',
    'profile.token': 'APIベアラートークン',
    'profile.copy': 'トークンをコピー',
    'profile.copied': 'コピー完了！',
    'auth.signIn': 'ログイン',
    'auth.register': 'アカウント作成',
    'auth.email': '会社メールアドレス',
    'auth.password': 'パスワード',
    'auth.fullName': '氏名',
    'auth.department': '部署',
    'auth.backHome': 'ホームへ戻る',
    'auth.welcomeBack': 'QueryCoreへログイン',
    'auth.welcomeSub': 'エンタープライズ知識コパイロット',
    'auth.joinTeam': 'QueryCoreに参加',
    'auth.instantDemo': '即時デモログイン',
    'auth.noAccount': 'アカウントをお持ちでない方',
    'auth.haveAccount': 'すでにアカウントをお持ちの方',

    // Floating Widget
    'widget.title': 'AI機関アシスタント',
    'widget.live': 'ライブ質問受付中',
    'widget.header': '社内AIコンシェルジュ',
    'widget.welcome': 'こんにちは！QueryCore AIアシスタントです。QueryCore、グローバル企業、製品情報について何でもお尋ねください！',
    'widget.inputPlaceholder': '質問を入力してください...',
    'widget.analyzing': '社内ナレッジを解析中...'
  },

  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.knowledge': 'قاعدة المعرفة',
    'nav.copilot': 'مساعد الذكاء الاصطناعي',
    'nav.profile': 'الملف الشخصي والأمان',
    'nav.signIn': 'تسجيل الدخول',
    'nav.getStarted': 'ابدأ الآن',
    'nav.dept': 'القسم',
    'nav.operational': 'جميع الأنظمة تعمل بكفاءة',
    'nav.platform': 'المنصة',
    'nav.products': 'المنتجات',
    'nav.video': 'جولة بالفيديو',
    'nav.liveDemo': 'تجربة حية',
    'nav.enterprise': 'المؤسسات',
    'nav.workspaceHub': 'مركز مساحة العمل',
    'nav.logout': 'تسجيل الخروج',

    // Hero Section
    'hero.badge': 'ذكاء اصطناعي للمؤسسات · محرك GEMINI 2.0 RAG · مباشر',
    'hero.title1': 'ذاكرة شركتك المؤسسية،',
    'hero.title2': 'أصبحت قابلة للبحث أخيراً.',
    'hero.desc': 'يحول QueryCore AI أدلة الموارد البشرية والسياسات القانونية إلى مساعد ذكي موثوق ومدعوم بالمصادر.',
    'hero.sourceNote': 'كل إجابة تستشهد بمصدرها الدقيق.',
    'hero.engageBtn': 'تفعيل المساعد الذكي',
    'hero.tourBtn': 'شاهد جولة المنصة',
    'hero.statRAG': 'RAG في أقل من 300 مللي ثانية',
    'hero.statSOC': 'معتمد SOC-2 Type II',
    'hero.statRBAC': 'أمان متعدد المستأجرين RBAC',
    'hero.statZeroHalluc': 'صفر هلوسة',
    'hero.statClients': 'أكثر من 100 مؤسسة كبرى',

    // Video Section
    'video.badge': 'إحاطة تنفيذية · الذكاء الاصطناعي للمؤسسات',
    'video.title': 'كيف يعمل الذكاء الاصطناعي للمؤسسات فعلياً',
    'video.subtitle': 'تعرف على كيفية قيام RAG و Gemini 2.0 بالقضاء على الهلوسة مع الحفاظ على سيادة وأمان بيانات مؤسستك.',
    'video.selectTopic': 'اختر موضوع الفيديو',
    'video.openModal': 'مشاهدة الجولة عالية الدقة',
    'video.watchNow': 'مشاهدة الدرس التعريفي',

    // Features & Modals
    'features.tag': 'ميزات المنصة والمعرفة المتخصصة',
    'features.title': 'مرر الفأرة وانقر لاستكشاف كل قسم',
    'features.subtitle': 'انقر على أي مجال للاطلاع على المواصفات التقنية وهندسة النظام والروابط المباشرة.',
    'features.clickHint': 'انقر للمزيد',
    'features.viewSpecs': 'عرض المواصفات والشركة والروابط →',

    // Copilot Chat
    'chat.title': 'اسأل أي شيء عبر مستندات مؤسستك',
    'chat.subtitle': 'مدعوم بنموذج Gemini 2.0 والبحث الدلالي المتقدم. كل إجابة تتضمن شارات توثيق موثوقة.',
    'chat.placeholder': 'اطرح سؤالاً حول الموارد البشرية أو الشؤون القانونية أو المبيعات...',
    'chat.askBtn': 'إرسال',
    'chat.thinking': 'جارٍ التفكير...',
    'chat.synthesizing': 'توليد إجابة موثوقة ومستندة إلى البيانات المعتمدة...',
    'chat.scope': 'النطاق',
    'chat.allDepts': 'جميع الأقسام',
    'chat.zeroHalluc': 'صفر هلوسة',
    'chat.verifiedCitations': 'اقتباسات موثقة',
    'chat.clearHistory': 'مسح سجل المحادثة؟',
    'chat.securityNote': 'يعتمد QueryCore AI فقط على مستندات الشركة المعتمدة مع عزل كامل للبيانات.',

    // Dashboard Hubs & Stats
    'dash.hubsTitle': 'مراكز المعرفة المؤسسية',
    'dash.hubsSubtitle': '(مرر فوق الصور لإظهار العروض النشطة)',
    'dash.exploreAll': 'استكشاف الكل',
    'dash.viewHub': 'عرض المركز ←',
    'dash.browseVault': 'تصفح الخزينة',
    'dash.askCopilot': 'اسأل المساعد الذكي',
    'dash.indexedFiles': 'ملفات مفهرسة',
    'dash.vectorChunks': 'أجزاء متجهة',
    'dash.precision': 'دقة RAG',
    'dash.latency': 'سرعة الاستجابة',
    'dash.goodMorning': 'صباح الخير',
    'dash.goodAfternoon': 'مساء الخير',
    'dash.goodEvening': 'مساء الخير',
    'dash.quickActions': 'إجراءات سريعة',

    // Knowledge Base Documents
    'docs.title': 'قاعدة المعرفة المؤسسية',
    'docs.subtitle': 'تصفح وابحث واستورد مستندات الشركة لاسترجاعها بدقة عبر المساعد الذكي',
    'docs.search': 'البحث في المستندات حسب العنوان أو الوسوم أو المحتوى...',
    'docs.upload': 'رفع مستند جديد',
    'docs.allDepts': 'جميع الأقسام',

    // Profile & Auth
    'profile.title': 'الملف الشخصي والأمان',
    'profile.subtitle': 'إدارة صلاحيات الوصول المؤسسية ونطاقات الأقسام ومفاتيح API',
    'profile.save': 'حفظ التعديلات',
    'profile.token': 'رمز تفويض API',
    'profile.copy': 'نسخ الرمز',
    'profile.copied': 'تم النسخ بنجاح!',
    'auth.signIn': 'تسجيل الدخول',
    'auth.register': 'إنشاء حساب جديد',
    'auth.email': 'البريد الإلكتروني للعمل',
    'auth.password': 'كلمة المرور',
    'auth.fullName': 'الاسم الكامل',
    'auth.department': 'القسم',
    'auth.backHome': 'العودة للرئيسية',
    'auth.welcomeBack': 'تسجيل الدخول إلى QueryCore',
    'auth.welcomeSub': 'مساعد المعرفة المؤسسية',
    'auth.joinTeam': 'انضم إلى QueryCore',
    'auth.instantDemo': 'دخول تجريبي فوري',
    'auth.noAccount': 'ليس لديك حساب بعد؟',
    'auth.haveAccount': 'لديك حساب بالفعل؟',

    // Floating Widget
    'widget.title': 'المساعد المؤسسي الذكي',
    'widget.live': 'طرح الأسئلة مباشرة',
    'widget.header': 'مساعد الذكاء الاصطناعي للمؤسسات',
    'widget.welcome': 'مرحباً! أنا المساعد المؤسسي لـ QueryCore. اسألني عن QueryCore أو الشركات العالمية أو منتجاتها ومواقعها!',
    'widget.inputPlaceholder': 'اطرح سؤالاً مؤسسياً...',
    'widget.analyzing': 'جارٍ تحليل المعرفة المؤسسية...'
  }
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('querycore_lang') || 'en';
  });

  const setLanguage = (langCode) => {
    setCurrentLang(langCode);
    localStorage.setItem('querycore_lang', langCode);
    document.documentElement.lang = langCode;
    // Handle RTL for Arabic
    if (langCode === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  };

  useEffect(() => {
    document.documentElement.lang = currentLang;
    if (currentLang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [currentLang]);

  const t = (key, fallback = '') => {
    const langDict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
    if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
      return TRANSLATIONS.en[key];
    }
    return fallback || key;
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, t, languages: LANGUAGES, currentLangObj }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      currentLang: 'en',
      setLanguage: () => {},
      t: (key, fallback) => fallback || key,
      languages: LANGUAGES,
      currentLangObj: LANGUAGES[0]
    };
  }
  return context;
}
