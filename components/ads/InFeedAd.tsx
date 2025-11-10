'use client';

import AdSense from './AdSense';

interface InFeedAdProps {
  adSlot: string;
  adLayout?: string;
  className?: string;
  adLayoutKey?: string;
}

export default function InFeedAd({ adSlot, adLayout = 'in-article', adLayoutKey, className = '' }: InFeedAdProps) {
  return (
    <div
      className={`my-4 w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 sm:my-6 sm:p-3 lg:p-4 ${className}`}
    >
      {/* <div className='mb-2 text-center text-[10px] text-white/40'>Sponsored</div> */}
      <div className='flex w-full items-center justify-center'>
        <div className='w-full max-w-full'>
          <AdSense adSlot={adSlot} adFormat='fluid' adLayout={adLayout} adLayoutKey={adLayoutKey} fullWidthResponsive />
        </div>
      </div>
    </div>
  );
}
