import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_PATHS } from '@/content/servicePages';
import {
  Menu, X, ArrowRight, Moon, Sun, ChevronDown, ChevronRight,
  Code, Smartphone, Palette, Brain, BarChart3, Database, Sparkles, Bot as BotIcon,
  Cloud, GitMerge, RefreshCcw, LineChart, Target, Search,
  Share2, FileText, Bot, Building2, GraduationCap, Stethoscope,
  Shield, Microscope, Factory, Radio, Landmark, ShoppingBag,
  Plane, Truck, Lock, Zap, Signal, Briefcase, Compass, Users,
} from 'lucide-react';
import { useDarkMode } from '@/hooks/user-dark-mode';
import { api } from '@/lib/api';
import { Logo } from '@/components/Logo';

type LucideIcon = React.ComponentType<{ className?: string; style?: React.CSSProperties; size?: number }>;

interface SvcItem { label: string; sub: string; icon: LucideIcon; color: string }
interface SvcCol  { category: string; path: string; headerIcon: LucideIcon; accent: string; iconBg: string; items: SvcItem[] }
interface IndItem { label: string; sub: string; icon: LucideIcon; color: string }
interface CompanyLink { label: string; href: string; sub: string; icon: LucideIcon }

const companyLinks: CompanyLink[] = [
  { label: 'About Us', href: '/about', sub: 'Our story & team', icon: Building2 },
  { label: 'Our Work', href: '/portfolio', sub: 'Projects & case highlights', icon: Briefcase },
  { label: 'How We Work', href: '/how-we-work', sub: 'Process & delivery', icon: Compass },
  { label: 'Career', href: '/career', sub: 'Join the Xenura team', icon: Users },
  { label: 'Blog', href: '/#blog', sub: 'Insights & articles', icon: FileText },
];

const servicesMega: SvcCol[] = [
  {
    category: 'Engineering & Development',
    path: SERVICE_PATHS['engineering-development'],
    headerIcon: Code,
    accent: '#7f4adf', iconBg: 'rgba(127,74,223,0.12)',
    items: [
      { label: 'Custom Software Development', sub: 'Scalable enterprise apps', icon: Code, color: '#7f4adf' },
      { label: 'Web & Mobile App Development', sub: 'React, Next.js, Flutter', icon: Smartphone, color: '#7f4adf' },
      { label: 'UI/UX Design', sub: 'Figma, user-centered', icon: Palette, color: '#7f4adf' },
      { label: 'E-commerce', sub: 'Shopify, custom stores', icon: Code, color: '#7f4adf' },
    ],
  },
  {
    category: 'Data & Artificial Intelligence',
    path: SERVICE_PATHS['data-ai'],
    headerIcon: Brain,
    accent: '#ff6b35', iconBg: 'rgba(255,107,53,0.1)',
    items: [
      { label: 'AI & Machine Learning', sub: 'Custom models & pipelines', icon: Brain, color: '#ff6b35' },
      { label: 'Gen AI', sub: 'LLMs, RAG, prompt engineering', icon: Sparkles, color: '#ff6b35' },
      { label: 'Agentic AI', sub: 'Autonomous AI workflows', icon: BotIcon, color: '#ff6b35' },
      { label: 'Data Analytics & BI', sub: 'Dashboards & insights', icon: BarChart3, color: '#ff6b35' },
      { label: 'Data Engineering', sub: 'Warehousing, ETL, pipelines', icon: Database, color: '#ff6b35' },
    ],
  },
  {
    category: 'Cloud & Transformation',
    path: SERVICE_PATHS['cloud-transformation'],
    headerIcon: Cloud,
    accent: '#06b6d4', iconBg: 'rgba(6,182,212,0.1)',
    items: [
      { label: 'Cloud Solutions & Migration', sub: 'AWS, Azure, GCP', icon: Cloud, color: '#06b6d4' },
      { label: 'DevOps & Automation', sub: 'Docker, Kubernetes, CI/CD', icon: GitMerge, color: '#06b6d4' },
      { label: 'Digital Transformation', sub: 'Enterprise modernisation', icon: RefreshCcw, color: '#06b6d4' },
    ],
  },
  {
    category: 'Digital Analytics Marketing',
    path: SERVICE_PATHS['digital-marketing'],
    headerIcon: LineChart,
    accent: '#22c55e', iconBg: 'rgba(34,197,94,0.1)',
    items: [
      { label: 'Digital Analytics', sub: 'Tracking & attribution', icon: LineChart, color: '#22c55e' },
      { label: 'Performance Marketing', sub: 'Google, Meta, ROI-focused', icon: Target, color: '#22c55e' },
      { label: 'SEO & Search Marketing', sub: 'Rank & qualified traffic', icon: Search, color: '#22c55e' },
      { label: 'Social Media Marketing', sub: 'Brand & engagement', icon: Share2, color: '#22c55e' },
      { label: 'Content Marketing', sub: 'Blogs, landing pages, copy', icon: FileText, color: '#22c55e' },
      { label: 'Marketing Automation', sub: 'Workflows & nurture', icon: Bot, color: '#22c55e' },
    ],
  },
];

