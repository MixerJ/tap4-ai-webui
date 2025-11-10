/* eslint-disable react/jsx-props-no-spreading */
import { WebNavigation } from '@/db/supabase/types';
import { useTranslations } from 'next-intl';

import ResponsiveAd from '@/components/ads/ResponsiveAd';
import Empty from '@/components/Empty';
import ExploreBreadcrumb from '@/components/explore/ExploreBreadcrumb';
import BasePagination from '@/components/page/BasePagination';
import WebNavCard from '@/components/webNav/WebNavCard';

export default function Content({
  headerTitle,
  navigationList,
  currentPage,
  total,
  pageSize,
  route,
}: {
  headerTitle: string;
  navigationList: WebNavigation[];
  currentPage: number;
  total: number;
  pageSize: number;
  route: string;
}) {
  const t = useTranslations('Category');

  return (
    <div className='w-full space-y-8 lg:space-y-12'>
      {/* 标题区域 */}
      <div className='my-8 flex flex-col gap-3 text-balance text-center lg:my-16 lg:gap-4'>
        {/* 装饰性元素 */}
        <div className='mb-2 flex items-center justify-center gap-2 lg:mb-4'>
          <div className='h-px w-12 bg-gradient-to-r from-transparent via-indigo-500/50 to-indigo-500/50' />
          <div className='h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400' />
          <div className='h-px w-12 bg-gradient-to-r from-indigo-500/50 via-indigo-500/50 to-transparent' />
        </div>
        <h1 className='bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-3xl font-bold text-transparent lg:text-6xl'>
          {headerTitle}
        </h1>
        <div className='mx-auto'>
          <ExploreBreadcrumb
            linkList={[
              {
                href: '/',
                title: t('home'),
              },
              {
                title: headerTitle,
                isLast: true,
              },
            ]}
          />
        </div>
      </div>

      {/* 内容区域 */}
      <div className='mt-3'>
        {navigationList && !!navigationList?.length ? (
          <>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-4'>
              {navigationList.map((item) => (
                <WebNavCard key={item.id} {...item} />
              ))}
            </div>
            <div className='my-8 flex items-center justify-center lg:my-12'>
              <BasePagination
                currentPage={currentPage}
                total={total}
                pageSize={pageSize}
                route={route}
                subRoute='/page'
              />
            </div>
          </>
        ) : (
          <div className='mb-3 lg:mb-5'>
            <Empty title={t('empty')} />
          </div>
        )}
      </div>

      {/* 底部广告 - 在内容和 Footer 之间 */}
      <div className='mx-auto w-full max-w-pc px-4'>
        <ResponsiveAd adSlot='4679725038' className='mb-20 lg:mb-32' />
      </div>
    </div>
  );
}
