# Google AdSense 集成指南

本文档说明如何在 Tap4 AI WebUI 中优雅地集成 Google AdSense，确保广告不会影响用户体验。

## 设计原则

1. **非侵入式**: 广告应该融入页面设计，不破坏用户体验
2. **适度展示**: 控制广告数量，避免过度商业化
3. **响应式设计**: 广告在不同设备上都应该美观
4. **性能优先**: 使用懒加载，不影响页面加载速度
5. **内容为王**: 内容优先，广告作为补充

## 推荐的广告位置

### 1. 博客文章页 (推荐 ⭐⭐⭐⭐⭐)
- **位置**: 文章内容中间、文章结尾
- **原因**: 用户阅读完整内容，停留时间长，广告价值高
- **建议**: 每篇文章最多 2-3 个广告位

### 2. 博客列表页 (推荐 ⭐⭐⭐⭐)
- **位置**: 列表项之间（每 3-4 篇文章插入一个）
- **原因**: 自然融入列表，不突兀
- **建议**: 使用信息流广告样式

### 3. 侧边栏 (推荐 ⭐⭐⭐)
- **位置**: 博客详情页右侧边栏
- **原因**: 固定位置，不影响主内容阅读
- **建议**: 使用粘性定位（sticky），跟随滚动

### 4. 首页底部 (推荐 ⭐⭐)
- **位置**: Featured Articles 和 Footer 之间
- **原因**: 用户浏览到底部时展示
- **建议**: 使用横幅广告，与设计融合

### ❌ 不推荐的位置
- **首页顶部**: 影响第一印象
- **导航栏**: 干扰用户操作
- **弹窗广告**: 破坏用户体验
- **过多的侧边栏广告**: 显得杂乱

## 技术实现

### 1. 环境变量配置

在 `.env.local` 中添加：

```bash
# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_ENABLED=true
```

### 2. AdSense 脚本加载

在 `app/layout.tsx` 中添加 AdSense 脚本：

```tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html>
      <head>
        {adsenseEnabled && adsenseClientId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 3. AdSense 组件

创建 `components/AdSense.tsx`：

```tsx
'use client';

import { useEffect, useRef } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  adLayout?: string;
  fullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdSense({
  adSlot,
  adFormat = 'auto',
  adLayout,
  fullWidthResponsive = true,
  className = '',
  style = {},
}: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isAdPushed = useRef(false);

  const adsenseEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (!adsenseEnabled || !adsenseClientId || isAdPushed.current) {
      return;
    }

    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({});
        isAdPushed.current = true;
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [adsenseEnabled, adsenseClientId]);

  if (!adsenseEnabled || !adsenseClientId) {
    return null;
  }

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={adsenseClientId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}
```

### 4. 响应式广告组件

创建 `components/ads/ResponsiveAd.tsx`：

```tsx
'use client';

import AdSense from '@/components/AdSense';

interface ResponsiveAdProps {
  adSlot: string;
  className?: string;
}

export default function ResponsiveAd({ adSlot, className = '' }: ResponsiveAdProps) {
  return (
    <div
      className={`my-8 flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm ${className}`}
    >
      <div className="w-full max-w-4xl">
        <AdSense adSlot={adSlot} adFormat="auto" fullWidthResponsive />
      </div>
    </div>
  );
}
```

### 5. 信息流广告组件

创建 `components/ads/InFeedAd.tsx`：

```tsx
'use client';

import AdSense from '@/components/AdSense';

interface InFeedAdProps {
  adSlot: string;
  adLayout: string;
  className?: string;
}

