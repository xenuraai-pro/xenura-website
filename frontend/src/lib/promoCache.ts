import { api, getBannerMediaUrl, type ModalPromo } from '@/lib/api';

let cachedPromo: ModalPromo | null = null;
let promoPromise: Promise<ModalPromo | null> | null = null;
let cachedBannerObjectUrl: string | null = null;
let cachedBannerForUrl: string | null = null;
const preloadedBannerUrls = new Set<string>();
const bannerListeners = new Set<() => void>();

function notifyBannerReady() {
  bannerListeners.forEach((listener) => listener());
}

function revokeBannerObjectUrl() {
  if (cachedBannerObjectUrl) {
    URL.revokeObjectURL(cachedBannerObjectUrl);
    cachedBannerObjectUrl = null;
    cachedBannerForUrl = null;
  }
}

export function subscribeBannerReady(listener: () => void): () => void {
  bannerListeners.add(listener);
  return () => bannerListeners.delete(listener);
}

export function getCachedPopupPromo(): ModalPromo | null {
  return cachedPromo;
}

/** Prefer in-memory blob URL (instant) over network URL. */
export function getCachedBannerSrc(promo: ModalPromo): string {
  const url = getBannerMediaUrl(promo);
  if (!url) return '';
  if (cachedBannerObjectUrl && cachedBannerForUrl === url) {
    return cachedBannerObjectUrl;
  }
  return url;
}

export function primeBannerBlob(blob: Blob, versionUrl: string) {
  revokeBannerObjectUrl();
  cachedBannerObjectUrl = URL.createObjectURL(blob);
  cachedBannerForUrl = versionUrl;
  preloadedBannerUrls.add(versionUrl);
  notifyBannerReady();
}

export async function preloadBannerImage(url: string): Promise<void> {
  if (!url) return;
  if (preloadedBannerUrls.has(url) && cachedBannerObjectUrl && cachedBannerForUrl === url) {
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) return;

    const blob = await response.blob();
    if (!blob.size) return;

    primeBannerBlob(blob, url);
  } catch {
    // keep network URL fallback in getCachedBannerSrc
  }
}

export async function prefetchPopupPromo(): Promise<ModalPromo | null> {
  if (cachedPromo) {
    const url = getBannerMediaUrl(cachedPromo);
    if (url) await preloadBannerImage(url);
    return cachedPromo;
  }

  if (!promoPromise) {
    promoPromise = api
      .fetchPopupPromo()
      .then(async (promo) => {
        cachedPromo = promo;
        const url = getBannerMediaUrl(promo);
        if (url) await preloadBannerImage(url);
        return promo;
      })
      .catch(() => null)
      .finally(() => {
        promoPromise = null;
      });
  }

  return promoPromise;
}

export function primePopupPromo(promo: ModalPromo, blob?: Blob) {
  cachedPromo = promo;
  const url = getBannerMediaUrl(promo);
  if (blob && url) {
    primeBannerBlob(blob, url);
    return;
  }
  if (url) void preloadBannerImage(url);
}

export function clearPopupPromoCache() {
  cachedPromo = null;
  preloadedBannerUrls.clear();
  revokeBannerObjectUrl();
}
