import { useEffect } from 'react';
import {
  X,
  Mail,
  Phone,
  Tag,
  Building2,
  DollarSign,
  Calendar,
  Link,
  Trash2,
} from 'lucide-react';
import type { Submission } from '@/lib/api';
import { StatusBadge } from '@/components/admin/LeadProfileCard';
import { getAvatarPalette, getBudgetLabel, getLeadInitials } from '@/lib/leadUtils';

type LeadDetailModalProps = {
  lead: Submission;
  onClose: () => void;
  onStatusChange: (id: string, status: 'new' | 'read' | 'replied') => void;
  onDelete: () => void;
};

export function LeadDetailModal({
  lead,
  onClose,
  onStatusChange,
  onDelete,
}: LeadDetailModalProps) {
  const palette = getAvatarPalette(lead.email || lead.name);
  const initials = getLeadInitials(lead.name);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg max-h-[min(90vh,720px)] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="relative px-5 pt-6 pb-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4 pr-10">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold ring-4 ring-white/20 shrink-0 ${palette.bg} ${palette.text}`}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <h2 id="lead-modal-title" className="text-lg font-bold truncate">
                {lead.name}
              </h2>
              {lead.company && (
                <p className="text-sm text-slate-300 mt-0.5 flex items-center gap-1 truncate">
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  {lead.company}
                </p>
              )}
              <div className="mt-2">
                <StatusBadge status={lead.status} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <DetailRow icon={Mail} label="Email">
            <a
              href={`mailto:${lead.email}`}
              className="text-sm font-medium text-orange-600 hover:underline break-all"
            >
              {lead.email}
            </a>
          </DetailRow>
          {lead.phone && (
            <DetailRow icon={Phone} label="Phone">
              <a
                href={`tel:${lead.phone}`}
                className="text-sm font-medium text-slate-800 hover:text-orange-600"
              >
                {lead.phone}
              </a>
            </DetailRow>
          )}
          {lead.resumeUrl && (
            <DetailRow icon={Link} label="Resume">
              <a
                href={lead.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-orange-600 hover:underline break-all"
              >
                View resume
              </a>
            </DetailRow>
          )}
          <DetailRow icon={Tag} label="Source">
            <span className="text-sm text-slate-800">
              {lead.source === 'popup'
                ? 'Popup modal'
                : lead.source === 'career'
                  ? 'Career page'
                  : 'Contact page'}
            </span>
          </DetailRow>
          <DetailRow icon={DollarSign} label="Budget">
            <span className="inline-block text-sm font-medium bg-violet-50 text-violet-900 px-2.5 py-1 rounded-lg">
              {getBudgetLabel(lead.budget)}
            </span>
          </DetailRow>
          <DetailRow icon={Calendar} label="Submitted">
            <span className="text-sm text-slate-800">
              {new Date(lead.submittedAt).toLocaleString()}
            </span>
          </DetailRow>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
              Message
            </p>
            <div className="text-sm text-slate-700 leading-relaxed p-4 rounded-xl bg-slate-50 border border-slate-200 max-h-48 overflow-y-auto">
              {lead.message || '-'}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
              Update status
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(['new', 'read', 'replied'] as const).map((status) => {
                const active = lead.status === status;
                const activeClass =
                  status === 'new'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : status === 'read'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-violet-600 text-white border-violet-600';
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => onStatusChange(lead.id, status)}
                    className={`py-2.5 px-2 rounded-lg text-xs font-bold border transition-colors ${
                      active
                        ? activeClass
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {status === 'replied' ? 'Done' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="shrink-0 p-4 border-t border-slate-200 bg-slate-50 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm font-semibold hover:bg-red-100"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-slate-500" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
        <div className="mt-0.5">{children}</div>
      </div>
    </div>
  );
}
