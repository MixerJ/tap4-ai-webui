'use client';

import { useEffect, useRef } from 'react';

import isAdConfigured from '@/lib/adsense-config';
import observeAd from '@/lib/adsense-lifecycle';

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

  const adsenseEnabled = isAdConfigured(adSlot);
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (!adsenseEnabled || !adsenseClientId || !adSlot || !adRef.current || !containerRef.current) {
      return undefined;
    }
    return observeAd(adRef.current, containerRef.current);
  }, [adSlot, adsenseClientId, adsenseEnabled, adFormat, adLayout, adLayoutKey, fullWidthResponsive]);

  if (!adsenseEnabled || !adsenseClientId || !adSlot) {
    return null;
  }

  return (
    <div ref={containerRef} className={`adsense-container ${className}`} style={style}>
      <ins
        key={`${adsenseClientId}:${adSlot}:${adFormat}:${adLayout}:${adLayoutKey}:${fullWidthResponsive}`}
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
