'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import ClarityScript from '@/components/analytics/ClarityScript';
import SeoScript from '@/components/seo/SeoScript';

export default function DeferredScripts({ projectId }: { projectId: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const run = () => setReady(true);
    const win = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof win.requestIdleCallback === 'function') {
      const id = win.requestIdleCallback(run, { timeout: 2500 });
      return () => win.cancelIdleCallback?.(id);
    }

    const timeoutId = globalThis.setTimeout(run, 1200);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  if (!ready) return null;

  return (
    <>
      <SeoScript />
      <Analytics />
      <ClarityScript projectId={projectId} />
      <SpeedInsights />
    </>
  );
}
