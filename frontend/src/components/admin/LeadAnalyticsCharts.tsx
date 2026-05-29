import type { ChartSegment } from '@/lib/leadUtils';

type DonutChartProps = {
  title: string;
  segments: ChartSegment[];
  size?: number;
};

export function DonutChart({ title, segments, size = 120 }: DonutChartProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  const arcs =
    total === 0
      ? [{ label: 'Empty', value: 1, color: '#e2e8f0' }]
      : segments.filter((s) => s.value > 0);

  const displayTotal = total || 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col h-full">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">{title}</p>
      <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
        <div className="relative shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
            {total === 0 ? (
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="14"
              />
            ) : (
              arcs.map((seg, i) => {
                const pct = seg.value / total;
                const dash = pct * circumference;
                const gap = circumference - dash;
                const el = (
                  <circle
                    key={`${seg.label}-${i}`}
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="14"
                    strokeDasharray={`${dash} ${gap}`}
                    strokeDashoffset={-offset}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                );
                offset += dash;
                return el;
              })
            )}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-900">{displayTotal}</span>
            <span className="text-[10px] font-medium text-slate-500 uppercase">leads</span>
          </div>
        </div>
        <ul className="flex-1 w-full space-y-2 min-w-0">
          {segments.map((seg) => {
            const pct = total > 0 ? Math.round((seg.value / total) * 100) : 0;
            return (
              <li key={seg.label} className="flex items-center justify-between gap-2 text-sm">
                <span className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="text-slate-700 truncate">{seg.label}</span>
                </span>
                <span className="font-semibold text-slate-900 tabular-nums shrink-0">
                  {seg.value}
                  <span className="text-slate-400 font-normal text-xs ml-1">({pct}%)</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

type BarChartProps = {
  title: string;
  segments: ChartSegment[];
};

export function BarChart({ title, segments }: BarChartProps) {
  const max = Math.max(...segments.map((s) => s.value), 1);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col h-full">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-4">{title}</p>
      <div className="flex items-end justify-between gap-2 flex-1 min-h-[120px] px-1">
        {segments.map((seg) => {
          const heightPct = seg.value === 0 ? 4 : Math.max((seg.value / max) * 100, 12);
          return (
            <div key={seg.label} className="flex-1 flex flex-col items-center gap-2 min-w-0">
              <span className="text-xs font-bold text-slate-800 tabular-nums">{seg.value}</span>
              <div className="w-full flex flex-col justify-end h-24 bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                <div
                  className="w-full rounded-t-md transition-all duration-500 mx-auto"
                  style={{
                    height: `${heightPct}%`,
                    backgroundColor: seg.color,
                    maxWidth: '2.5rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                />
              </div>
              <span className="text-[10px] font-semibold text-slate-600 text-center leading-tight">
                {seg.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
