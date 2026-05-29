import { useEffect, useRef } from 'react';

interface MagneticCursorOptions {
  enabled?: boolean;
  strength?: number;
}

export function useMagneticCursor(options: MagneticCursorOptions = {}) {
  const { enabled = true, strength = 0.3 } = options;
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorPositionRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const targetElementRef = useRef<string>('');

  useEffect(() => {
    if (!enabled) return;

    // Create custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    const animateCursor = () => {
      if (!cursorRef.current) return;

      // Smooth cursor following
      cursorPositionRef.current.x += (mouseRef.current.x - cursorPositionRef.current.x) * 0.1;
      cursorPositionRef.current.y += (mouseRef.current.y - cursorPositionRef.current.y) * 0.1;

      cursorRef.current.style.left = `${cursorPositionRef.current.x}px`;
      cursorRef.current.style.top = `${cursorPositionRef.current.y}px`;

      requestAnimationFrame(animateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.matches('button, a, .magnetic, .service-card, .portfolio-item')) {
        cursorRef.current?.classList.add('hover');
        isHoveringRef.current = true;
        targetElementRef.current = 'interactive';
      } else if (target.matches('h1, h2, h3, h4, h5, h6, p, span')) {
        cursorRef.current?.classList.add('text');
        targetElementRef.current = 'text';
      }
    };

    const handleMouseLeave = () => {
      cursorRef.current?.classList.remove('hover', 'text');
      isHoveringRef.current = false;
      targetElementRef.current = '';
    };

    // Add magnetic effect to elements
    const addMagneticEffect = () => {
      const magneticElements = document.querySelectorAll('.magnetic, .service-card, .portfolio-item');
      
      magneticElements.forEach((element) => {
        const el = element as HTMLElement;
        
        const handleMagneticEnter = () => {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const magneticMove = (moveEvent: MouseEvent) => {
            const deltaX = (moveEvent.clientX - centerX) * strength;
            const deltaY = (moveEvent.clientY - centerY) * strength;
            
            el.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
          };
          
          const magneticLeave = () => {
            el.style.transform = 'translate(0px, 0px) scale(1)';
            document.removeEventListener('mousemove', magneticMove);
            el.removeEventListener('mouseleave', magneticLeave);
          };
          
          document.addEventListener('mousemove', magneticMove);
          el.addEventListener('mouseleave', magneticLeave);
        };
        
        el.addEventListener('mouseenter', handleMagneticEnter);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    
    // Start animation
    animateCursor();
    
    // Add magnetic effects after a short delay to ensure elements are rendered
    setTimeout(addMagneticEffect, 100);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      
      if (cursorRef.current) {
        document.body.removeChild(cursorRef.current);
      }
    };
  }, [enabled, strength]);

  return cursorRef;
}