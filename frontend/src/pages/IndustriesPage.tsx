import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { coreServices, emergingTechnologies, industries, whyXenura } from '@/content/industries';

const industryImages: Record<string, string> = {
  'Banking & Financial Services': '/assets/industries/financial-services-thumbnail_cq5dam-web-1120-684.webp',
  Education: '/assets/industries/education-updated_cq5dam-web-1120-684.webp',
  'Energy & Utilities': '/assets/industries/energy-updated_cq5dam-web-1120-684.webp',
  Healthcare: '/assets/industries/dermatology-market-in-india_cq5dam-web-1120-684.webp',
  Insurance: '/assets/industries/ey-surveillance-screens-on-a-tablet.webp',
  'Life Sciences': '/assets/industries/Banner Image - ey-the-robot-hand-human-hand-touching.webp',
  Manufacturing: '/assets/industries/building-construction-updated_cq5dam-web-1120-684.webp',
  'Media & Entertainment': '/assets/industries/media-updated_cq5dam-web-1120-684.webp',
  'Public Sector': '/assets/industries/government-2200x1500_cq5dam-web-1120-684.webp',
  'Retail & CPG': '/assets/industries/ey-online-shopping-new.webp',
  Sports: '/assets/industries/emerging-giants-banner_cq5dam-web-1120-684.webp',
  Telecom: '/assets/industries/cell-tower-against-sunset_cq5dam-web-1120-684.webp',
  'Travel & Hospitality': '/assets/industries/Aircraft.webp',
  'Transportation & Logistics': '/assets/industries/transport-logistics_cq5dam-web-1120-684.webp',
  'Security & Defense': '/assets/industries/aerospace-and-defence-banner_cq5dam-web-1120-684.webp',
};

