export const CONTACT_ENDPOINT = import.meta.env.PUBLIC_CONTACT_ENDPOINT ?? '';

export const SITE = {
  name: 'Riyan Sugiarto',
  role: 'Full-Stack Software Engineer',
  location: 'Jakarta, Indonesia',
  experience: '6+ years',
  currentRole: 'Software Engineer at PT Asuransi Kredit Indonesia (Askrindo), 2025–present',
  email: 'ryansgrt23@gmail.com',
  status: 'Open for Freelance',
  siteUrl: 'https://riyans.tech',
  title: 'Riyan Sugiarto — Full-Stack Software Engineer',
  description:
    'Riyan Sugiarto is a Full-Stack Software Engineer in Jakarta, Indonesia with 6+ years experience designing web applications, backend systems, APIs, databases, frontend UIs, and applied AI workflows. Open for Freelance.',
  positioning:
    'Full-Stack Software Engineer based in Indonesia (6+ years) who spends half the time designing backend systems, APIs, and databases, and the other half negotiating with CSS to center a div. I build products end-to-end — covering system architecture, frontend UIs, and applied AI workflows — so features actually ship without waiting three sprints for a handoff. Strong believer in maintainable code, pragmatic trade-offs, and not deploying Kubernetes just to serve a contact form.',
  exploringSummary:
    'Currently exploring autonomous AI agent workflows & Web3 fundamentals · Offline: playing casual adventure games.',
  cvUrl: '/Riyan%20Sugiarto%20Resume.pdf',
  cvFileName: 'Riyan Sugiarto Resume.pdf',
};

export const SOCIAL_LINKS = [
  { name: 'GitHub', label: '0xriyans', url: 'https://github.com/0xriyans', brandColor: '#24292e' },
  {
    name: 'LinkedIn',
    label: 'riyan-sugiarto',
    url: 'https://www.linkedin.com/in/riyan-sugiarto/',
    brandColor: '#0A66C2',
  },
  { name: 'X', label: '@0xriyans', url: 'https://twitter.com/0xriyans', brandColor: '#111827' },
  {
    name: 'Fiverr',
    label: 'riyansugiarto',
    url: 'https://www.fiverr.com/riyansugiarto',
    brandColor: '#1DBF73',
  },
  {
    name: 'Upwork',
    label: 'Top Rated Profile',
    url: 'https://www.upwork.com/freelancers/~0111240786693d428e',
    brandColor: '#14A800',
  },
  {
    name: 'Email',
    label: 'ryansgrt23@gmail.com',
    url: 'mailto:ryansgrt23@gmail.com',
    brandColor: '#22396F',
  },
] as const;

export const TRUST_COMPANIES = ['Askrindo', 'Prudential', 'MSIG', 'XL'] as const;

export const HERO_METRICS = [
  { numeric: 60, suffix: '%+', label: 'memory reduction' },
  { numeric: null, text: 'Withdrawal 2 hari → real-time', label: '' },
  { numeric: null, text: 'Zero-loss Kafka', label: '' },
] as const;

export interface ImpactSummaryCard {
  numeric: number | null;
  suffix?: string;
  headline?: string;
  label: string;
  detail: string;
}

export interface ImpactCaseItem {
  slug: string;
  period: string;
  company: string;
  title: string;
  screenshotKey?: string;
  external?: string;
  summary: string;
  outcomes: string[];
  tech: string[];
}

export const IMPACT_METRICS: ImpactSummaryCard[] = [
  {
    numeric: 60,
    suffix: '%+',
    label: 'Container Memory Saved',
    detail: 'Apache Flink -> Quarkus runtime migration (>1.5 GB -> <300 MB)',
  },
  {
    numeric: null,
    headline: 'Real-Time',
    label: 'Event Streaming SLA',
    detail: '2 business days -> live Kafka manual offset commits + IBM BPM/BRMS',
  },
  {
    numeric: 6,
    suffix: '+ Yrs',
    label: 'Microservices Migration',
    detail: 'Legacy SOAR / TIBCO monoliths refactored to Spring Boot & Spring Cloud',
  },
  {
    numeric: null,
    headline: 'Zero Race',
    label: 'ACID & Idempotent Locks',
    detail: 'Two-layer Redis mutex (NX EX) + SELECT ... FOR UPDATE + HTTP 200 webhooks',
  },
];

