import { useLocation } from 'react-router-dom';
import SiteFloatingWidgets from '@/components/SiteFloatingWidgets';

export function GlobalFloatingWidgets() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/admin')) return null;
  return <SiteFloatingWidgets />;
}
