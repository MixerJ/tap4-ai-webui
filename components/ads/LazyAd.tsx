'use client';

import { useEffect, useRef, useState } from 'react';

import AdSense from './AdSense';

interface LazyAdProps {
  adSlot: string;
  className?: string;
  minHeight?: string;
}

export default function LazyAd({ adSlot, className = '', minHeight = '250px' }: LazyAdProps) {
  const [isVisible, setIsVisible] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={adRef} style={{ minHeight }} className={className}>
      {isVisible && (
        <div className='flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm'>
          <div className='mb-2 w-full text-center text-[10px] text-white/40'>Advertisement</div>
          <div className='w-full max-w-4xl'>
            <AdSense adSlot={adSlot} adFormat='auto' fullWidthResponsive />
          </div>
        </div>
      )}
    </div>
  );
}
