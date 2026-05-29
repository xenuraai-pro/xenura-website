import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function scrollToElement(id: string, attempt = 0) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  if (attempt < 12) {
    window.setTimeout(() => scrollToElement(id, attempt + 1), 50);
    return;
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

/** Scroll to top on route change; scroll to hash targets when present. */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const t = window.setTimeout(() => scrollToElement(id), 0);
      return () => window.clearTimeout(t);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
