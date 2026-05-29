import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  Bell,
  Briefcase,
  Calendar,
  FileText,
  LayoutDashboard,
  Mail,
  Megaphone,
  Settings,
  Target,
  UserCircle,
  Users,
  Wallet,
} from 'lucide-react';

export type AdminNavItem = {
  label: string;
  icon: LucideIcon;
  /** Active route - omit for coming-soon items */
  to?: string;
  comingSoon?: boolean;
  description?: string;
};

export type AdminNavSection = {
  title: string;
  items: AdminNavItem[];
};

/** Sidebar structure - only items with `to` are implemented; others are future placeholders. */
export const ADMIN_NAV_SECTIONS: AdminNavSection[] = [
  {
    title: 'CRM',
    items: [
      { label: 'Leads', to: '/admin/dashboard', icon: LayoutDashboard },
      {
        label: 'Clients',
        icon: Users,
        comingSoon: true,
        description: 'Client accounts and contact history',
      },
      {
        label: 'Deals & Pipeline',
        icon: Target,
        comingSoon: true,
        description: 'Sales stages and opportunity tracking',
      },
    ],
  },
  {
    title: 'Marketing',
    items: [
      { label: 'Banner Ad', to: '/admin/promo', icon: Megaphone },
      {
        label: 'Campaigns',
        icon: Mail,
        comingSoon: true,
        description: 'Email and outreach campaigns',
      },
      {
        label: 'Analytics',
        icon: BarChart3,
        comingSoon: true,
        description: 'Traffic, conversions, and ROI reports',
      },
    ],
  },
  {
    title: 'Operations',
    items: [
      {
        label: 'Projects',
        icon: Briefcase,
        comingSoon: true,
        description: 'Active engagements and deliverables',
      },
      {
        label: 'Tasks & Calendar',
        icon: Calendar,
        comingSoon: true,
        description: 'Team tasks and scheduling',
      },
      {
        label: 'Career applications',
        icon: UserCircle,
        comingSoon: true,
        description: 'Applications from the career page',
      },
    ],
  },
  {
    title: 'Content',
    items: [
      {
        label: 'Blog & articles',
        icon: FileText,
        comingSoon: true,
        description: 'Publish and manage blog posts',
      },
    ],
  },
  {
    title: 'Finance',
    items: [
      {
        label: 'Invoices & billing',
        icon: Wallet,
        comingSoon: true,
        description: 'Quotes, invoices, and payments',
      },
    ],
  },
  {
    title: 'System',
    items: [
      {
        label: 'Notifications',
        icon: Bell,
        comingSoon: true,
        description: 'Alerts and activity feed',
      },
      {
        label: 'Settings',
        icon: Settings,
        comingSoon: true,
        description: 'Users, roles, and preferences',
      },
    ],
  },
];
