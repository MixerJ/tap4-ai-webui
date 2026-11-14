/* eslint-disable react/jsx-props-no-spreading */

import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { createClient } from '@/db/supabase/server';
import { WebNavigation } from '@/db/supabase/types';

import { InfoPageSize, RevalidateOneHour } from '@/lib/constants';
import parsePageNumber from '@/lib/pagination';
import { buildPageMetadata, getLocalizedPath } from '@/lib/seo';

import Content from '../../Content';

export const revalidate = RevalidateOneHour * 6;

const validateCategoryPage = cache(async (code: string, currentPage: number) => {
  const supabase = createClient();
  const [{ data: categoryList, error: categoryError }, { count, error: countError }] = await Promise.all([
    supabase.from('navigation_category').select('title').eq('name', code),
    supabase.from('web_navigation').select('*', { count: 'exact', head: true }).eq('category_name', code),
  ]);
  if (categoryError) throw new Error('Unable to load AI tool category');
  if (countError || count === null) throw new Error('Unable to count AI tools');
  const category = categoryList?.[0] as unknown as { title: string } | undefined;
  if (!category || currentPage > Math.ceil(count / InfoPageSize)) notFound();
  return { category, count };
});

export async function generateMetadata({
  params,
}: {
  params: { locale: string; code: string; pageNum?: string };
}): Promise<Metadata> {
  const currentPage = parsePageNumber(params.pageNum);
  if (currentPage === null) notFound();
  if (currentPage === 1) permanentRedirect(getLocalizedPath(params.locale, `/category/${params.code}`));
  const { category } = await validateCategoryPage(params.code, currentPage);

  return buildPageMetadata({
    locale: params.locale,
    path: `/category/${params.code}/page/${params.pageNum || 1}`,
    title: `${category.title} - Page ${currentPage}`,
    description: category.title,
    keywords: [category.title, params.code, 'AI tools category'],
  });
}

export default async function Page({ params }: { params: { locale: string; code: string; pageNum?: string } }) {
  const currentPage = parsePageNumber(params.pageNum);
  if (currentPage === null) notFound();
  if (currentPage === 1) permanentRedirect(getLocalizedPath(params.locale, `/category/${params.code}`));
  const { category, count } = await validateCategoryPage(params.code, currentPage);
  const supabase = createClient();
  const start = (currentPage - 1) * InfoPageSize;
  const end = start + InfoPageSize - 1;
  const { data: navigationList, error: navigationError } = await supabase
    .from('web_navigation')
    .select('id, name, thumbnail_url, title, url, content')
    .eq('category_name', params.code)
    .range(start, end);
  if (navigationError) throw new Error('Unable to load AI tools');
  const navItems = (navigationList ?? []) as unknown as Array<
    Pick<WebNavigation, 'id' | 'name' | 'thumbnail_url' | 'title' | 'url' | 'content'>
  >;

  return (
    <Content
      headerTitle={category.title || params.code}
      navigationList={navItems}
      currentPage={currentPage}
      total={count}
      pageSize={InfoPageSize}
      route={`/category/${params.code}`}
    />
  );
}
