import React from 'react';
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Cloud,
  Code2,
  Compass,
  LineChart,
  Rocket,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import WhatsAppChatbot from '@/components/WhatsAppChatbot';
import { useScrollReveal } from '@/hooks/use-scroll-reveal-simple';

const capabilities = [
  {
    icon: Code2,
    title: 'Product Engineering',
    text: 'Web platforms, mobile apps, SaaS systems, portals, and custom business software built with scalable architecture.',
  },
  {
    icon: Brain,
    title: 'AI and Data',
    text: 'Practical AI workflows, analytics dashboards, automation, and data systems that help teams make better decisions faster.',
  },
  {
    icon: Cloud,
    title: 'Cloud and DevOps',
    text: 'Secure cloud deployment, migration, CI/CD, monitoring, and infrastructure practices that keep products reliable.',
  },
  {
    icon: LineChart,
    title: 'Digital Growth',
    text: 'SEO, performance marketing, analytics, and conversion-focused experiences connected to measurable business outcomes.',
  },
];

const values = [
  'Clear communication from discovery to delivery',
  'Design decisions shaped by real user needs',
  'Technology choices that support long-term growth',
  'Security, performance, and maintainability from day one',
];

const approach = [
  {
    label: 'Discover',
    detail: 'We understand your business goals, users, current systems, and the gaps that are slowing growth.',
  },
  {
    label: 'Design',
    detail: 'We shape the product journey, interface, architecture, and delivery roadmap before development begins.',
  },
  {
    label: 'Build',
    detail: 'We develop in focused cycles with demos, feedback loops, and quality checks throughout the process.',
  },
  {
    label: 'Scale',
    detail: 'We support launches with optimization, analytics, automation, and infrastructure improvements.',
  },
];