export const IMPACT_CASES: ImpactCaseItem[] = [
  {
    slug: 'askrindo-current',
    period: '2025 – Present',
    company: 'PT Asuransi Kredit Indonesia (Askrindo)',
    title: 'Insurtech Platforms & Payment Concurrency',
    screenshotKey: 'portal-bisnis-askrindo',
    external: 'https://insurtech.askrindo.co.id/',
    summary:
      'End-to-end architecture and H2H integration for Portal Bisnis Askrindo & AOS Jatim with Bank Jatim and PT AA Pialang Asuransi across 6 general insurance lines.',
    outcomes: [
      'Guarded Midtrans webhooks in two layers (Redis mutex SET lock:pay:{order_id} NX EX 30 + PostgreSQL SELECT ... FOR UPDATE) with idempotent HTTP 200 to eliminate race conditions.',
      'Delivered multi-facility premium calculation, restitution workflows, custom encryption & auth layers, and relational schemas across PostgreSQL & SQL Server.',
    ],
    tech: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'SQL Server', 'Redis', 'Midtrans'],
  },
  {
    slug: 'msig-life',
    period: '2024 – 2025',
    company: 'PT MSIG Life Indonesia',
    title: 'AI Onboarding, Voice Workflows & Agency Financing',
    screenshotKey: 'fortify',
    external: 'https://fortify.msiglife.co.id/',
    summary:
      'Distributed Spring Cloud microservices powering public policy submission (Fortify) and internal Agency Financing compensation/risk calculations (Andromeda).',
    outcomes: [
      'Integrated touchless OCR extraction, biometric Liveness Detection, and TTS / STT accessibility workflows with Kafka event streaming.',
      'Orchestrated active agent migrations via Spring Batch, gateway routing & OAuth2/JWT via Eureka + Zuul, and SQL tuning with MyBatis.',
    ],
    tech: [
      'Java',
      'Spring Cloud',
      'Apache Kafka',
      'Spring Batch',
      'OCR & Biometrics',
      'PostgreSQL',
    ],
  },
  {
    slug: 'xl-axiata',
    period: '2022 – 2023',
    company: 'PT XL Axiata',
    title: 'SOAR / TIBCO Monolith -> Microservices Modernization',
    summary:
      'Migrated legacy TIBCO / SOAR workflows to decentralized Spring Boot / Spring Cloud microservices supporting millions of mobile subscribers and XL Home telemetry.',
    outcomes: [
      'Delivered Info Paket, Info Quota (live stream caching), Incident Notification (SMS outage alerts), fulfillment-policy, and exponential-backoff subscriber retry.',
      'Built DB-partitioned bulk-imei-registration checked against national fraud registries, profiled with K6 load tests, SonarQube, and Kibana (ELK).',
    ],
    tech: ['Java', 'Spring Cloud', 'Solace', 'RabbitMQ', 'Oracle', 'PostgreSQL', 'Redis', 'K6'],
  },
  {
    slug: 'askrindo-relief',
    period: '2020 – 2022',
    company: 'PT Asuransi Kredit Indonesia (Askrindo)',
    title: 'Government Relief Sync, e-Materai & Guarantee Portals',
    screenshotKey: 'pen',
    external: 'https://askrindo.co.id/penjaminan-kmk-pen',
    summary:
      'Backend modules and Ministry of Finance (Kemenkeu) synchronization for Pemulihan Ekonomi Nasional (PEN), Agunan Bank Online, and Surety Bond Online.',
    outcomes: [
      'Automated e-Materai digital stamp acquisition at point-of-sale and accelerated bank collateral issuance up to Rp 10B (Class I) and Rp 5B (Class II).',
      'Built automated JasperReports / JRXML reconciliation pipelines and secured Nginx SSL/TLS API gateways with JWT/OAuth2.',
    ],
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'SQL Server', 'JasperReports', 'Nginx'],
  },
];

