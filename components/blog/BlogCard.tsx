import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

import { BlogPost } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
  locale: string;
  readMoreText?: string;
}

export default function BlogCard({ post, locale, readMoreText = 'Read More' }: BlogCardProps) {
  const title = post.title[locale as keyof typeof post.title] || post.title.en;
  const excerpt = post.excerpt[locale as keyof typeof post.excerpt] || post.excerpt.en;

  return (
    <article
      key={post.id}
      className='group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 lg:p-8'
    >
      {/* 背景渐变效果 */}
      <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

      <div className='relative'>
        {/* 文章元信息 */}
        <div className='mb-4 flex flex-wrap items-center gap-4 text-xs text-white/60 lg:text-sm'>
          <div className='flex items-center gap-1.5'>
            <Calendar className='size-4' />
            <span>{new Date(post.date).toLocaleDateString(locale)}</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <User className='size-4' />
            <span>{post.author}</span>
          </div>
          <div className='rounded-lg border border-white/20 bg-white/5 px-2 py-1 text-white/70'>{post.category}</div>
        </div>

        {/* 文章标题 */}
        <Link href={`/blog/${post.slug}`} target='_blank' rel='noreferrer'>
          <h2 className='mb-3 text-xl font-bold text-white transition-colors duration-200 hover:text-indigo-400 lg:text-2xl'>
            {title}
          </h2>
        </Link>

        {/* 文章摘要 */}
        <p className='mb-4 text-sm leading-relaxed text-white/70 lg:text-base'>{excerpt}</p>

        {/* 标签 */}
        <div className='mb-4 flex flex-wrap gap-2'>
          {post.tags.map((tag) => (
            <span key={tag} className='rounded-lg border border-white/20 bg-white/5 px-2.5 py-1 text-xs text-white/60'>
              {tag}
            </span>
          ))}
        </div>

        {/* 阅读更多链接 */}
        <Link
          href={`/blog/${post.slug}`}
          target='_blank'
          rel='noreferrer'
          className='inline-flex items-center gap-2 text-sm font-medium text-indigo-400 transition-colors duration-200 hover:text-indigo-300 lg:text-base'
        >
          {readMoreText}
          <span className='transition-transform duration-200 group-hover:translate-x-1'>→</span>
        </Link>
      </div>
    </article>
  );
}
