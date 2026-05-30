import { ArrowRight, Sparkles } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useScrollReveal } from '@/hooks/use-scroll-reveal-simple';
import { usePageMeta } from '@/hooks/usePageMeta';

const projects = [
  {
    title: 'Business website redesign',
    category: 'Web Development',
    description: 'Modern marketing site with CMS-friendly structure, fast load times, and lead capture flows.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'SEO', 'Responsive'],
  },
  {
    title: 'E-commerce storefront',
    category: 'E-commerce',
    description: 'Product catalogue, secure checkout integration, and inventory sync for a growing retail brand.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    tags: ['Next.js', 'Payments', 'Analytics'],
  },
  {
    title: 'Operations dashboard',
    category: 'Custom Software',
    description: 'Internal portal for tracking orders, tasks, and team activity with role-based access.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tags: ['Node.js', 'MongoDB', 'Dashboards'],
  },
  {
    title: 'AI enquiry assistant',
    category: 'Data & AI',
    description: 'Chat-style assistant trained on company FAQs to qualify leads and route conversations.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    tags: ['Gen AI', 'Automation', 'CRM'],
  },
  {
    title: 'Cloud migration programme',
    category: 'Cloud',
    description: 'Phased move from on-premise hosting to cloud with CI/CD and monitoring baselines.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    tags: ['AWS', 'DevOps', 'Security'],
  },
  {
    title: 'Growth marketing rollout',
    category: 'Digital Marketing',
    description: 'SEO foundation, paid search tests, and conversion tracking for a B2B services launch.',
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=800&q=80',
    tags: ['SEO', 'Google Ads', 'GA4'],
  },
];

const PortfolioPage = () => {
  useScrollReveal();
  usePageMeta(
    'Our Work - Portfolio & Case Highlights',
    'See selected Xenura project work across web development, e-commerce, AI, cloud, and digital marketing for growing businesses.',
  );

  return (
    <div className="min-h-screen theme-page overflow-x-hidden">
      <Navigation />
      <main className="pt-[var(--header-height)]">
        <section style={{ background: 'var(--theme-section-1)' }}>
          <div className="container-custom py-12 sm:py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest text-orange-400 border border-orange-400/20 bg-orange-400/5 mb-4">
                <Sparkles className="w-3 h-3" /> Our work
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold theme-text-strong mb-4">
                Projects we&apos;re proud to <span className="gradient-text-accent">deliver</span>
              </h1>
              <p className="text-base leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
                A sample of engagements across web, software, AI, cloud, and marketing - tailored to each
                client&apos;s stage and goals. Names anonymised where required.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container-custom">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <article key={p.title} className="glass-card rounded-2xl overflow-hidden scroll-reveal flex flex-col">
                  <div className="h-44 overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500 mb-1">{p.category}</p>
                    <h2 className="text-lg font-bold theme-text-strong mb-2">{p.title}</h2>
                    <p className="text-sm flex-grow mb-3" style={{ color: 'var(--theme-text-muted)' }}>
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-medium uppercase px-2 py-0.5 rounded-full bg-[#7f4adf]/10 text-[#7f4adf]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-gradient-dark py-12 sm:py-14">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Want results like these?</h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-6 text-sm sm:text-base">
              Tell us what you&apos;re building - we&apos;ll share a realistic plan and timeline.
            </p>
            <a href="/#contact" className="btn-primary inline-flex items-center gap-2">
              <span>Start your project</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
