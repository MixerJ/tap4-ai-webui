# Google AdSense 使用示例

本文档提供在不同页面中集成 Google AdSense 的实际代码示例。

## 前提条件

1. 已配置环境变量（参见 `ENVIRONMENT_VARIABLES.md`）
2. 已在 Google AdSense 中创建广告单元并获取 `ad-slot` ID
3. 网站已通过 Google AdSense 审核

## 推荐的广告位置和示例

### 1. 博客文章详情页（最推荐 ⭐⭐⭐⭐⭐）

#### 文章中间广告

在 `app/[locale]/(with-footer)/blog/[slug]/page.tsx` 中：

```tsx
import { notFound } from 'next/navigation';
import { Calendar, User } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import BaseImage from '@/components/image/BaseImage';
import MarkdownProse from '@/components/MarkdownProse';
import ResponsiveAd from '@/components/ads/ResponsiveAd';
import { BLOG_POSTS } from '@/lib/blog';

export default async function BlogDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const t = await getTranslations('Blog');
  const content = post.content[locale as keyof typeof post.content] || post.content.en;

  // 将文章内容分成两部分（在中间插入广告）
  const paragraphs = content.split('\n\n');
  const midPoint = Math.floor(paragraphs.length / 2);
  const firstHalf = paragraphs.slice(0, midPoint).join('\n\n');
  const secondHalf = paragraphs.slice(midPoint).join('\n\n');

  return (
    <div className='mx-auto w-full max-w-pc px-4 py-12 lg:py-20'>
      {/* 文章标题 */}
      <h1 className='mb-6 text-4xl font-bold text-white lg:text-5xl'>
        {post.title[locale as keyof typeof post.title] || post.title.en}
      </h1>

      {/* 元信息 */}
      <div className='mb-8 flex flex-wrap items-center gap-4 text-sm text-white/60'>
        <div className='flex items-center gap-2'>
          <Calendar className='size-4' />
          <span>{new Date(post.date).toLocaleDateString(locale)}</span>
        </div>
        <div className='flex items-center gap-2'>
          <User className='size-4' />
          <span>{post.author}</span>
        </div>
      </div>

      {/* 特色图片 */}
      {post.image && (
        <BaseImage
          src={post.image}
          alt={post.title.en}
          title={post.title.en}
          width={1200}
          height={600}
          className='mb-12 w-full rounded-2xl'
        />
      )}

      {/* 文章内容 - 前半部分 */}
      <MarkdownProse markdown={firstHalf} />

      {/* 中间广告 */}
      <ResponsiveAd 
        adSlot='YOUR_AD_SLOT_ID_1' 
        className='my-12'
      />

      {/* 文章内容 - 后半部分 */}
      <MarkdownProse markdown={secondHalf} />

      {/* 文章结尾广告 */}
      <ResponsiveAd 
        adSlot='YOUR_AD_SLOT_ID_2' 
        className='mt-16'
      />

      {/* 下载按钮（如果有） */}
      {post.downloadLinks && (
        <div className='mt-12 flex flex-col gap-4 sm:flex-row'>
          {/* 下载按钮代码... */}
        </div>
      )}
    </div>
  );
}
```

#### 侧边栏广告（桌面端）

创建博客详情页布局 `app/[locale]/(with-footer)/blog/[slug]/layout.tsx`：

```tsx
import SidebarAd from '@/components/ads/SidebarAd';

export default function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mx-auto w-full max-w-screen-2xl px-4'>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-[1fr,300px]'>
        {/* 主内容区域 */}
        <div>{children}</div>

        {/* 侧边栏 - 仅在桌面端显示 */}
        <aside className='hidden lg:block'>
          <div className='space-y-6'>
            {/* 粘性广告 */}
            <SidebarAd adSlot='YOUR_SIDEBAR_AD_SLOT' />

            {/* 其他侧边栏内容，如相关文章等 */}
            <div className='rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm'>
              <h3 className='mb-4 text-lg font-semibold text-white'>Related Articles</h3>
              {/* 相关文章列表 */}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
```

### 2. 博客列表页（推荐 ⭐⭐⭐⭐）

#### 列表中的信息流广告

在 `app/[locale]/(with-footer)/blog/BlogList.tsx` 中：

