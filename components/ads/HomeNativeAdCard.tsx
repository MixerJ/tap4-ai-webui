'use client';

import { useEffect, useRef, useState } from 'react';

import AdSense from './AdSense';

interface HomeNativeAdCardProps {
  adSlot: string;
}

export default function HomeNativeAdCard({ adSlot }: HomeNativeAdCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isUnfilled, setIsUnfilled] = useState(false);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const updateStatus = () => {
      const adElement = containerRef.current?.querySelector('ins.adsbygoogle');
      if (adElement?.getAttribute('data-ad-status') === 'unfilled') {
        setIsUnfilled(true);
      }
    };

    updateStatus();

    const observer = new MutationObserver(updateStatus);
    observer.observe(containerRef.current, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  if (!adSlot || isUnfilled) {
    return null;
  }

  return (
    <div className='group relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-2 backdrop-blur-sm transition-all duration-500 sm:min-h-[220px] sm:p-2.5 lg:h-[343px] lg:p-1'>
      <div className='pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/10 opacity-80' />
      <div className='border-white/8 relative flex h-full flex-col gap-2 rounded-[18px] border bg-black/10 p-3 sm:gap-3 sm:p-4 lg:p-5'>
        <div className='inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-100'>
          Sponsored
        </div>
        <div className='space-y-1'>
          <h3 className='text-sm font-semibold text-white sm:text-base'>Featured AI Tool</h3>
          <p className='text-xs leading-relaxed text-white/60 sm:text-sm'>
            Discover a promoted tool without leaving the main recommendation flow.
          </p>
        </div>

        <div
          ref={containerRef}
          className='ad-shell ad-shell-native-card border-white/8 mt-auto flex-1 bg-white/[0.03] p-0 shadow-none transition-none'
        >
          <div className='ad-shell-content flex h-full min-h-[170px] items-center justify-center bg-slate-950/40 p-3 sm:min-h-[190px] lg:min-h-[228px]'>
            <AdSense adSlot={adSlot} adFormat='auto' className='h-full w-full' />
          </div>
        </div>
      </div>
    </div>
  );
}
