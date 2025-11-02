'use client';

import AdSense from './AdSense';

interface ResponsiveAdProps {
  adSlot: string;
  className?: string;
}

export default function ResponsiveAd({ adSlot, className = '' }: ResponsiveAdProps) {
  return (
    <div
      className={`my-8 flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <div className='mb-2 w-full text-center text-[10px] text-white/40'>Advertisement</div>
      <div className='w-full max-w-4xl'>
        <AdSense adSlot={adSlot} adFormat='auto' fullWidthResponsive />
      </div>
    </div>
  );
}
