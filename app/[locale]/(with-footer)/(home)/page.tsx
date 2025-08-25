import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { createClient } from '@/db/supabase/client';
import { CircleChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour } from '@/lib/constants';
import Faq from '@/components/Faq';
import SearchForm from '@/components/home/SearchForm';
import WebNavCardList from '@/components/webNav/WebNavCardList';

import { TagList } from './Tag';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.home',
  });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: './',
    },
  };
}

export const revalidate = RevalidateOneHour;

export default async function Page() {
  const supabase = createClient();
  const t = await getTranslations('Home');
  const [{ data: categoryList }, { data: navigationList }] = await Promise.all([
    supabase.from('navigation_category').select(),
    supabase.from('web_navigation').select().order('collection_time', { ascending: false }).limit(12),
  ]);

  return (
    <div className='relative w-full min-h-screen'>
      {/* 动态背景 */}
      <div className='fixed inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent' />
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float' style={{ animationDelay: '2s' }} />
      </div>

      <div className='relative mx-auto w-full max-w-pc flex-1 px-3 lg:px-0'>
        {/* 头部区域 - 增强视觉冲击 */}
        <div className='relative my-5 flex flex-col text-center lg:mx-auto lg:my-16 lg:gap-2'>
          {/* 装饰性元素 */}
          <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-60'>
            <div className='flex gap-2'>
              <div className='w-2 h-2 bg-indigo-500 rounded-full animate-pulse' />
              <div className='w-2 h-2 bg-purple-500 rounded-full animate-pulse' style={{ animationDelay: '0.2s' }} />
              <div className='w-2 h-2 bg-cyan-500 rounded-full animate-pulse' style={{ animationDelay: '0.4s' }} />
            </div>
          </div>

          <h1 className='text-3xl font-bold text-white lg:text-6xl animate-slide-up gradient-text bg-gradient-to-r from-white via-indigo-200 to-purple-200'>
            {t('title')}
          </h1>
          <h2 className='text-balance text-sm font-medium text-white/80 lg:text-lg animate-slide-up' style={{ animationDelay: '0.2s' }}>
            {t('subTitle')}
          </h2>

          {/* 统计信息 */}
          <div className='flex justify-center gap-8 mt-6 text-white/60'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-indigo-400'>1000+</div>
              <div className='text-xs'>AI Tools</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-purple-400'>50+</div>
              <div className='text-xs'>Categories</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-cyan-400'>10K+</div>
              <div className='text-xs'>Users</div>
            </div>
          </div>
        </div>

        {/* 搜索区域 - 现代化设计 */}
        <div className='flex w-full items-center justify-center mb-8'>
          <div className='relative w-full max-w-lg'>
            <SearchForm />
            {/* 搜索建议 */}
            <div className='absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-xs text-white/40'>
              <span>Try: "ChatGPT", "Image Generation", "Writing Assistant"</span>
            </div>
          </div>
        </div>

        {/* 分类标签区域 */}
        <div className='mb-12 mt-8 animate-slide-up' style={{ animationDelay: '0.4s' }}>
          <TagList
            data={categoryList!.map((item) => ({
              id: String(item.id),
              name: item.name,
              href: `/category/${item.name}`,
            }))}
          />
        </div>

        {/* 工具展示区域 */}
        <div className='flex flex-col gap-8 animate-slide-up' style={{ animationDelay: '0.6s' }}>
          <div className='text-center space-y-2'>
            <h2 className='text-2xl lg:text-4xl font-bold text-white'>
              {t('ai-navigate')}
            </h2>
            <p className='text-white/60 text-sm lg:text-base'>
              Discover the best AI tools for your needs
            </p>
          </div>

          <WebNavCardList dataList={navigationList!} />

          {/* 探索更多按钮 - 现代化设计 */}
          <div className='flex justify-center mt-8'>
            <Link
              href='/explore'
              className='group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold transition-all duration-300 hover:from-indigo-500 hover:to-purple-500 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25'
            >
              <span>{t('exploreMore')}</span>
              <CircleChevronRight className='size-5 transition-transform duration-300 group-hover:translate-x-1' />
              {/* 按钮光效 */}
              <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300' />
            </Link>
          </div>
        </div>

        <Faq />
        <ScrollToTop />
      </div>
    </div>
  );
}
