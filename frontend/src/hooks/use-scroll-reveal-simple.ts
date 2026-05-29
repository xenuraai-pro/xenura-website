import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const selector = '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale';

    const observeElements = () => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => observer.observe(el));
    };

    // Initial pass
    observeElements();

    // Content is rendered after page loader; run additional passes for delayed mounts.
    const delayedScan1 = window.setTimeout(observeElements, 150);
    const delayedScan2 = window.setTimeout(observeElements, 500);

    // Watch for newly inserted sections/components and observe them automatically.
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.clearTimeout(delayedScan1);
      window.clearTimeout(delayedScan2);
    };
  }, []);
};