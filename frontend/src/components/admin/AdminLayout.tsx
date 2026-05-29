import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LogOut, ExternalLink, Inbox, Menu, X, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { ADMIN_NAV_SECTIONS, type AdminNavItem } from '@/content/adminNavigation';
import { BrandIcon } from '@/components/BrandIcon';

type AdminLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  onLogout: () => void;
};

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
    isActive
      ? 'bg-orange-500/20 text-white border border-orange-400/40 shadow-sm'
      : 'text-slate-100 hover:bg-white/10 hover:text-white border border-transparent'
  }`;

function ComingSoonNavButton({
  item,
  onNavigate,
}: {
  item: AdminNavItem;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      title={item.description}
      onClick={() => {
        onNavigate?.();
        toast.info(`${item.label} - coming soon`, {
          description: item.description || 'This module will be added in a future update.',
        });
      }}
      className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent transition-all cursor-pointer group"
    >
      <Icon className="w-4 h-4 shrink-0 opacity-60 group-hover:opacity-80" />
      <span className="flex-1 text-left truncate">{item.label}</span>
      <span className="inline-flex items-center gap-0.5 shrink-0 text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-white/10 text-slate-400 group-hover:text-slate-300">
        <Clock className="w-2.5 h-2.5" />
        Soon
      </span>
    </button>
  );
}

function AdminSidebarContent({
  onNavigate,
  onLogout,
  showClose,
  onClose,
}: {
  onNavigate?: () => void;
  onLogout: () => void;
  showClose?: boolean;
  onClose?: () => void;
}) {
  const location = useLocation();

  return (
    <>
      <div className="px-4 py-4 border-b border-white/10 flex items-center justify-between gap-2 shrink-0">
        <a href="/" className="flex items-center gap-3 min-w-0 flex-1">
          <BrandIcon size="md" className="shrink-0 rounded-lg" />
          <div className="min-w-0 flex-1">
            <p className="font-bold text-sm leading-tight text-white truncate">Admin Console</p>
            <p className="text-xs text-slate-300 mt-0.5 truncate">Lead management</p>
          </div>
        </a>
        {showClose && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white shrink-0"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto scrollbar-thin">
        {ADMIN_NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                if (item.to && !item.comingSoon) {
                  const Icon = item.icon;
                  return (
                    <NavLink key={item.label} to={item.to} className={navLinkClass} onClick={onNavigate}>
                      <Icon className="w-4 h-4 text-orange-400 shrink-0" />
                      <span className="text-white truncate">{item.label}</span>
                    </NavLink>
                  );
                }
                return (
                  <ComingSoonNavButton key={item.label} item={item} onNavigate={onNavigate} />
                );
              })}
            </div>
          </div>
        ))}

        <div className="pt-2 border-t border-white/10">
          <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
            Quick links
          </p>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            onClick={onNavigate}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-100 hover:bg-white/10 hover:text-white border border-transparent transition-all"
          >
            <ExternalLink className="w-4 h-4 text-slate-300 shrink-0" />
            <span>View Website</span>
          </a>
        </div>
      </nav>

      <div className="p-4 border-t border-white/10 shrink-0">
        <p className="text-[10px] text-slate-400 px-1 mb-2 truncate capitalize">
          {location.pathname.replace('/admin/', '').replace('/', ' · ') || 'admin'}
        </p>
        <button
          type="button"
          onClick={() => {
            onNavigate?.();
            onLogout();
          }}
          className="flex w-full items-center justify-center gap-2 px-3 py-3 rounded-lg bg-white/5 hover:bg-red-600 text-sm font-semibold text-slate-100 hover:text-white border border-white/10 hover:border-red-500 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </>
  );
}

export const AdminLayout = ({
  title,
  subtitle,
  children,
  actions,
  onLogout,
}: AdminLayoutProps) => {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileNavOpen]);

  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <div className="admin-crm h-screen overflow-hidden bg-slate-100 text-slate-900 flex">
      {/* Desktop sidebar - fixed, does not scroll with content */}
      <aside className="admin-sidebar hidden md:flex w-64 h-screen flex-col bg-[#0f172a] text-white shrink-0 border-r border-slate-700/50 fixed left-0 top-0 bottom-0 z-40">
        <AdminSidebarContent onLogout={onLogout} />
      </aside>

      {/* Mobile drawer */}
      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-50" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={closeMobileNav}
          />
          <aside className="admin-sidebar absolute left-0 top-0 bottom-0 w-[min(280px,85vw)] flex flex-col bg-[#0f172a] text-white shadow-2xl">
            <AdminSidebarContent
              onLogout={onLogout}
              showClose
              onClose={closeMobileNav}
              onNavigate={closeMobileNav}
            />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 w-full h-screen overflow-hidden md:ml-64">
        <header className="bg-white border-b border-slate-200 shrink-0 z-30 shadow-sm">
          <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-start gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden mt-0.5 w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-800 shrink-0"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex-1 min-w-0">
              <h1 className="text-base sm:text-xl font-bold text-slate-900 leading-tight truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 line-clamp-2">{subtitle}</p>
              )}
            </div>
          </div>

          {actions && (
            <div className="px-4 sm:px-6 pb-3 sm:pb-4 border-t border-slate-100 md:border-t-0 md:pt-0">
              <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 md:flex-wrap md:overflow-visible scrollbar-thin">
                {actions}
              </div>
            </div>
          )}
        </header>

        <main className="flex-1 min-h-0 p-3 sm:p-4 md:p-6 overflow-y-auto overflow-x-hidden bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export const AdminStatCard = ({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  accent: 'orange' | 'emerald' | 'blue' | 'violet';
}) => {
  const borderColors = {
    orange: 'border-l-orange-500',
    emerald: 'border-l-emerald-500',
    blue: 'border-l-blue-500',
    violet: 'border-l-violet-500',
  };
  const iconBg = {
    orange: 'bg-orange-100 text-orange-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    blue: 'bg-blue-100 text-blue-600',
    violet: 'bg-violet-100 text-violet-600',
  };

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 border-l-4 shadow-sm p-3 sm:p-4 ${borderColors[accent]}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-slate-600 truncate">
            {label}
          </p>
          <p className="text-xl sm:text-3xl font-bold text-slate-900 mt-0.5">{value}</p>
        </div>
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 ${iconBg[accent]}`}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
    </div>
  );
};

export const AdminEmptyState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6 text-center">
    <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
      <Inbox className="w-7 h-7 text-slate-500" />
    </div>
    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
    <p className="text-sm text-slate-600 mt-1 max-w-sm">{description}</p>
  </div>
);