```tsx
'use client';

import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import BaseImage from '@/components/image/BaseImage';
import InFeedAd from '@/components/ads/InFeedAd';
import { type BlogPost } from '@/lib/blog';

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const locale = useLocale();
  const t = useTranslations('Blog');

  return (
    <div className='w-full space-y-8 lg:space-y-12'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8'>
        {posts.map((post, index) => (
          <div key={post.id}>
            {/* 博客卡片 */}
            <Link
              href={`/${locale}/blog/${post.slug}`}
              target='_blank'
              rel='noreferrer'
              className='group block h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10'
            >
              {post.image && (
                <BaseImage
                  src={post.image}
                  alt={post.title[locale as keyof typeof post.title] || post.title.en}
                  title={post.title[locale as keyof typeof post.title] || post.title.en}
                  width={600}
                  height={400}
                  className='w-full object-cover transition-transform duration-300 group-hover:scale-105'
                />
              )}
              <div className='p-6'>
                <h2 className='mb-3 text-xl font-semibold text-white transition-colors group-hover:text-indigo-400 lg:text-2xl'>
                  {post.title[locale as keyof typeof post.title] || post.title.en}
                </h2>
                <p className='mb-4 text-sm text-white/70'>
                  {post.excerpt[locale as keyof typeof post.excerpt] || post.excerpt.en}
                </p>
                <div className='flex items-center gap-4 text-xs text-white/50'>
                  <div className='flex items-center gap-1'>
                    <Calendar className='size-3' />
                    <span>{new Date(post.date).toLocaleDateString(locale)}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <User className='size-3' />
                    <span>{post.author}</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* 每 4 篇文章后插入一个信息流广告 */}
            {(index + 1) % 4 === 0 && index !== posts.length - 1 && (
              <div className='mt-6'>
                <InFeedAd 
                  adSlot='YOUR_IN_FEED_AD_SLOT' 
                  adLayout='in-article'
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3. 首页底部广告（推荐 ⭐⭐⭐）

在 `app/[locale]/(with-footer)/(home)/page.tsx` 中：

```tsx
import HeroSection from '@/components/home/HeroSection';
import WebNavCardList from '@/components/home/WebNavCardList';
import ResponsiveAd from '@/components/ads/ResponsiveAd';
// 其他导入...

export default async function Home() {
  // 数据获取...

  return (
    <>
      {/* Hero 区域 */}
      <HeroSection />

      {/* AI 工具列表 */}
      <div className='mx-auto w-full max-w-pc px-4 py-12'>
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold text-white lg:text-4xl'>
            {t('title')}
          </h2>
          <p className='mt-4 text-white/70'>{t('subTitle')}</p>
        </div>

        <WebNavCardList {...webNavList} />

        <div className='mt-12 flex justify-center'>
          <Link
            href={`/${locale}/explore`}
            className='rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-indigo-500 hover:to-purple-500'
          >
            {t('getMore')}
          </Link>
        </div>
      </div>

      {/* Featured Articles */}
      <div className='mx-auto w-full max-w-pc px-4 py-12'>
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold text-white lg:text-4xl'>
            {t('featuredBlog')}
          </h2>
          <p className='mt-4 text-white/70'>{t('featuredBlogSub')}</p>
        </div>
        {/* 博客卡片... */}
      </div>

      {/* 底部广告 - 在 Featured Articles 和 Footer 之间 */}
      <div className='mx-auto w-full max-w-pc px-4'>
        <ResponsiveAd 
          adSlot='YOUR_HOME_BOTTOM_AD_SLOT' 
          className='mb-20 lg:mb-32'
        />
      </div>
    </>
  );
}
```

### 4. 懒加载广告（性能优化）

在 `app/[locale]/(with-footer)/explore/page.tsx` 中：

```tsx
import LazyAd from '@/components/ads/LazyAd';
import WebNavCardList from '@/components/home/WebNavCardList';
// 其他导入...

