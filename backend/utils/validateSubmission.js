const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_RE = /^[\p{L}\p{M}'.\-\s]+$/u;
const PHONE_DIGITS_RE = /^\d{7,15}$/;

function validateName(name) {
  const value = String(name || '').trim();
  if (!value) return 'Full name is required.';
  if (value.length < 2) return 'Name must be at least 2 characters.';
  if (value.length > 100) return 'Name must be 100 characters or less.';
  if (!NAME_RE.test(value)) {
    return 'Name can only contain letters, spaces, hyphens, and apostrophes.';
  }
  return null;
}

function validateEmail(email) {
  const value = String(email || '').trim();
  if (!value) return 'Email address is required.';
  if (value.length > 254) return 'Email is too long.';
  if (!EMAIL_RE.test(value)) return 'Enter a valid email address.';
  return null;
}

function validatePhone(phone) {
  const value = String(phone || '').trim();
  if (!value) return null;
  if (!PHONE_DIGITS_RE.test(value)) {
    return 'Enter a valid phone number (7–15 digits only).';
  }
  return null;
}

function validateMessage(message, minLength = 10) {
  const value = String(message || '').trim();
  if (!value) return 'Message is required.';
  if (value.length < minLength) return `Message must be at least ${minLength} characters.`;
  if (value.length > 5000) return 'Message must be 5000 characters or less.';
  return null;
}

function validateOptionalText(value, maxLength, label) {
  const text = String(value || '').trim();
  if (!text) return null;
  if (text.length > maxLength) return `${label} must be ${maxLength} characters or less.`;
  return null;
}

function validateUrl(url, { required = false, label = 'URL' } = {}) {
  const value = String(url || '').trim();
  if (!value) return required ? `${label} is required.` : null;
  if (value.length > 500) return `${label} is too long.`;
  try {
    const parsed = new URL(value);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return `${label} must start with http:// or https://`;
    }
  } catch {
    return `Enter a valid ${label.toLowerCase()}.`;
  }
  return null;
}

export function validateContactSubmission(body) {
  const source = ['popup', 'contact', 'career'].includes(body?.source) ? body.source : 'contact';
  const isCareer = source === 'career';

  const checks = [
    validateName(body?.name),
    validateEmail(body?.email),
    validatePhone(body?.phone),
    validateOptionalText(body?.company, 150, 'Company'),
    validateMessage(body?.message, isCareer ? 20 : 10),
  ];

  if (isCareer) {
    checks.push(validateUrl(body?.resumeUrl, { required: true, label: 'Resume link' }));
  }

  const error = checks.find(Boolean);
  if (error) return { error };

  return {
    data: {
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || '',
      company: body.company?.trim() || '',
      budget: String(body.budget || '').slice(0, 50),
      message: body.message.trim(),
      resumeUrl: body.resumeUrl?.trim() || '',
      source,
    },
  };
}

export function validateBannerLink(bannerLink) {
  return validateUrl(bannerLink, { label: 'Banner link' });
}
