import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import Faq from '@/components/Faq';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.explore',
  });
  const currentYear = new Date().getFullYear();

  return buildPageMetadata({
    locale,
    path: '/explore',
    title: t('title', { year: currentYear }),
    description: t('description'),
    keywords: t('keywords'),
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('Explore');
  const seoHeading = t('seoHeading', { defaultValue: 'Explore AI Tools by Category' });

  return (
    <div className='relative min-h-screen w-full'>
      {/* 动态背景 */}
      <div className='fixed inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent' />
        <div className='performance-blob absolute left-1/4 top-1/4 hidden h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl motion-safe:animate-float lg:block' />
        <div
          className='performance-blob absolute bottom-1/4 right-1/4 hidden h-96 w-96 rounded-full bg-purple-500/10 blur-3xl motion-safe:animate-float lg:block'
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className='flex-y-center relative mx-auto w-full max-w-pc px-3'>
        {/* 标题区域 */}
        <div className='my-8 flex flex-col gap-2 text-balance text-center lg:my-16 lg:gap-4'>
          {/* 装饰性元素 */}
          <div className='mb-2 flex items-center justify-center gap-2 lg:mb-4'>
            <div className='h-px w-12 bg-gradient-to-r from-transparent via-indigo-500/50 to-indigo-500/50' />
            <div className='h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400' />
            <div className='h-px w-12 bg-gradient-to-r from-indigo-500/50 via-indigo-500/50 to-transparent' />
          </div>
          <h1 className='bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-3xl font-bold text-transparent lg:text-6xl'>
            {seoHeading}
          </h1>
          <h2 className='text-xs font-medium text-white/80 lg:text-lg'>{t('subTitle')}</h2>
        </div>
        {children}
        <Faq />
      </div>
    </div>
  );
}
