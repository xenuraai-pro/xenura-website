import { CheckCircle, X, Sparkles } from 'lucide-react';
import type { ModalPromo } from '@/lib/api';
import { Logo } from '@/components/Logo';

const FALLBACK: Pick<
  ModalPromo,
  'headline' | 'description' | 'bullets' | 'badgeText' | 'eventLabel' | 'gradientStart' | 'gradientMid' | 'gradientEnd'
> = {
  headline: 'Get A Free Quote Now',
  description:
    'Complete this form to be connected by one of our experts within 3 minutes.',
  bullets: [
    'No commitment required',
    'Reply within 3 minutes',
    'Free project consultation',
  ],
  badgeText: '',
  eventLabel: '',
  gradientStart: '#08295a',
  gradientMid: '#4a1c96',
  gradientEnd: '#cc4a18',
};

type Props = {
  promo?: Partial<ModalPromo> | null;
  onClose?: () => void;
  compact?: boolean;
  className?: string;
};

export const DefaultPromoPanel = ({ promo, onClose, compact = false, className = '' }: Props) => {
  const headline = promo?.headline || FALLBACK.headline;
  const description = promo?.description || FALLBACK.description;
  const bullets =
    promo?.bullets && promo.bullets.length > 0 ? promo.bullets : FALLBACK.bullets!;
  const gradientStart = promo?.gradientStart || FALLBACK.gradientStart;
  const gradientMid = promo?.gradientMid || FALLBACK.gradientMid;
  const gradientEnd = promo?.gradientEnd || FALLBACK.gradientEnd;
  const bg = `linear-gradient(145deg, ${gradientStart} 0%, ${gradientMid} 48%, ${gradientEnd} 100%)`;

  return (
    <div
      className={`popup-promo-panel relative flex flex-col overflow-hidden shrink-0 ${
        compact ? 'min-h-[320px]' : 'lg:w-[42%] min-h-[240px] sm:min-h-[300px] lg:min-h-full'
      } ${className}`}
      style={{ background: bg, color: '#ffffff' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.14),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[length:24px_24px] bg-[radial-gradient(circle,rgba(255,255,255,0.35)_1px,transparent_1px)]" />

      {onClose && (
        <div
          className={`relative z-20 flex items-center justify-between ${
            compact ? 'px-4 pt-4' : 'px-5 pt-5 lg:px-6 lg:pt-6'
          }`}
        >
          <Logo size="sm" href="/" onDarkSurface />
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-black/25 hover:bg-black/40 border border-white/25 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div
        className={`relative z-10 flex-1 flex flex-col ${
          compact ? 'px-4 pb-4' : 'px-5 pb-5 lg:px-6 lg:pb-6'
        }`}
      >
        {!compact && (
          <div className="flex justify-center py-3 flex-shrink-0">
            <div className="rounded-2xl bg-white/10 border border-white/15 p-3 backdrop-blur-sm shadow-inner">
              <PromoIllustration />
            </div>
          </div>
        )}

        <div
          className={`mt-auto rounded-2xl border border-white/20 bg-black/20 backdrop-blur-md shadow-xl ${
            compact ? 'p-3.5' : 'p-4 lg:p-5'
          }`}
        >
          {promo?.badgeText && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/90 text-[10px] font-bold uppercase tracking-wider text-white mb-2.5 shadow-sm">
              <Sparkles className="w-3 h-3" />
              {promo.badgeText}
            </span>
          )}

          {promo?.eventLabel && (
            <p className="text-xs font-semibold text-orange-100 mb-2 keep-white">{promo.eventLabel}</p>
          )}

          <h3
            className={`font-extrabold leading-tight text-white keep-white ${
              compact ? 'text-lg mb-1.5' : 'text-xl sm:text-2xl mb-2'
            }`}
            style={{ color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}
          >
            {headline}
          </h3>

          {description && (
            <p
              className={`leading-relaxed text-white/90 keep-white ${
                compact ? 'text-xs mb-2.5' : 'text-sm mb-3.5'
              }`}
              style={{ color: 'rgba(255,255,255,0.92)' }}
            >
              {description}
            </p>
          )}

          <ul className="space-y-2">
            {bullets.filter(Boolean).map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/25 border border-emerald-400/40">
                  <CheckCircle className="w-3 h-3 text-emerald-300" strokeWidth={2.5} />
                </span>
                <span
                  className={`font-medium text-white/95 keep-white ${
                    compact ? 'text-[11px] leading-snug' : 'text-xs sm:text-sm leading-snug'
                  }`}
                  style={{ color: '#f8fafc' }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

function PromoIllustration() {
  return (
    <svg
      viewBox="0 0 280 210"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[200px] h-auto"
      aria-hidden
    >
      <rect x="20" y="158" width="240" height="12" rx="4" fill="rgba(255,255,255,0.15)" />
      <ellipse cx="140" cy="120" rx="28" ry="34" fill="rgba(255,255,255,0.2)" />
      <circle cx="140" cy="76" r="22" fill="#FDE68A" />
      <ellipse cx="140" cy="62" rx="22" ry="14" fill="#92400E" />
      <rect x="92" y="140" width="96" height="64" rx="6" fill="#1a0a30" />
      <rect x="100" y="184" width="40" height="8" rx="3" fill="#ff6b35" />
      <rect x="180" y="100" width="72" height="26" rx="6" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.25" />
      <circle cx="192" cy="113" r="5" fill="#22C55E" />
      <text x="202" y="117" fontSize="9" fill="white" fontFamily="system-ui,sans-serif">
        Project sent!
      </text>
      <rect x="28" y="110" width="72" height="26" rx="6" fill="white" fillOpacity="0.14" stroke="white" strokeOpacity="0.25" />
      <circle cx="40" cy="123" r="5" fill="#ff6b35" />
      <text x="50" y="127" fontSize="9" fill="white" fontFamily="system-ui,sans-serif">
        Live in 2 weeks
      </text>
    </svg>
  );
}
