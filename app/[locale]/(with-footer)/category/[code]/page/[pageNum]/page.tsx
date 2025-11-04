/* eslint-disable react/jsx-props-no-spreading */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/db/supabase/client';

import { InfoPageSize, RevalidateOneHour, SITE_NAME } from '@/lib/constants';
import { buildAlternates, buildLocalizedUrl, buildSocialMetadata } from '@/lib/seo';

import Content from '../../Content';

export const revalidate = RevalidateOneHour * 6;

export async function generateMetadata({
  params,
}: {
  params: { locale: string; code: string; pageNum?: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const { data: categoryList } = await supabase.from('navigation_category').select().eq('name', params.code);

  if (!categoryList || !categoryList[0]) {
    notFound();
  }

  const category = categoryList[0];
  const categoryTitle = category.title || params.code;
  const pageTitle = `${categoryTitle} AI Tools - Page ${params.pageNum ?? 1}`;
  const description = `Browse page ${params.pageNum ?? 1} of curated ${categoryTitle} AI tools on ${SITE_NAME}. Compare features, use cases and pricing.`;
  const keywords = [
    categoryTitle,
    `${categoryTitle} AI tools`,
    `${categoryTitle} software`,
    'AI tools directory',
    SITE_NAME,
  ].join(', ');

  return {
    title: pageTitle,
    description,
    keywords,
    alternates: buildAlternates(params.locale, `category/${params.code}/page/${params.pageNum ?? 1}`),
    ...buildSocialMetadata({
      locale: params.locale,
      path: `category/${params.code}/page/${params.pageNum ?? 1}`,
      title: pageTitle,
      description,
    }),
  };
}

export default async function Page({ params }: { params: { locale: string; code: string; pageNum?: string } }) {
  const supabase = createClient();
  const currentPage = Number(params?.pageNum || 1);

  const [{ data: categoryList }, { data: navigationList, count }] = await Promise.all([
    supabase.from('navigation_category').select().eq('name', params.code),
    supabase
      .from('web_navigation')
      .select('*', { count: 'exact' })
      .eq('category_name', params.code)
      .range(0, InfoPageSize - 1),
  ]);

  if (!categoryList || !categoryList[0]) {
    notFound();
  }

  const category = categoryList[0];
  const categoryTitle = category.title || params.code;
  const canonicalUrl = buildLocalizedUrl(params.locale, `category/${params.code}/page/${params.pageNum ?? 1}`);
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryTitle} AI Tools`,
    url: canonicalUrl,
    description: `Explore curated ${categoryTitle} AI tools, pricing, and feature comparisons on ${SITE_NAME}.`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: buildLocalizedUrl(params.locale, ''),
    },
  };

  return (
    <>
      <script
        key={`category-jsonld-${params.code}-${params.pageNum ?? 1}`}
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Content
        headerTitle={categoryTitle}
        navigationList={navigationList!}
        currentPage={currentPage}
        total={count!}
        pageSize={InfoPageSize}
        route={`/category/${params.code}`}
      />
    </>
  );
}