export default async function ExplorePage() {
  // 数据获取...

  return (
    <div className='mx-auto w-full max-w-pc px-4 py-12'>
      {/* 搜索和过滤 */}
      <SearchForm />
      
      {/* AI 工具列表 */}
      <WebNavCardList {...webNavList} />

      {/* 懒加载广告 - 用户滚动到此处才加载 */}
      <LazyAd 
        adSlot='YOUR_EXPLORE_AD_SLOT' 
        className='my-12'
        minHeight='280px'
      />

      {/* 分页 */}
      <BasePagination {...paginationProps} />
    </div>
  );
}
```

## 广告单元 ID 管理

### 1. 创建常量文件

创建 `lib/adsense-slots.ts`：

```tsx
/**
 * Google AdSense 广告单元 ID 配置
 * 
 * 在 Google AdSense 控制台中创建广告单元后，
 * 将对应的 ad-slot ID 填写在这里
 */

export const AD_SLOTS = {
  // 博客相关
  blog: {
    articleMiddle: 'YOUR_AD_SLOT_ID_1',      // 博客文章中间
    articleEnd: 'YOUR_AD_SLOT_ID_2',         // 博客文章结尾
    sidebar: 'YOUR_SIDEBAR_AD_SLOT',         // 博客侧边栏
    inFeed: 'YOUR_IN_FEED_AD_SLOT',         // 博客列表信息流
  },
  
  // 首页相关
  home: {
    bottom: 'YOUR_HOME_BOTTOM_AD_SLOT',      // 首页底部
  },
  
  // 探索页相关
  explore: {
    bottom: 'YOUR_EXPLORE_AD_SLOT',          // 探索页底部
  },
  
  // 通用
  common: {
    responsive: 'YOUR_COMMON_AD_SLOT',       // 通用响应式广告
  },
} as const;
```

### 2. 在组件中使用

```tsx
import ResponsiveAd from '@/components/ads/ResponsiveAd';
import { AD_SLOTS } from '@/lib/adsense-slots';

export default function BlogDetailPage() {
  return (
    <article>
      {/* 文章内容... */}
      
      <ResponsiveAd adSlot={AD_SLOTS.blog.articleMiddle} />
      
      {/* 更多内容... */}
    </article>
  );
}
```

## 环境控制

### 开发环境禁用广告

在 `.env.local` 中：

```bash
NEXT_PUBLIC_ADSENSE_ENABLED=false
```

这样在开发时不会加载广告，提高开发效率。

### 生产环境启用广告

在 Vercel 或 `.env.production` 中：

```bash
NEXT_PUBLIC_ADSENSE_ENABLED=true
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-1234567890123456
```

## 测试和验证

### 1. 本地测试

```bash
# 临时启用广告进行测试
NEXT_PUBLIC_ADSENSE_ENABLED=true npm run dev
```

### 2. 使用 Google AdSense 测试模式

在开发时，Google AdSense 会显示测试广告。部署到生产环境并通过审核后，才会显示真实广告。

### 3. 检查广告是否正确加载

打开浏览器开发者工具：
1. Console - 检查是否有 AdSense 错误
2. Network - 检查 AdSense 脚本是否加载
3. Elements - 检查广告元素是否正确渲染

## 最佳实践总结

1. **广告密度**: 每页不超过 3-4 个广告位
2. **用户体验优先**: 不要让广告干扰内容阅读
3. **性能优化**: 使用懒加载，避免影响首屏加载
4. **响应式设计**: 确保广告在所有设备上都美观
5. **A/B 测试**: 测试不同位置和格式，优化收入
6. **监控数据**: 定期检查 AdSense 报告，优化策略

## 常见问题

### Q1: 广告不显示怎么办？
- 检查环境变量是否正确配置
- 确认网站已通过 Google AdSense 审核
- 检查浏览器是否安装了广告拦截插件
- 查看浏览器控制台是否有错误信息

### Q2: 如何优化广告收入？
- 将广告放在用户停留时间长的页面（如博客文章）
- 测试不同的广告位置和格式
- 提高内容质量，增加用户停留时间
- 确保网站加载速度快

### Q3: 移动端广告太大？
- 使用响应式广告格式 (`adFormat="auto"`)
- 设置 `fullWidthResponsive={true}`
- 测试不同设备上的显示效果

### Q4: 如何避免误点击？
- 确保广告与内容有明确区分
- 添加"Advertisement"或"广告"标识
- 不要将广告放在容易误点的位置（如导航按钮附近）

