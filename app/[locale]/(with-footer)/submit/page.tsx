import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { BASE_URL } from '@/lib/env';
import StructuredData from '@/components/seo/StructuredData';
import { buildPageMetadata, getLocalizedPath } from '@/lib/seo';
import { getLanguageTagByLocale } from '@/i18n';

import SubmitForm from './SubmitForm';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.submit',
  });

  return buildPageMetadata({
    locale,
    path: '/submit',
    title: t('title'),
    description: t('title'),
  });
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Submit');
  const siteUrl = BASE_URL || 'https://toolsify.ai';
  const languageTag = getLanguageTagByLocale(locale);
  const pageUrl = `${siteUrl}${getLocalizedPath(locale, '/submit')}`;
  const faqItems = [
    {
      q: t('faqSubmitQ'),
      a: t('faqSubmitA'),
    },
    {
      q: t('faqReviewQ'),
      a: t('faqReviewA'),
    },
    {
      q: t('faqRequirementsQ'),
      a: t('faqRequirementsA'),
    },
  ];

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('title'),
    description: t('subTitle'),
    url: pageUrl,
    inLanguage: languageTag,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Toolsify AI',
      url: siteUrl,
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

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
          <p className='text-sm font-medium text-white/80 lg:text-lg'>{t('subTitle')}</p>
        </div>

        {/* 表单区域 */}
        <div className='flex justify-center'>
          <SubmitForm className='mt-6' />
        </div>
      </div>
      <StructuredData id='submit-webpage-structured-data' data={webPageJsonLd} />
      <StructuredData id='submit-faq-structured-data' data={faqJsonLd} />
    </div>
  );
}
