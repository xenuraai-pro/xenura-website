import type { InquiryFormData } from '@/lib/inquiryForm';

export type InquiryFormErrors = Partial<Record<keyof InquiryFormData, string>>;
export type AdminLoginErrors = { username?: string; password?: string };
export type ResetPasswordErrors = { password?: string; confirmPassword?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_RE = /^[\p{L}\p{M}'.\-\s]+$/u;
const PHONE_DIGITS_RE = /^\d{7,15}$/;

export function sanitizePhoneInput(value: string): string {
  return value.replace(/\D/g, '').slice(0, 15);
}

export function validateName(name: string): string | null {
  const value = name.trim();
  if (!value) return 'Full name is required.';
  if (value.length < 2) return 'Name must be at least 2 characters.';
  if (value.length > 100) return 'Name must be 100 characters or less.';
  if (!NAME_RE.test(value)) {
    return 'Name can only contain letters, spaces, hyphens, and apostrophes.';
  }
  return null;
}

export function validateEmail(email: string): string | null {
  const value = email.trim();
  if (!value) return 'Email address is required.';
  if (value.length > 254) return 'Email is too long.';
  if (!EMAIL_RE.test(value)) return 'Enter a valid email address.';
  return null;
}

export function validatePhone(phone: string): string | null {
  const value = phone.trim();
  if (!value) return null;
  if (!PHONE_DIGITS_RE.test(value)) {
    return 'Enter a valid phone number (7–15 digits only).';
  }
  return null;
}

export function validateCompany(company: string, required = false): string | null {
  const value = company.trim();
  if (!value) return required ? 'This field is required.' : null;
  if (value.length > 150) return 'Must be 150 characters or less.';
  return null;
}

export function validateMessage(message: string, minLength = 10): string | null {
  const value = message.trim();
  if (!value) return 'Message is required.';
  if (value.length < minLength) {
    return `Please enter at least ${minLength} characters.`;
  }
  if (value.length > 5000) return 'Message must be 5000 characters or less.';
  return null;
}

export function validateResumeUrl(url: string): string | null {
  const value = url.trim();
  if (!value) return 'Resume link is required.';
  if (value.length > 500) return 'URL is too long.';
  try {
    const parsed = new URL(value);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return 'Link must start with http:// or https://';
    }
  } catch {
    return 'Enter a valid URL (e.g. https://drive.google.com/...).';
  }
  return null;
}

export function validateOptionalUrl(url: string, fieldLabel = 'URL'): string | null {
  const value = url.trim();
  if (!value) return null;
  if (value.length > 500) return `${fieldLabel} is too long.`;
  try {
    const parsed = new URL(value);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return `${fieldLabel} must start with http:// or https://`;
    }
  } catch {
    return `Enter a valid ${fieldLabel.toLowerCase()}.`;
  }
  return null;
}

export function validateInquiryForm(
  data: InquiryFormData,
  options: { isCareer: boolean }
): InquiryFormErrors {
  const errors: InquiryFormErrors = {};

  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;

  const companyError = validateCompany(data.company);
  if (companyError) errors.company = companyError;

  const messageError = validateMessage(data.message, options.isCareer ? 20 : 10);
  if (messageError) errors.message = messageError;

  if (options.isCareer) {
    const resumeError = validateResumeUrl(data.resumeUrl);
    if (resumeError) errors.resumeUrl = resumeError;
  }

  return errors;
}

export function validateAdminLogin(username: string, password: string): AdminLoginErrors {
  const errors: AdminLoginErrors = {};
  const user = username.trim();
  const pass = password.trim();

  if (!user) errors.username = 'Username is required.';
  else if (user.length < 2) errors.username = 'Username must be at least 2 characters.';
  else if (user.length > 50) errors.username = 'Username must be 50 characters or less.';

  if (!pass) errors.password = 'Password is required.';
  else if (pass.length < 4) errors.password = 'Password must be at least 4 characters.';

  return errors;
}

export function validateForgotPasswordEmail(email: string): string | null {
  return validateEmail(email);
}

export function validateResetPassword(password: string, confirmPassword: string): ResetPasswordErrors {
  const errors: ResetPasswordErrors = {};
  const pass = password.trim();
  const confirm = confirmPassword.trim();

  if (!pass) errors.password = 'Password is required.';
  else if (pass.length < 8) errors.password = 'Password must be at least 8 characters.';

  if (!confirm) errors.confirmPassword = 'Please confirm your password.';
  else if (pass && confirm !== pass) errors.confirmPassword = 'Passwords do not match.';

  return errors;
}

export function firstFormError(errors: Record<string, string | undefined>): string | null {
  const first = Object.values(errors).find(Boolean);
  return first ?? null;
}
