import type { LucideIcon } from 'lucide-react';
import {
  Building2,
  GraduationCap,
  Zap,
  Stethoscope,
  Shield,
  Microscope,
  Factory,
  Radio,
  Landmark,
  ShoppingBag,
  Signal,
  Plane,
  Truck,
  Lock,
  Cloud,
  Code2,
  Database,
  Bot,
  Sparkles,
  Brain,
  Cpu,
  Layers3,
  Rocket,
} from 'lucide-react';

export type IndustryItem = {
  name: string;
  tagline: string;
  description: string;
  solutions: string[];
  accent: string;
  icon: LucideIcon;
};

export type CoreServiceItem = {
  name: string;
  description: string;
};

export type TechnologyItem = {
  name: string;
  description: string;
};

export const industries: IndustryItem[] = [
  {
    name: 'Banking & Financial Services',
    tagline: 'Intelligent Banking Beyond Boundaries',
    description:
      'Transform financial ecosystems with AI-powered banking platforms, embedded finance, digital payments, fraud intelligence, automation, and cloud-native financial services that deliver secure and seamless customer experiences.',
    solutions: ['Digital Banking Platforms', 'Embedded Finance & FinTech', 'AI Risk & Fraud Analytics', 'Open Banking APIs', 'Intelligent Process Automation', 'Wealth & Payment Solutions'],
    accent: '#7f4adf',
    icon: Building2,
  },
  {
    name: 'Education',
    tagline: 'Smart, Connected & Personalized Learning',
    description:
      'Enable immersive digital education experiences with scalable learning platforms, AI-powered analytics, virtual classrooms, and connected campus ecosystems designed for the future of education.',
    solutions: ['Learning Management Systems', 'Virtual Learning Platforms', 'AI Student Analytics', 'Smart Campus Solutions', 'Education Cloud Infrastructure', 'Personalized Learning Experiences'],
    accent: '#06b6d4',
    icon: GraduationCap,
  },
  {
    name: 'Energy & Utilities',
    tagline: 'Powering Intelligent Sustainable Enterprises',
    description:
      'Accelerate the transition toward smart and sustainable operations with IoT, predictive analytics, automation, digital twins, and intelligent energy management systems.',
    solutions: ['Smart Grid Platforms', 'Renewable Energy Solutions', 'IoT Monitoring Systems', 'Predictive Maintenance', 'Asset Performance Analytics', 'Sustainability Intelligence'],
    accent: '#f59e0b',
    icon: Zap,
  },
  {
    name: 'Healthcare',
    tagline: 'Connected Healthcare for Better Outcomes',
    description:
      'Modernize healthcare ecosystems with secure digital platforms, AI-driven diagnostics, telemedicine, patient engagement systems, and intelligent healthcare operations.',
    solutions: ['Digital Health Platforms', 'Telemedicine Solutions', 'AI Diagnostics & Analytics', 'Patient Experience Systems', 'Healthcare Automation', 'Secure Medical Data Platforms'],
    accent: '#22c55e',
    icon: Stethoscope,
  },
  {
    name: 'Insurance',
    tagline: 'Intelligent Insurance Transformation',
    description:
      'Enhance customer trust and operational efficiency with AI-powered underwriting, claims automation, predictive risk analytics, and digital insurance platforms.',
    solutions: ['Claims Management Systems', 'AI Risk Assessment', 'Fraud Detection Platforms', 'Customer Self-Service Portals', 'Insurance Data Analytics', 'Workflow Automation'],
    accent: '#8b5cf6',
    icon: Shield,
  },
  {
    name: 'Life Sciences',
    tagline: 'Accelerating Scientific Innovation',
    description:
      'Empower life sciences organizations with advanced analytics, AI-driven research, connected healthcare ecosystems, and intelligent digital platforms that accelerate discovery and patient care.',
    solutions: ['Clinical Research Platforms', 'Virtual Trial Systems', 'AI-Powered Analytics', 'Connected Healthcare Solutions', 'Digital Research Automation', 'Regulatory Compliance Platforms'],
    accent: '#06b6d4',
    icon: Microscope,
  },
  {
    name: 'Manufacturing',
    tagline: 'Industry 5.0 Smart Manufacturing',
    description:
      'Build intelligent, connected, and resilient manufacturing ecosystems with automation, IoT, AI-driven operations, predictive maintenance, and digital engineering solutions.',
    solutions: ['Smart Factory Platforms', 'Industrial IoT Solutions', 'Predictive Maintenance', 'Supply Chain Optimization', 'Robotics & Automation', 'Manufacturing Analytics'],
    accent: '#ff6b35',
    icon: Factory,
  },
  {
    name: 'Media & Entertainment',
    tagline: 'Digital Experiences at Scale',
    description:
      'Deliver immersive audience experiences through content platforms, AI-powered personalization, streaming technologies, and intelligent media ecosystems.',
    solutions: ['OTT & Streaming Platforms', 'Content Management Systems', 'Audience Analytics', 'Media Cloud Solutions', 'Digital Experience Platforms', 'Monetization & Engagement Tools'],
    accent: '#f59e0b',
    icon: Radio,
  },
  {
    name: 'Public Sector',
    tagline: 'Citizen-Centric Digital Transformation',
    description:
      'Empower governments and public institutions with secure, scalable, and transparent digital platforms that improve citizen services and operational efficiency.',
    solutions: ['Smart Governance Platforms', 'Citizen Experience Solutions', 'Public Sector Cloud Services', 'Workflow Automation', 'Secure Digital Infrastructure', 'Smart City Technologies'],
    accent: '#22c55e',
    icon: Landmark,
  },
  {
    name: 'Retail & CPG',
    tagline: 'Intelligent Commerce & Consumer Ecosystems',
    description:
      'Create personalized and connected retail experiences with AI-powered commerce, customer analytics, supply chain intelligence, and omnichannel engagement platforms.',
    solutions: ['Omnichannel Commerce', 'Customer Data Platforms', 'AI Retail Analytics', 'Smart Inventory Systems', 'Consumer Engagement Solutions', 'Digital Supply Chain Platforms'],
    accent: '#ff6b35',
    icon: ShoppingBag,
  },
  {
    name: 'Sports',
    tagline: 'Smart Sports & Fan Engagement',
    description:
      'Transform sports operations and fan experiences with digital platforms, real-time analytics, performance intelligence, and connected engagement ecosystems.',
    solutions: ['Fan Engagement Platforms', 'Sports Analytics', 'Smart Venue Solutions', 'Live Streaming Technologies', 'Performance Intelligence Systems', 'Digital Ticketing Platforms'],
    accent: '#7f4adf',
    icon: Signal,
  },
  {
    name: 'Telecom',
    tagline: 'Next-Generation Connectivity Solutions',
    description:
      'Accelerate telecom transformation with cloud-native infrastructure, OSS/BSS modernization, AI-powered operations, and intelligent customer experience platforms.',
    solutions: ['Telecom OSS/BSS Platforms', 'Network Automation', 'AI Operations Intelligence', 'Cloud Telecom Solutions', 'Customer Experience Systems', '5G & Connectivity Platforms'],
    accent: '#06b6d4',
    icon: Cloud,
  },
  {
    name: 'Travel & Hospitality',
    tagline: 'Connected Travel & Guest Experiences',
    description:
      'Deliver seamless digital travel and hospitality experiences through smart booking systems, personalization engines, operational automation, and intelligent guest engagement.',
    solutions: ['Smart Booking Platforms', 'Guest Experience Solutions', 'Hospitality Automation', 'Travel Analytics', 'Loyalty & Engagement Systems', 'Cloud Hospitality Platforms'],
    accent: '#ff6b35',
    icon: Plane,
  },
  {
    name: 'Transportation & Logistics',
    tagline: 'Intelligent Mobility & Supply Chain Ecosystems',
    description:
      'Optimize logistics operations with AI-powered route optimization, fleet intelligence, automation, and real-time supply chain visibility.',
    solutions: ['Fleet Management Systems', 'Route Optimization Platforms', 'Logistics Automation', 'Real-Time Tracking Solutions', 'Supply Chain Intelligence', 'Smart Transportation Analytics'],
    accent: '#22c55e',
    icon: Truck,
  },
  {
    name: 'Security & Defense',
    tagline: 'Mission-Critical Digital Innovation',
    description:
      'Enable secure, resilient, and intelligent operations with advanced cybersecurity, defense technology platforms, predictive intelligence, and mission-critical digital infrastructure.',
    solutions: ['Cybersecurity Platforms', 'Defense Intelligence Systems', 'Secure Cloud Infrastructure', 'Threat Monitoring Solutions', 'Mission-Critical Analytics', 'Digital Defense Engineering'],
    accent: '#7f4adf',
    icon: Lock,
  },
];

