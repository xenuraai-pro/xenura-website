import React, { useEffect, useRef, useState } from 'react';

interface AnimationWrapperProps {
  children: React.ReactNode;
  type?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
  className?: string;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  type = 'up',
  delay = 0,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  const getAnimationClasses = () => {
    const baseClass = `reveal-${type}`;
    const animateClass = isVisible ? 'animate' : '';
    return `${baseClass} ${animateClass} ${className}`.trim();
  };

  return (
    <div ref={elementRef} className={getAnimationClasses()}>
      {children}
    </div>
  );
};

export default AnimationWrapper;