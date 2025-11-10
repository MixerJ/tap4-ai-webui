'use client';

import { useEffect, useRef } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  adLayout?: string;
  fullWidthResponsive?: boolean;
  className?: string;
  adLayoutKey?: string;
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
  const isAdPushed = useRef(false);

  const adsenseEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (!adsenseEnabled || !adsenseClientId || isAdPushed.current) {
      return;
    }

    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({});
        isAdPushed.current = true;
      }
    } catch (err) {
      // AdSense error handling
      console.warn('AdSense initialization failed');
    }
  }, [adsenseEnabled, adsenseClientId]);

  if (!adsenseEnabled || !adsenseClientId) {
    return null;
  }

  return (
    <div className={`adsense-container w-full ${className}`} style={style}>
      <ins
        ref={adRef}
        className='adsbygoogle block w-full'
        style={{ display: 'block', width: '100%', ...style }}
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
