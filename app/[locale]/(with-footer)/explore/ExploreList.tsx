import { createClient } from '@/db/supabase/client';

import { EXPLORE_PAGE_SIZE } from '@/lib/constants';
import ResponsiveAd from '@/components/ads/ResponsiveAd';
import SearchForm from '@/components/home/SearchForm';
import BasePagination from '@/components/page/BasePagination';
import WebNavCardList from '@/components/webNav/WebNavCardList';

import { TagList } from '../(home)/Tag';

export default async function ExploreList({ pageNum }: { pageNum?: string }) {
  const supabase = createClient();
  const currentPage = pageNum ? Number(pageNum) : 1;

  // start and end
  const start = (currentPage - 1) * EXPLORE_PAGE_SIZE;
  const end = start + EXPLORE_PAGE_SIZE - 1;

  const [{ data: categoryList }, { data: navigationList, count }] = await Promise.all([
    supabase.from('navigation_category').select(),
    supabase
      .from('web_navigation')
      .select('*', { count: 'exact' })
      .order('collection_time', { ascending: false })
      .range(start, end),
  ]);

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
          data={categoryList!.map((item) => ({
            id: String(item.id),
            name: item.name,
            href: `/category/${item.name}`,
          }))}
        />
      </div>

      {/* 工具卡片列表 */}
      <WebNavCardList dataList={navigationList!} />

      {/* 分页 */}
      <BasePagination
        currentPage={currentPage}
        pageSize={EXPLORE_PAGE_SIZE}
        total={count!}
        route='/explore'
        subRoute='/page'
        className='my-8 lg:my-12'
      />

      {/* 底部广告 - 在内容和 Footer 之间 */}
      <div className='mx-auto w-full max-w-pc px-4'>
        <ResponsiveAd adSlot='9999500326' className='mb-20 lg:mb-32' />
      </div>
    </div>
  );
}
