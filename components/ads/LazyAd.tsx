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
      {isVisible ? (
        <div className='ad-shell ad-shell-responsive w-full'>
          <div className='ad-shell-label'>Ad</div>
          <div className='ad-shell-content mx-auto w-full max-w-4xl'>
            <AdSense adSlot={adSlot} adFormat='auto' fullWidthResponsive />
          </div>
        </div>
      ) : (
        <div className='ad-shell ad-shell-skeleton w-full'>
          <div className='ad-shell-label'>Ad</div>
          <div className='ad-shell-placeholder' />
        </div>
      )}
    </div>
  );
}
