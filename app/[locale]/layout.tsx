import { NextIntlClientProvider, useMessages } from 'next-intl';

import { Toaster } from '@/components/ui/sonner';
import ConsentManager from '@/components/consent/ConsentManager';
import Navigation from '@/components/home/Navigation';

import './globals.css';

import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';

import ClarityScript from '@/components/analytics/ClarityScript';
import SeoScript from '@/components/seo/SeoScript';

import Loading from './loading';

// 仅在开发环境导入调试组件
const AdSenseDiagnostic =
  process.env.NODE_ENV === 'development' ? require('@/components/ads/AdSenseDiagnostic').default : null;
const AdSenseDebug = process.env.NODE_ENV === 'development' ? require('@/components/ads/AdSenseDebug').default : null;

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();
  const projectId = 'lvebcp2gwg';
  const adsenseEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang={locale} suppressHydrationWarning className='dark'>
      <head>
        {/* Google AdSense - 直接在 head 中加载以确保优先级 */}
        {adsenseEnabled && adsenseClientId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin='anonymous'
          />
        )}
      </head>
      <body className='relative mx-auto flex min-h-screen flex-col bg-tap4-black text-white'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Toaster
            position='top-center'
            toastOptions={{
              classNames: {
                error: 'bg-red-400',
                success: 'text-green-400',
                warning: 'text-yellow-400',
                info: 'bg-blue-400',
              },
            }}
          />
          <Navigation />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <ConsentManager />
          {/* 仅开发环境显示调试工具 */}
          {process.env.NODE_ENV === 'development' && AdSenseDiagnostic && <AdSenseDiagnostic />}
          {process.env.NODE_ENV === 'development' && AdSenseDebug && <AdSenseDebug />}
        </NextIntlClientProvider>
        <SeoScript />
        <Analytics />
        <ClarityScript projectId={projectId} />
      </body>
    </html>
  );
}