export const coreServices: CoreServiceItem[] = [
  { name: 'Digital Transformation Consulting', description: 'Strategy roadmaps and modernization programs.' },
  { name: 'Enterprise Software Development', description: 'Scalable web, mobile, and platform engineering.' },
  { name: 'AI & Machine Learning Solutions', description: 'Copilots, analytics, and intelligent automation.' },
  { name: 'Cloud Engineering & Migration', description: 'Cloud-native delivery across AWS, Azure, and GCP.' },
  { name: 'Data Analytics & Business Intelligence', description: 'Decision systems and performance visibility.' },
  { name: 'Intelligent Automation & RPA', description: 'Workflow automation for speed and consistency.' },
  { name: 'Cybersecurity & Governance', description: 'Secure architecture, monitoring, and compliance.' },
  { name: 'DevOps & Platform Engineering', description: 'Reliable delivery, CI/CD, and platform operations.' },
  { name: 'UI/UX & Product Design', description: 'Clear, human-centered product experiences.' },
  { name: 'IoT & Connected Systems', description: 'Devices, telemetry, and real-time operations.' },
  { name: 'ERP & CRM Integration', description: 'Connected enterprise systems and data flows.' },
  { name: 'Managed IT & Support Services', description: 'Operational support and ongoing optimization.' },
];

