import { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { createClient } from '@/db/supabase/client';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour, SITE_NAME } from '@/lib/constants';
import { buildAlternates, buildLocalizedUrl, buildSocialMetadata } from '@/lib/seo';
import { Separator } from '@/components/ui/separator';
import Empty from '@/components/Empty';
import WebNavCardList from '@/components/webNav/WebNavCardList';

import { TagList } from '../../Tag';
import Loading from './loading';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

export async function generateMetadata({
  params: { locale, search },
}: {
  params: { locale: string; search: string };
}): Promise<Metadata> {
  const homeTranslations = await getTranslations({ locale, namespace: 'Metadata.home' });
  const searchTranslations = await getTranslations({ locale, namespace: 'Metadata.search' });

  const rawQuery = search ? decodeURIComponent(search) : '';
  const normalizedQuery = rawQuery.trim();

  if (!normalizedQuery) {
    const title = homeTranslations('title');
    const description = homeTranslations('description');
    return {
      title,
      description,
      keywords: homeTranslations('keywords'),
      alternates: buildAlternates(locale, ''),
      ...buildSocialMetadata({
        locale,
        path: '',
        title,
        description,
      }),
    };
  }

  const encodedPath = `query/${encodeURIComponent(normalizedQuery)}`;
  const title = searchTranslations('title', { query: normalizedQuery });
  const description = searchTranslations('description', { query: normalizedQuery });

  return {
    title,
    description,
    keywords: searchTranslations('keywords', { query: normalizedQuery }),
    alternates: buildAlternates(locale, encodedPath),
    ...buildSocialMetadata({
      locale,
      path: encodedPath,
      title,
      description,
    }),
  };
}

export const revalidate = RevalidateOneHour / 2;

export default async function Page({ params }: { params: { locale: string; search?: string } }) {
  const supabase = createClient();
  const { locale, search } = params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  const meta = await getTranslations({ locale, namespace: 'Metadata.search' });
  const { data: categoryList } = await supabase.from('navigation_category').select();
  const { data: dataList } = await supabase
    .from('web_navigation')
    .select()
    .ilike('detail', `%${decodeURI(search || '')}%`);

  const normalizedQuery = search ? decodeURI(search).trim() : '';
  const encodedPath = normalizedQuery ? `query/${encodeURIComponent(normalizedQuery)}` : '';
  const structuredData = normalizedQuery
    ? {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: meta('title', { query: normalizedQuery }),
        description: meta('description', { query: normalizedQuery }),
        url: buildLocalizedUrl(locale, encodedPath),
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: buildLocalizedUrl(locale, ''),
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${buildLocalizedUrl(locale, '')}?search={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }
    : null;

  return (
    <Suspense fallback={<Loading />}>
      {structuredData && (
        <script
          key={`search-jsonld-${normalizedQuery}`}
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <div className='mb-10 mt-5'>
        {normalizedQuery && (
          <TagList
            data={categoryList!.map((item) => ({
              id: String(item.id),
              name: item.name,
              href: `/category/${item.name}`,
            }))}
          />
        )}
      </div>
      <section className='flex flex-col gap-5'>
        {dataList && !!dataList.length && normalizedQuery ? (
          <>
            <h2 className='mb-1 text-left text-[18px] lg:text-2xl'>{t('result')}</h2>
            <WebNavCardList dataList={dataList!} />
          </>
        ) : (
          <Empty title={t('empty')} />
        )}
      </section>
      <Separator className='mx-auto my-10 h-px w-4/5 bg-[#2C2D36] lg:my-16' />
      <ScrollToTop />
    </Suspense>
  );
}
