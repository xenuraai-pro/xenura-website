import { useEffect, useState } from 'react';
import { api, ModalPromo, resolveMediaUrl } from '@/lib/api';
import { DefaultPromoPanel } from '@/components/promo/DefaultPromoPanel';
import { PromoBannerPanel } from '@/components/promo/PromoBannerPanel';

type Props = {
  onClose: () => void;
};

export const ModalPromoPanel = ({ onClose }: Props) => {
  const [promo, setPromo] = useState<ModalPromo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .fetchPopupPromo()
      .then(setPromo)
      .catch(() => setPromo(null))
      .finally(() => setLoading(false));
  }, []);

  const bannerSrc = promo?.imageUrl ? resolveMediaUrl(promo.imageUrl) : '';
  const showBanner = promo?.isActive && bannerSrc;

  if (loading) {
    return (
      <div className="w-full lg:w-[42%] relative min-h-[180px] sm:min-h-[220px] lg:min-h-[280px] bg-gradient-to-br from-[#08295a] via-[#4a1c96] to-[#cc4a18] animate-pulse shrink-0" />
    );
  }

  if (showBanner && promo) {
    return (
      <PromoBannerPanel
        src={bannerSrc}
        bannerLink={promo.bannerLink || undefined}
        onClose={onClose}
      />
    );
  }

  return <DefaultPromoPanel promo={promo} onClose={onClose} />;
};
