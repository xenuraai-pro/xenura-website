import { ArrowUpRight, Brain, Check, Code, Compass, Lightbulb, Megaphone, Smartphone } from 'lucide-react';
import webDevelopmentImage from '@/assets/service-web-development.svg';
import appDevelopmentImage from '@/assets/service-app-development.svg';
import digitalMarketingImage from '@/assets/service-digital-marketing.svg';
import techConsultingImage from '@/assets/service-tech-consulting.svg';
import aiInnovationImage from '@/assets/service-ai-innovation.svg';
import digitalStrategyImage from '@/assets/service-digital-strategy.svg';

const services = [
  {
    icon: Code,
    image: webDevelopmentImage,
    accent: '#3c66ad',
    pillBg: 'rgba(60,102,173,0.12)',
    title: 'Web Development',
    description: 'Custom websites, web applications, and e-commerce platforms built with modern technologies.',
    bullets: ['Custom Products', 'E-commerce Solutions', 'ERP Systems'],
    detail: 'We build fast, scalable web apps using React, Next.js and Node.js, from MVPs to enterprise platforms.',
  },
  {
    icon: Smartphone,
    image: appDevelopmentImage,
    accent: '#6f48d7',
    pillBg: 'rgba(111,72,215,0.12)',
    title: 'App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    bullets: ['iOS Development', 'Android Development', 'Cross-Platform Apps'],
    detail: 'React Native and Flutter apps with native performance, offline support and seamless app store delivery.',
  },
  {
    icon: Megaphone,
    image: digitalMarketingImage,
    accent: '#ff6b35',
    pillBg: 'rgba(255,107,53,0.12)',
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to boost your online presence.',
    bullets: ['SEO Optimization', 'SEM Campaigns', 'Social Media Management'],
    detail: 'Data-driven SEO, paid ads and social strategies that generate qualified leads and measurable ROI.',
  },
  {
    icon: Lightbulb,
    image: techConsultingImage,
    accent: '#0ea5e9',
    pillBg: 'rgba(14,165,233,0.12)',
    title: 'Tech Consulting',
    description: 'Expert guidance on technology infrastructure and digital transformation.',
    bullets: ['Cloud Hosting', 'Technical Support', 'Infrastructure Planning'],
    detail: 'Architecture reviews, cloud migration roadmaps, and hands-on DevOps support for engineering teams.',
  },
  {
    icon: Brain,
    image: aiInnovationImage,
    accent: '#8b5cf6',
    pillBg: 'rgba(139,92,246,0.12)',
    title: 'AI Training & Innovation',
    description: 'Cutting-edge AI solutions and training programs for modern businesses.',
    bullets: ['AI Implementation', 'Machine Learning', 'Innovation Programs'],
    detail: 'Custom ML models, RAG pipelines, LLM integrations and AI automation that turns data into revenue.',
  },
  {
    icon: Compass,
    image: digitalStrategyImage,
    accent: '#14b8a6',
    pillBg: 'rgba(20,184,166,0.12)',
    title: 'Digital Strategy',
    description: 'Complete digital transformation strategies tailored to your business goals.',
    bullets: ['Digital Planning', 'Technology Roadmap', 'Growth Strategy'],
    detail: 'End-to-end digital strategy: market analysis, product roadmap, go-to-market execution and KPI tracking.',
  },
];

const Services = () => (
  <section id="services" className="relative py-12 sm:py-14 lg:py-16" style={{ background: 'var(--theme-section-1)' }}>
    <div className="container-custom">
      <div className="text-center max-w-3xl mx-auto mb-10 scroll-reveal">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/25 bg-orange-500/8 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">Our Services</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight" style={{ color: 'var(--theme-text-strong)' }}>
          Comprehensive digital solutions<br />designed to elevate your business
        </h2>
        <p className="text-base leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
          From conception to implementation, we deliver excellence at every step.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {services.map((svc, idx) => {
          const SvcIcon = svc.icon;
          return (
            <div key={svc.title} className={`scroll-reveal delay-${(idx + 1) * 100}`}>
              <div className="flip-card-container">
                <div className="flip-card-inner">
                  <div
                    className="flip-card-face flex flex-col overflow-hidden bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 shadow-sm"
                    style={{ borderRadius: 16 }}
                  >
                    <div className="relative h-36 sm:h-40 overflow-hidden bg-slate-100 dark:bg-slate-900">
                      <img
                        src={svc.image}
                        alt={`${svc.title} service illustration`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/18 to-transparent" />
                      <div
                        className="absolute left-5 bottom-4 inline-flex items-center justify-center w-12 h-12 rounded-2xl border border-white/65 bg-white/90 shadow-lg"
                        style={{ color: svc.accent }}
                      >
                        <SvcIcon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="flex flex-col flex-1 p-6 lg:p-7">
                      <h3 className="text-lg font-bold mb-3 flex items-center gap-1.5 text-slate-900 dark:text-white">
                        {svc.title}
                        <ArrowUpRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </h3>
                      <p className="text-sm leading-relaxed mb-5 flex-1 text-slate-600 dark:text-slate-300">
                        {svc.description}
                      </p>
                      <ul className="space-y-2">
                        {svc.bullets.map(b => (
                          <li key={b} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: svc.accent }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    className="flip-card-face flip-card-back flex flex-col p-6 lg:p-7 border shadow-xl"
                    style={{
                      borderRadius: 16,
                      background: 'linear-gradient(145deg, #08162d 0%, #0d2140 54%, #132c4e 100%)',
                      borderColor: 'rgba(197, 216, 240, 0.12)',
                      color: 'rgba(255,255,255,0.92)'
                    }}
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-1"
                      style={{ background: `linear-gradient(90deg, ${svc.accent}, rgba(255,255,255,0.16))` }}
                    />
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-11 h-11 rounded-xl border flex items-center justify-center"
                        style={{ background: `${svc.accent}22`, borderColor: `${svc.accent}45` }}
                      >
                        <SvcIcon className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.96)' }} />
                      </div>
                      <h3 className="text-lg font-bold" style={{ color: 'rgba(255,255,255,0.96)' }}>{svc.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'rgba(255,255,255,0.78)' }}>{svc.detail}</p>
                    <ul className="space-y-2.5 mb-6">
                      {svc.bullets.map(b => (
                        <li key={b} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.92)' }}>
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: `${svc.accent}24` }}
                          >
                            <Check className="w-3 h-3" style={{ color: svc.accent }} />
                          </div>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/#contact"
                      className="flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-100 text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200"
                    >
                      Get Started <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Services;
