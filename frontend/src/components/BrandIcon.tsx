import { LOGO_ICON_ALT, LOGO_ICON_SRC } from '@/content/brandAssets';

type BrandIconProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeClasses: Record<NonNullable<BrandIconProps['size']>, string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

export function BrandIcon({ size = 'sm', className = '' }: BrandIconProps) {
  return (
    <img
      src={LOGO_ICON_SRC}
      alt={LOGO_ICON_ALT}
      className={`${sizeClasses[size]} object-contain ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
}
