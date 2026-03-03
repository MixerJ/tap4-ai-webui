'use client';

import { useEffect, useRef } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  adLayout?: string;
  adLayoutKey?: string;
  fullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdSense({
  adSlot,
  adFormat = 'auto',
  adLayout,
  adLayoutKey,
  fullWidthResponsive = true,
  className = '',
  style = {},
}: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAdPushed = useRef(false);
  const isInView = useRef(false);

  const adsenseEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (!adsenseEnabled || !adsenseClientId || !adSlot || !containerRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          isInView.current = true;
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [adSlot, adsenseClientId, adsenseEnabled]);

  useEffect(() => {
    if (!adsenseEnabled || !adsenseClientId || !adSlot || isAdPushed.current) {
      return undefined;
    }

    let retryCount = 0;
    const maxRetries = 20;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const pushAd = () => {
      if (!isInView.current || isAdPushed.current) return;

      try {
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          (window as any).adsbygoogle.push({});
          isAdPushed.current = true;
          if (intervalId) clearInterval(intervalId);
        } else if (retryCount >= maxRetries && intervalId) {
          clearInterval(intervalId);
        } else {
          retryCount += 1;
        }
      } catch (err) {
        if (intervalId) clearInterval(intervalId);
      }
    };

    intervalId = setInterval(pushAd, 350);
    pushAd();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [adSlot, adsenseClientId, adsenseEnabled]);

  if (!adsenseEnabled || !adsenseClientId || !adSlot) {
    return null;
  }

  return (
    <div ref={containerRef} className={`adsense-container ${className}`} style={style}>
      <ins
        ref={adRef}
        className='adsbygoogle'
        style={{ display: 'block', ...style }}
        data-ad-client={adsenseClientId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-ad-layout-key={adLayoutKey}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}