const AboutPage: React.FC = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen theme-page overflow-x-hidden">
      <Navigation />
      <main>
        <section className="relative overflow-hidden section-gradient-1" style={{ paddingTop: 'var(--header-height)' }}>
          <div className="container-custom py-16 sm:py-20 lg:py-24">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left image card */}
                <div className="lg:col-span-5 animate-fade-in-up">
                  <div className="relative w-full max-w-[560px] mx-auto">
                    <div className="rounded-2xl overflow-hidden shadow-xl border border-white/5">
                      <div className="h-[340px] bg-white flex items-center justify-center">
                        <img src="/assets/about-left.jpg" alt="team working" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    {/* Floating badge moved outside overflow-hidden so it is not clipped */}
                    <div className="absolute -left-4 -top-6 px-3 py-2 rounded-xl bg-white shadow-md border border-white/30 flex items-center gap-3 z-20">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#7f4adf] font-bold border border-[#7f4adf]/12">2</div>
                      <div className="text-sm">
                        <div className="text-xs text-slate-500">Years of</div>
                        <div className="font-semibold text-slate-800">Innovation</div>
                      </div>
                    </div>

                    <div className="absolute right-6 bottom-6 p-3 rounded-xl bg-white/95 shadow-lg border border-white/50 w-44 z-10">
                      <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--theme-text-strong)' }}>What drives us</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>Innovation</li>
                        <li>Transparency</li>
                        <li>Customer Success</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right story copy */}
                <div className="lg:col-span-7 animate-fade-in-up delay-200">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#7f4adf] mb-3">OUR STORY</div>
                  <h1 className="text-[2.25rem] sm:text-[3rem] lg:text-[3.6rem] font-extrabold leading-[1.06] tracking-tight mb-4">
                    The journey that shaped <span className="gradient-text-accent">Xenura</span>
                  </h1>
                  <p className="text-base sm:text-lg leading-relaxed mb-4" style={{ color: 'var(--theme-text-muted)' }}>
                    Founded in 2024, Xenura started with a simple idea - to make advanced technology easy to use for every business.
                    What began as a small team of passionate builders is now growing with early clients across India and abroad.
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 mb-5">From day one, we've focused on solving real problems, delivering value and constantly pushing the boundaries of what's possible with AI.</p>

                  <div className="grid sm:grid-cols-2 gap-3 max-w-3xl">
                    <div className="rounded-2xl border px-4 py-3" style={{ borderColor: 'var(--theme-glass-border)', background: 'rgba(255,255,255,0.55)' }}>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-orange-400 font-semibold mb-1">Impact</p>
                      <p className="text-sm font-semibold" style={{ color: 'var(--theme-text-strong)' }}>Serving 10+ industries</p>
                    </div>
                    <div className="rounded-2xl border px-4 py-3" style={{ borderColor: 'var(--theme-glass-border)', background: 'rgba(255,255,255,0.55)' }}>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-orange-400 font-semibold mb-1">Approach</p>
                      <p className="text-sm font-semibold" style={{ color: 'var(--theme-text-strong)' }}>AI-first engineering with secure delivery</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </section>
        <div className="glow-line" />

        <section className="py-12 sm:py-14 lg:py-16">
          <div className="container-custom">
            <div className="text-center mb-8">
              <div className="text-sm uppercase tracking-widest text-[#7f4adf]">Meet our leadership</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-3">The minds behind Xenura</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[
                  { name: 'Gautham Prakash', role: 'Co-Founder & CEO', img: '/assets/team/Prakash.png' },
                  { name: 'Pavithra Natarajan', role: 'Co-Founder & CTO', img: '/assets/team/priya.png' },
                  { name: 'Karthik Srinivas', role: 'VP of Engineering', img: '/assets/team/karthik.png' },
                  { name: 'Meenakshi Iyer', role: 'VP of Marketing', img: '/assets/team/meera.png' },
                  { name: 'Rohit Ramesh', role: 'VP of Customer Success', img: '/assets/team/rohit.png' },
                ].map((m) => (
                <div key={m.name} className="rounded-2xl bg-white shadow-sm p-6 flex flex-col items-center text-center">
                  <div className="-mt-12 mb-3 w-28 h-28 rounded-full overflow-hidden bg-white flex items-center justify-center border border-white/60">
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-2">
                    <div className="font-semibold text-slate-900">{m.name}</div>
                    <div className="text-sm text-slate-500 mb-3">{m.role}</div>
                    <a href="#" className="inline-flex items-center gap-2 text-sm text-[#7f4adf] px-3 py-1 rounded-full border border-[#7f4adf]/10 hover:bg-[#7f4adf]/5 transition-colors">
                      <span className="w-5 h-5 rounded-full bg-[#0a66c2] flex items-center justify-center text-white text-xs">in</span>
                      View Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="glow-line" />

        <section className="section-gradient-2 py-14 sm:py-16 lg:py-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5 scroll-reveal-left">
                <Compass className="w-10 h-10 text-orange-400 mb-5" />
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-5 theme-text-strong">
                  Built for companies that need progress, not noise.
                </h2>
                <p className="text-base leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
                  Our work starts with the business problem, not the technology trend. We align stakeholders, clarify priorities,
                  and build solutions that teams can actually adopt, maintain, and improve.
                </p>
              </div>

              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 scroll-reveal-right">
                {capabilities.map(item => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl p-5"
                      style={{ border: '1px solid var(--theme-glass-border)', background: 'var(--theme-surface-bg)' }}
                    >
                      <Icon className="w-8 h-8 text-[#7f4adf] mb-4" />
                      <h3 className="text-lg font-bold mb-2 theme-text-strong">{item.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="glow-line" />

        <section className="section-gradient-dark py-14 sm:py-16 lg:py-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              <div className="scroll-reveal-left">
                <ShieldCheck className="w-10 h-10 text-orange-400 mb-5" />
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5">
                  What we believe in
                </h2>
                <p className="text-base text-slate-400 leading-relaxed mb-6">
                  Good technology should feel simple for the people using it and dependable for the teams running it.
                  That belief shapes how we plan, design, code, test, and support every project.
                </p>
                <div className="space-y-3">
                  {values.map(value => (
                    <div key={value} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                      <p className="text-sm text-slate-300 leading-relaxed">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="scroll-reveal-right">
                <div className="grid gap-4">
                  {approach.map((step, index) => (
                    <div
                      key={step.label}
                      className="rounded-2xl p-5"
                      style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-9 h-9 rounded-xl bg-white/10 text-orange-300 flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <h3 className="text-lg font-bold text-white">{step.label}</h3>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="glow-line" />

        <section className="section-gradient-1 py-14 sm:py-16 lg:py-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-8 scroll-reveal-left">
                <div className="flex items-center gap-3 mb-5">
                  <Users className="w-9 h-9 text-[#7f4adf]" />
                  <Rocket className="w-9 h-9 text-orange-400" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-5 theme-text-strong">
                  A compact team with senior ownership.
                </h2>
                <p className="text-base leading-relaxed max-w-3xl" style={{ color: 'var(--theme-text-muted)' }}>
                  Xenura works best with founders, business leaders, and growing teams that want a partner who can think with
                  them, execute quickly, and stay accountable after launch. We bring product thinking, design discipline,
                  engineering depth, and growth awareness into one practical delivery model.
                </p>
              </div>
              <div className="lg:col-span-4 scroll-reveal-right">
                <a href="/#contact" className="btn-primary w-full flex items-center justify-center gap-2">
                  <span>Work With Xenura</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
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

export default AboutPage;
