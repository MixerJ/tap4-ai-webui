/* eslint-disable react/jsx-no-target-blank */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { WebNavigation } from '@/db/supabase/types';
import { CircleArrowRight, SquareArrowOutUpRight, Star, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WebNavCard({ name, thumbnail_url, title, url, content }: WebNavigation) {
  const t = useTranslations('Home');
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className='group relative flex h-[210px] touch-manipulation flex-col gap-3 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-1 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/20 active:scale-[0.98] lg:h-[343px]'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* 装饰性元素 */}
      <div className='absolute -right-1 -top-1 z-20 opacity-0 transition-all duration-300 group-hover:opacity-100'>
        <div className='relative'>
          <Star className='size-6 animate-pulse fill-yellow-400 text-yellow-400' />
          <div className='absolute inset-0 animate-ping'>
            <Star className='size-6 fill-yellow-400 text-yellow-400' />
          </div>
        </div>
      </div>

      {/* 图片区域 */}
      <Link href={`/ai/${name}`} title={title} className='group relative overflow-hidden rounded-xl'>
        <div className='relative aspect-[310/174] w-full overflow-hidden rounded-xl'>
          {!imageLoaded && (
            <div className='absolute inset-0 animate-shimmer bg-gradient-to-br from-indigo-500/20 to-purple-500/20' />
          )}
          <img
            src={thumbnail_url || '/images/placeholder.svg'}
            alt={title}
            title={title}
            width={310}
            height={174}
            className={`aspect-[310/174] w-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* 悬停遮罩层 */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* 悬停内容 */}
          <div
            className={`absolute inset-0 z-10 flex items-center justify-center gap-2 rounded-xl bg-black/20 backdrop-blur-sm transition-all duration-300 ${
              isHovered ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            <span className='text-lg font-semibold text-white'>{t('checkDetail')}</span>
            <CircleArrowRight className='size-5 text-white' />
          </div>

          {/* 渐变边框效果 */}
          <div className='absolute inset-0 -m-[2px] rounded-xl bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
        </div>
      </Link>

      {/* 内容区域 */}
      <div className='flex flex-1 flex-col justify-between px-[6px] py-2'>
        <div className='space-y-2'>
          <div className='flex items-start justify-between'>
            <Link href={`/ai/${name}`} className='group/link flex-1'>
              <h3 className='line-clamp-1 text-sm font-bold text-white transition-colors duration-200 group-hover/link:text-indigo-300 lg:text-base'>
                {title}
              </h3>
            </Link>
            <a
              href={url}
              title={title}
              target='_blank'
              rel='nofollow'
              className='ml-2 flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-xl p-2 text-white/60 transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-purple-500/20 hover:text-white active:scale-90'
            >
              <SquareArrowOutUpRight className='size-4' />
              <span className='sr-only'>{title}</span>
            </a>
          </div>

          <p className='line-clamp-3 text-xs text-white/60 transition-colors duration-200 group-hover:text-white/80 lg:line-clamp-4 lg:text-sm'>
            {content}
          </p>
        </div>

        {/* 底部装饰 */}
        <div className='mt-2 flex items-center justify-between'>
          <div className='flex items-center gap-1 text-xs text-white/40'>
            <TrendingUp className='size-3' />
            <span>AI Tool</span>
          </div>
          <div
            className={`ml-2 h-1 flex-1 rounded-full bg-white/20 transition-all duration-300 ${
              isHovered ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : ''
            }`}
          />
        </div>
      </div>

      {/* 悬停时的光晕效果 */}
      <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/0 to-purple-500/0 transition-all duration-500 group-hover:from-indigo-500/10 group-hover:to-purple-500/10' />
    </div>
  );
}