export const NAV_LINKS = [
  { label: 'Currently', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Stack', href: '#stack', id: 'stack' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' },
] as const;

export interface ProjectItem {
  slug: string;
  title: string;
  company: string;
  category?: string;
  description: string;
  tech: string[];
  diagram?: string;
  external?: string;
  featured?: boolean;
}

export const FEATURED_PROJECT: ProjectItem = {
  slug: 'pruhub',
  title: 'Pruhub Framework Migration & Withdrawals',
  company: 'Prudential',
  diagram: 'pruhub',
  featured: true,
  tech: ['Quarkus', 'Apache Kafka', 'PostgreSQL ACID Ledger', 'Couchbase', 'Kubernetes', 'Docker'],
  description:
    'Migrated Prudential’s Pruhub backend from Apache Flink to lightweight Quarkus microservices, cutting container memory from over 1.5 GB to under 300 MB (60%+ reduction). Transformed fund withdrawals from 2 business days to real-time execution with zero-loss Apache Kafka manual offset commit and a PostgreSQL ACID ledger.',
};

export const GRID_PROJECTS: ProjectItem[] = [
  {
    slug: 'portal-bisnis-askrindo',
    title: 'Portal Bisnis Askrindo',
    company: 'Askrindo',
    category: 'B2B / B2C Insurtech',
    external: 'https://insurtech.askrindo.co.id/',
    tech: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'Redis', 'Midtrans'],
    description:
      'B2B and B2C insurance platform guarding Midtrans payment concurrency in two layers: Redis mutex SET lock:pay:{order_id} NX EX 30 plus DB pessimistic lock SELECT ... FOR UPDATE, with idempotent HTTP 200 for losing webhooks.',
  },
  {
    slug: 'fortify',
    title: 'Fortify Digital Life Insurance',
    company: 'MSIG Life',
    category: 'AI e-KYC & Voice',
    external: 'https://fortify.msiglife.co.id/',
    tech: ['Java', 'Spring Boot', 'Apache Kafka', 'PostgreSQL', 'OCR & Biometrics', 'Docker'],
    description:
      'Digital life insurance onboarding platform integrating OCR document verification, biometric liveness detection, and TTS / STT pipelines backed by Spring Boot and Apache Kafka.',
  },
  {
    slug: 'andromeda',
    title: 'Andromeda Agency Financing',
    company: 'MSIG Life',
    category: 'Agency Financing Engine',
    external: 'https://andromeda.msiglife.co.id/',
    tech: ['Java', 'Spring Boot', 'Spring Cloud', 'PostgreSQL', 'SQL Server'],
    description:
      'Full-stack agency financing and compensation platform covering backend architecture, multi-database schemas across PostgreSQL and Microsoft SQL Server, and Java Spring Cloud services.',
  },
  {
    slug: 'pen',
    title: 'Pemulihan Ekonomi Nasional (PEN)',
    company: 'Askrindo',
    category: 'National Relief API',
    external: 'https://askrindo.co.id/penjaminan-kmk-pen',
    tech: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'SQL Server', 'JasperReports'],
    description:
      'Working capital loan guarantee platform for Indonesia’s PEN program featuring REST APIs, guarantee issuance workflows, and automated financial reconciliation.',
  },
];