const IndustriesPage = () => {
  // Split industries into featured (first 3) and rest
  const featured = industries.slice(0, 3);
  const rest = industries.slice(3);

  return (
    <div className="min-h-screen theme-page overflow-x-hidden">
      <Navigation />
      <main className="pt-[var(--header-height)]">

        {/* ─── Hero - tight left-aligned ─── */}
        <section className="relative overflow-hidden" style={{ background: 'var(--theme-section-1)' }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(127,74,223,0.08),transparent_50%)]" />
          <div className="container-custom relative py-10 sm:py-14">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest text-orange-400 border border-orange-400/20 bg-orange-400/5 mb-3">
                  <Sparkles className="w-3 h-3" /> Industries
                </div>
                <h1 className="text-[1.65rem] sm:text-[2rem] lg:text-[2.35rem] font-extrabold tracking-tight leading-[1.15] mb-2.5" style={{ color: 'var(--theme-text-strong)' }}>
                  Digital solutions built for <span className="gradient-text-accent">your industry</span>
                </h1>
                <p className="text-[14px] leading-[1.7] max-w-lg" style={{ color: 'var(--theme-text-muted)' }}>
                  Xenura partners with growing businesses across 10+ sectors to deliver AI, cloud, automation, and engineering solutions that drive measurable impact.
                </p>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-2 gap-2 md:w-[220px] flex-shrink-0">
                {[
                  { v: '10+', l: 'Industries' },
                  { v: '12', l: 'Projects' },
                  { v: '98%', l: 'Retention' },
                  { v: '10+', l: 'Clients' },
                ].map(s => (
                  <div key={s.l} className="rounded-xl border px-3 py-2.5 text-center" style={{ borderColor: 'var(--theme-glass-border)', background: 'var(--theme-glass-bg)', backdropFilter: 'blur(8px)' }}>
                    <p className="text-lg font-extrabold gradient-text-accent" style={{ display: 'inline-block' }}>{s.v}</p>
                    <p className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Featured Industries - 3 box-like vertical cards ─── */}
        <section className="container-custom py-8 sm:py-10">
          <p className="text-[11px] uppercase tracking-[0.25em] text-orange-400 font-semibold mb-1">Featured Sectors</p>
          <h2 className="text-lg sm:text-xl font-bold mb-5" style={{ color: 'var(--theme-text-strong)' }}>Industries We Transform</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map(ind => {
              const Icon = ind.icon;
              const img = industryImages[ind.name] || '/assets/industries/images.jpg';
              return (
                <article key={ind.name} className="group glass-card rounded-2xl overflow-hidden flex flex-col h-full">
                  {/* Image */}
                  <div className="relative h-[160px] overflow-hidden flex-shrink-0">
                    <img src={img} alt={ind.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md" style={{ background: `${ind.accent}35`, border: `1px solid ${ind.accent}50` }}>
                        <Icon className="w-4 h-4 keep-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-1" style={{ color: ind.accent }}>{ind.tagline}</p>
                      <h3 className="text-sm sm:text-base font-bold mb-1.5 leading-tight" style={{ color: 'var(--theme-text-strong)' }}>{ind.name}</h3>
                      <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: 'var(--theme-text-muted)' }}>{ind.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {ind.solutions.slice(0, 4).map(s => (
                        <span key={s} className="rounded-md border px-2 py-0.5 text-[9px] font-medium" style={{ borderColor: `${ind.accent}20`, color: 'var(--theme-text-strong)', background: `${ind.accent}06` }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ─── All Industries Grid - matched with featured section style ─── */}
        <section className="relative" style={{ background: 'var(--theme-section-2)' }}>
          <div className="container-custom py-8 sm:py-10">
            <p className="text-[11px] uppercase tracking-[0.25em] text-orange-400 font-semibold mb-1">All Sectors</p>
            <h2 className="text-lg sm:text-xl font-bold mb-5" style={{ color: 'var(--theme-text-strong)' }}>Complete Industry Coverage</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rest.map(ind => {
                const Icon = ind.icon;
                const img = industryImages[ind.name] || '/assets/industries/images.jpg';
                return (
                  <article key={ind.name} className="group glass-card rounded-2xl overflow-hidden flex flex-col h-full">
                    {/* Image */}
                    <div className="relative h-[160px] overflow-hidden flex-shrink-0">
                      <img src={img} alt={ind.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md" style={{ background: `${ind.accent}35`, border: `1px solid ${ind.accent}50` }}>
                          <Icon className="w-4 h-4 keep-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-1" style={{ color: ind.accent }}>{ind.tagline}</p>
                        <h3 className="text-sm sm:text-base font-bold mb-1.5 leading-tight" style={{ color: 'var(--theme-text-strong)' }}>{ind.name}</h3>
                        <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: 'var(--theme-text-muted)' }}>{ind.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {ind.solutions.slice(0, 4).map(s => (
                          <span key={s} className="rounded-md border px-2 py-0.5 text-[9px] font-medium" style={{ borderColor: `${ind.accent}20`, color: 'var(--theme-text-strong)', background: `${ind.accent}06` }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Services - elegant list-based layout ─── */}
        <section className="container-custom py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-orange-400 font-semibold mb-1">Technology Services</p>
              <h2 className="text-lg sm:text-xl font-bold" style={{ color: 'var(--theme-text-strong)' }}>What We Deliver</h2>
            </div>
            <p className="text-xs max-w-xs leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
              Full-spectrum software services and product engineering.
            </p>
          </div>

          {/* Clean 3-col left-bordered minimal list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {coreServices.map(svc => (
              <div key={svc.name} className="group relative pl-4 border-l-2 hover:border-[#7f4adf] transition-colors duration-300 py-1" style={{ borderColor: 'rgba(127,74,223,0.15)' }}>
                <p className="text-sm font-semibold mb-1 leading-tight group-hover:text-[#7f4adf] transition-colors duration-300" style={{ color: 'var(--theme-text-strong)' }}>{svc.name}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>{svc.description}</p>
              </div>
            ))}
          </div>

          {/* Emerging Tech - Dot-accented clean grid */}
          <div className="mt-10 sm:mt-12 pt-8 border-t" style={{ borderColor: 'var(--theme-glass-border)' }}>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-6" style={{ color: 'var(--theme-text-muted)' }}>Emerging Technologies</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
              {emergingTechnologies.map(t => (
                <div key={t.name} className="group flex items-start gap-3 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] mt-2 group-hover:scale-125 transition-transform duration-300 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold mb-0.5 leading-tight group-hover:text-[#06b6d4] transition-colors duration-300" style={{ color: 'var(--theme-text-strong)' }}>{t.name}</p>
                    <p className="text-[11px] leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Why Xenura - checklist list-based layout ─── */}
        <section className="relative" style={{ background: 'var(--theme-section-2)' }}>
          <div className="container-custom py-8 sm:py-12">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              <div className="lg:w-[280px] flex-shrink-0">
                <p className="text-[11px] uppercase tracking-[0.25em] text-orange-400 font-semibold mb-1">Advantages</p>
                <h2 className="text-lg sm:text-xl font-bold mb-2.5" style={{ color: 'var(--theme-text-strong)' }}>Why choose Xenura</h2>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
                  Innovation, agility, security, and measurable impact from discovery through delivery.
                </p>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {whyXenura.map((item, i) => (
                  <div key={item} className="group flex items-center gap-3 py-1">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-[#7f4adf]/10 group-hover:bg-[#7f4adf] transition-all duration-300">
                      <Check className="w-3 h-3 text-[#7f4adf] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <p className="text-xs font-semibold leading-tight group-hover:translate-x-0.5 transition-transform duration-300" style={{ color: 'var(--theme-text-strong)' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="container-custom py-8 sm:py-12">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'var(--theme-section-dark)' }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(127,74,223,0.25),transparent_60%),radial-gradient(ellipse_at_bottom_left,_rgba(255,107,53,0.15),transparent_60%)]" />
            <div className="section-gradient-dark relative px-5 sm:px-8 py-8 sm:py-10 flex flex-col sm:flex-row items-center gap-5">
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Ready to start?</p>
                <h2 className="text-lg sm:text-xl font-bold mb-1.5" style={{ color: '#ffffff' }}>Let's build your industry solution</h2>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  AI strategy, cloud modernization, platform engineering, or secure digital infrastructure.
                </p>
              </div>
              <a href="/#contact" className="btn-primary inline-flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
                <span>Talk to Xenura</span>
                <ArrowRight className="w-4 h-4 relative z-10" />
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default IndustriesPage;
