export type ServiceSlug =
  | 'engineering-development'
  | 'data-ai'
  | 'cloud-transformation'
  | 'digital-marketing';

export type ServiceOffering = {
  title: string;
  description: string;
  bullets: string[];
};

export type ServicePageData = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  tagline: string;
  heroDescription: string;
  accent: string;
  iconBg: string;
  heroImage: string;
  stats: { value: string; label: string }[];
  overview: string;
  overviewPoints: string[];
  offerings: ServiceOffering[];
  process: { step: string; detail: string }[];
  whyUs: string[];
};

export const SERVICE_PAGES: Record<ServiceSlug, ServicePageData> = {
  'engineering-development': {
    slug: 'engineering-development',
    title: 'Engineering & Development',
    shortTitle: 'Engineering',
    tagline: 'Build products that scale',
    heroDescription:
      'From MVPs to enterprise platforms - we design and ship web, mobile, and custom software with clean architecture and long-term maintainability.',
    accent: '#7f4adf',
    iconBg: 'rgba(127,74,223,0.12)',
    heroImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: '12+', label: 'Products shipped' },
      { value: '10+', label: 'Happy clients' },
      { value: '98%', label: 'Satisfaction' },
    ],
    overview:
      'Xenura’s engineering team partners with startups and growing businesses to turn ideas into reliable digital products. We combine product thinking, modern stacks, and disciplined delivery so every release is stable, secure, and ready to grow.',
    overviewPoints: [
      'User-centred UI/UX before a single line of production code',
      'React, Next.js, Node.js, and mobile-friendly architectures',
      'Code reviews, testing, and documentation built into sprints',
    ],
    offerings: [
      {
        title: 'Custom Software Development',
        description: 'Tailored business applications, portals, and internal tools.',
        bullets: ['Workflow automation', 'Role-based access', 'API integrations', 'Legacy modernisation'],
      },
      {
        title: 'Web & Mobile App Development',
        description: 'Responsive web apps and cross-platform mobile experiences.',
        bullets: ['React & Next.js', 'React Native / Flutter', 'Progressive web apps', 'App store delivery'],
      },
      {
        title: 'UI/UX Design',
        description: 'Interfaces that are clear, accessible, and conversion-focused.',
        bullets: ['User research', 'Wireframes & prototypes', 'Design systems', 'Usability testing'],
      },
      {
        title: 'E-commerce Solutions',
        description: 'Online stores and checkout flows built for growth.',
        bullets: ['Custom storefronts', 'Payment gateways', 'Inventory sync', 'Performance optimisation'],
      },
    ],
    process: [
      { step: 'Discover', detail: 'Goals, users, scope, and technical constraints.' },
      { step: 'Design', detail: 'UX flows, UI kit, and architecture blueprint.' },
      { step: 'Build', detail: 'Agile sprints with demos and QA each cycle.' },
      { step: 'Launch', detail: 'Deployment, monitoring, and post-launch support.' },
    ],
    whyUs: [
      'Senior engineers on every project - no hand-offs to juniors only',
      'Transparent timelines and weekly progress updates',
      'Security and performance considered from day one',
    ],
  },
  'data-ai': {
    slug: 'data-ai',
    title: 'Data & Artificial Intelligence',
    shortTitle: 'Data & AI',
    tagline: 'Turn data into decisions',
    heroDescription:
      'Practical AI, analytics, and data engineering - from dashboards and BI to Gen AI assistants and automation that saves your team hours every week.',
    accent: '#ff6b35',
    iconBg: 'rgba(255,107,53,0.1)',
    heroImage:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: 'AI-first', label: 'Delivery approach' },
      { value: '2', label: 'Years building' },
      { value: '10+', label: 'Use cases delivered' },
    ],
    overview:
      'We help teams adopt AI responsibly - starting with clear business outcomes, not hype. Whether you need executive dashboards, automated workflows, or custom models, Xenura builds solutions you can trust and maintain.',
    overviewPoints: [
      'Start with ROI: automate repetitive work before exotic models',
      'Secure data handling and access controls by design',
      'Integrations with your existing tools and cloud stack',
    ],
    offerings: [
      {
        title: 'AI & Machine Learning',
        description: 'Custom models for classification, forecasting, and recommendations.',
        bullets: ['Model training & tuning', 'MLOps basics', 'A/B evaluation', 'Production monitoring'],
      },
      {
        title: 'Generative AI',
        description: 'LLM-powered assistants, content tools, and knowledge bases.',
        bullets: ['RAG pipelines', 'Prompt engineering', 'Chat interfaces', 'Document Q&A'],
      },
      {
        title: 'Agentic AI',
        description: 'Multi-step AI workflows that act on your systems safely.',
        bullets: ['Task automation', 'Tool calling', 'Human-in-the-loop', 'Audit logs'],
      },
      {
        title: 'Data Analytics & BI',
        description: 'Dashboards and reports leaders actually use.',
        bullets: ['KPI design', 'Power BI / Looker-style views', 'Self-serve analytics', 'Executive reporting'],
      },
      {
        title: 'Data Engineering',
        description: 'Reliable pipelines from raw data to trusted datasets.',
        bullets: ['ETL / ELT', 'Warehousing', 'Data quality checks', 'Scheduled jobs'],
      },
    ],
    process: [
      { step: 'Assess', detail: 'Data sources, quality, and highest-value use cases.' },
      { step: 'Prototype', detail: 'Quick proof with real sample data.' },
      { step: 'Productionise', detail: 'Hardening, security, and observability.' },
      { step: 'Enable', detail: 'Training and handover for your team.' },
    ],
    whyUs: [
      'Business-led AI - we explain trade-offs in plain language',
      'Reusable patterns so you are not locked to one vendor',
      'Ongoing tuning as your data and needs evolve',
    ],
  },
  'cloud-transformation': {
    slug: 'cloud-transformation',
    title: 'Cloud & Transformation',
    shortTitle: 'Cloud',
    tagline: 'Modernise with confidence',
    heroDescription:
      'Cloud migration, DevOps, and digital transformation programmes that reduce downtime, improve security, and prepare your organisation for scalable growth.',
    accent: '#06b6d4',
    iconBg: 'rgba(6,182,212,0.1)',
    heroImage:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: '24/7', label: 'Monitoring mindset' },
      { value: '3', label: 'Cloud platforms' },
      { value: '12', label: 'Projects delivered' },
    ],
    overview:
      'Moving to the cloud is more than lifting servers - it is an opportunity to simplify operations, automate delivery, and strengthen security. Xenura guides migrations and builds the DevOps practices that keep releases fast and stable.',
    overviewPoints: [
      'Phased migrations to limit risk and business disruption',
      'Infrastructure as code and repeatable environments',
      'Cost visibility and right-sizing from the start',
    ],
    offerings: [
      {
        title: 'Cloud Solutions & Migration',
        description: 'Plan and execute moves to AWS, Azure, or GCP.',
        bullets: ['Assessment & roadmap', 'Lift-and-shift or refactor', 'Networking & IAM', 'Disaster recovery'],
      },
      {
        title: 'DevOps & Automation',
        description: 'CI/CD, containers, and reliable release pipelines.',
        bullets: ['Docker & Kubernetes', 'GitHub Actions / pipelines', 'Automated testing', 'Environment parity'],
      },
      {
        title: 'Digital Transformation',
        description: 'Modernise processes, systems, and team ways of working.',
        bullets: ['Legacy decomposition', 'API-first integration', 'Change management', 'Vendor evaluation'],
      },
    ],
    process: [
      { step: 'Audit', detail: 'Current stack, dependencies, and pain points.' },
      { step: 'Roadmap', detail: 'Prioritised phases with clear milestones.' },
      { step: 'Execute', detail: 'Migration and automation in controlled waves.' },
      { step: 'Operate', detail: 'Runbooks, alerts, and continuous improvement.' },
    ],
    whyUs: [
      'Pragmatic cloud choices - fit for your budget and team skills',
      'Security baselines aligned with common compliance needs',
      'Documentation your IT team can own after go-live',
    ],
  },
  'digital-marketing': {
    slug: 'digital-marketing',
    title: 'Digital Analytics Marketing',
    shortTitle: 'Marketing',
    tagline: 'Grow with measurable impact',
    heroDescription:
      'SEO, paid media, analytics, and content strategies tied to real business metrics - so every campaign informs the next and your funnel keeps improving.',
    accent: '#22c55e',
    iconBg: 'rgba(34,197,94,0.1)',
    heroImage:
      'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: 'ROI', label: 'Focused campaigns' },
      { value: '10+', label: 'Brands supported' },
      { value: '98%', label: 'Client retention' },
    ],
    overview:
      'Marketing works when tracking, creative, and landing experiences align. Xenura connects analytics, search, social, and automation so you see what drives leads - and double down on what works.',
    overviewPoints: [
      'Tracking setup before scaling ad spend',
      'Landing pages optimised for conversion, not just traffic',
      'Monthly reporting with clear next actions',
    ],
    offerings: [
      {
        title: 'Digital Analytics',
        description: 'Accurate measurement across web and campaigns.',
        bullets: ['GA4 / GTM setup', 'Conversion tracking', 'Attribution views', 'Custom dashboards'],
      },
      {
        title: 'Performance Marketing',
        description: 'Paid campaigns on Google, Meta, and more.',
        bullets: ['Account structure', 'Creative testing', 'Bid strategy', 'Budget optimisation'],
      },
      {
        title: 'SEO & Search Marketing',
        description: 'Organic visibility and qualified search traffic.',
        bullets: ['Technical SEO', 'Content strategy', 'On-page optimisation', 'Local SEO'],
      },
      {
        title: 'Social Media Marketing',
        description: 'Brand presence and engagement on key platforms.',
        bullets: ['Content calendars', 'Community management', 'Paid social', 'Influencer coordination'],
      },
      {
        title: 'Content Marketing',
        description: 'Blogs, landing pages, and copy that converts.',
        bullets: ['Topic research', 'SEO copywriting', 'Lead magnets', 'Email nurture content'],
      },
      {
        title: 'Marketing Automation',
        description: 'Workflows that nurture leads automatically.',
        bullets: ['CRM integration', 'Drip sequences', 'Scoring rules', 'Lifecycle triggers'],
      },
    ],
    process: [
      { step: 'Baseline', detail: 'Audit tracking, funnel, and competitors.' },
      { step: 'Plan', detail: 'Channel mix, budgets, and content calendar.' },
      { step: 'Execute', detail: 'Launch, test, and optimise weekly.' },
      { step: 'Report', detail: 'Insights and roadmap for the next quarter.' },
    ],
    whyUs: [
      'Marketing tied to engineering - fast landing page and form fixes',
      'Honest metrics - we focus on leads and revenue, not vanity numbers',
      'Flexible retainers or project-based engagements',
    ],
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_PAGES) as ServiceSlug[];

export function getServicePage(slug: string | undefined): ServicePageData | null {
  if (!slug || !(slug in SERVICE_PAGES)) return null;
  return SERVICE_PAGES[slug as ServiceSlug];
}

export const SERVICE_PATHS: Record<ServiceSlug, string> = {
  'engineering-development': '/services/engineering-development',
  'data-ai': '/services/data-ai',
  'cloud-transformation': '/services/cloud-transformation',
  'digital-marketing': '/services/digital-marketing',
};
