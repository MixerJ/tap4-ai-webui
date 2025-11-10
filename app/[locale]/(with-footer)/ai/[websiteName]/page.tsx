import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/db/supabase/client';
import { CircleArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { SITE_NAME } from '@/lib/constants';
import { buildAlternates, buildLocalizedUrl, buildSocialMetadata } from '@/lib/seo';
import ResponsiveAd from '@/components/ads/ResponsiveAd';
import SidebarAd from '@/components/ads/SidebarAd';
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

  // 将介绍内容分成两部分（如果内容足够长）
  const detailContent = data?.detail || '';
  const contentParts = detailContent.split('\n\n');
  const midPoint = Math.floor(contentParts.length / 2);
  const firstHalf = contentParts.slice(0, midPoint).join('\n\n');
  const secondHalf = contentParts.slice(midPoint).join('\n\n');
  const hasEnoughContent = contentParts.length > 4; // 如果内容段落超过4段，则分割

  return (
    <>
      <script
        key={`software-jsonld-${websiteName}`}
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <div className='w-full space-y-8 lg:space-y-12'>
        {/* Hero 卡片区域 */}
        <div className='my-8 lg:my-16'>
          <div className='relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-indigo-500/5 to-purple-500/5 p-6 shadow-lg shadow-indigo-500/10 backdrop-blur-sm sm:p-8 lg:p-12'>
            {/* 光晕装饰 */}
            <div className='pointer-events-none absolute -left-24 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl' />
            <div className='pointer-events-none absolute bottom-0 right-[-60px] h-48 w-48 rounded-full bg-purple-500/20 blur-3xl' />

            <div className='relative grid items-center gap-8 lg:grid-cols-5'>
              {/* 文本区域 */}
              <div className='flex flex-col items-center gap-4 text-center lg:col-span-3 lg:items-start lg:gap-6 lg:text-left'>
                <div className='flex items-center gap-2 lg:mb-2'>
                  <div className='h-px w-12 bg-gradient-to-r from-transparent via-indigo-400/60 to-indigo-400/60' />
                  <div className='h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400' />
                  <div className='h-px w-12 bg-gradient-to-r from-indigo-400/60 via-indigo-400/60 to-transparent' />
                </div>
                <h1 className='bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-6xl'>
                  {data.title}
                </h1>
                <p className='max-w-3xl text-sm leading-relaxed text-white/80 lg:text-base'>{data.content}</p>
                <div className='flex w-full flex-col items-center gap-3 sm:flex-row lg:justify-start'>
                  <a
                    href={data.url}
                    target='_blank'
                    rel='noreferrer'
                    className='group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95 sm:w-auto'
                  >
                    {t('visitWebsite')}
                    <CircleArrowRight className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
                  </a>
                  {data.category_name && (
                    <span className='inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-wide text-white/60 backdrop-blur-sm lg:text-sm'>
                      {data.category_name}
                    </span>
                  )}
                </div>
              </div>

              {/* 图片区域 */}
              <a
                href={data.url}
                target='_blank'
                rel='noreferrer'
                className='group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-indigo-500/10 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-indigo-500/20 lg:col-span-2'
              >
                <div className='relative aspect-[16/10] w-full'>
                  <BaseImage
                    title={data.title}
                    alt={data.title}
                    fill
                    src={data.thumbnail_url || ''}
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                  />
                </div>
                <div className='absolute inset-0 z-10 flex items-center justify-center gap-2 rounded-2xl bg-black/0 text-lg font-medium text-white transition-all duration-300 group-hover:bg-black/50'>
                  <CircleArrowRight className='size-5 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100' />
                  <span className='translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100'>
                    {t('visitWebsite')}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* 主内容区域和侧边栏 */}
        <div className='flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8'>
          {/* 介绍内容区域 */}
          <div className='flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:p-10'>
            <div className='mb-6 flex items-center gap-3'>
              <div className='h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent' />
              <h2 className='bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-xl font-semibold text-transparent lg:text-2xl'>
                {t('introduction')}
              </h2>
              <div className='h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent' />
            </div>
            <div className='prose prose-lg prose-invert max-w-none'>
              {hasEnoughContent ? (
                <>
                  {/* 内容前半部分 */}
                  <MarkdownProse markdown={firstHalf} className='text-white/80' />

                  {/* 中间广告 */}
                  <ResponsiveAd adSlot='1139935274' className='my-8' />

                  {/* 内容后半部分 */}
                  <MarkdownProse markdown={secondHalf} className='text-white/80' />

                  {/* 内容结尾广告 */}
                  <ResponsiveAd adSlot='3175071670' className='mt-12' />
                </>
              ) : (
                <>
                  <MarkdownProse markdown={detailContent} className='text-white/80' />
                  {/* 内容结尾广告 */}
                  <ResponsiveAd adSlot='6828635404' className='mt-12' />
                </>
              )}
            </div>
          </div>

          {/* 侧边栏 */}
          <aside className='hidden lg:sticky lg:top-24 lg:block lg:w-80 lg:flex-shrink-0'>
            <SidebarAd adSlot='1035993499' />
          </aside>
        </div>
      </div>
    </>
  );
}
