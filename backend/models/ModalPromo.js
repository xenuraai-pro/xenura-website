import mongoose from 'mongoose';

const DEFAULT_PROMO = {
  slug: 'popup',
  isActive: true,
  badgeText: '',
  headline: 'Get A Free Quote Now',
  description:
    'Complete this form to be connected by one of our experts within 3 minutes.',
  bullets: [
    'No commitment required',
    'Reply within 3 minutes',
    'Free project consultation',
  ],
  eventLabel: '',
  gradientStart: '#08295a',
  gradientMid: '#4a1c96',
  gradientEnd: '#cc4a18',
  imageUrl: '',
};

const modalPromoSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, default: 'popup' },
    isActive: { type: Boolean, default: true },
    badgeText: { type: String, default: '' },
    headline: { type: String, default: 'Promo', trim: true },
    description: { type: String, default: '' },
    bullets: { type: [String], default: [] },
    eventLabel: { type: String, default: '' },
    gradientStart: { type: String, default: '#08295a' },
    gradientMid: { type: String, default: '#4a1c96' },
    gradientEnd: { type: String, default: '#cc4a18' },
    imageUrl: { type: String, default: '' },
    bannerLink: { type: String, default: '' },
  },
  { versionKey: false, timestamps: true }
);

export const ModalPromo = mongoose.model('ModalPromo', modalPromoSchema);

export function formatModalPromo(doc) {
  return {
    slug: doc.slug,
    isActive: doc.isActive,
    badgeText: doc.badgeText || '',
    headline: doc.headline,
    description: doc.description || '',
    bullets: doc.bullets || [],
    eventLabel: doc.eventLabel || '',
    gradientStart: doc.gradientStart || DEFAULT_PROMO.gradientStart,
    gradientMid: doc.gradientMid || DEFAULT_PROMO.gradientMid,
    gradientEnd: doc.gradientEnd || DEFAULT_PROMO.gradientEnd,
    imageUrl: doc.imageUrl || '',
    bannerLink: doc.bannerLink || '',
    hasBanner: Boolean(doc.imageUrl),
    updatedAt: doc.updatedAt?.toISOString?.() || new Date().toISOString(),
  };
}

export async function ensureDefaultPromo() {
  const existing = await ModalPromo.findOne({ slug: 'popup' });
  if (!existing) {
    await ModalPromo.create(DEFAULT_PROMO);
    console.log('Default popup promo content created.');
  }
}

export { DEFAULT_PROMO };
