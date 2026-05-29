import { LOGO_ALT, LOGO_DARK_SRC, LOGO_LIGHT_SRC } from '@/content/brandAssets';

type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

const sizeClasses: Record<LogoSize, string> = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
  xl: 'h-16',
};

type LogoProps = {
  variant?: 'light' | 'dark';
  size?: LogoSize;
  href?: string;
  className?: string;
  onDarkSurface?: boolean;
};

export function Logo({
  variant = 'light',
  size = 'md',
  href = '/',
  className = '',
  onDarkSurface = false,
}: LogoProps) {
  const src = variant === 'dark' ? LOGO_DARK_SRC : LOGO_LIGHT_SRC;
  const heightClass = sizeClasses[size];

  const image = (
    <img
      src={src}
      alt={LOGO_ALT}
      className={`w-auto max-w-[min(100%,220px)] object-contain object-left ${heightClass}`}
      loading="eager"
      decoding="async"
      onError={(e) => {
        if (variant === 'dark') {
          e.currentTarget.src = LOGO_LIGHT_SRC;
        }
      }}
    />
  );

  const content = onDarkSurface ? (
    <span className="inline-flex items-center rounded-xl bg-white px-2.5 py-1.5 shadow-sm">
      {image}
    </span>
  ) : (
    image
  );

  if (!href) {
    return <span className={`inline-flex items-center shrink-0 ${className}`}>{content}</span>;
  }

  return (
    <a
      href={href}
      className={`inline-flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7f4adf]/40 rounded-lg ${className}`}
    >
      {content}
    </a>
  );
}
