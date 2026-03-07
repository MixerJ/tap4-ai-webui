import { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { createClient } from '@/db/supabase/server';
import { getTranslations } from 'next-intl/server';
import { WebNavigation } from '@/db/supabase/types';

import { RevalidateOneHour } from '@/lib/constants';
import { formatCurrentMonth } from '@/lib/utils/timeUtils';
import { Separator } from '@/components/ui/separator';
import Empty from '@/components/Empty';
import WebNavCardList from '@/components/webNav/WebNavCardList';
import { buildPageMetadata } from '@/lib/seo';

import { TagList } from '../../Tag';
import Loading from './loading';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

export async function generateMetadata({
  params: { locale, search },
}: {
  params: { locale: string; search: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.home',
  });
  const currentYear = new Date().getFullYear();
  const currentMonth = formatCurrentMonth(locale);
  const keyword = decodeURIComponent(search || '');

  return buildPageMetadata({
    locale,
    path: `/query/${encodeURIComponent(keyword)}`,
    title: `${t('title', { year: currentYear, month: currentMonth })} - ${keyword}`,
    description: `${t('description')} - ${keyword}`,
    keywords: [t('keywords'), keyword],
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  });
}

export const revalidate = RevalidateOneHour / 2;

export default async function Page({ params }: { params: { search?: string } }) {
  const supabase = createClient();
  const t = await getTranslations('Home');
  const { data: categoryList } = await supabase.from('navigation_category').select('id, name');
  const { data: dataList } = await supabase
    .from('web_navigation')
    .select('id, name, thumbnail_url, title, url, content')
    .ilike('detail', `%${decodeURIComponent(params?.search || '')}%`);
  const categories = (categoryList ?? []) as unknown as Array<{ id: number; name: string }>;
  const navItems = (dataList ?? []) as unknown as Array<Pick<WebNavigation, 'id' | 'name' | 'thumbnail_url' | 'title' | 'url' | 'content'>>;

  return (
    <Suspense fallback={<Loading />}>
      <div className='mb-10 mt-5'>
        {params?.search && (
          <TagList
            data={categories.map((item) => ({
              id: String(item.id),
              name: item.name,
              href: `/category/${item.name}`,
            }))}
          />
        )}
      </div>
      <section className='flex flex-col gap-5'>
        {dataList && !!dataList.length && params?.search ? (
          <>
            <h2 className='mb-1 text-left text-[18px] lg:text-2xl'>{t('result')}</h2>
            <WebNavCardList dataList={navItems} />
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