const industriesMega: IndItem[] = [
  { label: 'Banking & Financial Services', sub: 'Digital transformation and intelligent automation for financial growth.', icon: Building2, color: '#7f4adf' },
  { label: 'Education', sub: 'Smart learning solutions for institutions and enterprises.', icon: GraduationCap, color: '#06b6d4' },
  { label: 'Energy & Utilities', sub: 'Powering a sustainable future with innovative digital solutions.', icon: Zap, color: '#f59e0b' },
  { label: 'Healthcare', sub: 'Better care, smarter systems, healthier outcomes.', icon: Stethoscope, color: '#22c55e' },
  { label: 'Insurance', sub: 'Drive efficiency and customer trust with intelligent solutions.', icon: Shield, color: '#7f4adf' },
  { label: 'Life Sciences', sub: 'Accelerating innovation across research and patient care.', icon: Microscope, color: '#06b6d4' },
  { label: 'Manufacturing', sub: 'Optimize operations and build resilient, smart manufacturing.', icon: Factory, color: '#ff6b35' },
  { label: 'Media & Entertainment', sub: 'Engage audiences and monetize experiences at scale.', icon: Radio, color: '#f59e0b' },
  { label: 'Public Sector', sub: 'Empowering governments with secure, citizen-first digital services.', icon: Landmark, color: '#22c55e' },
  { label: 'Retail & CPG', sub: 'Deliver personalized experiences and drive customer loyalty.', icon: ShoppingBag, color: '#ff6b35' },
  { label: 'Sports', sub: 'Enhance fan engagement and streamline sports operations.', icon: Signal, color: '#7f4adf' },
  { label: 'Telecom', sub: 'Deliver seamless connectivity and next-gen digital experiences.', icon: Signal, color: '#06b6d4' },
  { label: 'Travel & Hospitality', sub: 'Elevate guest experiences and streamline travel operations.', icon: Plane, color: '#ff6b35' },
  { label: 'Transportation & Logistics', sub: 'Optimize routes, reduce costs, and deliver on time.', icon: Truck, color: '#22c55e' },
  { label: 'Security & Defense', sub: 'Mission-critical solutions for a safer, more secure world.', icon: Lock, color: '#7f4adf' },
];

