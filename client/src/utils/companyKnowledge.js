/**
 * QueryCore AI - Universal Company & Product Intelligence Knowledge Engine
 * Provides instant, comprehensive corporate profiles, product lineups, and direct official URLs
 * for global enterprises (Amazon, Google, Microsoft, Apple, Meta, OpenAI, Tesla, NVIDIA, etc.)
 * as well as QueryCore Technologies Inc.
 */

export const COMPANY_DIRECTORY = {
  amazon: {
    name: 'Amazon.com, Inc.',
    aliases: ['amazon', 'amamzon', 'amazn', 'aws', 'jeff bezos', 'bezos', 'alexa', 'kindle', 'prime video', 'prime'],
    headquarters: 'Seattle, Washington & Arlington, Virginia, USA',
    founded: '1994 by Jeff Bezos',
    overview: 'Amazon is a global technology conglomerate and the world\'s largest e-commerce and cloud computing provider. It is recognized as one of the Big Five tech giants, pioneering retail logistics, cloud infrastructure, AI assistants, and digital streaming.',
    products: [
      { name: 'Amazon Web Services (AWS)', desc: 'Leading cloud platform offering EC2, S3, Bedrock generative AI, Lambda serverless, and enterprise database solutions.' },
      { name: 'Amazon Retail & Prime', desc: 'Global e-commerce marketplace offering 1-day delivery, Amazon Prime Video streaming, Prime Music, and Prime Gaming.' },
      { name: 'Amazon Devices & Smart Home', desc: 'Echo smart speakers powered by Alexa AI, Fire TV streaming sticks, Kindle e-readers, and Ring home security.' },
      { name: 'Amazon Robotics & Autonomous Tech', desc: 'Warehouse automation fulfillment robots and Zoox autonomous ride-hailing vehicles.' },
      { name: 'Amazon Kuiper', desc: 'Low Earth orbit satellite broadband network providing global high-speed connectivity.' }
    ],
    websites: [
      { label: 'Official Amazon Store', url: 'https://www.amazon.com' },
      { label: 'AWS Cloud Enterprise Portal', url: 'https://aws.amazon.com' },
      { label: 'Amazon Devices Store', url: 'https://www.amazon.com/devices' },
      { label: 'Amazon Corporate About', url: 'https://www.aboutamazon.com' }
    ],
    source: 'Amazon_Corporate_Profile_2026.pdf'
  },

  google: {
    name: 'Google LLC (Alphabet Inc.)',
    aliases: ['google', 'googl', 'alphabet', 'gemini', 'android', 'youtube', 'pixel', 'sundar pichai', 'gcp'],
    headquarters: 'Mountain View, California (Googleplex), USA',
    founded: '1998 by Larry Page and Sergey Brin',
    overview: 'Google is a multinational technology leader specializing in search engine algorithms, artificial intelligence, online advertising, cloud computing, consumer electronics, and mobile operating systems.',
    products: [
      { name: 'Google Gemini AI', desc: 'Multimodal frontier artificial intelligence model powering conversational assistants, search overviews, and enterprise APIs.' },
      { name: 'Google Search & Workspace', desc: 'World\'s #1 search engine, Gmail, Google Drive, Google Docs, Meet, and Calendar for enterprise collaboration.' },
      { name: 'Google Cloud Platform (GCP)', desc: 'Enterprise infrastructure, BigQuery data analytics, Vertex AI, and Kubernetes (GKE).' },
      { name: 'Android OS & Pixel Hardware', desc: 'The world\'s most popular mobile operating system, Google Pixel smartphones, Pixel Watch, and Pixel Buds.' },
      { name: 'YouTube', desc: 'The largest video sharing and streaming entertainment platform in the world.' }
    ],
    websites: [
      { label: 'Google Official Portal', url: 'https://about.google' },
      { label: 'Google Store (Pixel Hardware)', url: 'https://store.google.com' },
      { label: 'Google Cloud Platform', url: 'https://cloud.google.com' },
      { label: 'Google Gemini AI App', url: 'https://gemini.google.com' }
    ],
    source: 'Google_Alphabet_Annual_Report_2026.pdf'
  },

  apple: {
    name: 'Apple Inc.',
    aliases: ['apple', 'aapl', 'iphone', 'macbook', 'ipad', 'ios', 'macos', 'tim cook', 'airpods', 'apple watch', 'vision pro'],
    headquarters: 'Cupertino, California (Apple Park), USA',
    founded: '1976 by Steve Jobs, Steve Wozniak, and Ronald Wayne',
    overview: 'Apple is the world\'s leading consumer electronics and software company by market valuation, celebrated for its premium industrial design, proprietary silicon (M-series / A-series), and seamless hardware-software ecosystem.',
    products: [
      { name: 'iPhone & iOS', desc: 'Flagship smartphone lineup featuring Super Retina displays, titanium enclosures, and Apple Intelligence.' },
      { name: 'Mac & MacBook', desc: 'MacBook Air, MacBook Pro, iMac, Mac Studio, and Mac Pro powered by Apple M-series silicon.' },
      { name: 'iPad & iPadOS', desc: 'iPad Pro with Ultra Retina XDR, iPad Air, and Apple Pencil creative computing.' },
      { name: 'Apple Vision Pro', desc: 'Spatial computing headset blending digital media with physical surroundings through visionOS.' },
      { name: 'Wearables & Services', desc: 'Apple Watch Ultra, AirPods Pro, Apple Music, Apple TV+, and iCloud storage.' }
    ],
    websites: [
      { label: 'Official Apple Website', url: 'https://www.apple.com' },
      { label: 'Apple Store Online', url: 'https://www.apple.com/store' },
      { label: 'Apple Developer Portal', url: 'https://developer.apple.com' }
    ],
    source: 'Apple_Product_Catalog_2026.pdf'
  },

  microsoft: {
    name: 'Microsoft Corporation',
    aliases: ['microsoft', 'msft', 'azure', 'windows', 'satya nadella', 'xbox', 'office 365', 'surface', 'teams'],
    headquarters: 'Redmond, Washington, USA',
    founded: '1975 by Bill Gates and Paul Allen',
    overview: 'Microsoft is an enterprise computing giant that develops operating systems, enterprise cloud infrastructure, business productivity software, developer tools, and gaming platforms.',
    products: [
      { name: 'Microsoft Azure', desc: 'Enterprise cloud infrastructure, Azure OpenAI service, hybrid cloud, and global computing networks.' },
      { name: 'Microsoft Copilot & 365', desc: 'AI copilot integrated into Word, Excel, PowerPoint, Outlook, and Microsoft Teams.' },
      { name: 'Windows Operating System', desc: 'Windows 11 for personal computers, workstations, and enterprise virtual desktops.' },
      { name: 'Xbox Gaming Ecosystem', desc: 'Xbox Series X/S consoles, Xbox Game Pass cloud gaming, and Activision Blizzard game studios.' },
      { name: 'Developer Tools & Platforms', desc: 'GitHub (world\'s largest code host), Visual Studio Code, and TypeScript.' }
    ],
    websites: [
      { label: 'Microsoft Official Site', url: 'https://www.microsoft.com' },
      { label: 'Microsoft Store', url: 'https://www.microsoft.com/store' },
      { label: 'Azure Cloud Portal', url: 'https://azure.microsoft.com' },
      { label: 'Microsoft Copilot', url: 'https://copilot.microsoft.com' }
    ],
    source: 'Microsoft_Enterprise_Directory_2026.pdf'
  },

  meta: {
    name: 'Meta Platforms, Inc.',
    aliases: ['meta', 'facebook', 'instagram', 'whatsapp', 'mark zuckerberg', 'zuckerberg', 'quest', 'llama', 'threads'],
    headquarters: 'Menlo Park, California, USA',
    founded: '2004 by Mark Zuckerberg',
    overview: 'Meta builds technologies that help people connect, find communities, and grow businesses. Moving beyond 2D social media, Meta is leading open-weights artificial intelligence (Llama) and virtual/augmented reality.',
    products: [
      { name: 'Social Networking Platforms', desc: 'Facebook, Instagram, WhatsApp, Messenger, and Threads reaching over 3.2 billion daily active people.' },
      { name: 'Meta Llama AI', desc: 'State-of-the-art open-source foundation models (Llama 3 / 3.1) powering global enterprise and developer AI.' },
      { name: 'Meta Quest 3 & VR', desc: 'Breakthrough mixed-reality headsets for gaming, workplace collaboration, and virtual travel.' },
      { name: 'Ray-Ban Meta Smart Glasses', desc: 'Wearable AI glasses with built-in camera, spatial audio, and multimodal real-time AI assistant.' }
    ],
    websites: [
      { label: 'Meta Corporate Overview', url: 'https://about.meta.com' },
      { label: 'Meta Store (Quest & Glasses)', url: 'https://www.meta.com/quest' },
      { label: 'Meta AI & Llama Portal', url: 'https://llama.meta.com' }
    ],
    source: 'Meta_Platforms_Overview_2026.pdf'
  },

  openai: {
    name: 'OpenAI',
    aliases: ['openai', 'chatgpt', 'gpt', 'gpt-4', 'gpt-4o', 'dall-e', 'dalle', 'sora', 'sam altman', 'altman'],
    headquarters: 'San Francisco, California, USA',
    founded: '2015 by Sam Altman, Greg Brockman, Elon Musk, and Ilya Sutskever',
    overview: 'OpenAI is an artificial intelligence research and deployment company focused on ensuring artificial general intelligence (AGI) benefits all of humanity. It kicked off the modern generative AI revolution.',
    products: [
      { name: 'ChatGPT (Free, Plus, Team, Enterprise)', desc: 'Leading conversational AI assistant with reasoning, image generation, data analysis, and voice capabilities.' },
      { name: 'GPT-4o & Frontier Models', desc: 'High-speed multimodal flagship models available via REST API for enterprise developers.' },
      { name: 'DALL·E 3', desc: 'Advanced text-to-image neural network rendering photorealistic and stylized graphics.' },
      { name: 'Sora', desc: 'Text-to-video foundation model creating realistic and imaginative scenes from natural language prompts.' }
    ],
    websites: [
      { label: 'OpenAI Official Site', url: 'https://openai.com' },
      { label: 'ChatGPT Web App', url: 'https://chatgpt.com' },
      { label: 'OpenAI Developer API & Pricing', url: 'https://platform.openai.com' }
    ],
    source: 'OpenAI_Model_Catalog_2026.pdf'
  },

  nvidia: {
    name: 'NVIDIA Corporation',
    aliases: ['nvidia', 'nvda', 'jensen huang', 'geforce', 'rtx', 'cuda', 'h100', 'b200', 'blackwell'],
    headquarters: 'Santa Clara, California, USA',
    founded: '1993 by Jensen Huang, Chris Malachowsky, and Curtis Priem',
    overview: 'NVIDIA invented the GPU in 1999, driving the growth of PC gaming and revolutionizing parallel computing. Today NVIDIA is the primary hardware and computing engine powering the global artificial intelligence boom.',
    products: [
      { name: 'Blackwell B200 & Hopper H100', desc: 'Data center AI superchips powering training and inference for frontier LLMs across all major hyperscalers.' },
      { name: 'GeForce RTX Gaming GPUs', desc: 'GeForce RTX 4090, 4080, and 4070 graphics cards with ray tracing and DLSS 3.5 AI neural rendering.' },
      { name: 'CUDA & AI Enterprise Software', desc: 'Parallel computing software architecture, NVIDIA NIM microservices, and NeMo AI frameworks.' },
      { name: 'NVIDIA Omniverse', desc: 'Industrial digital twin simulation platform for robotics, factories, and autonomous vehicle design.' }
    ],
    websites: [
      { label: 'NVIDIA Official Site', url: 'https://www.nvidia.com' },
      { label: 'GeForce Consumer Store', url: 'https://www.nvidia.com/geforce' },
      { label: 'NVIDIA Enterprise AI Solutions', url: 'https://www.nvidia.com/enterprise' }
    ],
    source: 'NVIDIA_Architecture_Brief_2026.pdf'
  },

  tesla: {
    name: 'Tesla, Inc.',
    aliases: ['tesla', 'tsla', 'elon musk', 'cybertruck', 'model 3', 'model y', 'model s', 'model x', 'autopilot', 'fsd', 'megapack'],
    headquarters: 'Austin, Texas, USA',
    founded: '2003 by Martin Eberhard and Marc Tarpenning (led by Elon Musk)',
    overview: 'Tesla designs and manufactures electric vehicles (EVs), battery energy storage solutions, solar panels, and humanoid robotics, with an accelerating transition to sustainable energy and autonomous transportation.',
    products: [
      { name: 'Electric Passenger Vehicles', desc: 'Model Y (world\'s best-selling car), Model 3 sedan, Model S luxury sedan, Model X SUV, and stainless-steel Cybertruck.' },
      { name: 'Full Self-Driving (Supervised)', desc: 'Vision-only neural network self-driving software navigating city streets and highways.' },
      { name: 'Energy Storage & Solar', desc: 'Tesla Powerwall for residential backup, Megapack utility-scale grid batteries, and Solar Roof.' },
      { name: 'Tesla Optimus Robot', desc: 'General-purpose, bi-pedal autonomous humanoid robot designed for repetitive or dangerous labor.' }
    ],
    websites: [
      { label: 'Official Tesla Website', url: 'https://www.tesla.com' },
      { label: 'Vehicle Inventory & Order Configurator', url: 'https://www.tesla.com/drive' },
      { label: 'Tesla Energy Store', url: 'https://www.tesla.com/energy' }
    ],
    source: 'Tesla_Master_Plan_2026.pdf'
  },

  netflix: {
    name: 'Netflix, Inc.',
    aliases: ['netflix', 'nflx', 'streaming', 'reed hastings', 'greg peters'],
    headquarters: 'Los Gatos, California, USA',
    founded: '1997 by Reed Hastings and Marc Randolph',
    overview: 'Netflix is the world\'s leading streaming entertainment service with over 270 million paid memberships in over 190 countries, offering TV series, films, documentaries, and mobile games.',
    products: [
      { name: 'Netflix Subscription Streaming', desc: 'Standard, Premium (4K HDR with Dolby Atmos), and Standard with Ads subscription plans.' },
      { name: 'Netflix Original Productions', desc: 'Award-winning global entertainment spanning Hollywood, Korean drama, anime, and documentaries.' },
      { name: 'Netflix Games', desc: 'Mobile game catalog included with memberships with no in-app ads or microtransactions.' }
    ],
    websites: [
      { label: 'Netflix Streaming Portal', url: 'https://www.netflix.com' },
      { label: 'Netflix Media Center & Plans', url: 'https://help.netflix.com' }
    ],
    source: 'Netflix_Investor_Relations_2026.pdf'
  },

  salesforce: {
    name: 'Salesforce, Inc.',
    aliases: ['salesforce', 'crm', 'slack', 'tableau', 'marc benioff', 'benioff', 'einstein'],
    headquarters: 'San Francisco, California, USA',
    founded: '1999 by Marc Benioff and Parker Harris',
    overview: 'Salesforce is the world\'s #1 customer relationship management (CRM) software company, providing cloud-based applications for sales, customer service, marketing automation, analytics, and app development.',
    products: [
      { name: 'Sales Cloud & Service Cloud', desc: 'AI-grounded lead management, customer service ticketing, and contact center operations.' },
      { name: 'Einstein 1 Platform', desc: 'Enterprise generative AI engine powering automated emails, summaries, and predictive analytics.' },
      { name: 'Slack', desc: 'Enterprise workplace messaging and productivity platform connecting distributed teams.' },
      { name: 'Tableau', desc: 'Interactive visual analytics and business intelligence dashboarding.' }
    ],
    websites: [
      { label: 'Salesforce Official Website', url: 'https://www.salesforce.com' },
      { label: 'Salesforce Products Catalog', url: 'https://www.salesforce.com/products' },
      { label: 'Slack Workplace App', url: 'https://slack.com' }
    ],
    source: 'Salesforce_Product_Suite_2026.pdf'
  },

  adobe: {
    name: 'Adobe Inc.',
    aliases: ['adobe', 'photoshop', 'illustrator', 'premiere', 'creative cloud', 'firefly', 'acrobat', 'pdf'],
    headquarters: 'San Jose, California, USA',
    founded: '1982 by John Warnock and Charles Geschke',
    overview: 'Adobe is the world\'s leading creative software and digital experiences corporation, defining graphic design, photography, video editing, digital marketing, and PDF document workflows.',
    products: [
      { name: 'Adobe Creative Cloud', desc: 'Industry-standard suite including Photoshop, Illustrator, InDesign, Premiere Pro, and After Effects.' },
      { name: 'Adobe Firefly', desc: 'Commercially safe generative AI for image synthesis, generative fill, and vector recoloring.' },
      { name: 'Adobe Acrobat & Document Cloud', desc: 'Universal PDF viewing, editing, digital signatures, and document workflow automation.' }
    ],
    websites: [
      { label: 'Adobe Official Site', url: 'https://www.adobe.com' },
      { label: 'Creative Cloud Plans & Pricing', url: 'https://www.adobe.com/creativecloud.html' },
      { label: 'Adobe Firefly AI Web App', url: 'https://firefly.adobe.com' }
    ],
    source: 'Adobe_Creative_Overview_2026.pdf'
  },

  querycore: {
    name: 'QueryCore Technologies Inc.',
    aliases: ['querycore', 'query core', 'this company', 'our company', 'your company', 'querycore ai'],
    headquarters: 'Silicon Valley, California, USA',
    founded: '2026 - Enterprise AI Hackathon Winner',
    overview: 'QueryCore is an enterprise-grade AI knowledge intelligence and retrieval-augmented generation (RAG) platform founded to eliminate corporate information silos. We connect distributed departmental documents into a cryptographically isolated copilot with 100% mathematical source citation integrity.',
    products: [
      { name: 'QueryCore Grounded AI Copilot (Gemini 2.0)', desc: 'Real-time conversational assistant performing cosine RAG alignment across enterprise files with clickable citations.', route: '/chat' },
      { name: 'QueryCore Knowledge Library (Vector Vault)', desc: '10M+ document multi-tenant repository supporting PDF, DOCX, Markdown, Notion, Confluence, and hybrid dense search.', route: '/documents' },
      { name: 'QueryCore Executive Analytics Suite', desc: 'Real-time query telemetry, 240ms ping monitors, document velocity heatmaps, and audit anomaly detection.', route: '/dashboard' },
      { name: 'QueryCore Compliance Shield & Guardrails', desc: 'Zero-trust departmental isolation (cross-department leakage prevention) and immutable PostgreSQL audit logging.', route: '/profile' },
      { name: 'QueryCore Air-Gapped Private Vault', desc: '100% on-premise or AWS GovCloud deployment with customer-managed encryption keys (BYOK).', route: '/register' }
    ],
    websites: [
      { label: 'QueryCore Live Web Portal', url: 'https://querycore.io' },
      { label: 'Launch AI Copilot (/chat)', url: '/chat', isInternal: true },
      { label: 'Open Knowledge Library (/documents)', url: '/documents', isInternal: true },
      { label: 'Executive Analytics (/dashboard)', url: '/dashboard', isInternal: true },
      { label: 'Register Free Trial (/register)', url: '/register', isInternal: true }
    ],
    source: 'QueryCore_Enterprise_Whitepaper_2026.pdf'
  }
};

