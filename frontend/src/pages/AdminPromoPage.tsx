import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  Trash2,
  Loader2,
  Megaphone,
  Eye,
  Save,
  ImageIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { validateOptionalUrl } from '@/lib/formValidation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { api, getBannerMediaUrl, type ModalPromo } from '@/lib/api';
import { PopupPreviewMockup, getBannerPreviewUrl } from '@/components/promo/PopupPreviewMockup';
import { compressPromoBanner } from '@/lib/compressImage';
import { primePopupPromo } from '@/lib/promoCache';

async function fetchBannerPreviewBlob(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch {
    return null;
  }
}

const AdminPromoPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const localPreviewRef = useRef<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [promo, setPromo] = useState<ModalPromo | null>(null);
  const [bannerLink, setBannerLink] = useState('');
  const [bannerLinkError, setBannerLinkError] = useState('');
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);

  const setPreviewBlob = (url: string | null) => {
    if (localPreviewRef.current) {
      URL.revokeObjectURL(localPreviewRef.current);
      localPreviewRef.current = null;
    }
    if (url) {
      localPreviewRef.current = url;
    }
    setLocalPreviewUrl(url);
  };

  useEffect(() => {
    return () => {
      if (localPreviewRef.current) {
        URL.revokeObjectURL(localPreviewRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadPromo();
  }, [navigate]);

  const loadPromo = async () => {
    setLoading(true);
    try {
      const data = await api.fetchAdminPromo();
      setPromo(data);
      setBannerLink(data.bannerLink || '');

      const remoteUrl = getBannerMediaUrl(data);
      if (remoteUrl) {
        const blobUrl = await fetchBannerPreviewBlob(remoteUrl);
        if (blobUrl) setPreviewBlob(blobUrl);
      } else {
        setPreviewBlob(null);
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to load promo.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    api.removeToken();
    navigate('/admin/login');
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (JPG, PNG, GIF, or WebP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5 MB.');
      return;
    }

    setUploading(true);
    try {
      const optimized = await compressPromoBanner(file);
      setPreviewBlob(URL.createObjectURL(optimized));

      const { promo: updated } = await api.uploadPopupBanner(optimized);
      primePopupPromo(updated, optimized);
      setPromo(updated);
      toast.success('Banner uploaded! It will show on the popup left panel.');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveBanner = async () => {
    if (!window.confirm('Remove the current banner image?')) return;
    setUploading(true);
    try {
      const { promo: updated } = await api.deletePopupBanner();
      setPromo(updated);
      setPreviewBlob(null);
      toast.success('Banner removed.');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to remove banner.');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promo) return;

    const linkError = validateOptionalUrl(bannerLink, 'Banner link');
    setBannerLinkError(linkError || '');
    if (linkError) {
      toast.error(linkError);
      return;
    }

    setSaving(true);
    try {
      const { promo: updated } = await api.updatePopupPromo({
        isActive: promo.isActive,
        bannerLink,
      });
      setPromo(updated);
      toast.success('Settings saved.');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  const bannerPreview =
    localPreviewUrl || (promo ? getBannerPreviewUrl(promo) : '');

  return (
    <AdminLayout
      title="Popup Banner Ad"
      subtitle="Upload the image shown on the left side of the lead popup"
      onLogout={handleLogout}
      actions={
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50"
        >
          <Eye className="w-3.5 h-3.5" />
          View website
        </a>
      }
    >
      {loading || !promo ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        </div>
      ) : (
        <div className="grid xl:grid-cols-[minmax(0,400px)_1fr] gap-6 xl:gap-8 items-start max-w-7xl">
          <div className="space-y-5 xl:sticky xl:top-24">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/80">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-orange-600" />
                  <h2 className="font-bold text-slate-900">Banner image</h2>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  Portrait, square, or landscape · max 5 MB
                </p>
              </div>

              <div className="p-5 space-y-4">
                {bannerPreview && promo.hasBanner ? (
                  <div className="rounded-lg border border-slate-200 overflow-hidden bg-slate-900">
                    <img
                      src={bannerPreview}
                      alt="Current banner"
                      className="w-full h-auto max-h-40 object-contain mx-auto block"
                    />
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 py-8 flex flex-col items-center gap-2 text-slate-400">
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-xs">No banner uploaded</span>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  className="hidden"
                  onChange={handleFileSelect}
                />

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold disabled:opacity-50 transition-colors"
                  >
                    {uploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    {uploading ? 'Uploading…' : 'Upload image'}
                  </button>

                  {promo.hasBanner && (
                    <button
                      type="button"
                      disabled={uploading}
                      onClick={handleRemoveBanner}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-red-200 bg-white text-red-700 text-sm font-semibold hover:bg-red-50 disabled:opacity-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            <form
              noValidate
              onSubmit={handleSaveSettings}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4"
            >
              <h3 className="font-bold text-slate-900 text-sm">Popup settings</h3>

              <label className="flex items-center gap-2.5 text-sm font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={promo.isActive}
                  onChange={(e) => setPromo({ ...promo, isActive: e.target.checked })}
                  className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                />
                Show banner on popup
              </label>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Banner click link <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  inputMode="url"
                  maxLength={500}
                  placeholder="https://xenuralabs.com/event"
                  className={`w-full py-2.5 px-3 rounded-lg border text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/25 ${
                    bannerLinkError ? 'border-red-400' : 'border-slate-300'
                  }`}
                  value={bannerLink}
                  onChange={(e) => {
                    setBannerLink(e.target.value);
                    if (bannerLinkError) {
                      setBannerLinkError(validateOptionalUrl(e.target.value, 'Banner link') || '');
                    }
                  }}
                  onBlur={() =>
                    setBannerLinkError(validateOptionalUrl(bannerLink, 'Banner link') || '')
                  }
                  aria-invalid={Boolean(bannerLinkError)}
                />
                {bannerLinkError ? (
                  <p className="text-xs text-red-600 mt-1.5" role="alert">
                    {bannerLinkError}
                  </p>
                ) : (
                  <p className="text-xs text-slate-500 mt-1.5">
                    Opens in a new tab when visitors click the banner.
                  </p>
                )}
              </div>

              <div className="pt-1 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm disabled:opacity-50 transition-colors"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save settings
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6 min-w-0">
            <div className="mb-5 pb-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-900">Live popup preview</h2>
              <p className="text-sm text-slate-500 mt-1">
                How visitors see the popup on mobile and desktop.
              </p>
            </div>
            <PopupPreviewMockup promo={promo} bannerPreviewUrl={bannerPreview} />
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminPromoPage;
