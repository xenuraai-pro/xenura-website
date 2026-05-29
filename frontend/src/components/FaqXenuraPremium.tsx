import { useState } from 'react';
import { Plus, Minus, Play } from 'lucide-react';
import { FAQ_ITEMS } from '@/content/faqs';

const faqs = FAQ_ITEMS.slice(0, 6);

const FaqXenuraPremium = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <section id="faq" className="relative py-12 sm:py-14 lg:py-16 section-gradient-2 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, rgba(127,74,223,0.3) 0%, transparent 70%)' }}/>
        <div className="absolute -bottom-20 right-0 w-96 h-96 rounded-full blur-3xl opacity-15" style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.25) 0%, transparent 70%)' }}/>
      </div>
      <div className="container-custom">
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          {/* Left */}
          <div className="lg:col-span-2 scroll-reveal-left flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 mb-4 w-fit">
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                FAQ
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight"
              style={{ color: 'var(--theme-text-strong)' }}
            >
              Frequently asked
              <span className="gradient-text-accent"> questions</span>
            </h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--theme-text-muted)' }}>
              Everything clients usually ask before starting a project with Xenura. If your question is not listed, our team can help right away.
            </p>

            {/* Video */}
            <div className="relative rounded-2xl overflow-hidden border border-[color:var(--theme-glass-border)] shadow-lg flex-1 min-h-[220px]">
              {!videoPlaying ? (
                <button
                  type="button"
                  className="faq-video-preview relative w-full h-full min-h-[220px] flex flex-col items-center justify-center cursor-pointer group text-left"
                  onClick={() => setVideoPlaying(true)}
                  aria-label="Play company overview video"
                >
                  <div className="absolute inset-0 faq-video-preview-bg" aria-hidden />
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }}
                    aria-hidden
                  />
                  <div
                    className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-40"
                    style={{ background: 'rgba(255, 107, 53, 0.35)' }}
                    aria-hidden
                  />
                  <div
                    className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-3xl opacity-30"
                    style={{ background: 'rgba(127, 74, 223, 0.4)' }}
                    aria-hidden
                  />

                  <div className="relative z-10 w-[4.5rem] h-[4.5rem] rounded-full bg-white flex items-center justify-center mb-5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] ring-4 ring-white/20 group-hover:scale-105 transition-transform duration-300">
                    <Play className="w-8 h-8 text-orange-500 ml-1" fill="currentColor" />
                  </div>
                  <p className="faq-video-title relative z-10 font-bold text-lg sm:text-xl text-center px-6 tracking-tight text-white">
                    Watch our story
                  </p>
                  <p className="faq-video-subtitle relative z-10 text-sm mt-2 text-center px-6 max-w-[260px]">
                    See how we help teams launch websites and digital workflows
                  </p>
                  <div className="faq-video-badge absolute bottom-4 left-4 flex items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-md border border-slate-200/80">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden />
                    <span className="text-xs font-semibold text-slate-800">Company overview</span>
                  </div>
                </button>
              ) : (
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe className="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0" title="Xenura Story" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
                </div>
              )}
            </div>
            {/* Trust badges */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[{ val: '12', label: 'Projects' }, { val: '98%', label: 'Satisfaction' }, { val: '2', label: 'Years' }].map(
                (s) => (
                  <div
                    key={s.label}
                    className="rounded-xl p-3 text-center border border-[color:var(--theme-glass-border)] bg-[var(--theme-surface-bg)] shadow-sm"
                  >
                    <div className="text-base font-bold text-orange-500">{s.val}</div>
                    <div className="text-[10px] font-medium mt-0.5" style={{ color: 'var(--theme-text-muted)' }}>
                      {s.label}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          {/* Right accordion */}
          <div className="lg:col-span-3 space-y-3 scroll-reveal-right">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-orange-500/30 shadow-[0_14px_34px_rgba(255,107,53,0.10)]' : 'border-white/10'}`}>
                  <button className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 lg:p-6 text-left" onClick={() => setOpenIndex(isOpen ? null : index)}>
                    <span className={`text-sm lg:text-base font-semibold transition-colors ${isOpen ? 'text-orange-400' : 'text-white'}`}>{faq.question}</span>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-orange-500/15' : 'bg-white/5'}`}>
                      {isOpen ? <Minus className="w-4 h-4 text-orange-400"/> : <Plus className="w-4 h-4 text-slate-300"/>}
                    </div>
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6">
                        <div className="glow-line mb-4"/>
                        <p className="text-sm text-slate-400 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqXenuraPremium;
