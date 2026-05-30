export type DownloadResource = {
  id: string;
  title: string;
  description: string;
  category: string;
  fileName: string;
  fileSize: string;
  url: string;
};

export const DOWNLOAD_RESOURCES: DownloadResource[] = [
  {
    id: 'company-profile',
    title: 'Xenura Company Profile',
    description: 'Overview of our mission, capabilities, global network, and how we partner with clients.',
    category: 'Company',
    fileName: 'xenura-company-profile.pdf',
    fileSize: '1.2 MB',
    url: '/downloads/xenura-company-profile.pdf',
  },
  {
    id: 'services-overview',
    title: 'Services Overview',
    description: 'Engineering, AI & data, cloud transformation, and digital marketing service lines at a glance.',
    category: 'Services',
    fileName: 'xenura-services-overview.pdf',
    fileSize: '980 KB',
    url: '/downloads/xenura-services-overview.pdf',
  },
  {
    id: 'ai-capabilities',
    title: 'AI Capabilities Deck',
    description: 'Sample frameworks for Gen AI, automation, data pipelines, and AI-first product delivery.',
    category: 'AI & Data',
    fileName: 'xenura-ai-capabilities.pdf',
    fileSize: '1.5 MB',
    url: '/downloads/xenura-ai-capabilities.pdf',
  },
  {
    id: 'case-studies',
    title: 'Case Studies Highlights',
    description: 'Selected project snapshots across web, mobile, cloud, and analytics engagements.',
    category: 'Portfolio',
    fileName: 'xenura-case-studies.pdf',
    fileSize: '1.1 MB',
    url: '/downloads/xenura-case-studies.pdf',
  },
];
