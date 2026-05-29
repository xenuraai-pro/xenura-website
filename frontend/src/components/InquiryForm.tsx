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

  const inputWithIconClass = isDark
    ? `${inputClass} pl-10`
    : `${inputClass} pl-10`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in name, email, and message.');
      return;
    }
    if (isCareer && !formData.resumeUrl.trim()) {
      toast.error('Please add your resume Google Drive link.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.submitInquiry({
        ...formData,
        source: isCareer ? 'career' : source,
        resumeUrl: isCareer ? formData.resumeUrl.trim() : undefined,
      });
      toast.success('Thank you! Your inquiry was submitted successfully.');
      setFormData(emptyInquiryForm());
      onSuccess?.();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const update = (field: keyof InquiryFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className={isDark ? 'space-y-5' : 'space-y-4'}>
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
            required
            placeholder="John Doe"
            className={inputClass}
            value={formData.name}
            onChange={(e) => update('name', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className={labelClass}>
            Email Address *
          </label>
          <input
            id={`${idPrefix}-email`}
            type="email"
            required
            placeholder="you@company.com"
            className={inputClass}
            value={formData.email}
            onChange={(e) => update('email', e.target.value)}
          />
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
              placeholder="9876543210"
              className={inputWithIconClass}
              value={formData.phone}
              onChange={(e) => update('phone', e.target.value)}
            />
          </div>
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
              placeholder={isCareer ? 'linkedin.com/in/you or portfolio URL' : 'Your Company'}
              className={inputWithIconClass}
              value={formData.company}
              onChange={(e) => update('company', e.target.value)}
            />
          </div>
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
              required
              placeholder="https://drive.google.com/file/d/..."
              className={inputWithIconClass}
              value={formData.resumeUrl}
              onChange={(e) => update('resumeUrl', e.target.value)}
            />
          </div>
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
            required
            rows={isDark ? 5 : 4}
            placeholder={
              isCareer
                ? 'Share your experience, skills, notice period, and why you want to join Xenura...'
                : 'Tell us about your project, goals, timeline, and requirements...'
            }
            className={`${inputWithIconClass} resize-none`}
            value={formData.message}
            onChange={(e) => update('message', e.target.value)}
          />
        </div>
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
