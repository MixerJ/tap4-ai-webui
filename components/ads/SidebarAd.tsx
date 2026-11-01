'use client';

import isAdConfigured from '@/lib/adsense-config';

import AdSense from './AdSense';

interface SidebarAdProps {
  adSlot: string;
  className?: string;
}

export default function SidebarAd({ adSlot, className = '' }: SidebarAdProps) {
  if (!isAdConfigured(adSlot)) return null;

  return (
    <div className={`ad-shell ad-shell-sidebar sticky top-24 ${className}`}>
      <div className='ad-shell-label'>Advertisement</div>
      <div className='ad-shell-content'>
        <AdSense adSlot={adSlot} adFormat='auto' />
      </div>
    </div>
  );
}
