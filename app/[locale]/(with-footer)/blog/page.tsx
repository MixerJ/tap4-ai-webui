import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BASE_URL } from '@/lib/env';
import { BLOG_POSTS } from '@/lib/blog';
import { BLOG_PAGE_SIZE } from '@/lib/constants';
import { buildPageMetadata, getLocalizedPath } from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';

import BlogList from './BlogList';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.blog',
  });

  return buildPageMetadata({
    locale,
    path: '/blog',
    title: t('title', { defaultValue: 'Blog - Toolsify AI' }),
    description: t('description', {
      defaultValue: 'Latest articles about AI tools, comparisons, and industry insights',
    }),
    keywords: t('keywords', {
      defaultValue:
        'AI Tools, Artificial Intelligence, AI Blog, Toolsify AI, AI Tools Directory, AI Articles, AI Guides, AI Insights',
    }),
  });
}

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('Blog');
  const siteUrl = BASE_URL || 'https://toolsify.ai';
  const seoHeading = t('seoHeading', { defaultValue: 'AI Tools Blog: Guides, Comparisons, and Use Cases' });
  const sortedPosts = [...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const firstPagePosts = sortedPosts.slice(0, BLOG_PAGE_SIZE);
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: firstPagePosts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: post.title[locale as keyof typeof post.title] || post.title.en,
      url: `${siteUrl}${getLocalizedPath(locale, `/blog/${post.slug}`)}`,
    })),
  };

  return (
    <div className='relative min-h-screen w-full'>
      {/* 动态背景 */}
      <div className='fixed inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent' />
        <div className='performance-blob absolute left-1/4 top-1/4 hidden h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl motion-safe:animate-float lg:block' />
        <div
          className='performance-blob absolute bottom-1/4 right-1/4 hidden h-96 w-96 rounded-full bg-purple-500/10 blur-3xl motion-safe:animate-float lg:block'
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
            {seoHeading}
          </h1>
          <p className='text-sm font-medium text-white/80 lg:text-lg'>
            {t('subTitle', { defaultValue: 'Insights, guides, and updates about AI tools and technology' })}
          </p>
        </div>

        {/* 博客文章列表和分页 */}
        <BlogList locale={locale} />
      </div>
      <StructuredData id='blog-list-itemlist-structured-data' data={itemListJsonLd} />
    </div>
  );
}
