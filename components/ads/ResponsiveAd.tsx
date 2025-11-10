'use client';

import AdSense from './AdSense';

interface ResponsiveAdProps {
  adSlot: string;
  className?: string;
}

export default function ResponsiveAd({ adSlot, className = '' }: ResponsiveAdProps) {
  return (
    <div
      className={`my-6 flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 sm:my-8 sm:p-3 lg:p-4 ${className}`}
    >
      {/* <div className='mb-2 w-full text-center text-[10px] text-white/40'>Advertisement</div> */}
      <div className='w-full max-w-full sm:max-w-2xl lg:max-w-4xl'>
        <AdSense adSlot={adSlot} adFormat='auto' fullWidthResponsive />
      </div>
    </div>
  );
}
