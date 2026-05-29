
import type { ReactNode } from 'react';

export type BlogSection = {
  heading?: string;
  body: string;
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  category: string;
  categoryClass: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  thumb: ReactNode;
  heroLabel: string;
  heroStats: string[];
  sections: BlogSection[];
};

const makeDots = (countX: number, countY: number, stepX: number, stepY: number, radius: string, fill: string) =>
  Array.from({ length: countX }).flatMap((_, i) =>
    Array.from({ length: countY }).map((_, j) => (
      <circle key={`${i}-${j}`} cx={20 + i * stepX} cy={18 + j * stepY} r={radius} fill={fill} />
    )),
  );

export const blogPosts: BlogPost[] = [
  {
    slug: '/blog/ai-first-development-strategy-2025',
    category: 'Tech Insights',
    categoryClass: 'text-[#7f4adf] bg-[#7f4adf]/8 border border-[#7f4adf]/20',
    title: 'Why every business needs an AI-first development strategy in 2025',
    excerpt:
      'Companies that embed AI into their core product architecture are shipping features 3× faster and at half the operational cost. Here\'s the roadmap Xenura uses with every client.',
    readTime: '6 min read',
    date: 'May 8, 2025',
    heroLabel: 'AI-First Strategy',
    heroStats: ['3× Faster', '50% Cost Cut'],
    thumb: (
      <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
        <defs>
          <linearGradient id="b1g" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#eaecf8" />
            <stop offset="1" stopColor="#e4e0f8" />
          </linearGradient>
        </defs>
        <rect width="320" height="180" fill="url(#b1g)" />
        {makeDots(8, 5, 40, 36, '1.5', 'rgba(127,74,223,0.1)')}
        <circle cx="160" cy="80" r="44" fill="rgba(127,74,223,0.08)" stroke="rgba(127,74,223,0.15)" strokeWidth="1" />
        <circle cx="160" cy="80" r="28" fill="rgba(127,74,223,0.12)" stroke="rgba(127,74,223,0.2)" strokeWidth="1" />
        <text x="160" y="87" textAnchor="middle" fontSize="26" fontFamily="sans-serif">🧠</text>
        {[45, 90, 135, 180, 225, 270].map((deg, i) => {
          const r = 68;
          const cx = 160 + r * Math.cos((deg * Math.PI) / 180);
          const cy = 80 + r * Math.sin((deg * Math.PI) / 180);
          const glyphs = ['💡', '📊', '⚡', '🔗', '📱', '🌐'];
          return (
            <g key={i}>
              <line x1="160" y1="80" x2={cx} y2={cy} stroke="rgba(127,74,223,0.2)" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx={cx} cy={cy} r="10" fill="white" stroke="rgba(127,74,223,0.2)" strokeWidth="0.8" />
              <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fontFamily="sans-serif">
                {glyphs[i]}
              </text>
            </g>
          );
        })}
        <rect x="10" y="148" width="88" height="22" rx="5" fill="rgba(127,74,223,0.12)" stroke="rgba(127,74,223,0.25)" strokeWidth="0.8" />
        <text x="54" y="163" textAnchor="middle" fontSize="9.5" fill="#7f4adf" fontFamily="sans-serif" fontWeight="600">
          AI-First Strategy
        </text>
        <rect x="112" y="148" width="88" height="22" rx="5" fill="rgba(255,107,53,0.12)" stroke="rgba(255,107,53,0.25)" strokeWidth="0.8" />
        <text x="156" y="163" textAnchor="middle" fontSize="9.5" fill="#ff6b35" fontFamily="sans-serif" fontWeight="600">
          3× Faster
        </text>
        <rect x="214" y="148" width="94" height="22" rx="5" fill="rgba(6,182,212,0.12)" stroke="rgba(6,182,212,0.25)" strokeWidth="0.8" />
        <text x="261" y="163" textAnchor="middle" fontSize="9.5" fill="#06b6d4" fontFamily="sans-serif" fontWeight="600">
          50% Cost Cut
        </text>
      </svg>
    ),
    sections: [
      {
        heading: 'What AI-first actually means',
        body:
          'An AI-first strategy does not mean adding a chatbot to the edge of a product. It means designing your workflows, data model, and product decisions so AI can automate repetitive work, improve decision quality, and help teams ship faster.',
      },
      {
        heading: 'Where the gains come from',
        body:
          'The biggest wins usually come from a handful of high-frequency tasks: customer support triage, internal knowledge retrieval, content generation, and QA assistance. When those are built into the product architecture instead of bolted on later, teams cut cycle time and reduce manual overhead.',
        bullets: ['Identify repeatable product workflows', 'Connect trusted company data', 'Introduce AI where it saves time, not where it adds noise'],
      },
      {
        heading: 'How Xenura approaches delivery',
        body:
          'We start with one workflow, define clear guardrails, and measure before scaling. That makes the rollout safer, cheaper, and easier for teams to adopt.',
      },
      {
        heading: 'A practical rollout plan',
        body:
          'The best AI programs begin with a narrow use case and a clean feedback loop. We usually map the process, identify the decision points, add human approval where risk is high, and then iterate until the workflow is fast enough to trust.',
        bullets: ['Start with one measurable workflow', 'Add guardrails and human review', 'Track speed, cost, and adoption together'],
      },
      {
        heading: 'What teams should avoid',
        body:
          'Do not spread AI across every surface at once. Unfocused implementations create confusion, extra cost, and inconsistent experiences. Keep the first release small, visible, and tied to a business result so momentum stays high.',
      },
    ],
  },
  {
    slug: '/blog/cloud-microservices-operational-overhead',
    category: 'Cloud & DevOps',
    categoryClass: 'text-[#06b6d4] bg-[#06b6d4]/8 border border-[#06b6d4]/20',
    title: 'Cloud microservices reduce operational overhead by 60% - here\'s how',
    excerpt:
      'Migrating a monolithic application to microservices is a major undertaking. This breakdown covers the architecture decisions, pitfalls, and the exact ROI our clients achieved.',
    readTime: '8 min read',
    date: 'Apr 22, 2025',
    heroLabel: 'Cloud & DevOps',
    heroStats: ['60% Cost Reduction', '99.99% Uptime'],
    thumb: (
      <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
        <defs>
          <linearGradient id="b2g" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#eaf9fc" />
            <stop offset="1" stopColor="#e0f5fb" />
          </linearGradient>
        </defs>
        <rect width="320" height="180" fill="url(#b2g)" />
        <ellipse cx="160" cy="55" rx="65" ry="28" fill="white" stroke="rgba(6,182,212,0.3)" strokeWidth="1.2" />
        <ellipse cx="120" cy="62" rx="30" ry="22" fill="white" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />
        <ellipse cx="200" cy="62" rx="30" ry="22" fill="white" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />
        <text x="160" y="62" textAnchor="middle" fontSize="18" fontFamily="sans-serif">☁️</text>
        {[80, 160, 240].map(x => (
          <line key={x} x1="160" y1="78" x2={x} y2="106" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" strokeDasharray="4,3" />
        ))}
        {[
          { x: 28, label: 'API Gateway', sub: 'Route & Auth' },
          { x: 108, label: 'Microservice', sub: 'Payment' },
          { x: 188, label: 'Microservice', sub: 'Orders' },
        ].map(s => (
          <g key={s.x}>
            <rect x={s.x} y="106" width="84" height="40" rx="8" fill="white" stroke="rgba(6,182,212,0.25)" strokeWidth="0.8" />
            <text x={s.x + 42} y="122" textAnchor="middle" fontSize="9" fill="#0369a1" fontFamily="sans-serif" fontWeight="600">
              {s.label}
            </text>
            <text x={s.x + 42} y="136" textAnchor="middle" fontSize="8.5" fill="#5f6f8a" fontFamily="sans-serif">
              {s.sub}
            </text>
          </g>
        ))}
        <rect x="10" y="155" width="90" height="18" rx="4" fill="rgba(6,182,212,0.1)" />
        <text x="55" y="167" textAnchor="middle" fontSize="9" fill="#0369a1" fontFamily="sans-serif" fontWeight="600">
          AWS · Azure · GCP
        </text>
        <rect x="116" y="155" width="88" height="18" rx="4" fill="rgba(6,182,212,0.1)" />
        <text x="160" y="167" textAnchor="middle" fontSize="9" fill="#0369a1" fontFamily="sans-serif" fontWeight="600">
          60% Cost Reduction
        </text>
        <rect x="220" y="155" width="90" height="18" rx="4" fill="rgba(6,182,212,0.1)" />
        <text x="265" y="167" textAnchor="middle" fontSize="9" fill="#0369a1" fontFamily="sans-serif" fontWeight="600">
          99.99% Uptime
        </text>
      </svg>
    ),
    sections: [
      {
        heading: 'Start with the right split',
        body:
          'Microservices work best when you split around business capabilities, not technical layers. The goal is to isolate change, reduce blast radius, and let teams deploy independently.',
      },
      {
        heading: 'Avoid the common traps',
        body:
          'The fastest way to lose the benefits of microservices is to over-fragment too early. Too many services create coordination overhead, duplicate logic, and expensive observability gaps.',
        bullets: ['Keep services aligned to business domains', 'Standardize logging, tracing, and deployment', 'Move only the bottlenecks that justify the cost'],
      },
      {
        heading: 'Why the ROI improves',
        body:
          'Once the architecture is stable, teams ship smaller changes, incidents are easier to isolate, and cloud spend becomes more predictable. That is where the 60% overhead reduction comes from.',
      },
      {
        heading: 'The architecture pattern that works best',
        body:
          'A durable migration path usually starts by carving out one service boundary that already has clear ownership and separate scaling needs. From there, you move the surrounding dependencies one by one instead of attempting a full rewrite.',
        bullets: ['Pick one bounded domain first', 'Introduce an API gateway or edge layer', 'Move data ownership gradually instead of all at once'],
      },
      {
        heading: 'Operational discipline matters',
        body:
          'Microservices only pay off when observability, release discipline, and automated testing keep pace with the architecture. Strong CI/CD, tracing, alerts, and rollback playbooks are what turn complexity into resilience.',
      },
    ],
  },
  {
    slug: '/blog/zero-trust-security-guide',
    category: 'Security',
    categoryClass: 'text-[#ff6b35] bg-[#ff6b35]/8 border border-[#ff6b35]/20',
    title: 'The Xenura Security Guide: Zero Trust, monitoring, and incident readiness',
    excerpt:
      'Security is no longer a checklist. This guide explains how we build practical Zero Trust controls, detection pipelines, and response playbooks into modern delivery teams.',
    readTime: '7 min read',
    date: 'Mar 14, 2025',
    heroLabel: 'Security Guide',
    heroStats: ['Zero Trust', '24/7 Monitoring'],
    thumb: (
      <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
        <defs>
          <linearGradient id="b3g" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#fff2ea" />
            <stop offset="1" stopColor="#ffe8db" />
          </linearGradient>
        </defs>
        <rect width="320" height="180" fill="url(#b3g)" />
        <circle cx="260" cy="44" r="26" fill="#12346a" />
        <path d="M252 44l6 7 12-14" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M42 98 C 88 88, 102 70, 128 56 S 194 32, 228 26" fill="none" stroke="#12346a" strokeWidth="6" strokeLinecap="round" />
        <path d="M228 26 L212 25 L219 11" fill="none" stroke="#12346a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        {[58, 108, 158, 208].map((x, index) => (
          <rect key={x} x={x} y={index === 0 ? 110 : index === 1 ? 88 : index === 2 ? 62 : 38} width="42" height={index === 0 ? 32 : index === 1 ? 54 : index === 2 ? 76 : 98} rx="8" fill="#ff6b35" opacity={0.35 + index * 0.15} />
        ))}
        <rect x="18" y="20" width="100" height="20" rx="6" fill="rgba(18,52,106,0.08)" />
        <text x="68" y="34" textAnchor="middle" fontSize="10" fill="#12346a" fontFamily="sans-serif" fontWeight="700">
          Zero Trust
        </text>
        <rect x="18" y="145" width="120" height="18" rx="4" fill="rgba(18,52,106,0.08)" />
        <text x="78" y="157" textAnchor="middle" fontSize="9" fill="#12346a" fontFamily="sans-serif" fontWeight="700">
          Security Guide
        </text>
        <rect x="150" y="145" width="74" height="18" rx="4" fill="rgba(255,107,53,0.14)" />
        <text x="187" y="157" textAnchor="middle" fontSize="9" fill="#ff6b35" fontFamily="sans-serif" fontWeight="700">
          Monitoring
        </text>
        <rect x="234" y="145" width="68" height="18" rx="4" fill="rgba(18,52,106,0.08)" />
        <text x="268" y="157" textAnchor="middle" fontSize="9" fill="#12346a" fontFamily="sans-serif" fontWeight="700">
          IR Plan
        </text>
      </svg>
    ),
    sections: [
      {
        heading: 'Security is part of delivery',
        body:
          'The most reliable teams do not treat security as a final review step. They embed it into identity, deployment, observability, and incident response from the start.',
      },
      {
        heading: 'The practical Zero Trust stack',
        body:
          'Zero Trust works best when it is applied in layers: identity verification, least-privilege access, continuous logging, and automated alerting around high-risk actions.',
        bullets: ['Enforce MFA and role-based access', 'Log critical admin and release events', 'Create a response path before an incident happens'],
      },
      {
        heading: 'What readiness looks like',
        body:
          'A team is ready when it can detect suspicious behavior quickly, isolate impact, and restore service with a documented process. That is what this guide helps clients implement.',
      },
      {
        heading: 'Monitoring should be useful, not noisy',
        body:
          'Security monitoring becomes effective only when alerts are tuned to real risk. We focus on a small set of high-signal events, clear ownership, and a response path that the team can execute without hesitation.',
        bullets: ['Track privileged actions and unusual logins', 'Create escalation paths for critical systems', 'Review alerts weekly to reduce noise'],
      },
      {
        heading: 'Build the response muscle',
        body:
          'Incident readiness is a practice, not a document. Tabletop exercises, access reviews, and recovery drills make the response plan real, which is what reduces the business impact when something does go wrong.',
      },
    ],
  },
];

export const getBlogPostBySlug = (slug: string) => blogPosts.find(post => post.slug === slug);
