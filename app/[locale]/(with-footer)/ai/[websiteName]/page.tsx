import { cache } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/db/supabase/server';
import { getLanguageTagByLocale } from '@/i18n';
import { CircleArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { AD_SLOTS } from '@/lib/adsense-slots';
import { BASE_URL } from '@/lib/env';
import { buildPageMetadata, getLocalizedPath } from '@/lib/seo';
import { Separator } from '@/components/ui/separator';
import ResponsiveAd from '@/components/ads/ResponsiveAd';
import BaseImage from '@/components/image/BaseImage';
import MarkdownProse from '@/components/MarkdownProse';
import StructuredData from '@/components/seo/StructuredData';

type WebsiteDetail = {
  name: string;
  title: string;
  content: string;
  url: string;
  thumbnail_url: string;
  detail: string;
  category_name: string;
};

const getWebsiteDetail = cache(async (websiteName: string) => {
  const supabase = createClient();
  const { data } = await supabase
    .from('web_navigation')
    .select('name,title,content,url,thumbnail_url,detail,category_name')
    .eq('name', websiteName)
    .limit(1)
    .maybeSingle();

  return data as unknown as WebsiteDetail | null;
});

export async function generateMetadata({
  params: { locale, websiteName },
}: {
  params: { locale: string; websiteName: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.ai',
  });
  const data = await getWebsiteDetail(websiteName);

  if (!data) {
    notFound();
  }

  return buildPageMetadata({
    locale,
    path: `/ai/${websiteName}`,
    title: `${data.title} | ${t('titleSubfix')}`,
    description: data.content,
    keywords: [data.title, data.category_name || '', 'AI tool', 'AI directory'].filter(Boolean),
  });
}

export default async function Page({
  params: { locale, websiteName },
}: {
  params: { locale: string; websiteName: string };
}) {
  const t = await getTranslations('Startup.detail');
  const data = await getWebsiteDetail(websiteName);
  if (!data) {
    notFound();
  }
  const siteUrl = BASE_URL || 'https://toolsify.ai';
  const appUrl = `${siteUrl}${getLocalizedPath(locale, `/ai/${websiteName}`)}`;
  const languageTag = getLanguageTagByLocale(locale);
  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.title,
    applicationCategory: data.category_name || 'AI Tool',
    description: data.content,
    url: appUrl,
    sameAs: data.url,
    image: data.thumbnail_url || undefined,
    inLanguage: languageTag,
    provider: {
      '@type': 'Organization',
      name: 'Toolsify AI',
      url: siteUrl,
    },
    areaServed: 'Worldwide',
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col px-6 py-5 lg:h-[323px] lg:flex-row lg:justify-between lg:px-0 lg:py-10'>
        <div className='flex flex-col items-center lg:items-start'>
          <div className='space-y-1 text-balance lg:space-y-3'>
            <h1 className='text-2xl lg:text-5xl'>{data.title}</h1>
            <h2 className='text-xs lg:text-sm'>{data.content}</h2>
          </div>
          <a
            href={data.url}
            target='_blank'
            rel='noopener noreferrer'
            className='flex-center mt-5 min-h-5 w-full gap-1 rounded-[8px] bg-white p-[10px] text-sm capitalize text-black hover:opacity-80 lg:mt-auto lg:w-[288px]'
          >
            {t('visitWebsite')} <CircleArrowRight className='size-[14px]' />
          </a>
        </div>
        <a
          href={data.url}
          target='_blank'
          rel='noopener noreferrer'
          className='flex-center group relative h-[171px] w-full flex-shrink-0 lg:h-[234px] lg:w-[466px]'
        >
          <BaseImage
            title={data.title}
            alt={data.title}
            // width={466}
            // height={243}
            fill
            src={data.thumbnail_url || ''}
            className='absolute mt-3 aspect-[466/234] w-full rounded-[16px] border border-[#424242] bg-[#424242] bg-cover lg:mt-0'
          />
          <div className='absolute inset-0 z-10 hidden items-center justify-center gap-1 rounded-[16px] bg-black bg-opacity-50 text-2xl text-white transition-all duration-200 group-hover:flex'>
            {t('visitWebsite')} <CircleArrowRight className='size-5' />
          </div>
        </a>
      </div>
      <Separator className='bg-[#010101]' />
      <ResponsiveAd adSlot={AD_SLOTS.ai.middle} className='my-5 flex justify-center lg:my-8' />
      <div className='mb-5 px-3 lg:px-0'>
        <h2 className='my-5 text-2xl text-white/40 lg:my-10'>{t('introduction')}</h2>
        <MarkdownProse markdown={data?.detail || ''} />
      </div>
      <StructuredData id='ai-software-structured-data' data={softwareJsonLd} />
    </div>
  );
}
