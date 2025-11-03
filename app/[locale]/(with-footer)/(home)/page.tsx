import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { createClient } from '@/db/supabase/client';
import { Calendar, CircleChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { BLOG_POSTS } from '@/lib/blog';
import { HOME_PAGE_SIZE, RevalidateOneHour } from '@/lib/constants';
import ResponsiveAd from '@/components/ads/ResponsiveAd';
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

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const supabase = createClient();
  const t = await getTranslations('Home');
  const [{ data: categoryList }, { data: navigationList }] = await Promise.all([
    supabase.from('navigation_category').select(),
    supabase.from('web_navigation').select().order('collection_time', { ascending: false }).limit(HOME_PAGE_SIZE),
  ]);

  // Get featured blog posts
  const featuredSlugs = ['cubesolver-ai-magic-cube-3d', 'introducing-toolsify-ai-directory'];
  const featuredPosts = featuredSlugs
    .map((slug) => BLOG_POSTS.find((post) => post.slug === slug))
    .filter((post): post is NonNullable<typeof post> => post !== undefined);

  // Get a random third post (excluding featured ones)
  const otherPosts = BLOG_POSTS.filter((post) => !featuredSlugs.includes(post.slug));
  const randomPost = otherPosts[Math.floor(Math.random() * otherPosts.length)];
  if (randomPost) {
    featuredPosts.push(randomPost);
  }

  return (
    <div className='relative min-h-screen w-full'>
      {/* 动态背景 */}
      <div className='fixed inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent' />
        <div className='absolute left-1/4 top-1/4 h-96 w-96 animate-float rounded-full bg-indigo-500/10 blur-3xl' />
        <div
          className='absolute bottom-1/4 right-1/4 h-96 w-96 animate-float rounded-full bg-purple-500/10 blur-3xl'
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className='relative mx-auto w-full max-w-pc flex-1 px-3 lg:px-0'>
        {/* 头部区域 - 增强视觉冲击 */}
        <div className='relative my-5 flex flex-col text-center lg:mx-auto lg:my-16 lg:gap-2'>
          {/* 装饰性元素 */}
          <div className='absolute -top-8 left-1/2 -translate-x-1/2 transform opacity-60'>
            <div className='flex gap-2'>
              <div className='h-2 w-2 animate-pulse rounded-full bg-indigo-500' />
              <div className='h-2 w-2 animate-pulse rounded-full bg-purple-500' style={{ animationDelay: '0.2s' }} />
              <div className='h-2 w-2 animate-pulse rounded-full bg-cyan-500' style={{ animationDelay: '0.4s' }} />
            </div>
          </div>

          <h1 className='gradient-text animate-slide-up bg-gradient-to-r from-white via-indigo-200 to-purple-200 text-3xl font-bold text-white lg:text-6xl'>
            {t('title')}
          </h1>
          <h2
            className='animate-slide-up text-balance text-sm font-medium text-white/80 lg:text-lg'
            style={{ animationDelay: '0.2s' }}
          >
            {t('subTitle')}
          </h2>

          {/* 统计信息 */}
          <div className='mt-6 flex justify-center gap-8 text-white/60'>
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
        <div className='mb-8 flex w-full flex-col items-center'>
          <div className='relative w-full max-w-lg'>
            <SearchForm />
          </div>
          {/* 搜索建议 */}
          <div className='mt-4 text-center text-xs text-white/40'>
            <span>{t('searchSuggestions')}</span>
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
        <div className='flex animate-slide-up flex-col gap-8' style={{ animationDelay: '0.6s' }}>
          <div className='space-y-2 text-center'>
            <h2 className='text-2xl font-bold text-white lg:text-4xl'>{t('ai-navigate')}</h2>
            <p className='text-sm text-white/60 lg:text-base'>Discover the best AI tools for your needs</p>
          </div>

          <WebNavCardList dataList={navigationList!} />

          {/* 探索更多按钮 - 现代化设计 */}
          <div className='mt-8 flex justify-center'>
            <Link
              href='/explore'
              className='group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-indigo-500 hover:to-purple-500 hover:shadow-2xl hover:shadow-indigo-500/25'
            >
              <span>{t('exploreMore')}</span>
              <CircleChevronRight className='size-5 transition-transform duration-300 group-hover:translate-x-1' />
              {/* 按钮光效 */}
              <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-20' />
            </Link>
          </div>
        </div>

        {/* 博客展示区域 */}
        {featuredPosts.length > 0 && (
          <div className='mb-20 mt-16 animate-slide-up lg:mb-32' style={{ animationDelay: '0.8s' }}>
            <div className='mb-8 space-y-2 text-center'>
              <h2 className='text-2xl font-bold text-white lg:text-4xl'>
                {t('featuredBlog', { defaultValue: 'Featured Articles' })}
              </h2>
              <p className='text-sm text-white/60 lg:text-base'>
                {t('featuredBlogSub', { defaultValue: 'Latest insights and guides about AI tools' })}
              </p>
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {featuredPosts.map((post) => {
                const title = post.title[locale as keyof typeof post.title] || post.title.en;
                const excerpt = post.excerpt[locale as keyof typeof post.excerpt] || post.excerpt.en;

                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    target='_blank'
                    rel='noreferrer'
                    className='group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-indigo-500/10 lg:p-8'
                  >
                    {/* 背景渐变效果 */}
                    <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

                    <div className='relative flex h-full flex-col justify-between'>
                      <div>
                        {/* 文章元信息 */}
                        <div className='mb-4 flex flex-wrap items-center gap-3 text-xs text-white/60 lg:text-sm'>
                          <div className='flex items-center gap-1.5'>
                            <Calendar className='size-3.5' />
                            <span>{new Date(post.date).toLocaleDateString(locale)}</span>
                          </div>
                          <div className='rounded-lg border border-white/20 bg-white/5 px-2 py-0.5 text-white/70'>
                            {post.category}
                          </div>
                        </div>

                        {/* 文章标题 */}
                        <h3 className='mb-3 text-lg font-bold text-white transition-colors duration-200 group-hover:text-indigo-400 lg:text-xl'>
                          {title}
                        </h3>

                        {/* 文章摘要 */}
                        <p className='mb-4 line-clamp-3 text-sm leading-relaxed text-white/70 lg:text-base'>
                          {excerpt}
                        </p>
                      </div>

                      {/* 阅读更多链接 */}
                      <div className='mt-4 inline-flex items-center gap-2 text-sm font-medium text-indigo-400 transition-colors duration-200 group-hover:text-indigo-300'>
                        <span>{t('readMore', { defaultValue: 'Read More' })}</span>
                        <span className='transition-transform duration-200 group-hover:translate-x-1'>→</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* 查看所有博客按钮 */}
            <div className='mt-8 flex justify-center'>
              <Link
                href='/blog'
                className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white lg:text-base'
              >
                <span>{t('viewAllBlog', { defaultValue: 'View All Articles' })}</span>
                <span className='transition-transform duration-200 group-hover:translate-x-1'>→</span>
              </Link>
            </div>

            {/* 底部广告 - 在 Featured Articles 和 Footer 之间 */}
            <div className='mx-auto w-full max-w-pc px-4'>
              <ResponsiveAd adSlot='1041337705' className='mb-20 lg:mb-32' />
            </div>
          </div>
        )}

        <ScrollToTop />
      </div>
    </div>
  );
}
