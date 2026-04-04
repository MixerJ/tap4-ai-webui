/* eslint-disable react/jsx-props-no-spreading */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/db/supabase/server';
import { WebNavigation } from '@/db/supabase/types';
import { getLanguageTagByLocale } from '@/i18n';

import { InfoPageSize, RevalidateOneHour } from '@/lib/constants';
import { BASE_URL } from '@/lib/env';
import { buildPageMetadata, getLocalizedPath } from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';

import Content from './Content';

export const revalidate = RevalidateOneHour * 6;

export async function generateMetadata({ params }: { params: { locale: string; code: string } }): Promise<Metadata> {
  const supabase = createClient();
  const { data: categoryList } = await supabase.from('navigation_category').select('title').eq('name', params.code);
  const category = categoryList?.[0] as unknown as { title: string } | undefined;

  if (!category) {
    notFound();
  }

  return buildPageMetadata({
    locale: params.locale,
    path: `/category/${params.code}`,
    title: category.title,
    description: category.title,
    keywords: [category.title, params.code, 'AI tools category'],
  });
}

export default async function Page({ params }: { params: { locale: string; code: string } }) {
  const supabase = createClient();
  const [{ data: categoryList }, { data: navigationList, count }] = await Promise.all([
    supabase.from('navigation_category').select('title').eq('name', params.code),
    supabase
      .from('web_navigation')
      .select('id, name, thumbnail_url, title, url, content', { count: 'exact' })
      .eq('category_name', params.code)
      .range(0, InfoPageSize - 1),
  ]);
  const category = categoryList?.[0] as unknown as { title: string } | undefined;

  if (!category) {
    notFound();
  }
  const navItems = (navigationList ?? []) as unknown as Array<
    Pick<WebNavigation, 'id' | 'name' | 'thumbnail_url' | 'title' | 'url' | 'content'>
  >;

  const { locale } = params;
  const languageTag = getLanguageTagByLocale(locale);
  const siteUrl = BASE_URL;

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.title,
    description: `${category.title} - AI tools collection on Toolsify AI`,
    url: `${siteUrl}${getLocalizedPath(locale, `/category/${params.code}`)}`,
    inLanguage: languageTag,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Toolsify AI',
      url: siteUrl,
    },
  };

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
        name: category.title,
        item: `${siteUrl}${getLocalizedPath(locale, `/category/${params.code}`)}`,
      },
    ],
  };

  return (
    <>
      <Content
        headerTitle={category.title || params.code}
        navigationList={navItems}
        currentPage={1}
        total={count!}
        pageSize={InfoPageSize}
        route={`/category/${params.code}`}
      />
      <StructuredData id='category-collection-structured-data' data={collectionJsonLd} />
      <StructuredData id='category-breadcrumb-structured-data' data={breadcrumbJsonLd} />
    </>
  );
}
