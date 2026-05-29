import React, { useCallback, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  Heart,
  Laptop,
  Mail,
  MapPin,
  MessageCircle,
  Rocket,
  Shield,
  Users,
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import WhatsAppChatbot from '@/components/WhatsAppChatbot';
import { InquiryForm } from '@/components/InquiryForm';
import { useScrollReveal } from '@/hooks/use-scroll-reveal-simple';
import {
  CAREER_APPLY_SECTION_ID,
  careerApplyMailto,
  careerWhatsAppUrl,
  COMPANY_ADDRESS,
} from '@/content/companyContact';

const perks = [
  {
    icon: Rocket,
    title: 'Real project ownership',
    text: 'Work on live client builds - websites, apps, and automation - not endless internal demos.',
  },
  {
    icon: GraduationCap,
    title: 'Learn every week',
    text: 'Mentorship from senior engineers and designers as we ship in modern stacks.',
  },
  {
    icon: Heart,
    title: 'Balanced culture',
    text: 'Focused hours, clear goals, and respect for life outside work.',
  },
];

const benefits = [
  {
    icon: MessageCircle,
    title: 'Quick onboarding',
    text: 'Structured first-week plan so you contribute from day one.',
  },
  {
    icon: Users,
    title: 'Small, expert team',
    text: 'Collaborate directly with founders and leads - no layers of bureaucracy.',
  },
  {
    icon: Shield,
    title: 'Growth & stability',
    text: 'Performance reviews, skill upgrades, and long-term roles as Xenura scales.',
  },
];

const openRoles = [
  {
    title: 'Full Stack Developer',
    type: 'Full-time · Bangalore (Attibele)',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'UI/UX Designer',
    type: 'Full-time · Hybrid',
    tags: ['Figma', 'Design systems', 'Web & mobile'],
  },
  {
    title: 'Digital Marketing Specialist',
    type: 'Full-time · On-site',
    tags: ['SEO', 'Performance ads', 'Analytics'],
  },
  {
    title: 'Business Development Executive',
    type: 'Full-time · Bangalore',
    tags: ['B2B sales', 'Client discovery', 'Proposals'],
  },
];

const applySteps = [
  {
    step: '01',
    title: 'Pick a role or apply generally',
    text: 'Select an open position above or send a general application if your profile fits our studio.',
  },
  {
    step: '02',
    title: 'Share your resume & details',
    text: 'Upload your CV to Google Drive, paste the link, and tell us about your experience and notice period.',
  },
  {
    step: '03',
    title: 'We review & respond',
    text: 'Our team reads every application personally and gets back within 2-3 business days.',
  },
];

const applicationChecklist = [
  'Resume via Google Drive (view access enabled)',
  'Portfolio or LinkedIn profile',
  'Relevant skills and years of experience',
  'Notice period and preferred start date',
  'Why you want to join Xenura',
];

const pillStyles = {
  dark: 'bg-white text-slate-900 hover:bg-slate-100',
  accent:
    'bg-gradient-to-r from-[#7f4adf] to-[#ff5a3d] text-white hover:opacity-95 shadow-lg shadow-orange-500/20',
  light:
    'bg-[var(--theme-text-strong)] text-white hover:opacity-90 dark:bg-white dark:text-slate-900',
} as const;

const PillButton = ({
  children,
  variant = 'light',
  onClick,
  href,
}: {
  children: React.ReactNode;
  variant?: keyof typeof pillStyles;
  onClick?: () => void;
  href?: string;
}) => {
  const base =
    'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 group cursor-pointer';

  const inner = (
    <>
      <span>{children}</span>
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${base} ${pillStyles[variant]}`} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${base} ${pillStyles[variant]}`}>
      {inner}
    </button>
  );
};