export const emergingTechnologies: TechnologyItem[] = [
  { name: 'Generative AI & Autonomous Agents', description: 'Build intelligent assistants and task-running systems.' },
  { name: 'AI Copilots & Enterprise Intelligence', description: 'Augment teams with searchable, contextual AI.' },
  { name: 'Digital Twin Platforms', description: 'Mirror physical systems to simulate and improve outcomes.' },
  { name: 'Quantum-Ready Architecture', description: 'Future-proof systems for next-gen computing shifts.' },
  { name: 'Blockchain & Web3 Solutions', description: 'Trusted digital records and decentralized workflows.' },
  { name: 'Edge Computing & IoT', description: 'Process data closer to the source for lower latency.' },
  { name: '5G Connected Ecosystems', description: 'High-bandwidth, low-latency connected experiences.' },
  { name: 'AR/VR & Immersive Experiences', description: 'Engaging product, training, and field experiences.' },
  { name: 'Hyperautomation Platforms', description: 'Orchestrate end-to-end automation at scale.' },
  { name: 'Predictive & Cognitive Analytics', description: 'Anticipate behavior and optimize decisions.' },
  { name: 'Cloud-Native SaaS Platforms', description: 'Modern products built for speed and scale.' },
  { name: 'Intelligent Cybersecurity Systems', description: 'Detect, respond, and protect continuously.' },
];

export const whyXenura = [
  'End-to-End Digital Transformation Expertise',
  'Industry-Focused Innovation',
  'Scalable Enterprise Architecture',
  'AI-First Engineering Approach',
  'Agile Product Development',
  'Secure & Future-Ready Solutions',
  'Global Delivery & Technology Excellence',
  'Innovation-Driven Partnership Model',
];

export const industryHighlights = [
  { title: 'Innovation', value: 'AI, cloud, data, automation', icon: Sparkles },
  { title: 'Engineering', value: 'Scalable software and platforms', icon: Code2 },
  { title: 'Intelligence', value: 'Analytics, insight, and decision support', icon: Database },
  { title: 'Automation', value: 'RPA, workflows, and agentic systems', icon: Bot },
  { title: 'Future-Ready', value: 'Connected ecosystems and modern architecture', icon: Cpu },
  { title: 'Scale', value: 'Enterprise delivery with global reach', icon: Rocket },
  { title: 'AI-First', value: 'Copilots, agents, and intelligence layers', icon: Brain },
  { title: 'Platform', value: 'Cloud-native, secure, and adaptable', icon: Layers3 },
];
