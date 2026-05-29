import { COMPANY_ADDRESS, COMPANY_NAME, COMPANY_PHONE } from '@/content/companyContact';

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What services does Xenura specialize in?',
    answer:
      'Xenura offers engineering & development (web, mobile, custom software), data & AI (analytics, Gen AI, automation), cloud & transformation (migration, DevOps), and digital analytics marketing (SEO, paid media, content). Explore our service pages for full details.',
  },
  {
    question: 'How experienced is the Xenura team?',
    answer:
      'Xenura is a focused studio - about 2 years in operation, 12 completed projects, 10+ clients, and a 98% satisfaction rate. We combine practical engineering with clear communication on every engagement.',
  },
  {
    question: 'What industries do you serve?',
    answer:
      'We serve startups and growing businesses across fintech, healthcare, retail, education, manufacturing, telecom, and technology. Solutions are tailored to your compliance and workflow needs.',
  },
  {
    question: 'Do you offer staff augmentation?',
    answer:
      'Yes. We provide flexible engagement models - dedicated developers, designers, and specialists who integrate with your team for defined periods or projects.',
  },
  {
    question: 'What is your average response time?',
    answer:
      'We aim to respond to new inquiries within one business day, often much faster. Active clients receive priority support during agreed business hours (9 AM - 7 PM IST, Mon-Fri).',
  },
  {
    question: 'Where is Xenura located?',
    answer: `${COMPANY_NAME} is based at ${COMPANY_ADDRESS.lines.slice(1).join(', ')}. Call ${COMPANY_PHONE.display} or use our contact page to schedule a discussion.`,
  },
  {
    question: 'How do you price projects?',
    answer:
      'Pricing depends on scope, timeline, and team size. After a discovery call we provide a clear proposal - fixed-scope phases, monthly retainers, or time-and-materials for evolving products.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer:
      'Yes. We offer maintenance, monitoring, feature updates, and optimisation packages so your product stays secure and performant after go-live.',
  },
];
