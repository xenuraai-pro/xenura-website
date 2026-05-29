import { LucideIcon, Building2, Stethoscope, BarChart3, Bot, Truck, GraduationCap } from 'lucide-react';

interface ShowcaseItem {
  title: string;
  description: string;
  metric: string;
  metricColor: string;
  icon: LucideIcon;
  thumb: React.ReactNode;
}

/* ── SVG Thumbnails ── */
const EcomThumb = () => (
  <svg viewBox="0 0 340 160" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
    <defs><linearGradient id="ec1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#1a0a30" /><stop offset="1" stopColor="#2d1060" /></linearGradient></defs>
    <rect width="340" height="160" fill="url(#ec1)" />
    {Array.from({ length: 10 }).map((_, i) => Array.from({ length: 5 }).map((_, j) => (<circle key={`${i}-${j}`} cx={17 + i * 34} cy={16 + j * 32} r="1" fill="rgba(127,74,223,0.15)" />)))}
    <rect x="12" y="12" width="316" height="30" rx="6" fill="rgba(255,255,255,0.06)" />
    <text x="24" y="32" fontSize="11" fill="#9b6bf2" fontFamily="sans-serif" fontWeight="700">🛒 Xenura Commerce</text>
    <rect x="280" y="18" width="44" height="16" rx="4" fill="#7f4adf" />
    <text x="302" y="29" textAnchor="middle" fontSize="8" fill="white" fontFamily="sans-serif" fontWeight="600">+ Order</text>
    {[{ x: 12, v: '₹4.2L', l: 'Revenue', c: '#9b6bf2' }, { x: 92, v: '186', l: 'Orders', c: '#ff6b35' }, { x: 172, v: '620', l: 'Users', c: '#06b6d4' }, { x: 252, v: '4.8★', l: 'Rating', c: '#22c55e' }].map(s => (
      <g key={s.x}>
        <rect x={s.x} y={52} width={74} height={50} rx="7" fill="rgba(255,255,255,0.05)" stroke="rgba(127,74,223,0.2)" strokeWidth="0.7" />
        <text x={s.x + 37} y={74} textAnchor="middle" fontSize="16" fill={s.c} fontFamily="sans-serif" fontWeight="700">{s.v}</text>
        <text x={s.x + 37} y={89} textAnchor="middle" fontSize="7.5" fill="#6b8aac" fontFamily="sans-serif">{s.l}</text>
      </g>
    ))}
    {[{ x: 12, l: 'Nike Air Max', p: '₹8,999' }, { x: 117, l: 'MacBook Pro', p: '₹1,29,900' }, { x: 222, l: 'iPhone 15', p: '₹79,900' }].map(p => (
      <g key={p.x}>
        <rect x={p.x} y={112} width={100} height={38} rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(127,74,223,0.15)" strokeWidth="0.7" />
        <text x={p.x + 8} y={128} fontSize="8.5" fill="#c8d4e8" fontFamily="sans-serif">{p.l}</text>
        <text x={p.x + 8} y={141} fontSize="8" fill="#9b6bf2" fontFamily="sans-serif" fontWeight="600">{p.p}</text>
      </g>
    ))}
  </svg>
);

const HealthThumb = () => (
  <svg viewBox="0 0 340 160" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
    <defs><linearGradient id="hc1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#0a2a18" /><stop offset="1" stopColor="#0e3d24" /></linearGradient></defs>
    <rect width="340" height="160" fill="url(#hc1)" />
    <rect x="12" y="12" width="316" height="28" rx="6" fill="rgba(255,255,255,0.05)" />
    <text x="24" y="30" fontSize="11" fill="#22c55e" fontFamily="sans-serif" fontWeight="700">🏥 HealthXenura</text>
    <circle cx="306" cy="26" r="5" fill="#22C55E" />
    {['Dr. Priya S.', 'Dr. Rahul M.', 'Dr. Ananya K.'].map((d, i) => (
      <g key={d}>
        <rect x={12 + i * 110} y={50} width={104} height={52} rx="7" fill="rgba(255,255,255,0.04)" stroke="rgba(34,197,94,0.2)" strokeWidth="0.7" />
        <text x={12 + i * 110 + 20} y={73} textAnchor="middle" fontSize="10" fontFamily="sans-serif">{['👩‍⚕️', '👨‍⚕️', '👩‍⚕️'][i]}</text>
        <text x={12 + i * 110 + 34} y={67} fontSize="8.5" fill="#c8d4e8" fontFamily="sans-serif" fontWeight="600">{d}</text>
        <text x={12 + i * 110 + 34} y={79} fontSize="7.5" fill="#22c55e" fontFamily="sans-serif">{['Cardiologist', 'Neurologist', 'Pediatrician'][i]}</text>
        <rect x={12 + i * 110 + 8} y={88} width={88} height={10} rx="4" fill="#7f4adf" />
        <text x={12 + i * 110 + 52} y={96} textAnchor="middle" fontSize="7" fill="white" fontFamily="sans-serif" fontWeight="600">Book Appointment</text>
      </g>
    ))}
    <rect x="12" y="112" width="316" height="36" rx="7" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.2)" strokeWidth="0.7" />
    <text x="24" y="128" fontSize="8.5" fill="#22c55e" fontFamily="sans-serif" fontWeight="600">Today's Appointments</text>
    <text x="24" y="141" fontSize="8" fill="#6b8aac" fontFamily="sans-serif">3 consultations · 2 lab results · 1 follow-up · EHR synced</text>
  </svg>
);

