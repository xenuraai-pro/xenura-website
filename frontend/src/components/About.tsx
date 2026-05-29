import { Award, Clock, TrendingUp, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Stat { icon: LucideIcon; value: string; label: string; }

const stats: Stat[] = [
  { icon: Award,      value: '12',   label: 'Projects' },
  { icon: Users,      value: '10+',  label: 'Clients'  },
  { icon: TrendingUp, value: '2',    label: 'Years'    },
  { icon: Clock,      value: '24/7', label: 'Support'  },
];

const highlights = [
  'One team for strategy, design, and engineering',
  'Execution focused on measurable business outcomes',
  'Clean architecture for long-term scalability',
];

/* Small component so the icon variable is a proper identifier */
const StatCard = ({ stat }: { stat: Stat }) => {
  const Icon = stat.icon;
  return (
    <div
      className="rounded-xl px-4 py-4"
      style={{ border: '1px solid var(--theme-glass-border)', background: 'var(--theme-surface-bg)' }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-orange-400 shrink-0" />
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--theme-text-muted)' }}>
          {stat.label}
        </span>
      </div>
      {/* Use style color so it works in BOTH light (navy) and dark (white) */}
      <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--theme-text-strong)' }}>
        {stat.value}
      </p>
    </div>
  );
};

const About = () => (
  <section id="about" className="relative py-12 sm:py-14 lg:py-16 section-gradient-2 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-20 right-[-10%] w-[22rem] h-[22rem] rounded-full blur-3xl opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(127,74,223,0.25) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-20 left-[-10%] w-[20rem] h-[20rem] rounded-full blur-3xl opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.2) 0%, transparent 70%)' }} />
    </div>

    <div className="container-custom relative z-10">
      <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">

        {/* Left copy */}
        <div className="lg:col-span-7 scroll-reveal-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">About Xenura</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-white leading-[1.1] mb-5">
            We build digital products that are practical, scalable, and fast to launch.
          </h2>
          <p className="text-base lg:text-lg text-slate-400 leading-relaxed mb-5 max-w-2xl">
            Xenura is a focused product and engineering partner for teams that need quality execution,
            clear communication, and measurable business impact.
          </p>
          <div className="pl-4 border-l-2 border-orange-500/45">
            <h3 className="text-base lg:text-lg font-semibold text-white mb-2">Our Mission</h3>
            <p className="text-sm lg:text-base text-slate-400 leading-relaxed max-w-2xl">
              Help businesses move faster with technology that improves user experience,
              operational clarity, and growth outcomes.
            </p>
          </div>
        </div>

        {/* Right stats card */}
        <div className="lg:col-span-5 scroll-reveal-right">
          <div
            className="rounded-3xl p-5 sm:p-6 backdrop-blur-md"
            style={{ border: '1px solid var(--theme-glass-border)', background: 'var(--theme-glass-bg)' }}
          >
            <h3 className="text-lg font-bold mb-5" style={{ color: 'var(--theme-text-strong)' }}>
              Why teams choose Xenura
            </h3>

            {/* Highlights */}
            <div className="space-y-3 mb-6">
              {highlights.map(item => (
                <div key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>{item}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map(stat => <StatCard key={stat.label} stat={stat} />)}
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default About;
