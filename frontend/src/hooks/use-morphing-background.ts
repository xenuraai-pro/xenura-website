import { useEffect, useRef } from 'react';

interface MorphingBackgroundOptions {
  enabled?: boolean;
  blobCount?: number;
  animationDuration?: number[];
}

export function useMorphingBackground(options: MorphingBackgroundOptions = {}) {
  const { enabled = true, blobCount = 3, animationDuration = [20, 25, 30] } = options;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    // Create morphing blobs
    for (let i = 0; i < blobCount; i++) {
      const blob = document.createElement('div');
      blob.className = 'morphing-blob';
      
      // Random positioning
      const size = 200 + Math.random() * 300;
      const x = Math.random() * (container.offsetWidth - size);
      const y = Math.random() * (container.offsetHeight - size);
      
      blob.style.width = `${size}px`;
      blob.style.height = `${size}px`;
      blob.style.left = `${x}px`;
      blob.style.top = `${y}px`;
      blob.style.animationDuration = `${animationDuration[i] || 20}s`;
      blob.style.animationDelay = `${i * -5}s`;
      
      container.appendChild(blob);
    }

    return () => {
      // Clean up blobs
      const blobs = container.querySelectorAll('.morphing-blob');
      blobs.forEach(blob => blob.remove());
    };
  }, [enabled, blobCount, animationDuration]);

  return containerRef;
}