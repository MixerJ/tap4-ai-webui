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
import { TOOL_CONTENT, TOOL_CONTENT_UPDATED_AT } from '@/lib/tool-content';
import { resolveToolContent } from '@/lib/tool-localization';
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
  collection_time: string | null;
};

const getWebsiteDetail = cache(async (websiteName: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('web_navigation')
    .select('name,title,content,url,thumbnail_url,detail,category_name,collection_time')
    .eq('name', websiteName)
    .limit(1)
    .maybeSingle();

  if (error) throw new Error('Unable to load the requested tool', { cause: error });

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

  const content = resolveToolContent(
    { title: data.title, description: data.content || '', detail: data.detail || '' },
    TOOL_CONTENT[websiteName],
    locale,
  );

  return buildPageMetadata({
    locale,
    path: `/ai/${websiteName}`,
    title: `${content.title} | ${t('titleSubfix')}`,
    description: content.description,
    keywords: [content.title, data.category_name || '', 'AI tools'].filter(Boolean),
    canonicalLocale: content.canonicalLocale,
    availableLocales: content.availableLocales,
    imagePath: data.thumbnail_url || undefined,
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
  const content = resolveToolContent(
    { title: data.title, description: data.content || '', detail: data.detail || '' },
    TOOL_CONTENT[websiteName],
    locale,
  );
  const siteUrl = BASE_URL || 'https://toolsify.ai';
  const appUrl = `${siteUrl}${getLocalizedPath(content.canonicalLocale, `/ai/${websiteName}`)}`;
  const languageTag = content.contentLocale ? getLanguageTagByLocale(content.contentLocale) : undefined;
  const softwareJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: content.title,
    applicationCategory: data.category_name || 'AI Tool',
    description: content.description,
    url: appUrl,
    sameAs: data.url,
    image: data.thumbnail_url || undefined,
    inLanguage: languageTag,
    areaServed: 'Worldwide',
    dateModified: content.contentLocale ? TOOL_CONTENT_UPDATED_AT : undefined,
  };

  if (data.collection_time) {
    softwareJsonLd.datePublished = data.collection_time;
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: data.category_name || 'AI Tools',
        item: `${siteUrl}${getLocalizedPath(locale, `/category/${data.category_name}`)}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: content.title,
        item: appUrl,
      },
    ],
  };

  return (
    <div className='w-full'>
      {content.isFallback && locale !== 'en' && (
        <p className='px-6 pt-5 text-sm text-white/70'>
          {t('originalLanguageNotice')}{' '}
          <a className='underline' href={getLocalizedPath('en', `/ai/${websiteName}`)}>
            {t('viewOriginal')}
          </a>
        </p>
      )}
      <div className='flex flex-col px-6 py-5 lg:h-[323px] lg:flex-row lg:justify-between lg:px-0 lg:py-10'>
        <div className='flex flex-col items-center lg:items-start'>
          <div lang={languageTag || ''} className='space-y-1 text-balance lg:space-y-3'>
            <h1 className='text-2xl lg:text-5xl'>{content.title}</h1>
            <p className='text-xs lg:text-sm'>{content.description}</p>
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
            title={content.title}
            alt={content.title}
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
        <div lang={languageTag || ''}>
          <MarkdownProse markdown={content.detail} locale={locale} />
        </div>
      </div>
      <StructuredData id='ai-software-structured-data' data={softwareJsonLd} />
      <StructuredData id='ai-breadcrumb-structured-data' data={breadcrumbJsonLd} />
    </div>
  );
}