/* ── Sub-components ── */
const ColHeader = ({ col, onClose }: { col: SvcCol; onClose?: () => void }) => {
  const H = col.headerIcon;
  return (
    <Link
      to={col.path}
      onClick={onClose}
      className="flex items-center gap-2 mb-3 pb-2 border-b group/ch hover:opacity-90 transition-opacity"
      style={{ borderColor: `${col.accent}25` }}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: col.iconBg }}>
        <H className="w-4 h-4" style={{ color: col.accent }} />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.08em] leading-tight group-hover/ch:underline" style={{ color: col.accent }}>
        {col.category}
      </p>
    </Link>
  );
};
const SvcMenuItem = ({ item, href, onClose }: { item: SvcItem; href: string; onClose: () => void }) => {
  const I = item.icon;
  return (
    <Link to={href} onClick={onClose} className="flex items-start gap-2.5 group/i py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 px-1 -mx-1 transition-colors">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${item.color}10`, border: `1px solid ${item.color}18` }}>
        <I className="w-3.5 h-3.5" style={{ color: item.color }} />
      </div>
      <div className="min-w-0">
        <p className="text-[12px] font-semibold text-slate-700 dark:text-slate-200 group-hover/i:text-[#7f4adf] dark:group-hover/i:text-[#9b6bf2] transition-colors leading-tight">{item.label}</p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-snug mt-0.5">{item.sub}</p>
      </div>
    </Link>
  );
};
const CompanyMenuItem = ({
  link,
  onClose,
}: {
  link: CompanyLink;
  onClose: () => void;
}) => {
  const I = link.icon;
  const isHash = link.href.startsWith('/#');
  const className =
    'flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/c';
  const inner = (
    <>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-[#7f4adf]/10 border border-[#7f4adf]/15">
        <I className="w-4 h-4 text-[#7f4adf]" />
      </div>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-200 group-hover/c:text-[#7f4adf] transition-colors leading-tight">
          {link.label}
        </p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-snug mt-0.5">{link.sub}</p>
      </div>
    </>
  );
  return isHash ? (
    <a href={link.href} onClick={onClose} className={className}>
      {inner}
    </a>
  ) : (
    <Link to={link.href} onClick={onClose} className={className}>
      {inner}
    </Link>
  );
};

const IndMenuItem = ({ ind, onClose }: { ind: IndItem; onClose: () => void }) => {
  const I = ind.icon;
  return (
    <a href="/industries" onClick={onClose} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/i">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${ind.color}12`, border: `1px solid ${ind.color}20` }}>
        <I className="w-5 h-5" style={{ color: ind.color }} />
      </div>
      <div className="min-w-0">
        <p className="text-[12px] font-semibold text-slate-700 dark:text-slate-200 group-hover/i:text-[#7f4adf] dark:group-hover/i:text-[#9b6bf2] transition-colors leading-tight flex items-center gap-1">
          {ind.label} <span className="text-slate-300 dark:text-slate-600">›</span>
        </p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-snug mt-0.5 truncate">{ind.sub}</p>
      </div>
    </a>
  );
};

/* ── Mobile sub-menu item ── */
const MobileSvcItem = ({ item, href, onNav }: { item: SvcItem; href: string; onNav: () => void }) => {
  const I = item.icon;
  return (
    <Link to={href} onClick={onNav} className="flex items-center gap-2.5 py-2">
      <I className="w-4 h-4 shrink-0" style={{ color: item.color }} />
      <span className="text-sm theme-text-soft">{item.label}</span>
    </Link>
  );
};

const MobileCompanyItem = ({ link, onNav }: { link: CompanyLink; onNav: () => void }) => {
  const I = link.icon;
  if (link.href.startsWith('/#')) {
    return (
      <a href={link.href} onClick={onNav} className="flex items-center gap-2.5 py-2">
        <I className="w-4 h-4 shrink-0 text-[#7f4adf]" />
        <span className="text-sm theme-text-soft">{link.label}</span>
      </a>
    );
  }
  return (
    <Link to={link.href} onClick={onNav} className="flex items-center gap-2.5 py-2">
      <I className="w-4 h-4 shrink-0 text-[#7f4adf]" />
      <span className="text-sm theme-text-soft">{link.label}</span>
    </Link>
  );
};

const MobileIndItem = ({ ind, onNav }: { ind: IndItem; onNav: () => void }) => {
  const I = ind.icon;
  return (
    <a href="/industries" onClick={onNav} className="flex items-center gap-2.5 py-2">
      <I className="w-4 h-4 shrink-0" style={{ color: ind.color }} />
      <span className="text-sm theme-text-soft">{ind.label}</span>
    </a>
  );
};

