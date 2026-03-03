/* eslint-disable react/jsx-props-no-spreading */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/db/supabase/server';
import { WebNavigation } from '@/db/supabase/types';

import { InfoPageSize, RevalidateOneHour } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo';

import Content from '../../Content';

export const revalidate = RevalidateOneHour * 6;

export async function generateMetadata({
  params,
}: {
  params: { locale: string; code: string; pageNum?: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const { data: categoryList } = await supabase.from('navigation_category').select('title').eq('name', params.code);
  const category = categoryList?.[0] as unknown as { title: string } | undefined;

  if (!category) {
    notFound();
  }

  return buildPageMetadata({
    locale: params.locale,
    path: `/category/${params.code}/page/${params.pageNum || 1}`,
    title: category.title,
    description: category.title,
    keywords: [category.title, params.code, 'AI tools category'],
  });
}

export default async function Page({ params }: { params: { code: string; pageNum?: string } }) {
  const supabase = createClient();
  const currentPage = Number(params?.pageNum || 1);
  const start = (currentPage - 1) * InfoPageSize;
  const end = start + InfoPageSize - 1;

  const [{ data: categoryList }, { data: navigationList, count }] = await Promise.all([
    supabase.from('navigation_category').select('title').eq('name', params.code),
    supabase
      .from('web_navigation')
      .select('id, name, thumbnail_url, title, url, content', { count: 'exact' })
      .eq('category_name', params.code)
      .range(start, end),
  ]);
  const category = categoryList?.[0] as unknown as { title: string } | undefined;

  if (!category) {
    notFound();
  }
  const navItems = (navigationList ?? []) as unknown as Array<Pick<WebNavigation, 'id' | 'name' | 'thumbnail_url' | 'title' | 'url' | 'content'>>;

  return (
    <Content
      headerTitle={category.title || params.code}
      navigationList={navItems}
      currentPage={currentPage}
      total={count!}
      pageSize={InfoPageSize}
      route={`/category/${params.code}`}
    />
  );
}