/** Held out of the visible grid until dedicated screenshots / clips are ready. */
export const PENDING_MEDIA_PROJECTS: ProjectItem[] = [
  {
    slug: 'agunan-ematerai',
    title: 'Agunan Bank Online & e-Materai',
    company: 'Askrindo',
    diagram: 'ematerai',
    tech: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'SQL Server'],
    description:
      'Bank collateral guarantee portal integrating real-time electronic stamp duty (e-Materai) signing with the Ministry of Finance and automated reconciliation.',
  },
  {
    slug: 'surety-bond-online',
    title: 'Surety Bond Online',
    company: 'Askrindo',
    diagram: 'surety',
    tech: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'JasperReports'],
    description:
      'Digital surety bond issuance system automating bond applications, underwriting verification workflows, and guarantee certificate generation.',
  },
  {
    slug: 'pruservices-ai-ekyc',
    title: 'PruServices AI e-KYC',
    company: 'Prudential',
    diagram: 'pruservices',
    tech: ['Java', 'Spring Boot', 'Apache Kafka', 'PostgreSQL', 'OCR & Biometrics'],
    description:
      'Digital customer verification and e-KYC backend integrating automated OCR document extraction and biometric liveness checks with Apache Kafka auditing.',
  },
  {
    slug: 'xl-fulfillment-policy',
    title: 'XL Fulfillment Policy Engine',
    company: 'XL Axiata',
    diagram: 'xl-policy',
    tech: ['Java', 'Spring Boot', 'Spring Cloud', 'Oracle', 'MySQL'],
    description:
      'Core telecom fulfillment policy engine migrated from legacy SOAR / TIBCO workflows into decentralized Spring Boot / Spring Cloud microservices.',
  },
  {
    slug: 'xl-incident-notification',
    title: 'XL Incident Notification',
    company: 'XL Axiata',
    diagram: 'xl-incident',
    tech: ['Java', 'Spring Boot', 'Spring Cloud', 'Apache Kafka', 'PostgreSQL'],
    description:
      'Event-driven telecom incident alerting service routing real-time operational notifications across distributed service teams.',
  },
  {
    slug: 'xl-info-paket',
    title: 'XL Info Paket',
    company: 'XL Axiata',
    diagram: 'xl-paket',
    tech: ['Java', 'Spring Boot', 'Spring Cloud', 'Oracle', 'MySQL'],
    description:
      'High-throughput subscriber package information API built during the SOAR / TIBCO to Spring Boot microservices modernization.',
  },
  {
    slug: 'xl-info-quota',
    title: 'XL Info Quota',
    company: 'XL Axiata',
    diagram: 'xl-quota',
    tech: ['Java', 'Spring Boot', 'Spring Cloud', 'MySQL', 'MongoDB'],
    description:
      'Subscriber quota aggregation microservice normalizing usage buckets and balance queries behind low-latency REST endpoints.',
  },
  {
    slug: 'xl-bulk-imei',
    title: 'XL Bulk IMEI Registration',
    company: 'XL Axiata',
    diagram: 'xl-imei',
    tech: ['Java', 'Spring Boot', 'Apache Kafka', 'Oracle', 'Docker'],
    description:
      'Asynchronous batch processing pipeline handling bulk partner IMEI validation, queue-backed registration, and status tracking.',
  },
];

export const CORE_STACK_CARDS = [
  { name: 'Java', badge: 'Core', glyph: 'JVM', note: '6+ yrs production backend systems' },
  { name: 'Spring Boot', badge: 'API', glyph: 'SB', note: 'Microservices & Spring Cloud' },
  { name: 'Apache Kafka', badge: 'Stream', glyph: 'KFK', note: 'Zero-loss manual offset commits' },
  { name: 'PostgreSQL', badge: 'ACID', glyph: 'PG', note: 'Ledger & SELECT FOR UPDATE locks' },
  { name: 'Quarkus', badge: 'Cloud', glyph: 'QKS', note: 'Flink migration (<300 MB RAM)' },
  { name: 'Kubernetes', badge: 'K8s', glyph: 'K8S', note: 'Container orchestration' },
  { name: 'Docker', badge: 'Runtime', glyph: 'DKR', note: 'Lean production containers' },
] as const;

export const STACK_GROUPS = [
  {
    label: 'Languages',
    items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    label: 'Backend',
    items: ['Spring Boot', 'Spring Cloud', 'FastAPI', 'Quarkus', 'Node.js', 'Express'],
  },
  {
    label: 'AI & LLM',
    items: [
      'Google Gemini',
      'Anthropic',
      'OpenAI API',
      'LangChain',
      'Hugging Face',
      'Ollama',
      'RAG & Agents',
    ],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Vite', 'Angular'],
  },
  {
    label: 'Data & Messaging',
    items: [
      'PostgreSQL',
      'SQL Server',
      'MongoDB',
      'Redis',
      'SQLModel',
      'Apache Kafka',
      'RabbitMQ',
      'Couchbase',
      'MySQL',
      'Oracle',
    ],
  },
  {
    label: 'Infra & Tooling',
    items: ['Docker', 'Kubernetes', 'AWS', 'SonarQube', 'JUnit', 'Git', 'Postman'],
  },
] as const;

