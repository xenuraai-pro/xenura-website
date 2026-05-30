import { useEffect, useState } from 'react';
import type { ModalPromo } from '@/lib/api';
import {
  getCachedBannerSrc,
  getCachedPopupPromo,
  prefetchPopupPromo,
  subscribeBannerReady,
} from '@/lib/promoCache';
import { DefaultPromoPanel } from '@/components/promo/DefaultPromoPanel';
import { PromoBannerPanel } from '@/components/promo/PromoBannerPanel';

type Props = {
  onClose: () => void;
};

export const ModalPromoPanel = ({ onClose }: Props) => {
  const [promo, setPromo] = useState<ModalPromo | null>(() => getCachedPopupPromo());
  const [loading, setLoading] = useState(() => !getCachedPopupPromo());
  const [bannerSrc, setBannerSrc] = useState(() => {
    const cached = getCachedPopupPromo();
    return cached ? getCachedBannerSrc(cached) : '';
  });

  useEffect(() => {
    let active = true;

    prefetchPopupPromo().then((data) => {
      if (!active) return;
      setPromo(data);
      if (data) setBannerSrc(getCachedBannerSrc(data));
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!promo) return;
    const syncBanner = () => setBannerSrc(getCachedBannerSrc(promo));
    syncBanner();
    return subscribeBannerReady(syncBanner);
  }, [promo]);

  const showBanner = Boolean(promo?.isActive && promo?.hasBanner && bannerSrc);

  if (loading && !promo) {
    return (
      <div className="w-full lg:w-[42%] relative min-h-[180px] sm:min-h-[220px] lg:min-h-[280px] bg-gradient-to-br from-[#08295a] via-[#4a1c96] to-[#cc4a18] animate-pulse shrink-0" />
    );
  }

  if (showBanner && promo) {
    return (
      <PromoBannerPanel
        key={bannerSrc}
        src={bannerSrc}
        bannerLink={promo.bannerLink || undefined}
        onClose={onClose}
      />
    );
  }

  return <DefaultPromoPanel promo={promo} onClose={onClose} />;
};
