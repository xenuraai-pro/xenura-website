import { useEffect, useState } from 'react';

import { Logo } from '@/components/Logo';

interface PageLoaderProps {
  onLoadComplete: () => void;
}

const PageLoader = ({ onLoadComplete }: PageLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const intervals = [
      setTimeout(() => setProgress(30), 200),
      setTimeout(() => setProgress(60), 500),
      setTimeout(() => setProgress(85), 800),
      setTimeout(() => setProgress(100), 1100),
      setTimeout(() => {
        setLoaded(true);
        setTimeout(onLoadComplete, 500);
      }, 1400),
    ];

    return () => intervals.forEach(clearTimeout);
  }, [onLoadComplete]);

  return (
    <div className={`page-loader ${loaded ? 'loaded' : ''}`}>
      <div className="text-center">
        {/* Logo */}
        <Logo size="xl" href="" className="mx-auto mb-8 block" />
        <div className="text-[10px] uppercase tracking-[0.3em] theme-text-soft font-medium mb-8">
          End-to-End Digital
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mx-auto">
          <div
            className="loader-bar h-full rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs theme-text-strong mt-3">{progress}%</div>
      </div>
    </div>
  );
};

export default PageLoader;