/* ── Main Navigation ── */
export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobSvc, setMobSvc] = useState(false);
  const [mobInd, setMobInd] = useState(false);
  const [mobCompany, setMobCompany] = useState(false);
  const { isDark, toggle } = useDarkMode();
  const svcT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const companyT = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  useEffect(() => {
    setIsAdminLoggedIn(api.isAuthenticated());
  }, []);

  useEffect(() => { const h = () => setIsScrolled(window.scrollY > 20); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
  useEffect(() => { document.body.style.overflow = isMobileOpen ? 'hidden' : 'unset'; return () => { document.body.style.overflow = 'unset'; }; }, [isMobileOpen]);

  const oM = (s: (v: boolean) => void, r: React.MutableRefObject<ReturnType<typeof setTimeout> | null>) => { if (r.current) clearTimeout(r.current); s(true); };
  const cM = (s: (v: boolean) => void, r: React.MutableRefObject<ReturnType<typeof setTimeout> | null>) => { r.current = setTimeout(() => s(false), 150); };
  const closeMobile = () => {
    setIsMobileOpen(false);
    setMobSvc(false);
    setMobInd(false);
    setMobCompany(false);
  };

  return (
    <>
      <nav id="main-navigation" className={`fixed top-0 left-0 right-0 z-[100] py-3 transition-all duration-500 bg-white/92 dark:bg-slate-950/78 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/10 ${isScrolled ? 'shadow-lg shadow-slate-900/8' : 'shadow-sm'}`}>
        <div className="container-custom flex items-center justify-between">
          <Logo size="md" href="/" onDarkSurface={isDark} />
          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-0.5">
            <a href="/#hero" className="px-4 py-2 text-sm font-medium theme-text-soft hover:text-[var(--theme-text-strong)] rounded-lg hover:bg-slate-100/60 dark:hover:bg-white/5 transition-colors">Home</a>
            {/* Services */}
            <div className="relative" onMouseEnter={() => oM(setServicesOpen, svcT)} onMouseLeave={() => cM(setServicesOpen, svcT)}>
              <a href="/#services" className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${servicesOpen ? 'text-[#7f4adf] bg-[#7f4adf]/5' : 'theme-text-soft hover:text-[var(--theme-text-strong)]'}`}>
                Services <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </a>
              <div className={`absolute top-full left-1/2 -translate-x-[40%] mt-1.5 transition-all duration-200 origin-top ${servicesOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`} style={{ width: 860 }}
                onMouseEnter={() => oM(setServicesOpen, svcT)} onMouseLeave={() => cM(setServicesOpen, svcT)}>
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0_24px_64px_rgba(8,41,90,0.16)] border border-slate-200/70 dark:border-white/10 overflow-hidden">
                  <div className="grid grid-cols-4 divide-x divide-slate-100 dark:divide-white/8">
                    {servicesMega.map(col => (
                      <div key={col.category} className="p-4">
                        <ColHeader col={col} onClose={() => setServicesOpen(false)} />
                        <div className="space-y-0.5">
                          {col.items.map((it) => (
                            <SvcMenuItem
                              key={it.label}
                              item={it}
                              href={col.path}
                              onClose={() => setServicesOpen(false)}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-3 border-t border-slate-100 dark:border-white/8 bg-slate-50/60 dark:bg-white/3 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Need something custom? We build it.</span>
                    <a href="/#contact" onClick={() => setServicesOpen(false)} className="btn-primary text-xs py-2 px-5 rounded-lg inline-flex items-center gap-1.5"><span>Get a Free Quote</span><ArrowRight className="w-3 h-3" /></a>
                  </div>
                </div>
              </div>
            </div>
            {/* Industries */}
            <div className="relative" onMouseEnter={() => oM(setIndustriesOpen, indT)} onMouseLeave={() => cM(setIndustriesOpen, indT)}>
              <Link to="/industries" className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${industriesOpen ? 'text-[#7f4adf] bg-[#7f4adf]/5' : 'theme-text-soft hover:text-[var(--theme-text-strong)]'}`}>
                Industries <ChevronDown className={`w-3.5 h-3.5 transition-transform ${industriesOpen ? 'rotate-180' : ''}`} />
              </Link>
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 transition-all duration-200 origin-top ${industriesOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`} style={{ width: 900 }}
                onMouseEnter={() => oM(setIndustriesOpen, indT)} onMouseLeave={() => cM(setIndustriesOpen, indT)}>
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0_24px_64px_rgba(8,41,90,0.16)] border border-slate-200/70 dark:border-white/10 overflow-hidden">
                  <div className="p-5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 mb-4">Industries We Serve</p>
                    <div className="grid grid-cols-3 gap-0.5">{industriesMega.map(ind => <IndMenuItem key={ind.label} ind={ind} onClose={() => setIndustriesOpen(false)} />)}</div>
                  </div>
                  <div className="px-5 py-3 border-t border-slate-100 dark:border-white/8 bg-slate-50/60 dark:bg-white/3 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Serving 10+ industries</span>
                    <a href="/industries" onClick={() => setIndustriesOpen(false)} className="btn-primary text-xs py-2 px-5 rounded-lg inline-flex items-center gap-1.5"><span>View All Industries</span><ArrowRight className="w-3 h-3" /></a>
                  </div>
                </div>
              </div>
            </div>
            {/* Company */}
            <div className="relative" onMouseEnter={() => oM(setCompanyOpen, companyT)} onMouseLeave={() => cM(setCompanyOpen, companyT)}>
              <button
                type="button"
                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${companyOpen ? 'text-[#7f4adf] bg-[#7f4adf]/5' : 'theme-text-soft hover:text-[var(--theme-text-strong)]'}`}
              >
                Company <ChevronDown className={`w-3.5 h-3.5 transition-transform ${companyOpen ? 'rotate-180' : ''}`} />
              </button>
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 transition-all duration-200 origin-top w-[280px] ${companyOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                onMouseEnter={() => oM(setCompanyOpen, companyT)}
                onMouseLeave={() => cM(setCompanyOpen, companyT)}
              >
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0_24px_64px_rgba(8,41,90,0.16)] border border-slate-200/70 dark:border-white/10 overflow-hidden p-2">
                  {companyLinks.map((link) => (
                    <CompanyMenuItem key={link.label} link={link} onClose={() => setCompanyOpen(false)} />
                  ))}
                </div>
              </div>
            </div>
            <a href="/#contact" className="px-4 py-2 text-sm font-medium theme-text-soft hover:text-[var(--theme-text-strong)] rounded-lg hover:bg-slate-100/60 dark:hover:bg-white/5 transition-colors">Contact</a>
            {isAdminLoggedIn ? (
              <a href="/admin/dashboard" className="px-4 py-2 text-sm font-semibold text-orange-400 hover:text-orange-500 rounded-lg hover:bg-slate-100/60 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5" id="nav-dashboard">
                <Lock className="w-3.5 h-3.5" /> Dashboard
              </a>
            ) : (
              <a href="/admin/login" className="px-4 py-2 text-sm font-medium theme-text-soft hover:text-[var(--theme-text-strong)] rounded-lg hover:bg-slate-100/60 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5" id="nav-login">
                <Lock className="w-3.5 h-3.5" /> Admin Login
              </a>
            )}
          </div>
          {/* CTA */}
          <div className="flex items-center gap-2.5">
            <button className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors" onClick={toggle} aria-label="Toggle theme">
              {isDark ? <Sun className="w-4 h-4 theme-text-strong" /> : <Moon className="w-4 h-4 theme-text-strong" />}
            </button>
            <a href="/#contact" className="hidden sm:flex items-center gap-1.5 btn-primary text-sm py-2.5 px-5 rounded-lg"><span>Get Started</span><ArrowRight className="w-4 h-4" /></a>
            <button className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-slate-300/70 dark:border-white/15 bg-white/85 dark:bg-white/5" onClick={() => setIsMobileOpen(!isMobileOpen)} aria-label="Menu">
              {isMobileOpen ? <X className="w-5 h-5 theme-text-strong" /> : <Menu className="w-5 h-5 theme-text-strong" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile sidebar ── */}
      <div className={`lg:hidden fixed inset-0 z-[220] transition-all duration-500 ${isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'var(--theme-overlay)' }} onClick={closeMobile} />
        <div className={`absolute right-0 top-0 h-full w-[88%] max-w-[340px] flex flex-col px-5 pb-6 overflow-y-auto border-l border-slate-300/60 dark:border-white/10 bg-[var(--theme-surface-bg)] shadow-2xl transition-transform duration-500 ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ paddingTop: 'max(14px, env(safe-area-inset-top))' }}>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/70 dark:border-white/10">
            <Logo size="sm" href="/" onDarkSurface={isDark} />
            <div className="flex items-center gap-2">
              {/* Dark mode toggle in mobile */}
              <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/10" onClick={toggle} aria-label="Toggle theme">
                {isDark ? <Sun className="w-4 h-4 theme-text-strong" /> : <Moon className="w-4 h-4 theme-text-strong" />}
              </button>
              <button type="button" className="w-8 h-8 rounded-lg border border-slate-300/70 dark:border-white/15 flex items-center justify-center" onClick={closeMobile}>
                <X className="w-4 h-4 theme-text-strong" />
              </button>
            </div>
          </div>
          {/* Links */}
          <div className="pt-3 flex-1">
            <a href="/#hero" className="flex items-center py-3.5 text-base font-medium theme-text-strong border-b border-slate-200/70 dark:border-white/10" onClick={closeMobile}>Home</a>
            {/* Services expandable */}
            <div className="border-b border-slate-200/70 dark:border-white/10">
              <button className="flex items-center justify-between w-full py-3.5 text-base font-medium theme-text-strong" onClick={() => setMobSvc(!mobSvc)}>
                Services <ChevronRight className={`w-4 h-4 transition-transform ${mobSvc ? 'rotate-90' : ''}`} />
              </button>
              {mobSvc && (
                <div className="pb-3 pl-2 space-y-0">
                  {servicesMega.map((col) => (
                    <div key={col.category} className="mb-2">
                      <Link
                        to={col.path}
                        onClick={closeMobile}
                        className="block text-[10px] font-bold uppercase tracking-wider mb-1 mt-2 hover:underline"
                        style={{ color: col.accent }}
                      >
                        {col.category}
                      </Link>
                      {col.items.map((it) => (
                        <MobileSvcItem key={it.label} item={it} href={col.path} onNav={closeMobile} />
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Industries expandable */}
            <div className="border-b border-slate-200/70 dark:border-white/10">
              <button className="flex items-center justify-between w-full py-3.5 text-base font-medium theme-text-strong" onClick={() => setMobInd(!mobInd)}>
                Industries <ChevronRight className={`w-4 h-4 transition-transform ${mobInd ? 'rotate-90' : ''}`} />
              </button>
              {mobInd && (
                <div className="pb-3 pl-2 space-y-0">
                  <a href="/industries" onClick={closeMobile} className="flex items-center justify-between rounded-xl px-2 py-2 mb-2 text-sm font-semibold text-[#7f4adf] hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <span>View Industries Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  {industriesMega.map(ind => <MobileIndItem key={ind.label} ind={ind} onNav={closeMobile} />)}
                </div>
              )}
            </div>

            {/* Company expandable */}
            <div className="border-b border-slate-200/70 dark:border-white/10">
              <button className="flex items-center justify-between w-full py-3.5 text-base font-medium theme-text-strong" onClick={() => setMobCompany(!mobCompany)}>
                Company <ChevronRight className={`w-4 h-4 transition-transform ${mobCompany ? 'rotate-90' : ''}`} />
              </button>
              {mobCompany && (
                <div className="pb-3 pl-2 space-y-0">
                  {companyLinks.map((link) => (
                    <MobileCompanyItem key={link.label} link={link} onNav={closeMobile} />
                  ))}
                </div>
              )}
            </div>

            <a href="/#contact" className="flex items-center py-3.5 text-base font-medium theme-text-strong border-b border-slate-200/70 dark:border-white/10" onClick={closeMobile}>Contact</a>
            {isAdminLoggedIn ? (
              <a href="/admin/dashboard" className="flex items-center py-3.5 text-base font-semibold text-orange-400 border-b border-slate-200/70 dark:border-white/10 gap-1.5" onClick={closeMobile} id="mob-nav-dashboard">
                <Lock className="w-4 h-4" /> Admin Dashboard
              </a>
            ) : (
              <a href="/admin/login" className="flex items-center py-3.5 text-base font-medium theme-text-strong border-b border-slate-200/70 dark:border-white/10 gap-1.5" onClick={closeMobile} id="mob-nav-login">
                <Lock className="w-4 h-4" /> Admin Login
              </a>
            )}
          </div>
          {/* Bottom CTA */}
          <div className="pt-4">
            <a href="/#contact" className="btn-primary flex items-center justify-center gap-2 w-full" onClick={closeMobile}>
              <span>Get Started</span><ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
