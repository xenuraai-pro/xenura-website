import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import WhatsAppChatbot from '@/components/WhatsAppChatbot';
import { useScrollReveal } from '@/hooks/use-scroll-reveal-simple';
import { getServicePage, SERVICE_PAGES, SERVICE_SLUGS } from '@/content/servicePages';

const ServiceCategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = getServicePage(slug);

  useScrollReveal();

  if (!page) {
    return <Navigate to="/" replace />;
  }

  const otherServices = SERVICE_SLUGS.filter((s) => s !== page.slug).map((s) => SERVICE_PAGES[s]);

  return (
    <div className="min-h-screen theme-page overflow-x-hidden">
      <Navigation />
      <main className="pt-[var(--header-height)]">
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: 'var(--theme-section-1)' }}>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(ellipse at top right, ${page.accent}22, transparent 55%)`,
            }}
          />
          <div className="container-custom relative py-10 sm:py-14 lg:py-16">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest mb-3 border"
                  style={{ color: page.accent, borderColor: `${page.accent}40`, background: page.iconBg }}
                >
                  <Sparkles className="w-3 h-3" />
                  {page.tagline}
                </div>
                <h1
                  className="text-[1.75rem] sm:text-[2.25rem] lg:text-[2.6rem] font-extrabold tracking-tight leading-[1.12] mb-4"
                  style={{ color: 'var(--theme-text-strong)' }}
                >
                  {page.title}
                </h1>
                <p className="text-base sm:text-lg leading-relaxed mb-6 max-w-xl" style={{ color: 'var(--theme-text-muted)' }}>
                  {page.heroDescription}
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {page.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border px-4 py-2.5 text-center min-w-[88px]"
                      style={{ borderColor: 'var(--theme-glass-border)', background: 'var(--theme-glass-bg)' }}
                    >
                      <p className="text-lg font-extrabold" style={{ color: page.accent }}>
                        {s.value}
                      </p>
                      <p className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
                <a href="/#contact" className="btn-primary inline-flex items-center gap-2">
                  <span>Discuss your project</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[color:var(--theme-glass-border)] h-[240px] sm:h-[300px] lg:h-[340px]">
                <img src={page.heroImage} alt={page.title} className="w-full h-full object-cover" loading="eager" />
              </div>
            </div>
          </div>
        </section>

        <div className="glow-line" />

        {/* Overview */}
        <section className="py-12 sm:py-14 lg:py-16">
          <div className="container-custom">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-7 scroll-reveal-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 theme-text-strong">What we deliver</h2>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--theme-text-muted)' }}>
                  {page.overview}
                </p>
                <ul className="space-y-3">
                  {page.overviewPoints.map((point) => (
                    <li key={point} className="flex gap-3 text-sm sm:text-base" style={{ color: 'var(--theme-text-muted)' }}>
                      <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: page.accent }} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-5 scroll-reveal-right">
                <div className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: 'var(--theme-glass-border)', background: 'var(--theme-surface-bg)' }}>
                  <h3 className="text-lg font-bold theme-text-strong mb-4">How we work</h3>
                  <ol className="space-y-4">
                    {page.process.map((p, i) => (
                      <li key={p.step} className="flex gap-4">
                        <span
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 text-white"
                          style={{ background: page.accent }}
                        >
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-semibold theme-text-strong">{p.step}</p>
                          <p className="text-sm mt-0.5" style={{ color: 'var(--theme-text-muted)' }}>
                            {p.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Offerings */}
        <section className="section-gradient-2 py-12 sm:py-14 lg:py-16">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-10 scroll-reveal">
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: page.accent }}>
                Capabilities
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold theme-text-strong">Services under this practice</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
              {page.offerings.map((offering) => (
                <article
                  key={offering.title}
                  className="glass-card rounded-2xl p-5 sm:p-6 scroll-reveal h-full flex flex-col"
                >
                  <h3 className="text-lg font-bold theme-text-strong mb-2">{offering.title}</h3>
                  <p className="text-sm mb-4 flex-grow" style={{ color: 'var(--theme-text-muted)' }}>
                    {offering.description}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {offering.bullets.map((b) => (
                      <li
                        key={b}
                        className="text-[10px] font-medium uppercase tracking-wide px-2 py-1 rounded-full"
                        style={{ background: page.iconBg, color: page.accent }}
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Xenura */}
        <section className="py-12 sm:py-14">
          <div className="container-custom">
            <div
              className="rounded-2xl p-8 sm:p-10 lg:p-12 border scroll-reveal"
              style={{ borderColor: `${page.accent}30`, background: `linear-gradient(135deg, ${page.iconBg}, transparent)` }}
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold theme-text-strong mb-6">Why work with Xenura</h2>
              <ul className="grid sm:grid-cols-3 gap-6">
                {page.whyUs.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="w-5 h-5 shrink-0" style={{ color: page.accent }} />
                    <span className="text-sm sm:text-base" style={{ color: 'var(--theme-text-muted)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="py-12 sm:py-14 border-t border-[color:var(--theme-glass-border)]">
          <div className="container-custom">
            <h2 className="text-xl font-bold theme-text-strong mb-6">Explore other services</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {otherServices.map((svc) => (
                <Link
                  key={svc.slug}
                  to={`/services/${svc.slug}`}
                  className="group rounded-xl border p-4 transition-all hover:shadow-md"
                  style={{ borderColor: 'var(--theme-glass-border)', background: 'var(--theme-surface-bg)' }}
                >
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: svc.accent }}>
                    {svc.shortTitle}
                  </p>
                  <p className="text-sm font-semibold theme-text-strong group-hover:text-[#7f4adf] transition-colors flex items-center gap-1">
                    {svc.title}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-gradient-dark py-12 sm:py-14">
          <div className="container-custom text-center scroll-reveal">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Ready to start your {page.shortTitle.toLowerCase()} project?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-6">
              Tell us about your goals - we&apos;ll reply with a clear plan, timeline, and estimate.
            </p>
            <a href="/#contact" className="btn-primary inline-flex items-center gap-2">
              <span>Get a free consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppChatbot />
    </div>
  );
};

export default ServiceCategoryPage;
