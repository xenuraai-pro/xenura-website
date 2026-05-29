export type InquiryFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  message: string;
  resumeUrl: string;
};

export const emptyInquiryForm = (): InquiryFormData => ({
  name: '',
  email: '',
  phone: '',
  company: '',
  budget: '',
  message: '',
  resumeUrl: '',
});

export const BUDGET_OPTIONS = [
  { value: '', label: 'Select budget range' },
  { value: 'below-5', label: 'Below INR 5 Lakh' },
  { value: '5-15', label: 'INR 5 - 15 Lakh' },
  { value: '15-50', label: 'INR 15 - 50 Lakh' },
  { value: '50-plus', label: 'INR 50 Lakh+' },
  { value: 'none', label: 'None' },
] as const;

export type InquirySource = 'popup' | 'contact' | 'career';
