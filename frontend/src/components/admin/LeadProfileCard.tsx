import { Building2, Calendar, Trash2 } from 'lucide-react';
import type { Submission } from '@/lib/api';
import { getAvatarPalette, getBudgetShort, getLeadInitials } from '@/lib/leadUtils';

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    new: 'bg-emerald-100 text-emerald-800',
    read: 'bg-blue-100 text-blue-800',
    replied: 'bg-violet-100 text-violet-800',
  };
  const labels: Record<string, string> = {
    new: 'New',
    read: 'Read',
    replied: 'Contacted',
  };
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0 ${styles[status] || 'bg-slate-100 text-slate-700'}`}
    >
      {labels[status] || status}
    </span>
  );
};

type LeadProfileRowProps = {
  lead: Submission;
  selected: boolean;
  checked: boolean;
  onSelect: () => void;
  onToggleCheck: () => void;
  onDelete: () => void;
};

export function LeadProfileCard({
  lead,
  selected,
  checked,
  onSelect,
  onToggleCheck,
  onDelete,
}: LeadProfileRowProps) {
  const palette = getAvatarPalette(lead.email || lead.name);
  const initials = getLeadInitials(lead.name);
  const dateStr = new Date(lead.submittedAt).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 transition-colors ${
        selected
          ? 'bg-orange-50 border-l-2 border-l-orange-500'
          : checked
            ? 'bg-orange-50/50'
            : 'hover:bg-slate-50'
      }`}
    >
      <label
        className="shrink-0 cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggleCheck}
          className="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
          aria-label={`Select ${lead.name}`}
        />
      </label>

      <button
        type="button"
        onClick={onSelect}
        className="flex-1 flex items-center gap-2 sm:gap-3 min-w-0 text-left"
      >
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${palette.bg} ${palette.text}`}
        >
          {initials}
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-[minmax(128px,1fr)_minmax(88px,0.85fr)_minmax(112px,1fr)_minmax(80px,0.75fr)_58px_52px_minmax(0,1.1fr)_76px] gap-x-2.5 gap-y-1 items-center min-w-0">
          <div className="min-w-0 flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <span className="font-semibold text-sm text-slate-900 truncate">{lead.name}</span>
            <StatusBadge status={lead.status} />
          </div>

          <span className="hidden sm:block text-xs text-slate-600 truncate" title={lead.company}>
            {lead.company || '-'}
          </span>

          <span className="hidden sm:block text-xs text-slate-600 truncate" title={lead.email}>
            {lead.email}
          </span>

          <span className="hidden sm:block text-xs text-slate-600 tabular-nums truncate">
            {lead.phone || '-'}
          </span>

          <span
            className={`hidden sm:inline-flex text-[10px] font-semibold uppercase justify-center px-1.5 py-0.5 rounded shrink-0 ${
              lead.source === 'popup'
                ? 'bg-sky-100 text-sky-800'
                : lead.source === 'career'
                  ? 'bg-violet-100 text-violet-800'
                  : 'bg-orange-100 text-orange-800'
            }`}
          >
            {lead.source === 'popup' ? 'Popup' : lead.source === 'career' ? 'Career' : 'Contact'}
          </span>

          <span className="hidden sm:block text-xs font-medium text-slate-700 tabular-nums shrink-0">
            {getBudgetShort(lead.budget)}
          </span>

          <span className="hidden sm:block text-xs text-slate-500 truncate min-w-0" title={lead.message}>
            {lead.message || '-'}
          </span>

          <span className="hidden sm:flex text-[11px] text-slate-400 items-center gap-1 shrink-0 justify-end">
            <Calendar className="w-3 h-3" />
            {dateStr}
          </span>

          {/* Mobile: stacked summary */}
          <div className="sm:hidden col-span-1 min-w-0 space-y-0.5">
            {lead.company && (
              <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                <Building2 className="w-3 h-3 shrink-0" />
                {lead.company}
              </p>
            )}
            <p className="text-xs text-slate-600 truncate">{lead.email}</p>
            <p className="text-xs text-slate-500 line-clamp-1">{lead.message}</p>
            <p className="text-[10px] text-slate-400">{dateStr}</p>
          </div>
        </div>
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 shrink-0"
        title="Delete lead"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

export { StatusBadge };
