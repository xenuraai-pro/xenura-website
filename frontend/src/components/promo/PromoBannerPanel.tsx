import { X } from 'lucide-react';

type PromoBannerPanelProps = {
  src: string;
  bannerLink?: string;
  onClose?: () => void;
  showClose?: boolean;
  /** Admin mini preview uses a fixed column width */
  preview?: boolean;
};

const bannerImageClass =
  'block w-full h-auto max-h-[38vh] sm:max-h-[44vh] lg:max-h-none lg:h-full lg:w-full object-contain object-center';

export function PromoBannerPanel({
  src,
  bannerLink,
  onClose,
  showClose = true,
  preview = false,
}: PromoBannerPanelProps) {
  const image = (
    <img src={src} alt="Promotional banner" className={preview ? 'w-full h-full object-contain object-center' : bannerImageClass} />
  );

  return (
    <div
      className={
        preview
          ? 'relative w-full h-full min-h-[200px] bg-slate-900 flex items-center justify-center overflow-hidden'
          : 'w-full lg:w-[42%] shrink-0 relative bg-slate-900 flex items-center justify-center lg:self-stretch min-h-0 overflow-hidden'
      }
    >
      <div
        className={
          preview
            ? 'absolute inset-0 flex items-center justify-center p-1'
            : 'relative w-full flex items-center justify-center lg:absolute lg:inset-0 lg:p-2'
        }
      >
        {bannerLink ? (
          <a
            href={bannerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full h-full items-center justify-center"
            aria-label="Open promotion"
          >
            {image}
          </a>
        ) : (
          image
        )}
      </div>

      {showClose && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-lg bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
