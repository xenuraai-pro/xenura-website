import { ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react';
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE, BRAND_NAME, COMPANY_SOCIAL } from '@/content/companyContact';
import { BRAND_TAGLINE } from '@/content/brandAssets';
import { Logo } from '@/components/Logo';
import { SERVICE_PATHS } from '@/content/servicePages';

const footerData = {
  services: [
    { label: 'Engineering & Development', href: SERVICE_PATHS['engineering-development'] },
    { label: 'Data & AI', href: SERVICE_PATHS['data-ai'] },
    { label: 'Cloud & Transformation', href: SERVICE_PATHS['cloud-transformation'] },
    { label: 'Digital Analytics Marketing', href: SERVICE_PATHS['digital-marketing'] },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Work', href: '/portfolio' },
    { label: 'How We Work', href: '/how-we-work' },
    { label: 'Industries', href: '/industries' },
  ],
  quickLinks: [
    { label: 'Career', href: '/career' },
    { label: 'Blogs', href: '/#blog' },
    { label: 'Contact', href: '/#contact' },
    { label: 'Services', href: '/#services' },
  ],
};

const socialLinks = [
  {
    label: 'LinkedIn',
    href: COMPANY_SOCIAL.linkedin,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: COMPANY_SOCIAL.youtube,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: COMPANY_SOCIAL.facebook,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: COMPANY_SOCIAL.instagram,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

const FooterLinkList = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) => (
  <div className="min-w-0">
    <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">{title}</h4>
    <ul className="space-y-2.5">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            className="text-sm text-slate-500 hover:text-orange-400 transition-colors duration-200 flex items-center gap-1 group"
          >
            {l.label}
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer = () => (
  <footer className="relative border-t border-white/5" style={{ background: 'var(--theme-footer-bg)' }}>
    <div className="container-custom pt-10 sm:pt-12 lg:pt-14 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-x-10 lg:gap-y-10 mb-12 items-start">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-3">
          <Logo size="md" href="/" onDarkSurface className="mb-3" />
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 mb-2">
            {BRAND_NAME} - {BRAND_TAGLINE}
          </p>
          <p className="text-sm text-slate-500 leading-relaxed mb-5 max-w-xs">
            We are a digital solutions company helping businesses innovate, transform and grow with technology.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#7f4adf]/30 transition-all duration-300"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="lg:col-span-3">
          <FooterLinkList title="Services" links={footerData.services} />
        </div>

        {/* Company + Quick Links - equal two-column block */}
        <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-2 gap-6 sm:gap-8">
          <FooterLinkList title="Company" links={footerData.company} />
          <FooterLinkList title="Quick Links" links={footerData.quickLinks} />
        </div>

        {/* Contact */}
        <div className="sm:col-span-2 lg:col-span-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Contact Us</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#7f4adf] shrink-0 mt-0.5"/>
              <address className="text-sm text-slate-500 leading-snug not-italic">
                {COMPANY_ADDRESS.lines.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < COMPANY_ADDRESS.lines.length - 1 && <br />}
                  </span>
                ))}
              </address>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#7f4adf] shrink-0"/>
              <a href={`mailto:${COMPANY_EMAIL}`} className="text-sm text-slate-500 hover:text-white transition-colors">{COMPANY_EMAIL}</a>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#7f4adf] shrink-0"/>
              <a href={`tel:${COMPANY_PHONE.tel}`} className="text-sm text-slate-500 hover:text-white transition-colors">{COMPANY_PHONE.display}</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="glow-line mb-5"/>
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <p>© 2025 {BRAND_NAME}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
          <span>|</span>
          <a href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);
