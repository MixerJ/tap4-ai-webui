import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/db/supabase/client';
import { CircleArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { SITE_NAME } from '@/lib/constants';
import { buildAlternates, buildLocalizedUrl, buildSocialMetadata } from '@/lib/seo';
import { Separator } from '@/components/ui/separator';
import BaseImage from '@/components/image/BaseImage';
import MarkdownProse from '@/components/MarkdownProse';

export async function generateMetadata({
  params: { locale, websiteName },
}: {
  params: { locale: string; websiteName: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.ai',
  });
  const { data } = await supabase.from('web_navigation').select().eq('name', websiteName);

  if (!data || !data[0]) {
    notFound();
  }

  const tool = data[0];
  const title = `${tool.title} | ${t('titleSubfix')}`;
  const description =
    tool.content ||
    `Learn more about ${tool.title}, a leading ${tool.category_name ?? 'AI'} tool listed on ${SITE_NAME}.`;
  const keywords = [tool.title, `${tool.title} review`, `${tool.category_name ?? 'AI'} tool`, 'AI software', SITE_NAME]
    .filter(Boolean)
    .join(', ');

  return {
    title,
    description,
    keywords,
    alternates: buildAlternates(locale, `ai/${websiteName}`),
    ...buildSocialMetadata({
      locale,
      path: `ai/${websiteName}`,
      title,
      description,
      image: tool.thumbnail_url
        ? {
            url: tool.thumbnail_url,
            alt: tool.title,
          }
        : undefined,
    }),
  };
}

export default async function Page({
  params: { locale, websiteName },
}: {
  params: { locale: string; websiteName: string };
}) {
  const supabase = createClient();
  const t = await getTranslations('Startup.detail');
  const { data: dataList } = await supabase.from('web_navigation').select().eq('name', websiteName);
  if (!dataList) {
    notFound();
  }
  const data = dataList[0];

  const canonicalUrl = buildLocalizedUrl(locale, `ai/${websiteName}`);
  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.title,
    applicationCategory: data.category_name || 'AIApplication',
    description:
      data.detail || data.content || `Discover how ${data.title} helps teams work smarter with AI on ${SITE_NAME}.`,
    url: canonicalUrl,
    image: data.thumbnail_url || undefined,
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      url: data.url,
      availability: 'https://schema.org/InStock',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: buildLocalizedUrl(locale, ''),
    },
    sameAs: data.url ? [data.url] : undefined,
  };

  return (
    <>
      <script
        key={`software-jsonld-${websiteName}`}
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
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
              rel='noreferrer'
              className='flex-center mt-5 min-h-5 w-full gap-1 rounded-[8px] bg-white p-[10px] text-sm capitalize text-black hover:opacity-80 lg:mt-auto lg:w-[288px]'
            >
              {t('visitWebsite')} <CircleArrowRight className='size-[14px]' />
            </a>
          </div>
          <a
            href={data.url}
            target='_blank'
            rel='noreferrer'
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
        <div className='mb-5 px-3 lg:px-0'>
          <h2 className='my-5 text-2xl text-white/40 lg:my-10'>{t('introduction')}</h2>
          <MarkdownProse markdown={data?.detail || ''} />
        </div>
      </div>
    </>
  );
}
