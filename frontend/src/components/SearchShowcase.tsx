import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Search, Sparkles } from 'lucide-react';

const quickPrompts = [
  'What should we build first in 90 days?',
  'Which services fit our current stage?',
  'How quickly can we launch and measure ROI?',
];

const SearchShowcase = () => {
  const prompts = useMemo(
    () => [
      'Which services fit our current stage?',
      'What should we build first in 90 days?',
      'How quickly can we launch and measure ROI?',
    ],
    []
  );

  const [query, setQuery] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);
  const [typedPlaceholder, setTypedPlaceholder] = useState('');

  useEffect(() => {
    if (query.trim().length > 0) return;

    const activePrompt = prompts[promptIndex % prompts.length];
    let charIndex = 0;
    let deleting = false;

    const timer = window.setInterval(() => {
      if (!deleting) {
        charIndex += 1;
        setTypedPlaceholder(activePrompt.slice(0, charIndex));

        if (charIndex >= activePrompt.length) {
          deleting = true;
        }
      } else {
        charIndex -= 1;
        setTypedPlaceholder(activePrompt.slice(0, Math.max(0, charIndex)));

        if (charIndex <= 0) {
          window.clearInterval(timer);
          setPromptIndex((prev) => (prev + 1) % prompts.length);
        }
      }
    }, deleting ? 35 : 65);

    return () => window.clearInterval(timer);
  }, [promptIndex, prompts, query]);

  return (
    <section id="search-insights" className="relative py-12 sm:py-14 lg:py-16 section-gradient-1 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-20 left-[-8%] w-[24rem] h-[24rem] rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(111, 72, 215, 0.14) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-20 right-[-8%] w-[24rem] h-[24rem] rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(255, 107, 53, 0.16) 0%, transparent 70%)' }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 mb-4">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">
              AI Discovery Layer
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.08] theme-text-strong mb-4 max-w-3xl mx-auto">
              One search for your next best move.
          </h2>

          <p className="text-base lg:text-lg theme-text-soft max-w-2xl mx-auto leading-relaxed mb-6">
            Ask in plain language and get immediate direction across strategy, build scope,
            launch planning, and growth execution.
          </p>

          <div className="glass-card rounded-3xl border border-white/30 dark:border-cyan-200/20 bg-white/75 dark:bg-[#0b336c]/70 p-4 sm:p-5 lg:p-6 backdrop-blur-md shadow-[0_24px_65px_rgba(2,12,36,0.16)] dark:shadow-[0_24px_65px_rgba(2,12,36,0.42)] text-left">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm theme-text-strong font-semibold">Ask Xenura AI</div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-500 dark:text-orange-300 text-xs">
                Live insight
              </div>
            </div>

            <form
              className="rounded-2xl border border-slate-300/60 dark:border-white/15 bg-white/90 dark:bg-[#082a59]/75 p-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex items-center gap-3 px-3 py-2.5 flex-1 text-left">
                  <Search className="w-5 h-5 text-[var(--theme-accent-purple)] dark:text-cyan-300 shrink-0" />
                  <input
                    id="search-showcase-input"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent text-sm lg:text-base theme-text-strong placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none"
                    placeholder={typedPlaceholder || 'Ask about ROI, launch strategy, or scope...'}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary !py-2.5 !px-5 rounded-xl inline-flex items-center justify-center gap-2"
                  id="search-showcase-ask"
                >
                  <span>Ask</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="mt-3 grid sm:grid-cols-3 gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setQuery(prompt)}
                  className="w-full text-left px-3 py-2.5 rounded-xl border border-slate-300/60 dark:border-white/12 bg-white/80 dark:bg-white/[0.03] hover:bg-white dark:hover:bg-white/[0.08] text-xs sm:text-sm theme-text-soft transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <a href="#services" className="btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto">
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="btn-secondary inline-flex items-center justify-center gap-2 w-full sm:w-auto">
              <span>Book Strategy Call</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchShowcase;