const FintechThumb = () => {
  const pts = [22, 28, 24, 36, 32, 42, 38, 52, 46, 60, 58, 72, 68, 80];
  const xs = pts.map((_, i) => 12 + i * (316 / 13));
  const linePath = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${44 + 80 * (1 - pts[i] / 80)}`).join(' ');
  const areaPath = `${linePath} L${xs[xs.length - 1]},124 L12,124 Z`;
  return (
    <svg viewBox="0 0 340 160" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="ft1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#0a1e3a" /><stop offset="1" stopColor="#0e2a52" /></linearGradient>
        <linearGradient id="ftline" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#7f4adf" /><stop offset="1" stopColor="#ff6b35" /></linearGradient>
      </defs>
      <rect width="340" height="160" fill="url(#ft1)" />
      <text x="12" y="28" fontSize="11" fill="#9b6bf2" fontFamily="sans-serif" fontWeight="700">💳 Portfolio Overview</text>
      <text x="220" y="28" fontSize="18" fill="#7f4adf" fontFamily="sans-serif" fontWeight="800">$2.84M</text>
      {[0, 25, 50, 75].map(v => { const y = 44 + 80 * (1 - v / 80); return <line key={v} x1="12" y1={y} x2="328" y2={y} stroke="rgba(127,74,223,0.1)" strokeWidth="1" />; })}
      <path d={areaPath} fill="url(#ftline)" opacity="0.12" />
      <path d={linePath} fill="none" stroke="url(#ftline)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {xs.map((x, i) => i % 2 === 0 ? <circle key={i} cx={x} cy={44 + 80 * (1 - pts[i] / 80)} r="3" fill="white" stroke="#7f4adf" strokeWidth="1.5" /> : null)}
      {[{ x: 12, l: 'Stocks', v: '+12.4%', c: '#22c55e' }, { x: 118, l: 'Crypto', v: '+8.7%', c: '#7f4adf' }, { x: 224, l: 'Bonds', v: '+3.2%', c: '#06b6d4' }].map(s => (
        <g key={s.x}>
          <rect x={s.x} y={130} width={100} height={24} rx="5" fill="rgba(255,255,255,0.04)" stroke="rgba(127,74,223,0.15)" strokeWidth="0.7" />
          <text x={s.x + 8} y={141} fontSize="8" fill="#6b8aac" fontFamily="sans-serif">{s.l}</text>
          <text x={s.x + 88} y={141} textAnchor="end" fontSize="8.5" fill={s.c} fontFamily="sans-serif" fontWeight="700">{s.v}</text>
        </g>
      ))}
    </svg>
  );
};

const AIThumb = () => (
  <svg viewBox="0 0 340 160" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
    <defs><linearGradient id="ai1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#1a0d2e" /><stop offset="1" stopColor="#2a1060" /></linearGradient></defs>
    <rect width="340" height="160" fill="url(#ai1)" />
    <text x="12" y="28" fontSize="11" fill="#ff6b35" fontFamily="sans-serif" fontWeight="700">🤖 Xenura AI Writer</text>
    <rect x="12" y="38" width="316" height="62" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(127,74,223,0.2)" strokeWidth="0.8" />
    <text x="24" y="57" fontSize="8" fill="#6b8aac" fontFamily="sans-serif">PROMPT</text>
    <text x="24" y="70" fontSize="9" fill="#c8d4e8" fontFamily="sans-serif">"Write a compelling product launch email for a B2B SaaS tool targeting CTOs"</text>
    <rect x="250" y="68" width="70" height="20" rx="5" fill="#ff6b35" />
    <text x="285" y="81" textAnchor="middle" fontSize="8.5" fill="white" fontFamily="sans-serif" fontWeight="600">Generate ⚡</text>
    <text x="24" y="91" fontSize="8" fill="#22c55e" fontFamily="sans-serif">✓ Tone: Professional · SEO optimized · 450 words · Ready in 3s</text>
    <rect x="12" y="110" width="316" height="40" rx="7" fill="rgba(255,107,53,0.06)" stroke="rgba(255,107,53,0.2)" strokeWidth="0.7" />
    <text x="24" y="126" fontSize="9" fill="#ff9e5c" fontFamily="sans-serif" fontWeight="600">Subject: Transform Your Engineering Velocity with Xenura AI...</text>
    <text x="24" y="140" fontSize="8" fill="#6b8aac" fontFamily="sans-serif">Dear [CTO Name], In today's competitive landscape, your engineering team needs...</text>
  </svg>
);

const LogisticsThumb = () => (
  <svg viewBox="0 0 340 160" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
    <defs><linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#081a2e" /><stop offset="1" stopColor="#0a2a44" /></linearGradient></defs>
    <rect width="340" height="160" fill="url(#lg1)" />
    <text x="12" y="28" fontSize="11" fill="#06b6d4" fontFamily="sans-serif" fontWeight="700">🚛 Supply Chain Live</text>
    <circle cx="60" cy="85" r="14" fill="rgba(127,74,223,0.3)" stroke="#7f4adf" strokeWidth="1.5" />
    <text x="60" y="89" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif" fontWeight="600">WH</text>
    <line x1="74" y1="85" x2="148" y2="85" stroke="rgba(6,182,212,0.5)" strokeWidth="2" strokeDasharray="5,3" />
    <circle cx="162" cy="85" r="14" fill="rgba(6,182,212,0.3)" stroke="#06b6d4" strokeWidth="1.5" />
    <text x="162" y="89" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif" fontWeight="600">HUB</text>
    <line x1="176" y1="85" x2="246" y2="85" stroke="rgba(34,197,94,0.5)" strokeWidth="2" strokeDasharray="5,3" />
    <text x="200" y="76" textAnchor="middle" fontSize="8" fill="#ff6b35" fontFamily="sans-serif">🚛 En Route</text>
    <circle cx="260" cy="85" r="14" fill="rgba(34,197,94,0.3)" stroke="#22c55e" strokeWidth="1.5" />
    <text x="260" y="89" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif" fontWeight="600">DEL</text>
    {[{ x: 12, l: 'Shipments', v: '1,284', c: '#06b6d4' }, { x: 118, l: 'On Time', v: '96.4%', c: '#22c55e' }, { x: 224, l: 'Avg Time', v: '2.4 days', c: '#7f4adf' }].map(s => (
      <g key={s.x}>
        <rect x={s.x} y={110} width={100} height={42} rx="6" fill="rgba(255,255,255,0.04)" />
        <text x={s.x + 8} y={126} fontSize="7.5" fill="#4a6080" fontFamily="sans-serif">{s.l}</text>
        <text x={s.x + 8} y={143} fontSize="15" fill={s.c} fontFamily="sans-serif" fontWeight="700">{s.v}</text>
      </g>
    ))}
  </svg>
);

const EdtechThumb = () => (
  <svg viewBox="0 0 340 160" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
    <defs><linearGradient id="et1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#1a1000" /><stop offset="1" stopColor="#2a1e00" /></linearGradient></defs>
    <rect width="340" height="160" fill="url(#et1)" />
    <text x="12" y="28" fontSize="11" fill="#f59e0b" fontFamily="sans-serif" fontWeight="700">🎓 Xenura Learn</text>
    <rect x="12" y="36" width="152" height="88" rx="8" fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.2)" strokeWidth="0.8" />
    <text x="20" y="54" fontSize="8.5" fill="#f59e0b" fontFamily="sans-serif" fontWeight="600">My Learning Path</text>
    {[{ l: 'React Fundamentals', pct: 92, c: '#22c55e' }, { l: 'Node.js Backend', pct: 67, c: '#f59e0b' }, { l: 'System Design', pct: 34, c: '#7f4adf' }, { l: 'ML Basics', pct: 15, c: '#06b6d4' }].map((c, i) => (
      <g key={c.l}>
        <text x="20" y={72 + i * 22} fontSize="8" fill="#c8a040" fontFamily="sans-serif">{c.l}</text>
        <text x="154" y={72 + i * 22} textAnchor="end" fontSize="8" fill={c.c} fontFamily="sans-serif" fontWeight="600">{c.pct}%</text>
        <rect x="20" y={75 + i * 22} width="132" height="5" rx="2.5" fill="rgba(255,255,255,0.06)" />
        <rect x="20" y={75 + i * 22} width={132 * c.pct / 100} height="5" rx="2.5" fill={c.c} />
      </g>
    ))}
    <rect x="176" y="36" width="152" height="88" rx="8" fill="rgba(127,74,223,0.06)" stroke="rgba(127,74,223,0.2)" strokeWidth="0.8" />
    <text x="184" y="54" fontSize="8.5" fill="#9b6bf2" fontFamily="sans-serif" fontWeight="600">Live Session Now</text>
    <text x="184" y="68" fontSize="9" fill="#c8d4e8" fontFamily="sans-serif">Advanced React Patterns</text>
    <text x="184" y="80" fontSize="8" fill="#6b8aac" fontFamily="sans-serif">👥 48 students live</text>
    <rect x="184" y="88" width="136" height="28" rx="5" fill="#7f4adf" />
    <text x="252" y="106" textAnchor="middle" fontSize="9" fill="white" fontFamily="sans-serif" fontWeight="600">▶ Join Now · Free</text>
    {[{ x: 12, l: 'Courses', v: '24+' }, { x: 118, l: 'Instructors', v: '8' }, { x: 224, l: 'Certificates', v: '120+' }].map(s => (
      <g key={s.x}>
        <rect x={s.x} y={132} width={100} height={24} rx="5" fill="rgba(245,158,11,0.06)" />
        <text x={s.x + 50} y={142} textAnchor="middle" fontSize="8" fill="#6b8aac" fontFamily="sans-serif">{s.l}</text>
        <text x={s.x + 50} y={152} textAnchor="middle" fontSize="9.5" fill="#f59e0b" fontFamily="sans-serif" fontWeight="700">{s.v}</text>
      </g>
    ))}
  </svg>
);

const showcaseItems: ShowcaseItem[] = [
  { title: 'E-Commerce Platform', description: 'Modern shopping experience with AI-powered recommendations', metric: '2K+ Users', metricColor: '#7f4adf', icon: Building2, thumb: <EcomThumb /> },
  { title: 'Healthcare Management', description: 'Complete healthcare solution connecting patients and doctors', metric: '800+ Downloads', metricColor: '#22c55e', icon: Stethoscope, thumb: <HealthThumb /> },
  { title: 'FinTech Dashboard', description: 'Real-time financial analytics and portfolio management', metric: '12K+ Transactions', metricColor: '#7f4adf', icon: BarChart3, thumb: <FintechThumb /> },
  { title: 'AI Content Generator', description: 'Intelligent content creation powered by machine learning', metric: '400+ Articles', metricColor: '#ff6b35', icon: Bot, thumb: <AIThumb /> },
  { title: 'Logistics Tracker', description: 'End-to-end supply chain management with real-time tracking', metric: '350+ Deliveries', metricColor: '#06b6d4', icon: Truck, thumb: <LogisticsThumb /> },
  { title: 'EdTech Learning', description: 'Interactive online learning with personalized curricula', metric: '600+ Students', metricColor: '#f59e0b', icon: GraduationCap, thumb: <EdtechThumb /> },
];

const ShowcaseCard = ({ item }: { item: ShowcaseItem }) => {
  const Icon = item.icon;
  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-white/10 h-full flex flex-col group hover:border-orange-500/25 transition-all duration-400">
      <div className="overflow-hidden shrink-0">{item.thumb}</div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${item.metricColor}18`, border: `1px solid ${item.metricColor}30` }}>
            <Icon className="w-4 h-4" style={{ color: item.metricColor }} />
          </div>
          <h3 className="text-base font-bold text-white">{item.title}</h3>
        </div>
        <p className="text-sm text-slate-400 mb-4 leading-relaxed flex-1">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-3 py-1 rounded-lg border text-sm font-semibold"
            style={{ color: item.metricColor, background: `${item.metricColor}12`, borderColor: `${item.metricColor}25` }}>
            {item.metric}
          </span>
          <span className="text-xs text-slate-500 group-hover:text-orange-400 transition-colors">Learn more →</span>
        </div>
      </div>
    </div>
  );
};

const Innovation = () => (
  <section id="innovation" className="relative py-12 sm:py-14 lg:py-16 section-gradient-2">
    <div className="container-custom">
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 scroll-reveal">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">Innovation Showcase</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-5 leading-tight">
          Sample work from our early client projects
        </h2>
        <p className="text-base lg:text-lg text-slate-400 leading-relaxed">
          Practical digital products built for growing teams - focused on clarity, performance, and real outcomes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
        {showcaseItems.map((item, idx) => (
          <div key={item.title} className={`scroll-reveal delay-${(idx + 1) * 100}`}>
            <ShowcaseCard item={item} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { value: '12', label: 'Projects' },
          { value: '98%', label: 'Satisfaction' },
          { value: '10+', label: 'Clients' },
          { value: '24/7', label: 'Support' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl p-5 text-center border border-white/10">
            <div className="text-2xl sm:text-3xl font-bold gradient-text-accent mb-1">{stat.value}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Innovation;
