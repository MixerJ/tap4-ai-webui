import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { BLOG_POSTS } from '@/lib/blog';
import { SITE_NAME } from '@/lib/constants';
import { buildAlternates, buildLocalizedUrl, buildSocialMetadata } from '@/lib/seo';
import ResponsiveAd from '@/components/ads/ResponsiveAd';
import SidebarAd from '@/components/ads/SidebarAd';
import MarkdownProse from '@/components/MarkdownProse';

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const title = post.title[locale as keyof typeof post.title] || post.title.en;
  const excerpt = post.excerpt[locale as keyof typeof post.excerpt] || post.excerpt.en;

  // Generate keywords from tags and category
  const keywords = [...post.tags, post.category, 'AI Tools', 'Artificial Intelligence', 'Toolsify AI', 'AI Blog'].join(
    ', ',
  );

  return {
    title: `${title} - ${SITE_NAME} Blog`,
    description: excerpt,
    keywords,
    alternates: buildAlternates(locale, `blog/${slug}`),
    ...buildSocialMetadata({
      locale,
      path: `blog/${slug}`,
      title: `${title} - ${SITE_NAME} Blog`,
      description: excerpt,
      image: post.image
        ? {
            url: post.image,
            alt: title,
          }
        : undefined,
    }),
  };
}

export default async function BlogPostPage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const t = await getTranslations('Blog');
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const title = post.title[locale as keyof typeof post.title] || post.title.en;
  const content = post.content[locale as keyof typeof post.content] || post.content.en;
  const canonicalUrl = buildLocalizedUrl(locale, `blog/${slug}`);
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    alternativeHeadline: post.excerpt.en,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: buildLocalizedUrl(locale, ''),
    },
    keywords: post.tags,
    articleSection: post.category,
    url: canonicalUrl,
    image: post.image ? [post.image] : undefined,
    description: post.excerpt.en,
    inLanguage: locale,
    articleBody: content,
  };

  // 将文章内容分成两部分
  const contentParts = content.split('\n\n');
  const midPoint = Math.floor(contentParts.length / 2);
  const firstHalf = contentParts.slice(0, midPoint).join('\n\n');
  const secondHalf = contentParts.slice(midPoint).join('\n\n');

  return (
    <>
      <script
        key={`blog-post-jsonld-${slug}`}
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
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

        <div className='relative mx-auto w-full max-w-7xl px-5 py-10 lg:px-0 lg:py-16'>
          {/* 返回链接 */}
          <Link
            href='/blog'
            className='mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors duration-200 hover:text-white lg:text-base'
          >
            <ArrowLeft className='size-4' />
            <span>{t('backToBlog', { defaultValue: 'Back to Blog' })}</span>
          </Link>

          {/* 主内容区域和侧边栏 */}
          <div className='flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8'>
            {/* 文章内容 */}
            <article className='flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:p-10'>
              {/* 文章元信息 */}
              <div className='mb-6 flex flex-wrap items-center gap-4 text-sm text-white/60'>
                <div className='flex items-center gap-1.5'>
                  <Calendar className='size-4' />
                  <span>{new Date(post.date).toLocaleDateString(locale)}</span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <User className='size-4' />
                  <span>{post.author}</span>
                </div>
                <div className='rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-white/70'>
                  {post.category}
                </div>
              </div>

              {/* 文章标题 */}
              <h1 className='mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-3xl font-bold text-transparent lg:text-5xl'>
                {title}
              </h1>

              {/* 标签 */}
              <div className='mb-8 flex flex-wrap gap-2'>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className='rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/70'
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 文章内容 */}
              <div className='prose prose-lg prose-invert max-w-none'>
                {/* <MarkdownProse markdown={content} className='text-white/80' /> */}
                {/* 文章前半部分 */}
                <MarkdownProse markdown={firstHalf} className='text-white/80' />

                {/* 中间广告 */}
                <ResponsiveAd adSlot='9541169475' />

                {/* 文章后半部分 */}
                <MarkdownProse markdown={secondHalf} className='text-white/80' />

                {/* 文章结尾广告 */}
                <ResponsiveAd adSlot='8963844152' className='mt-12' />
              </div>

              {/* 下载按钮 */}
              {post.downloadLinks && (post.downloadLinks.googlePlay || post.downloadLinks.appStore) && (
                <div className='mt-8 flex flex-wrap gap-4 border-t border-white/10 pt-8'>
                  {post.downloadLinks.googlePlay && (
                    <a
                      href={post.downloadLinks.googlePlay}
                      target='_blank'
                      rel='noreferrer'
                      className='group flex items-center gap-3 rounded-xl border border-white/20 bg-gradient-to-r from-green-500/10 to-green-600/10 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:border-green-500/50 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/20 lg:text-base'
                    >
                      <svg className='size-6' viewBox='0 0 24 24' fill='currentColor'>
                        <path d='M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L14.54,17.15L13.09,15.7L17.75,12.85L13.09,10L14.54,8.55L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z' />
                      </svg>
                      <span>Google Play</span>
                    </a>
                  )}
                  {post.downloadLinks.appStore && (
                    <a
                      href={post.downloadLinks.appStore}
                      target='_blank'
                      rel='noreferrer'
                      className='group flex items-center gap-3 rounded-xl border border-white/20 bg-gradient-to-r from-blue-500/10 to-blue-600/10 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/20 lg:text-base'
                    >
                      <svg className='size-6' viewBox='0 0 24 24' fill='currentColor'>
                        <path d='M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z' />
                      </svg>
                      <span>App Store</span>
                    </a>
                  )}
                </div>
              )}
            </article>

            {/* 侧边栏 */}
            <aside className='hidden lg:sticky lg:top-24 lg:block lg:w-80 lg:flex-shrink-0'>
              <SidebarAd adSlot='2644588636' />
            </aside>
          </div>

          {/* 导航到其他文章 */}
          <div className='mt-12'>
            <Link
              href='/blog'
              className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white lg:text-base'
            >
              <ArrowLeft className='size-4' />
              <span>{t('backToBlog', { defaultValue: 'Back to Blog' })}</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
