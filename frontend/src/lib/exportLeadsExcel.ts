import * as XLSX from 'xlsx';
import type { Submission } from '@/lib/api';

const budgetLabel = (budget: string) => {
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
};

const statusLabel = (status: string) => {
  switch (status) {
    case 'new':
      return 'New';
    case 'read':
      return 'Read';
    case 'replied':
      return 'Contacted';
    default:
      return status;
  }
};

export function exportLeadsToExcel(leads: Submission[], suffix: 'all' | 'selected'): void {
  const rows = leads.map((lead) => ({
    Name: lead.name,
    Email: lead.email,
    Phone: lead.phone || '',
    Company: lead.company || '',
    Budget: budgetLabel(lead.budget),
    Message: lead.message,
    'Resume URL': lead.resumeUrl || '',
    Source:
      lead.source === 'popup'
        ? 'Popup'
        : lead.source === 'career'
          ? 'Career page'
          : 'Contact page',
    Status: statusLabel(lead.status),
    'Submitted at': new Date(lead.submittedAt).toLocaleString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet['!cols'] = [
    { wch: 22 },
    { wch: 28 },
    { wch: 16 },
    { wch: 22 },
    { wch: 18 },
    { wch: 48 },
    { wch: 36 },
    { wch: 14 },
    { wch: 12 },
    { wch: 22 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');

  const date = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `xenura_leads_${suffix}_${date}.xlsx`);
}
