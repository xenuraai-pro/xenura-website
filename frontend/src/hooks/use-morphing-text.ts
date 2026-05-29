import { useEffect, useRef, useState } from 'react';

interface MorphingTextOptions {
  words: string[];
  interval?: number;
  morphDuration?: number;
}

export function useMorphingText({ words, interval = 3000, morphDuration = 800 }: MorphingTextOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const textRef = useRef<HTMLElement>(null);

  const morphText = (from: string, to: string) => {
    if (!textRef.current) return;

    setIsAnimating(true);
    const steps = 20;
    const stepDuration = morphDuration / steps;
    let step = 0;

    const animate = () => {
      if (!textRef.current) return;

      const progress = step / steps;
      let morphed = '';

      for (let i = 0; i < Math.max(from.length, to.length); i++) {
        const fromChar = from[i] || '';
        const toChar = to[i] || '';

        if (fromChar === toChar) {
          morphed += toChar;
        } else if (progress < 0.5) {
          // First half: scramble
          morphed += Math.random() > 0.7 ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : fromChar;
        } else {
          // Second half: settle to target
          morphed += Math.random() > (progress - 0.5) * 2 ? toChar : String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }

      textRef.current.textContent = morphed;
      step++;

      if (step <= steps) {
        setTimeout(animate, stepDuration);
      } else {
        textRef.current.textContent = to;
        setIsAnimating(false);
      }
    };

    animate();
  };

  useEffect(() => {
    if (words.length <= 1) return;

    intervalRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % words.length;
      morphText(words[currentIndex], words[nextIndex]);
      setCurrentIndex(nextIndex);
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, words, interval, morphDuration]);

  return {
    textRef,
    currentText: words[currentIndex],
    isAnimating,
    currentIndex
  };
}