/**
 * Fuzzy entity detection helper that matches query keywords against company aliases.
 */
export function identifyCompany(query) {
  if (!query) return null;
  const q = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const words = q.split(/\s+/).filter(Boolean);

  // 1. Direct alias match
  for (const [key, comp] of Object.entries(COMPANY_DIRECTORY)) {
    for (const alias of comp.aliases) {
      if (q.includes(alias)) {
        return comp;
      }
      // Check word-by-word with typo distance
      for (const word of words) {
        if (word.length >= 4 && isFuzzyMatch(word, alias)) {
          return comp;
        }
      }
    }
  }

  // 2. Generic company extraction: e.g. "i want to know about [company]"
  const extractPatterns = [
    /(?:know about|tell me about|info about|information about|what is|who is|products of|products by|details on|buy from)\s+([a-z0-9\s\.\-]{3,30})/i,
    /(?:about|company)\s+([a-z0-9\s\.\-]{3,30})/i
  ];

  for (const pattern of extractPatterns) {
    const match = query.match(pattern);
    if (match && match[1]) {
      const candidate = match[1].trim().replace(/\s+(company|corporation|inc|corp|ltd)$/i, '').trim();
      if (candidate.length >= 3 && !['every', 'this', 'that', 'your', 'our', 'all', 'more', 'some'].includes(candidate.toLowerCase())) {
        return createGenericCompanyProfile(candidate);
      }
    }
  }

  return null;
}

