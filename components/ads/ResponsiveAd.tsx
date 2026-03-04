'use client';

import AdSense from './AdSense';

interface ResponsiveAdProps {
  adSlot: string;
  className?: string;
}

export default function ResponsiveAd({ adSlot, className = '' }: ResponsiveAdProps) {
  return (
    <div
      className={`ad-shell ad-shell-responsive my-8 w-full ${className}`}
    >
      <div className='ad-shell-label'>Ad</div>
      <div className='ad-shell-content mx-auto w-full max-w-4xl'>
        <AdSense adSlot={adSlot} adFormat='auto' fullWidthResponsive />
      </div>
    </div>
  );
}