export const MARQUEE_ROW_1 = [
  'Python',
  'TypeScript',
  'JavaScript',
  'SQL',
  'Spring Cloud',
  'FastAPI',
  'Node.js',
  'Express',
  'Google Gemini',
  'Anthropic',
  'OpenAI API',
  'LangChain',
  'Hugging Face',
  'Ollama',
  'RAG & Agents',
] as const;

export const MARQUEE_ROW_2 = [
  'React',
  'Next.js',
  'Tailwind CSS',
  'Vite',
  'Angular',
  'SQL Server',
  'MongoDB',
  'Redis',
  'SQLModel',
  'RabbitMQ',
  'Couchbase',
  'MySQL',
  'Oracle',
  'AWS',
  'SonarQube',
  'JUnit',
  'Git',
  'Postman',
] as const;

export const EXPLORING_STACK = ['Solidity', 'Ethereum', 'Web3.js'] as const;

export interface ExperienceEntry {
  range: string;
  employer: string;
  periodTag: string;
  role: string;
  url: string;
  tech: string[];
  bullets: string[];
}

export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  {
    range: '2025 – Present',
    employer: 'PT Asuransi Kredit Indonesia (Askrindo)',
    periodTag: 'Current Period',
    role: 'Software Engineer',
    url: 'https://askrindo.co.id/',
    tech: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'SQL Server', 'Redis', 'Midtrans'],
    bullets: [
      'Build and maintain Portal Bisnis Askrindo across Java Spring Boot backend APIs and Angular workflows.',
      'Guard Midtrans payment concurrency in two layers: Redis mutex SET lock:pay:{order_id} NX EX 30 plus DB pessimistic lock SELECT ... FOR UPDATE, returning idempotent HTTP 200 for losing webhooks.',
    ],
  },
  {
    range: '2024 – 2025',
    employer: 'MSIG Life',
    periodTag: 'Digital Onboarding & Insurance',
    role: 'Full-Stack Software Engineer',
    url: 'https://www.msiglife.co.id/',
    tech: ['Java', 'Spring Cloud', 'Apache Kafka', 'Spring Batch', 'PostgreSQL', 'OCR / Liveness'],
    bullets: [
      'Delivered digital onboarding workflows for Fortify Digital Life Insurance and Andromeda Agency Financing.',
      'Integrated OCR document verification, biometric liveness detection, and TTS / STT services with Spring Boot and Apache Kafka.',
    ],
  },
  {
    range: '2023 – 2024',
    employer: 'Prudential',
    periodTag: 'Core & Payments Architecture',
    role: 'Backend Developer',
    url: 'https://www.prudential.co.id/',
    tech: ['Quarkus', 'Apache Kafka', 'PostgreSQL', 'Couchbase', 'IBM BPM / BRMS', 'Kubernetes'],
    bullets: [
      'Led Pruhub Flink-to-Quarkus migration, cutting container memory from over 1.5 GB to under 300 MB (60%+ reduction).',
      'Cut fund withdrawal processing from 2 business days to real-time backed by zero-loss Apache Kafka manual offset commit and a PostgreSQL ACID ledger.',
    ],
  },
  {
    range: '2022 – 2023',
    employer: 'XL Axiata',
    periodTag: 'Telecom Microservices',
    role: 'API Developer',
    url: 'https://www.xl.co.id/',
    tech: ['Java', 'Spring Boot', 'Spring Cloud', 'Solace', 'Oracle', 'K6', 'Kibana'],
    bullets: [
      'Migrated legacy SOAR / TIBCO integration workflows to Spring Boot and Spring Cloud microservices.',
      'Delivered XL Fulfillment Policy Engine, XL Incident Notification, XL Info Paket, XL Info Quota, and XL Bulk IMEI Registration.',
    ],
  },
  {
    range: '2020 – 2022',
    employer: 'PT Asuransi Kredit Indonesia (Askrindo)',
    periodTag: 'First Period',
    role: 'Full-Stack Developer',
    url: 'https://askrindo.co.id/',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'SQL Server', 'JasperReports', 'Nginx'],
    bullets: [
      'Engineered backend modules and Ministry of Finance (Kemenkeu) synchronization for Pemulihan Ekonomi Nasional (PEN).',
      'Built Agunan Bank Online with automated Kemenkeu e-Materai digital stamping and JasperReports / JRXML reconciliation.',
    ],
  },
];
