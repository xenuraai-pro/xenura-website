/** Shared company contact details - import here instead of duplicating across components. */
export const BRAND_NAME = 'Xenura';
export const COMPANY_NAME = 'Xenura Labs';
export const COMPANY_WEBSITE = 'xenuralabs.com';
export const COMPANY_WEBSITE_URL = `https://${COMPANY_WEBSITE}`;

export const COMPANY_ADDRESS = {
  lines: [
    'Xenura Labs',
    '2nd Cross, 2nd Main',
    'Jigala Road, Attibele',
    'Bangalore - 562107',
    'Karnataka, India',
  ] as const,
  /** One-line summary for compact UI (map pin, office card). */
  summary: 'Jigala Road, Attibele, Bangalore - 562107, Karnataka, India',
  /** Full address for maps search / embed. */
  mapQuery:
    'Xenura Labs, 2nd Cross, 2nd Main, Jigala Road, Attibele, Bangalore 562107, Karnataka, India',
};

export const COMPANY_PHONE = {
  display: '+91 88383 65612',
  tel: '+918838365612',
};

export const COMPANY_EMAIL = 'hello@xenuralabs.com';

export const COMPANY_MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  COMPANY_ADDRESS.mapQuery
)}&output=embed`;

const whatsappNumber = COMPANY_PHONE.tel.replace(/\D/g, '');

/** Open WhatsApp chat with optional pre-filled message. */
export function whatsAppUrl(message?: string) {
  const text = message ?? 'Hi Xenura, I would like to know more about your services.';
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/** Open WhatsApp chat with optional pre-filled career message. */
export function careerWhatsAppUrl(role?: string) {
  const text = role
    ? `Hi Xenura, I would like to apply for the ${role} position.`
    : 'Hi Xenura, I am interested in career opportunities at Xenura.';
  return whatsAppUrl(text);
}

/** mailto link for email applications (fallback). */
export function careerApplyMailto(role?: string) {
  const subject = role ? `Application: ${role} - Xenura` : 'Career application - Xenura';
  const body = role
    ? `Hi Xenura team,\n\nI would like to apply for the ${role} position.\n\nName:\nPhone:\nPortfolio/LinkedIn:\nResume (Google Drive link):\n\nBrief introduction:\n\n`
    : `Hi Xenura team,\n\nI would like to apply for a position at Xenura.\n\nName:\nPhone:\nPortfolio/LinkedIn:\nResume (Google Drive link):\n\nBrief introduction:\n\n`;
  return `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const CAREER_APPLY_SECTION_ID = 'career-apply';

/** Public social profiles — update URLs when live accounts are ready. */
export const COMPANY_SOCIAL = {
  linkedin: 'https://www.linkedin.com/company/xenuralabs',
  youtube: 'https://www.youtube.com/@xenuralabs',
  facebook: 'https://www.facebook.com/xenuralabs',
  instagram: 'https://www.instagram.com/xenuralabs',
} as const;
