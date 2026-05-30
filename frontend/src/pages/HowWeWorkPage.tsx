import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useScrollReveal } from '@/hooks/use-scroll-reveal-simple';
import { usePageMeta } from '@/hooks/usePageMeta';

const phases = [
  {
    step: '01',
    title: 'Discover',
    text: 'We learn your business goals, users, existing systems, and constraints. Output: scope outline and success metrics.',
  },
  {
    step: '02',
    title: 'Plan',
    text: 'UX flows, technical approach, milestones, and estimates. You approve before build starts.',
  },
  {
    step: '03',
    title: 'Build',
    text: 'Agile sprints with demos, code reviews, and testing. You see progress every week, not just at the end.',
  },
  {
    step: '04',
    title: 'Launch',
    text: 'Deployment, monitoring, handover docs, and training. We support go-live and early optimisation.',
  },
  {
    step: '05',
    title: 'Grow',
    text: 'Optional retainers for features, performance, SEO, and analytics as your product scales.',
  },
];

const principles = [
  'Clear communication - no jargon without explanation',
  'Fixed phases where possible, flexibility where needed',
  'Security and performance built in, not bolted on',
  'Documentation your team can maintain',
];

const HowWeWorkPage = () => {
  useScrollReveal();
  usePageMeta(
    'How We Work - Our Delivery Process',
    'Learn how Xenura delivers web, mobile, AI, cloud, and marketing projects through a transparent discover-plan-build-launch process.',
  );

  return (
    <div className="min-h-screen theme-page overflow-x-hidden">
      <Navigation />
      <main className="pt-[var(--header-height)]">
        <section style={{ background: 'var(--theme-section-1)' }}>
          <div className="container-custom py-12 sm:py-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest text-orange-400 border border-orange-400/20 bg-orange-400/5 mb-4">
                  <Sparkles className="w-3 h-3" /> Process
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold theme-text-strong mb-4">
                  How we <span className="gradient-text-accent">work with you</span>
                </h1>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--theme-text-muted)' }}>
                  A straightforward delivery model designed for founders and teams who need clarity,
                  speed, and accountability - from first call to launch and beyond.
                </p>
                <ul className="space-y-2">
                  {principles.map((p) => (
                    <li key={p} className="flex gap-2 text-sm" style={{ color: 'var(--theme-text-muted)' }}>
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl overflow-hidden h-64 sm:h-80 border border-[color:var(--theme-glass-border)] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80"
                  alt="Team planning session"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 section-gradient-2">
          <div className="container-custom">
            <h2 className="text-2xl sm:text-3xl font-extrabold theme-text-strong text-center mb-10">
              Five phases, one accountable team
            </h2>
            <div className="max-w-2xl mx-auto space-y-4">
              {phases.map((phase) => (
                <div
                  key={phase.step}
                  className="glass-card rounded-2xl p-5 sm:p-6 flex gap-4 sm:gap-6 scroll-reveal"
                >
                  <span className="text-2xl font-black text-orange-500/80 shrink-0">{phase.step}</span>
                  <div>
                    <h3 className="text-lg font-bold theme-text-strong mb-1">{phase.title}</h3>
                    <p className="text-sm" style={{ color: 'var(--theme-text-muted)' }}>
                      {phase.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-14">
          <div className="container-custom text-center">
            <a href="/#contact" className="btn-primary inline-flex items-center gap-2">
              <span>Book a discovery call</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowWeWorkPage;
