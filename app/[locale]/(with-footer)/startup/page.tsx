import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { SITE_NAME } from '@/lib/constants';
import { buildAlternates, buildLocalizedUrl, buildSocialMetadata } from '@/lib/seo';
import { formatTime } from '@/lib/utils/timeUtils';

import DesktopTable from './DesktopTable';
import MobileTable from './MobileTable';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.startup',
  });

  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    keywords: t('keywords'),
    alternates: buildAlternates(locale, 'startup'),
    ...buildSocialMetadata({
      locale,
      path: 'startup',
      title,
      description,
    }),
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Startup');
  const meta = useTranslations('Metadata.startup');

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta('title'),
    description: meta('description'),
    url: buildLocalizedUrl(locale, 'startup'),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: buildLocalizedUrl(locale, ''),
    },
  };

  return (
    <>
      <script
        key='startup-jsonld'
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className='relative min-h-screen w-full'>
        {/* 动态背景 */}
        <div className='fixed inset-0 -z-10'>
          <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' />
          <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent' />
          <div className='absolute left-1/4 top-1/4 h-96 w-96 animate-float rounded-full bg-indigo-500/10 blur-3xl' />
          <div
            className='absolute bottom-1/4 right-1/4 h-96 w-96 animate-float rounded-full bg-purple-500/10 blur-3xl'
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className='relative mx-auto w-full max-w-pc px-3 py-10 lg:px-0 lg:py-16'>
          {/* 标题区域 */}
          <div className='mb-10 flex flex-col items-center gap-2 text-center lg:mb-16 lg:gap-4'>
            {/* 装饰性元素 */}
            <div className='mb-2 flex items-center justify-center gap-2 lg:mb-4'>
              <div className='h-px w-12 bg-gradient-to-r from-transparent via-indigo-500/50 to-indigo-500/50' />
              <div className='h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400' />
              <div className='h-px w-12 bg-gradient-to-r from-indigo-500/50 via-indigo-500/50 to-transparent' />
            </div>
            <h1 className='bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-3xl font-bold text-transparent lg:text-6xl'>
              {t('title')}
            </h1>
            <div className='flex flex-col gap-1'>
              <p className='text-sm font-medium text-white/80 lg:text-lg'>{t('subTitle')}</p>
              <p className='text-xs text-white/60 lg:text-sm'>
                {t('updateTime')} {formatTime(new Date().setDate(new Date().getDate() - 1), 'YYYY-MM-DD')}
              </p>
            </div>
          </div>

          {/* 表格区域 */}
          <DesktopTable />
          <MobileTable />
        </div>
      </div>
    </>
  );
}
