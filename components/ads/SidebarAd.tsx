'use client';

import AdSense from './AdSense';

interface SidebarAdProps {
  adSlot: string;
  className?: string;
}

export default function SidebarAd({ adSlot, className = '' }: SidebarAdProps) {
  return (
    <div
      className={`sticky top-24 w-full rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 sm:p-3 lg:p-4 ${className}`}
    >
      {/* <div className='mb-3 text-center text-[10px] text-white/40'>Advertisement</div> */}
      <div className='w-full'>
        <AdSense adSlot={adSlot} adFormat='auto' fullWidthResponsive />
      </div>
    </div>
  );
}
