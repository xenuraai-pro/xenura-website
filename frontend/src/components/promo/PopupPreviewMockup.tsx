import { DefaultPromoPanel } from '@/components/promo/DefaultPromoPanel';
import { PromoBannerPanel } from '@/components/promo/PromoBannerPanel';
import { resolveMediaUrl, type ModalPromo } from '@/lib/api';

type Props = {
  promo: ModalPromo;
  bannerPreviewUrl?: string;
};

/** Realistic popup preview for admin (desktop + mobile layouts) */
export const PopupPreviewMockup = ({ promo, bannerPreviewUrl }: Props) => {
  const showBanner = promo.isActive && bannerPreviewUrl;

  const formSide = (
    <div className="flex-1 p-4 flex flex-col bg-white border-slate-100 min-w-0">
      <p className="text-sm font-bold text-slate-900">Let&apos;s Build Together</p>
      <p className="text-[10px] text-slate-500 mt-0.5 mb-3">
        Please complete this form to be connected by one of our experts.
      </p>
      <div className="space-y-2 flex-1">
        <div className="grid grid-cols-2 gap-2">
          <MockField label="Name" />
          <MockField label="Email" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <MockField label="Phone" />
          <MockField label="Company" />
        </div>
        <MockField label="Budget" short />
        <div className="h-14 rounded-lg bg-slate-50 border border-slate-200" />
      </div>
      <div className="flex gap-2 mt-3 justify-end">
        <div className="h-8 w-16 rounded-lg border border-slate-200 bg-white" />
        <div className="h-8 w-24 rounded-lg bg-gradient-to-r from-violet-600 to-orange-500" />
      </div>
    </div>
  );

  const bannerSide = showBanner ? (
    <div className="w-full lg:w-[42%] shrink-0 min-h-[140px] max-h-[180px] lg:max-h-none lg:min-h-[320px] relative bg-slate-900">
      <PromoBannerPanel src={bannerPreviewUrl!} preview showClose={false} />
    </div>
  ) : (
    <DefaultPromoPanel promo={promo} compact className="w-full lg:w-[42%] !min-h-[140px] lg:!min-h-[320px] !lg:w-[42%]" />
  );

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Mobile</p>
        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-white max-w-sm mx-auto">
          <div className="flex flex-col max-h-[520px]">
            {bannerSide}
            <div className="border-t border-slate-100">{formSide}</div>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Desktop</p>
        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-white max-w-lg mx-auto">
          <div className="flex flex-row min-h-[380px]">
            {bannerSide}
            <div className="border-l border-slate-100 flex-1 min-w-0">{formSide}</div>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-center text-slate-400">
        {showBanner
          ? 'Banner fits fully (portrait, square, or landscape) without cropping'
          : 'Default promo content (shown when no banner uploaded)'}
      </p>
    </div>
  );
};

function MockField({ label, short }: { label: string; short?: boolean }) {
  return (
    <div>
      <p className="text-[8px] font-semibold uppercase text-slate-400 mb-0.5">{label}</p>
      <div className={`rounded-md bg-slate-50 border border-slate-200 ${short ? 'h-6' : 'h-7'}`} />
    </div>
  );
}

export function getBannerPreviewUrl(promo: ModalPromo): string {
  return promo.imageUrl ? resolveMediaUrl(promo.imageUrl) : '';
}
