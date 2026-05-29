import type { Submission } from '@/lib/api';

export function getLeadInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

const AVATAR_PALETTES = [
  { bg: 'bg-violet-600', ring: 'ring-violet-200', text: 'text-white' },
  { bg: 'bg-blue-600', ring: 'ring-blue-200', text: 'text-white' },
  { bg: 'bg-emerald-600', ring: 'ring-emerald-200', text: 'text-white' },
  { bg: 'bg-orange-600', ring: 'ring-orange-200', text: 'text-white' },
  { bg: 'bg-rose-600', ring: 'ring-rose-200', text: 'text-white' },
  { bg: 'bg-cyan-600', ring: 'ring-cyan-200', text: 'text-white' },
  { bg: 'bg-indigo-600', ring: 'ring-indigo-200', text: 'text-white' },
  { bg: 'bg-amber-600', ring: 'ring-amber-200', text: 'text-white' },
];

export function getAvatarPalette(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_PALETTES[Math.abs(hash) % AVATAR_PALETTES.length];
}

export function getBudgetLabel(budget: string): string {
  switch (budget) {
    case 'below-5':
      return 'Below INR 5 Lakh';
    case '5-15':
      return 'INR 5 - 15 Lakh';
    case '15-50':
      return 'INR 15 - 50 Lakh';
    case '50-plus':
      return 'INR 50 Lakh+';
    case 'none':
      return 'None';
    default:
      return 'Not specified';
  }
}

export function getBudgetShort(budget: string): string {
  switch (budget) {
    case 'below-5':
      return '< 5L';
    case '5-15':
      return '5-15L';
    case '15-50':
      return '15-50L';
    case '50-plus':
      return '50L+';
    default:
      return 'N/A';
  }
}

export type ChartSegment = { label: string; value: number; color: string };

export function buildStatusSegments(leads: Submission[]): ChartSegment[] {
  return [
    { label: 'New', value: leads.filter((l) => l.status === 'new').length, color: '#10b981' },
    { label: 'Read', value: leads.filter((l) => l.status === 'read').length, color: '#3b82f6' },
    { label: 'Contacted', value: leads.filter((l) => l.status === 'replied').length, color: '#8b5cf6' },
  ];
}

export function buildSourceSegments(leads: Submission[]): ChartSegment[] {
  return [
    { label: 'Contact page', value: leads.filter((l) => l.source === 'contact').length, color: '#f97316' },
    { label: 'Career page', value: leads.filter((l) => l.source === 'career').length, color: '#8b5cf6' },
    { label: 'Popup', value: leads.filter((l) => l.source === 'popup').length, color: '#0ea5e9' },
  ];
}

export function buildBudgetSegments(leads: Submission[]): ChartSegment[] {
  return [
    { label: '< 5L', value: leads.filter((l) => l.budget === 'below-5').length, color: '#6366f1' },
    { label: '5-15L', value: leads.filter((l) => l.budget === '5-15').length, color: '#8b5cf6' },
    { label: '15-50L', value: leads.filter((l) => l.budget === '15-50').length, color: '#ec4899' },
    { label: '50L+', value: leads.filter((l) => l.budget === '50-plus').length, color: '#14b8a6' },
    { label: 'None', value: leads.filter((l) => l.budget === 'none').length, color: '#64748b' },
    { label: 'N/A', value: leads.filter((l) => !l.budget).length, color: '#94a3b8' },
  ];
}