export default function InFeedAd({ adSlot, adLayout, className = '' }: InFeedAdProps) {
  return (
    <div
      className={`my-6 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center justify-center">
        <AdSense adSlot={adSlot} adFormat="fluid" adLayout={adLayout} />
      </div>
    </div>
  );
}
```

### 6. 侧边栏广告组件

创建 `components/ads/SidebarAd.tsx`：

```tsx
'use client';

import AdSense from '@/components/AdSense';

interface SidebarAdProps {
  adSlot: string;
  className?: string;
}

export default function SidebarAd({ adSlot, className = '' }: SidebarAdProps) {
  return (
    <div
      className={`sticky top-24 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm ${className}`}
    >
      <div className="mb-2 text-center text-xs text-white/50">Advertisement</div>
      <AdSense adSlot={adSlot} adFormat="auto" />
    </div>
  );
}
```

## 使用示例

### 1. 博客文章页中间广告

在 `app/[locale]/(with-footer)/blog/[slug]/page.tsx` 中：

```tsx
import ResponsiveAd from '@/components/ads/ResponsiveAd';
import MarkdownProse from '@/components/MarkdownProse';

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  
  // 将文章内容分成两部分
  const contentParts = post.content.split('\n\n');
  const midPoint = Math.floor(contentParts.length / 2);
  const firstHalf = contentParts.slice(0, midPoint).join('\n\n');
  const secondHalf = contentParts.slice(midPoint).join('\n\n');

  return (
    <article>
      <h1>{post.title}</h1>
      
      {/* 文章前半部分 */}
      <MarkdownProse markdown={firstHalf} />
      
      {/* 中间广告 */}
      <ResponsiveAd adSlot="1234567890" />
      
      {/* 文章后半部分 */}
      <MarkdownProse markdown={secondHalf} />
      
      {/* 文章结尾广告 */}
      <ResponsiveAd adSlot="0987654321" className="mt-12" />
    </article>
  );
}
```

### 2. 博客列表页信息流广告

在 `app/[locale]/(with-footer)/blog/BlogList.tsx` 中：

```tsx
import InFeedAd from '@/components/ads/InFeedAd';

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <div key={post.id}>
          <BlogCard post={post} />
          
          {/* 每 3 篇文章后插入广告 */}
          {(index + 1) % 3 === 0 && index !== posts.length - 1 && (
            <InFeedAd 
              adSlot="5358381886" 
              adLayout="in-article"
            />
          )}
        </div>
      ))}
    </div>
  );
}
```

### 3. 博客详情页侧边栏广告

```tsx
import SidebarAd from '@/components/ads/SidebarAd';

export default function BlogDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,300px]">
      {/* 主内容 */}
      <div>{children}</div>
      
      {/* 侧边栏 */}
      <aside className="hidden lg:block">
        <SidebarAd adSlot="5544332211" />
      </aside>
    </div>
  );
}
```

### 4. 首页底部广告

在 `app/[locale]/(with-footer)/(home)/page.tsx` 中：

```tsx
import ResponsiveAd from '@/components/ads/ResponsiveAd';

export default function HomePage() {
  return (
    <>
      {/* 其他内容 */}
      <HeroSection />
      <WebNavCardList />
      <FeaturedBlog />
      
      {/* 底部广告 */}
      <ResponsiveAd 
        adSlot="9988776655" 
        className="mb-20 lg:mb-32"
      />
    </>
  );
}
```

## 样式优化

在 `app/[locale]/globals.css` 中添加：

```css
/* AdSense 容器样式 */
.adsense-container {
  transition: all 0.3s ease;
}

.adsense-container:hover {
  transform: translateY(-2px);
}

/* 广告加载动画 */
.adsbygoogle[data-ad-status="unfilled"] {
  display: none !important;
}

/* 响应式广告最小高度 */
.adsbygoogle {
  min-height: 50px;
}

@media (min-width: 768px) {
  .adsbygoogle {
    min-height: 90px;
  }
}

@media (min-width: 1024px) {
  .adsbygoogle {
    min-height: 250px;
  }
}
```

## 性能优化

### 1. 懒加载广告

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import AdSense from '@/components/AdSense';

export default function LazyAd({ adSlot }: { adSlot: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={adRef} className="min-h-[250px]">
      {isVisible && <AdSense adSlot={adSlot} />}
    </div>
  );
}
```

### 2. 广告屏蔽检测（可选）

```tsx
'use client';

import { useEffect, useState } from 'react';

export function useAdBlockDetector() {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const detectAdBlock = async () => {
      try {
        await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
          method: 'HEAD',
          mode: 'no-cors',
        });
        setIsBlocked(false);
      } catch {
        setIsBlocked(true);
      }
    };

    detectAdBlock();
  }, []);

  return isBlocked;
}
```

## 最佳实践

### 1. 广告密度控制
- **博客文章**: 每 1000 字最多 1 个广告
- **列表页**: 每 3-4 个列表项最多 1 个广告
- **首页**: 最多 1-2 个广告位

### 2. 广告样式
- 使用半透明背景 (`bg-white/5`)
- 添加边框 (`border border-white/10`)
- 使用圆角 (`rounded-xl`)
- 添加模糊效果 (`backdrop-blur-sm`)
- 保持与整体 UI 一致的设计

### 3. 用户体验
- 避免侵入式广告
- 确保广告不影响内容阅读
- 使用懒加载减少初始加载时间
- 移动端优化，避免广告过大
- 提供清晰的"广告"标识

### 4. A/B 测试
- 测试不同的广告位置
- 测试不同的广告格式
- 监控点击率和收入
- 根据数据优化广告策略

## 注意事项

1. **遵守 AdSense 政策**: 不要在同一页面放置过多广告
2. **保持内容质量**: 内容为王，广告为辅
3. **移动端优化**: 确保广告在移动设备上不会过大或遮挡内容
4. **加载性能**: 使用 `strategy="afterInteractive"` 确保广告不影响首屏加载
5. **隐私合规**: 添加隐私政策和 cookie 同意机制

## 收入优化建议

1. **高价值页面优先**: 博客文章页通常有更高的 RPM
2. **用户停留时间**: 内容质量好，停留时间长，广告价值高
3. **适当的广告数量**: 过多会影响用户体验，过少会损失收入
4. **测试不同格式**: 自适应、信息流、横幅等不同格式测试
5. **优化页面速度**: 快速的页面有更好的用户体验和广告表现

## 监控与优化

定期检查：
- 页面加载速度
- 广告填充率
- 点击率 (CTR)
- 每千次展示收入 (RPM)
- 用户反馈

根据数据调整广告位置和数量，找到收入和用户体验的最佳平衡点。