const CareerPage: React.FC = () => {
  useScrollReveal();
  const [appliedRole, setAppliedRole] = useState<string | null>(null);

  const scrollToApply = useCallback((role?: string) => {
    if (role) setAppliedRole(role);
    window.setTimeout(() => {
      document.getElementById(CAREER_APPLY_SECTION_ID)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 50);
  }, []);

  return (
    <div className="min-h-screen theme-page overflow-x-hidden">
      <Navigation />
      <main>
        {/* Hero - image left, copy right */}
        <section
          className="relative overflow-hidden section-gradient-1"
          style={{ paddingTop: 'var(--header-height)' }}
        >
          <div className="container-custom py-14 sm:py-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="relative order-2 lg:order-1 scroll-reveal-left max-w-md mx-auto lg:max-w-none w-full">
                <div
                  className="absolute -left-6 top-8 w-32 h-32 rounded-full opacity-40 blur-3xl pointer-events-none"
                  style={{ background: 'rgba(127, 74, 223, 0.45)' }}
                  aria-hidden
                />
                <div
                  className="absolute right-4 bottom-16 lg:bottom-12 w-20 h-20 rotate-45 border-2 border-orange-400/30 rounded-lg pointer-events-none z-0"
                  aria-hidden
                />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[color:var(--theme-glass-border)]">
                  <div className="h-[260px] sm:h-[300px] lg:h-[340px]">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"
                      alt="Professional at Xenura"
                      className="w-full h-full object-cover object-[50%_18%]"
                      loading="eager"
                    />
                  </div>
                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-3 py-2.5 rounded-xl bg-white/95 dark:bg-slate-900/95 shadow-lg border border-slate-200/80 dark:border-white/10 flex items-center gap-2.5 z-10">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7f4adf] to-[#ff5a3d] flex items-center justify-center text-white font-bold text-xs shrink-0">
                      12+
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 leading-tight">Team projects</p>
                      <p className="text-xs font-semibold theme-text-strong leading-tight">Shipped & growing</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 scroll-reveal-right">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7f4adf] mb-3">
                  Careers at Xenura
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold leading-[1.08] tracking-tight mb-5 theme-text-strong">
                  Join the team building{' '}
                  <span className="gradient-text-accent">digital products</span> that matter
                </h1>
                <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-xl" style={{ color: 'var(--theme-text-muted)' }}>
                  We&apos;re a focused studio in Bangalore helping businesses launch websites, apps,
                  and automation. If you care about craft, clarity, and client impact - we&apos;d love to
                  hear from you.
                </p>
                <PillButton onClick={() => scrollToApply()} variant="accent">
                  Apply now
                </PillButton>
              </div>
            </div>
          </div>
        </section>

        {/* Dark CTA band */}
        <section className="section-gradient-dark py-10 sm:py-12">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Got skills we can use?
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">
                  Tell us about your experience and the kind of work that excites you. We review
                  every application personally.
                </p>
              </div>
              <PillButton onClick={() => scrollToApply()} variant="dark">
                Send your profile
              </PillButton>
            </div>
          </div>
        </section>

        {/* Why work with us - light */}
        <section className="py-14 sm:py-16 lg:py-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="scroll-reveal-left">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
                  Why Xenura
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold theme-text-strong mb-4">
                  Work where your ideas reach clients fast
                </h2>
                <p className="text-sm sm:text-base mb-8" style={{ color: 'var(--theme-text-muted)' }}>
                  From discovery to launch, you&apos;ll see the full lifecycle - and the results of your
                  work in production.
                </p>
                <ul className="space-y-5 mb-8">
                  {perks.map((item) => (
                    <li key={item.title} className="flex gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#7f4adf]/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-[#7f4adf]" />
                      </div>
                      <div>
                        <h3 className="font-semibold theme-text-strong mb-0.5">{item.title}</h3>
                        <p className="text-sm" style={{ color: 'var(--theme-text-muted)' }}>
                          {item.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3 text-sm" style={{ color: 'var(--theme-text-muted)' }}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--theme-glass-border)] px-3 py-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    Attibele, Bangalore
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--theme-glass-border)] px-3 py-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    Mon-Fri · 9 AM - 7 PM IST
                  </span>
                </div>
              </div>

              <div className="relative scroll-reveal-right">
                <div
                  className="absolute -right-4 top-1/2 -translate-y-1/2 text-[120px] font-black text-[#7f4adf]/[0.06] leading-none select-none pointer-events-none"
                  aria-hidden
                >
                  +
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl border border-[color:var(--theme-glass-border)]">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                    alt="Team collaboration at Xenura"
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="glow-line" />

        {/* Benefits - dark */}
        <section className="section-gradient-dark py-14 sm:py-16 lg:py-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="scroll-reveal-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight mb-8 leading-tight">
                  Let&apos;s build something great together
                </h2>
                <ul className="space-y-6">
                  {benefits.map((item) => (
                    <li key={item.title} className="flex gap-4">
                      <div className="w-11 h-11 rounded-full bg-orange-500/15 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                        <p className="text-sm text-slate-400">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative scroll-reveal-right">
                <div
                  className="absolute -left-6 bottom-8 w-28 h-28 rounded-full border-2 border-orange-400/25 pointer-events-none"
                  aria-hidden
                />
                <p className="text-slate-400 text-sm sm:text-base mb-6 max-w-md lg:ml-auto lg:text-right">
                  We hire for attitude and train for skill. Whether you&apos;re early in your career or
                  bringing years of experience, bring curiosity and ownership.
                </p>
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80"
                    alt="Team meeting"
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Open roles */}
        <section className="py-14 sm:py-16 lg:py-20">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-10 scroll-reveal">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7f4adf] mb-3">
                Open roles
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold theme-text-strong mb-3">
                Current opportunities
              </h2>
              <p className="text-sm sm:text-base" style={{ color: 'var(--theme-text-muted)' }}>
                Don&apos;t see a perfect match? Email us anyway - we&apos;re always open to meeting talented
                people.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {openRoles.map((role) => (
                <article
                  key={role.title}
                  className="rounded-2xl border p-5 sm:p-6 transition-all duration-300 hover:shadow-lg scroll-reveal"
                  style={{
                    borderColor: 'var(--theme-glass-border)',
                    background: 'var(--theme-surface-bg)',
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#7f4adf]/10 flex items-center justify-center shrink-0">
                      <Briefcase className="w-5 h-5 text-[#7f4adf]" />
                    </div>
                    <div>
                      <h3 className="font-bold theme-text-strong">{role.title}</h3>
                      <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: 'var(--theme-text-muted)' }}>
                        <Laptop className="w-3 h-3" />
                        {role.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToApply(role.title)}
                    className="text-sm font-semibold text-[#7f4adf] hover:text-orange-500 inline-flex items-center gap-1 transition-colors"
                  >
                    Apply for this role
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </article>
              ))}
            </div>

            <div className="text-center mt-12 scroll-reveal">
              <PillButton onClick={() => scrollToApply()} variant="accent">
                Apply via form
              </PillButton>
            </div>
          </div>
        </section>

        {/* Application form */}
        <section
          id={CAREER_APPLY_SECTION_ID}
          className="section-gradient-dark py-14 sm:py-16 lg:py-20 scroll-mt-24"
        >
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-10 scroll-reveal">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400 mb-3">
                Apply
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Send your application
              </h2>
              {appliedRole && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7f4adf]/20 border border-[#7f4adf]/30 px-3 py-1 text-xs font-semibold text-[#c4b5fd] mb-3">
                  <Briefcase className="w-3.5 h-3.5" />
                  {appliedRole}
                </span>
              )}
              <p className="text-slate-400 text-sm sm:text-base">
                {appliedRole
                  ? `Complete the form for ${appliedRole}. We review every submission and reply within 2-3 business days.`
                  : 'Choose a role above or send a general application. We respond to every submission.'}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              <div className="scroll-reveal-left flex">
                <div className="glass-card rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col w-full h-full">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-4">
                    How it works
                  </h3>
                  <ol className="space-y-3 mb-6">
                    {applySteps.map((item) => (
                      <li key={item.step} className="flex gap-3">
                        <span className="w-7 h-7 rounded-lg bg-orange-500/15 text-orange-400 text-xs font-black flex items-center justify-center shrink-0">
                          {item.step}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-white leading-tight">{item.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-400" />
                    What to include
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 mb-6">
                    {applicationChecklist.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5 border-t border-white/10 space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Prefer another channel?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={careerWhatsAppUrl(appliedRole ?? undefined)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-green-600 text-white hover:bg-green-500 transition-colors flex-1"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </a>
                      <a
                        href={careerApplyMailto(appliedRole ?? undefined)}
                        className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors flex-1"
                      >
                        <Mail className="w-4 h-4" />
                        Email instead
                      </a>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      {COMPANY_ADDRESS.summary}
                    </p>
                  </div>
                </div>
              </div>

              <div className="scroll-reveal-right flex">
                <div className="glass-card rounded-2xl p-5 sm:p-6 lg:p-7 w-full h-full">
                  <InquiryForm
                    variant="dark"
                    source="career"
                    mode="career"
                    idPrefix="career"
                    showIntro={false}
                    appliedRole={appliedRole}
                    submitLabel="Submit application"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppChatbot />
    </div>
  );
};

export default CareerPage;
