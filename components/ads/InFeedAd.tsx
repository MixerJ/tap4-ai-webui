'use client';

import AdSense from './AdSense';

interface InFeedAdProps {
  adSlot: string;
  adLayout?: string;
  className?: string;
}

export default function InFeedAd({ adSlot, adLayout = 'in-article', className = '' }: InFeedAdProps) {
  return (
    <div
      className={`my-6 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <div className='mb-2 text-center text-[10px] text-white/40'>Sponsored</div>
      <div className='flex items-center justify-center'>
        <AdSense adSlot={adSlot} adFormat='fluid' adLayout={adLayout} />
      </div>
    </div>
  );
}
