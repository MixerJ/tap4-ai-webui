import { createClient } from '@/db/supabase/server';
import { WebNavigation } from '@/db/supabase/types';

import { EXPLORE_PAGE_SIZE } from '@/lib/constants';
import { BASE_URL } from '@/lib/env';
import { getLocalizedPath } from '@/lib/seo';
import SearchForm from '@/components/home/SearchForm';
import BasePagination from '@/components/page/BasePagination';
import StructuredData from '@/components/seo/StructuredData';
import WebNavCardList from '@/components/webNav/WebNavCardList';

import { TagList } from '../(home)/Tag';

export default async function ExploreList({ locale, pageNum }: { locale: string; pageNum?: string }) {
  const supabase = createClient();
  const currentPage = pageNum ? Number(pageNum) : 1;

  // start and end
  const start = (currentPage - 1) * EXPLORE_PAGE_SIZE;
  const end = start + EXPLORE_PAGE_SIZE - 1;

  const [{ data: categoryList }, { data: navigationList, count }] = await Promise.all([
    supabase.from('navigation_category').select('id, name'),
    supabase
      .from('web_navigation')
      .select('id, name, thumbnail_url, title, url, content', { count: 'exact' })
      .order('collection_time', { ascending: false })
      .range(start, end),
  ]);
  const categories = (categoryList ?? []) as unknown as Array<{ id: number; name: string }>;
  const navItems = (navigationList ?? []) as unknown as Array<Pick<WebNavigation, 'id' | 'name' | 'thumbnail_url' | 'title' | 'url' | 'content'>>;
  const siteUrl = BASE_URL || 'https://toolsify.ai';
  const explorePath = currentPage > 1 ? `/explore/page/${currentPage}` : '/explore';
  const exploreUrl = `${siteUrl}${getLocalizedPath(locale, explorePath)}`;
  const itemListElement =
    navItems.map((item, index) => ({
      '@type': 'ListItem',
      position: start + index + 1,
      name: item.title,
      url: `${siteUrl}${getLocalizedPath(locale, `/ai/${item.name}`)}`,
    })) || [];

  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Explore AI Tools by Category',
    description: 'Browse curated AI tools by category, pricing model, and use case.',
    url: exploreUrl,
    inLanguage: locale,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: count || 0,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement,
    },
  };

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${siteUrl}${getLocalizedPath(locale, '/')}`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Explore',
      item: `${siteUrl}${getLocalizedPath(locale, '/explore')}`,
    },
  ];

  if (currentPage > 1) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: `Page ${currentPage}`,
      item: exploreUrl,
    });
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };

  return (
    <div className='w-full space-y-8 lg:space-y-12'>
      {/* 搜索区域 */}
      <div className='flex w-full items-center justify-center'>
        <div className='w-full max-w-lg'>
          <SearchForm />
        </div>
      </div>

      {/* 分类标签区域 */}
      <div className='mb-12 mt-8'>
        <TagList
          data={categories.map((item) => ({
            id: String(item.id),
            name: item.name,
            href: `/category/${item.name}`,
          }))}
        />
      </div>

      {/* 工具卡片列表 */}
      <WebNavCardList dataList={navItems} />

      {/* 分页 */}
      <BasePagination
        currentPage={currentPage}
        pageSize={EXPLORE_PAGE_SIZE}
        total={count!}
        route='/explore'
        subRoute='/page'
        className='my-8 lg:my-12'
      />
      <StructuredData id='explore-collectionpage-structured-data' data={collectionPageJsonLd} />
      <StructuredData id='explore-breadcrumb-structured-data' data={breadcrumbJsonLd} />
    </div>
  );
}
