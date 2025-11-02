import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { BLOG_POSTS } from '@/lib/blog';
import { BLOG_PAGE_SIZE, RevalidateOneHour } from '@/lib/constants';

import BlogList from '../../BlogList';

export const revalidate = RevalidateOneHour * 6;

export async function generateMetadata({
  params: { locale, pageNum },
}: {
  params: { locale: string; pageNum: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.blog',
  });

  const currentPage = Number(pageNum);
  if (Number.isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  return {
    title: `${t('title', { defaultValue: 'Blog' })} - Page ${currentPage} - Toolsify AI`,
    description: t('description', {
      defaultValue: 'Latest articles about AI tools, comparisons, and industry insights',
    }),
    keywords: t('keywords', {
      defaultValue:
        'AI Tools, Artificial Intelligence, AI Blog, Toolsify AI, AI Tools Directory, AI Articles, AI Guides, AI Insights',
    }),
  };
}

export default async function BlogPagePage({
  params: { locale, pageNum },
}: {
  params: { locale: string; pageNum: string };
}) {
  const t = await getTranslations('Blog');
  const currentPage = Number(pageNum);

  if (Number.isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  // Check if page exists
  const total = BLOG_POSTS.length;
  const totalPages = Math.ceil(total / BLOG_PAGE_SIZE);
  if (currentPage > totalPages) {
    notFound();
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

      <div className='relative mx-auto w-full max-w-4xl px-5 py-10 lg:px-0 lg:py-16'>
        {/* 标题区域 */}
        <div className='mb-12 flex flex-col items-center gap-3 text-center lg:mb-16 lg:gap-4'>
          {/* 装饰性元素 */}
          <div className='mb-2 flex items-center justify-center gap-2 lg:mb-4'>
            <div className='h-px w-12 bg-gradient-to-r from-transparent via-indigo-500/50 to-indigo-500/50' />
            <div className='h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400' />
            <div className='h-px w-12 bg-gradient-to-r from-indigo-500/50 via-indigo-500/50 to-transparent' />
          </div>
          <h1 className='bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-3xl font-bold text-transparent lg:text-6xl'>
            {t('title', { defaultValue: 'Blog' })}
          </h1>
          <p className='text-sm font-medium text-white/80 lg:text-lg'>
            {t('subTitle', { defaultValue: 'Insights, guides, and updates about AI tools and technology' })}
          </p>
        </div>

        {/* 博客文章列表和分页 */}
        <BlogList locale={locale} pageNum={pageNum} />
      </div>
    </div>
  );
}
