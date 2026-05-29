import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import type { FaqItem } from '@/content/faqs';

type FaqAccordionProps = {
  items: FaqItem[];
  variant?: 'light' | 'dark';
};

export const FaqAccordion = ({ items, variant = 'light' }: FaqAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isDark = variant === 'dark';

  return (
    <div className="space-y-3">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.question}
            className={`rounded-xl border overflow-hidden transition-shadow ${
              isDark
                ? 'border-white/10 bg-white/[0.03]'
                : 'border-[color:var(--theme-glass-border)] bg-[var(--theme-surface-bg)]'
            } ${isOpen ? 'shadow-md' : ''}`}
          >
            <button
              type="button"
              className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span
                className={`text-sm sm:text-base font-semibold pr-2 ${
                  isDark ? 'text-white' : 'theme-text-strong'
                }`}
              >
                {faq.question}
              </span>
              <span
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isOpen ? 'bg-orange-500/20 text-orange-400' : isDark ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            {isOpen && (
              <div
                className={`px-4 sm:px-5 pb-4 text-sm leading-relaxed border-t ${
                  isDark ? 'text-slate-400 border-white/10' : 'border-slate-200/80'
                }`}
                style={!isDark ? { color: 'var(--theme-text-muted)' } : undefined}
              >
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
