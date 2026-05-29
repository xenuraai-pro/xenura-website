import { useEffect, useRef } from 'react';

interface TextRevealOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
}

export function useTextReveal(options: TextRevealOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', staggerDelay = 100 } = options;
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Split text into words and wrap them
    const text = element.textContent || '';
    const words = text.split(' ');
    
    element.innerHTML = '';
    element.classList.add('text-reveal');
    
    const line = document.createElement('div');
    line.className = 'line';
    
    words.forEach((word, index) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';
      wordSpan.textContent = word + (index < words.length - 1 ? ' ' : '');
      wordSpan.style.transitionDelay = `${index * staggerDelay}ms`;
      line.appendChild(wordSpan);
    });
    
    element.appendChild(line);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, staggerDelay]);

  return elementRef;
}