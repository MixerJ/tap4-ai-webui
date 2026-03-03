'use client';

import AdSense from './AdSense';

interface InFeedAdProps {
  adSlot: string;
  adLayout?: string;
  className?: string;
}

export default function InFeedAd({ adSlot, adLayout = 'in-article', className = '' }: InFeedAdProps) {
  return (
    <div className={`ad-shell ad-shell-infeed my-6 ${className}`}>
      <div className='ad-shell-label'>Sponsored</div>
      <div className='ad-shell-content flex items-center justify-center'>
        <AdSense adSlot={adSlot} adFormat='fluid' adLayout={adLayout} />
      </div>
    </div>
  );
}
