import { getTranslations } from 'next-intl/server';

import { BLOG_POSTS } from '@/lib/blog';
import { BLOG_PAGE_SIZE } from '@/lib/constants';
import InFeedAd from '@/components/ads/InFeedAd';
import BlogCard from '@/components/blog/BlogCard';
import BasePagination from '@/components/page/BasePagination';

interface BlogListProps {
  locale: string;
  pageNum?: string;
}

export default async function BlogList({ locale, pageNum }: BlogListProps) {
  const t = await getTranslations('Blog');
  const currentPage = pageNum ? Number(pageNum) : 1;

  // Sort posts by date (newest first)
  const sortedPosts = [...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calculate pagination
  const total = sortedPosts.length;
  const totalPages = Math.ceil(total / BLOG_PAGE_SIZE);
  const start = (currentPage - 1) * BLOG_PAGE_SIZE;
  const end = start + BLOG_PAGE_SIZE;
  const paginatedPosts = sortedPosts.slice(start, end);

  return (
    <div className='w-full space-y-8 lg:space-y-12'>
      {/* 博客文章列表 */}
      <div className='space-y-6'>
        {paginatedPosts.map((post, index) => (
          <>
            <BlogCard
              key={post.id}
              post={post}
              locale={locale}
              readMoreText={t('readMore', { defaultValue: 'Read More' })}
            />
            {/* 每 3 篇文章后插入广告 */}
            {index % 3 === 0 && index !== paginatedPosts.length - 1 && (
              <InFeedAd adSlot='5246701249' adLayout='in-article' />
            )}
          </>
        ))}
      </div>

      {/* 分页 */}
      {totalPages > 1 && (
        <BasePagination
          currentPage={currentPage}
          pageSize={BLOG_PAGE_SIZE}
          total={total}
          route='/blog'
          subRoute='/page'
          firstPageRoute='/blog'
          className='my-8 lg:my-12'
        />
      )}
    </div>
  );
}
