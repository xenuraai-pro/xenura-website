import { useState } from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import { DefaultPromoPanel } from '@/components/promo/DefaultPromoPanel';
import { getBannerMediaUrl, type ModalPromo } from '@/lib/api';

type Props = {
  promo: ModalPromo;
  bannerPreviewUrl?: string;
};

type PreviewLayout = 'mobile' | 'desktop';

function PreviewBanner({
  promo,
  bannerPreviewUrl,
  layout,
}: {
  promo: ModalPromo;
  bannerPreviewUrl?: string;
  layout: PreviewLayout;
}) {
  const showBanner = Boolean(promo.isActive && promo.hasBanner && bannerPreviewUrl);

  if (!showBanner) {
    return (
      <DefaultPromoPanel
        promo={promo}
        compact
        className={
          layout === 'mobile'
            ? 'w-full !min-h-[160px]'
            : 'w-[42%] shrink-0 !min-h-[340px] h-full'
        }
      />
    );
  }

  if (layout === 'mobile') {
    return (
      <div className="w-full bg-[#0a1628]">
        <img src={bannerPreviewUrl} alt="Banner preview" className="w-full h-auto block" />
      </div>
    );
  }

  return (
    <div className="w-[42%] shrink-0 self-stretch bg-[#0a1628] flex items-center justify-center min-h-[340px]">
      <img
        src={bannerPreviewUrl}
        alt="Banner preview"
        className="w-full h-full max-h-[340px] object-contain object-center"
      />
    </div>
  );
}

function PreviewForm({ compact }: { compact?: boolean }) {
  return (
    <div className="flex-1 p-4 sm:p-5 flex flex-col bg-white min-w-0">
      <p className={`font-bold text-slate-900 ${compact ? 'text-sm' : 'text-base'}`}>
        Let&apos;s Build Together
      </p>
      <p className="text-[11px] text-slate-500 mt-1 mb-4 leading-relaxed">
        Please complete this form to be connected by one of our experts.
      </p>
      <div className="space-y-2.5 flex-1">
        <div className="grid grid-cols-2 gap-2.5">
          <MockField label="Name" />
          <MockField label="Email" />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <MockField label="Phone" />
          <MockField label="Company" />
        </div>
        <MockField label="Budget" />
        <div className="h-16 rounded-lg bg-slate-50 border border-slate-200" />
      </div>
      <div className="flex gap-2 mt-4 justify-end pt-2 border-t border-slate-100">
        <div className="h-9 w-[72px] rounded-lg border border-slate-200 bg-white" />
        <div className="h-9 w-[108px] rounded-lg bg-gradient-to-r from-violet-600 to-orange-500" />
      </div>
    </div>
  );
}

export const PopupPreviewMockup = ({ promo, bannerPreviewUrl }: Props) => {
  const [layout, setLayout] = useState<PreviewLayout>('desktop');
  const showBanner = Boolean(promo.isActive && promo.hasBanner && bannerPreviewUrl);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-xs text-slate-500">Switch device view</p>
        <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => setLayout('desktop')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              layout === 'desktop'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Desktop
          </button>
          <button
            type="button"
            onClick={() => setLayout('mobile')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              layout === 'mobile'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile
          </button>
        </div>
      </div>

      <div
        className={`rounded-xl overflow-hidden border border-slate-200 shadow-md bg-white mx-auto transition-all ${
          layout === 'mobile' ? 'max-w-[320px]' : 'max-w-2xl w-full'
        }`}
      >
        {layout === 'mobile' ? (
          <div className="flex flex-col">
            <PreviewBanner promo={promo} bannerPreviewUrl={bannerPreviewUrl} layout="mobile" />
            <PreviewForm compact />
          </div>
        ) : (
          <div className="flex flex-row min-h-[340px]">
            <PreviewBanner promo={promo} bannerPreviewUrl={bannerPreviewUrl} layout="desktop" />
            <PreviewForm />
          </div>
        )}
      </div>

      <p className="text-xs text-center text-slate-500">
        {showBanner
          ? 'Full banner image shown without cropping.'
          : 'Default promo shows when no banner is uploaded or banner is off.'}
      </p>
    </div>
  );
};

function MockField({ label }: { label: string }) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase text-slate-400 mb-1">{label}</p>
      <div className="h-8 rounded-md bg-slate-50 border border-slate-200" />
    </div>
  );
}

export function getBannerPreviewUrl(promo: ModalPromo): string {
  return getBannerMediaUrl(promo);
}