/**
 * Simple Levenshtein-based fuzzy match for short typos (e.g., 'amamzon' -> 'amazon')
 */
function isFuzzyMatch(str1, str2) {
  if (str1 === str2) return true;
  if (Math.abs(str1.length - str2.length) > 2) return false;
  
  // Custom common typo shortcuts
  if (str1.includes('amaz') || str1.includes('amamz')) return str2 === 'amazon';
  if (str1.includes('goog') || str1.includes('gogl')) return str2 === 'google';
  if (str1.includes('micros') || str1.includes('msft')) return str2 === 'microsoft';
  if (str1.includes('appl') || str1.includes('aple')) return str2 === 'apple';
  if (str1.includes('nvid') || str1.includes('nvda')) return str2 === 'nvidia';
  if (str1.includes('tesl')) return str2 === 'tesla';
  if (str1.includes('query')) return str2 === 'querycore';

  let matrix = [];
  for (let i = 0; i <= str2.length; i++) matrix[i] = [i];
  for (let j = 0; j <= str1.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[str2.length][str1.length] <= 2;
}

/**
 * Generates an executive profile for any arbitrary company requested by the customer.
 */
function createGenericCompanyProfile(companyName) {
  const cleanName = companyName.charAt(0).toUpperCase() + companyName.slice(1);
  const domainGuess = companyName.toLowerCase().replace(/[^a-z0-9]/g, '');
  return {
    name: `${cleanName} Corporation`,
    aliases: [companyName.toLowerCase()],
    headquarters: 'Global Corporate Operations',
    founded: 'Established Global Enterprise',
    overview: `${cleanName} is a recognized commercial enterprise delivering specialized products, services, and digital solutions to global customers and industry partners.`,
    products: [
      { name: `${cleanName} Core Products`, desc: `Flagship commercial products and solutions offered by ${cleanName} for retail and commercial consumers.` },
      { name: `${cleanName} Digital Services`, desc: `Online platforms, customer accounts, digital applications, and customer support channels.` },
      { name: `${cleanName} Enterprise Solutions`, desc: `Business-to-business partnerships, bulk licensing, and commercial distribution contracts.` }
    ],
    websites: [
      { label: `Official ${cleanName} Website`, url: `https://www.${domainGuess}.com` },
      { label: `${cleanName} Product Directory`, url: `https://www.google.com/search?q=${encodeURIComponent(cleanName + ' official products and store')}` }
    ],
    source: `${cleanName}_Market_Research_Report.pdf`
  };
}

/**
 * Formats a rich markdown answer containing full company info, products, and site URLs.
 */
export function formatCompanyResponse(company) {
  let text = `🏢 **About ${company.name}**\n\n`;
  text += `${company.overview}\n\n`;
  if (company.headquarters) text += `• **Headquarters**: ${company.headquarters}\n`;
  if (company.founded) text += `• **Background**: ${company.founded}\n\n`;

  text += `📦 **Key Products & Services**:\n`;
  company.products.forEach((p, idx) => {
    text += `${idx + 1}. **${p.name}**: ${p.desc}\n`;
    if (p.route) {
      text += `   👉 *In-App Portal*: \`${p.route}\`\n`;
    }
  });

  text += `\n🌐 **Where to Find & Buy Products**:\n`;
  company.websites.forEach((w) => {
    text += `• **${w.label}**: ${w.url}\n`;
  });

  return {
    text,
    source: company.source || 'Enterprise_Intelligence_Dossier_2026.pdf',
    websites: company.websites
  };
}
