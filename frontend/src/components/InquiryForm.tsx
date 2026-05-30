import { useEffect, useState } from 'react';
import { Send, Phone, Building2, MessageSquare, Link2 } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import {
  emptyInquiryForm,
  BUDGET_OPTIONS,
  type InquiryFormData,
  type InquirySource,
} from '@/lib/inquiryForm';
import {
  firstFormError,
  sanitizePhoneInput,
  validateInquiryForm,
  type InquiryFormErrors,
} from '@/lib/formValidation';

type InquiryFormProps = {
  variant: 'light' | 'dark';
  source: InquirySource;
  idPrefix?: string;
  onSuccess?: () => void;
  showCancel?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
  showIntro?: boolean;
  /** Career page: hide budget, adjust labels, optional role pre-fill */
  mode?: 'project' | 'career';
  appliedRole?: string | null;
};

export const InquiryForm = ({
  variant,
  source,
  idPrefix = 'inquiry',
  onSuccess,
  showCancel = false,
  onCancel,
  submitLabel = 'Send Message',
  showIntro = true,
  mode = 'project',
  appliedRole = null,
}: InquiryFormProps) => {
  const isCareer = mode === 'career';
  const [formData, setFormData] = useState<InquiryFormData>(emptyInquiryForm());
  const [errors, setErrors] = useState<InquiryFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isCareer || !appliedRole) return;
    const prefix = `I am applying for the ${appliedRole} role at Xenura.\n\n`;
    setFormData((prev) => {
      const empty = !prev.message.trim();
      const alreadyForRole = prev.message.startsWith('I am applying for the');
      if (empty || alreadyForRole) {
        return { ...prev, message: prefix };
      }
      return prev;
    });
  }, [appliedRole, isCareer]);

  const isDark = variant === 'dark';

  const labelClass = isDark
    ? 'block text-sm font-medium text-slate-300 mb-2'
    : 'block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide';

  const inputClass = isDark
    ? 'w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all'
    : 'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7f4adf]/25 focus:border-[#7f4adf] transition-all';

  const inputWithIconClass = `${inputClass} pl-10`;

  const fieldErrorClass = isDark ? 'text-red-400' : 'text-red-600';

  const inputErrorClass = (field: keyof InquiryFormData) =>
    errors[field]
      ? isDark
        ? 'border-red-400/70 focus:border-red-400 focus:ring-red-400/25'
        : 'border-red-400 focus:border-red-500 focus:ring-red-500/25'
      : '';

  const validateField = (field: keyof InquiryFormData, data: InquiryFormData = formData) => {
    const nextErrors = validateInquiryForm(data, { isCareer });
    setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }));
    return !nextErrors[field];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateInquiryForm(formData, { isCareer });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error(firstFormError(nextErrors) || 'Please fix the highlighted fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.submitInquiry({
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        message: formData.message.trim(),
        source: isCareer ? 'career' : source,
        resumeUrl: isCareer ? formData.resumeUrl.trim() : undefined,
      });
      toast.success('Thank you! Your inquiry was submitted successfully.');
      setFormData(emptyInquiryForm());
      setErrors({});
      onSuccess?.();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const update = (field: keyof InquiryFormData, value: string) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (errors[field]) {
        const nextErrors = validateInquiryForm(next, { isCareer });
        setErrors((prevErrors) => ({ ...prevErrors, [field]: nextErrors[field] }));
      }
      return next;
    });
  };

  const renderError = (field: keyof InquiryFormData) =>
    errors[field] ? (
      <p className={`mt-1.5 text-xs ${fieldErrorClass}`} role="alert">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={handleSubmit} className={isDark ? 'space-y-5' : 'space-y-4'}>
      {showIntro && (
        <div>
          <h3
            className={
              isDark
                ? 'text-2xl sm:text-3xl font-extrabold text-white mb-1'
                : 'text-xl font-bold text-slate-900'
            }
          >
            Let&apos;s Build Together
          </h3>
          <p className={isDark ? 'text-base text-slate-400 mt-1' : 'text-sm text-slate-500 mt-1'}>
            Please complete this form to be connected by one of our experts.
          </p>
        </div>
      )}

      <div className={`grid sm:grid-cols-2 ${isDark ? 'gap-5' : 'gap-3'}`}>
        <div>
          <label htmlFor={`${idPrefix}-name`} className={labelClass}>
            Full Name *
          </label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            autoComplete="name"
            maxLength={100}
            placeholder="John Doe"
            className={`${inputClass} ${inputErrorClass('name')}`}
            value={formData.name}
            onChange={(e) => update('name', e.target.value)}
            onBlur={() => validateField('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined}
          />
          <div id={`${idPrefix}-name-error`}>{renderError('name')}</div>
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className={labelClass}>
            Email Address *
          </label>
          <input
            id={`${idPrefix}-email`}
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="your@company.com"
            className={`${inputClass} ${inputErrorClass('email')}`}
            value={formData.email}
            onChange={(e) => update('email', e.target.value)}
            onBlur={() => validateField('email')}
            aria-invalid={Boolean(errors.email)}
          />
          {renderError('email')}
        </div>
      </div>

      <div className={`grid sm:grid-cols-2 ${isDark ? 'gap-5' : 'gap-3'}`}>
        <div>
          <label htmlFor={`${idPrefix}-phone`} className={labelClass}>
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id={`${idPrefix}-phone`}
              type="tel"
              autoComplete="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={15}
              placeholder="9876543210"
              className={`${inputWithIconClass} ${inputErrorClass('phone')}`}
              value={formData.phone}
              onChange={(e) => update('phone', sanitizePhoneInput(e.target.value))}
              onBlur={() => validateField('phone')}
              aria-invalid={Boolean(errors.phone)}
            />
          </div>
          {renderError('phone')}
        </div>
        <div>
          <label htmlFor={`${idPrefix}-company`} className={labelClass}>
            {isCareer ? 'Portfolio / LinkedIn' : 'Company'}
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id={`${idPrefix}-company`}
              type="text"
              autoComplete="organization"
              maxLength={150}
              placeholder={isCareer ? 'linkedin.com/in/you or portfolio URL' : 'Your Company'}
              className={`${inputWithIconClass} ${inputErrorClass('company')}`}
              value={formData.company}
              onChange={(e) => update('company', e.target.value)}
              onBlur={() => validateField('company')}
              aria-invalid={Boolean(errors.company)}
            />
          </div>
          {renderError('company')}
        </div>
      </div>

      {isCareer && (
        <div>
          <label htmlFor={`${idPrefix}-resume`} className={labelClass}>
            Resume (Google Drive link) *
          </label>
          <div className="relative">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id={`${idPrefix}-resume`}
              type="url"
              inputMode="url"
              maxLength={500}
              placeholder="https://drive.google.com/file/d/..."
              className={`${inputWithIconClass} ${inputErrorClass('resumeUrl')}`}
              value={formData.resumeUrl}
              onChange={(e) => update('resumeUrl', e.target.value)}
              onBlur={() => validateField('resumeUrl')}
              aria-invalid={Boolean(errors.resumeUrl)}
            />
          </div>
          {renderError('resumeUrl')}
          <p className={`mt-1.5 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Upload your resume to Google Drive and paste a shareable link (Anyone with the link can view).
          </p>
        </div>
      )}

      {!isCareer && (
        <div>
          <label htmlFor={`${idPrefix}-budget`} className={labelClass}>
            Project Budget
          </label>
          <select
            id={`${idPrefix}-budget`}
            className={inputClass}
            value={formData.budget}
            onChange={(e) => update('budget', e.target.value)}
          >
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor={`${idPrefix}-message`} className={labelClass}>
          {isCareer ? 'Application details *' : 'Project Details *'}
        </label>
        <div className="relative">
          <MessageSquare
            className={`absolute left-3 ${isDark ? 'top-3.5' : 'top-3'} w-4 h-4 text-slate-400`}
          />
          <textarea
            id={`${idPrefix}-message`}
            rows={isDark ? 5 : 4}
            maxLength={5000}
            placeholder={
              isCareer
                ? 'Share your experience, skills, notice period, and why you want to join Xenura...'
                : 'Tell us about your project, goals, timeline, and requirements...'
            }
            className={`${inputWithIconClass} resize-none ${inputErrorClass('message')}`}
            value={formData.message}
            onChange={(e) => update('message', e.target.value)}
            onBlur={() => validateField('message')}
            aria-invalid={Boolean(errors.message)}
          />
        </div>
        {renderError('message')}
        <p className={`mt-1 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {formData.message.trim().length}/5000 characters
          {!isCareer && ' · minimum 10 characters'}
          {isCareer && ' · minimum 20 characters'}
        </p>
      </div>

      <div
        className={
          showCancel
            ? 'flex flex-col sm:flex-row gap-3 sm:justify-end pt-1'
            : 'pt-1'
        }
      >
        {showCancel && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto text-sm py-2.5 px-5 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50"
          >
            Not now
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={
            showCancel
              ? 'btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm py-2.5 px-5 rounded-lg disabled:opacity-50'
              : 'btn-primary w-full flex items-center justify-center gap-2 text-sm sm:text-base py-3.5 sm:py-4 disabled:opacity-50'
          }
        >
          <span>{isSubmitting ? 'Sending...' : submitLabel}</span>
          <Send className="w-4 h-4" />
        </button>
      </div>

      {isDark && (
        <p className="text-xs text-slate-500 text-center">
          By submitting this form, you agree to our privacy policy and terms of service.
        </p>
      )}
    </form>
  );
};
