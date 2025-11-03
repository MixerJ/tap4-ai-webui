# Tap4 AI WebUI 文档中心

欢迎来到 Tap4 AI WebUI 的文档中心！这里包含了项目的各种文档和指南。

## 📚 文档列表

### 意见征求管理平台 (CMP) / GDPR 合规

1. **[CMP_QUICK_START.md](./CMP_QUICK_START.md)** - CMP 快速入门 ⭐ 推荐先看
   - 已完成的功能
   - 下一步操作指南
   - 测试清单
   - 常见问题

2. **[CMP_INTEGRATION.md](./CMP_INTEGRATION.md)** - CMP 完整集成指南
   - 什么是CMP及为什么需要
   - 法律要求（GDPR、AdSense政策）
   - 技术实现详解
   - Cookie分类说明
   - 用户体验流程
   - 测试和验证

### Google AdSense 集成

1. **[ADSENSE_INTEGRATION.md](./ADSENSE_INTEGRATION.md)** - Google AdSense 集成完整指南
   - 设计原则和推荐广告位置
   - 技术实现和组件说明
   - 性能优化和最佳实践
   - 收入优化建议

2. **[ADSENSE_USAGE_EXAMPLES.md](./ADSENSE_USAGE_EXAMPLES.md)** - 实际使用示例
   - 博客文章页广告集成示例
   - 博客列表页信息流广告示例
   - 首页底部广告示例
   - 懒加载广告示例
   - 常见问题解答

3. **[ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)** - 环境变量配置说明
   - 必需的环境变量
   - 可选的环境变量（AdSense、Analytics 等）
   - Vercel 部署配置
   - 安全建议

## 🚀 快速开始

### 添加 Google AdSense

1. **配置环境变量**

   在 `.env.local` 文件中添加：
   ```bash
   NEXT_PUBLIC_ADSENSE_ENABLED=true
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
   ```

2. **配置广告单元 ID**

   在 `lib/adsense-slots.ts` 中填写您的广告单元 ID。

3. **在页面中使用**

   ```tsx
   import ResponsiveAd from '@/components/ads/ResponsiveAd';
   import { AD_SLOTS } from '@/lib/adsense-slots';

   export default function YourPage() {
     return (
       <div>
         {/* 您的内容 */}
         <ResponsiveAd adSlot={AD_SLOTS.blog.articleMiddle} />
       </div>
     );
   }
   ```

## 📦 可用的广告组件

| 组件 | 路径 | 用途 | 推荐位置 |
|------|------|------|----------|
| `AdSense` | `components/ads/AdSense.tsx` | 基础 AdSense 组件 | - |
| `ResponsiveAd` | `components/ads/ResponsiveAd.tsx` | 响应式广告 | 文章中间、结尾、页面底部 |
| `InFeedAd` | `components/ads/InFeedAd.tsx` | 信息流广告 | 博客列表、卡片列表之间 |
| `SidebarAd` | `components/ads/SidebarAd.tsx` | 侧边栏广告 | 博客详情页侧边栏 |
| `LazyAd` | `components/ads/LazyAd.tsx` | 懒加载广告 | 页面底部、折叠区域 |

## 🎨 设计原则

在集成 Google AdSense 时，我们遵循以下原则：

1. **非侵入式** - 广告融入页面设计，不破坏用户体验
2. **适度展示** - 控制广告数量，避免过度商业化
3. **响应式设计** - 广告在所有设备上都美观
4. **性能优先** - 使用懒加载，不影响页面加载速度
5. **内容为王** - 内容优先，广告作为补充

## 📊 推荐的广告位置

### ⭐⭐⭐⭐⭐ 最推荐
- **博客文章详情页**：文章中间、文章结尾
- **理由**：用户停留时间长，广告价值高

### ⭐⭐⭐⭐ 很推荐
- **博客列表页**：列表项之间（信息流广告）
- **理由**：自然融入列表，不突兀

### ⭐⭐⭐ 推荐
- **侧边栏**：博客详情页右侧（桌面端）
- **理由**：固定位置，不影响主内容

### ⭐⭐ 可选
- **首页底部**：Featured Articles 和 Footer 之间
- **理由**：用户浏览到底部时展示

### ❌ 不推荐
- **首页顶部** - 影响第一印象
- **导航栏** - 干扰用户操作
- **弹窗广告** - 破坏用户体验

## 🔧 技术栈

- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **next-intl** - 国际化
- **Google AdSense** - 广告平台

## 📝 最佳实践

### 广告密度控制

- **博客文章**：每 1000 字最多 1 个广告
- **列表页**：每 3-4 个列表项最多 1 个广告
- **首页**：最多 1-2 个广告位

### 性能优化

```tsx
// 使用懒加载广告
import LazyAd from '@/components/ads/LazyAd';

<LazyAd adSlot="YOUR_AD_SLOT" minHeight="250px" />
```

### 样式一致性

所有广告组件都遵循项目的设计风格：
- 半透明背景 (`bg-white/5`)
- 边框 (`border border-white/10`)
- 圆角 (`rounded-xl`)
- 模糊效果 (`backdrop-blur-sm`)

## 📖 相关资源

- [Google AdSense 官方文档](https://support.google.com/adsense)
- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [next-intl 文档](https://next-intl-docs.vercel.app/)

## ⚠️ 注意事项

1. **遵守 AdSense 政策**：不要在同一页面放置过多广告
2. **保持内容质量**：内容为王，广告为辅
3. **移动端优化**：确保广告在移动设备上不会过大
4. **加载性能**：使用 `strategy="afterInteractive"` 确保广告不影响首屏加载
5. **隐私合规**：添加隐私政策和 cookie 同意机制

## 🤝 贡献

如果您发现文档有误或需要补充，欢迎提交 Pull Request！

## 📧 联系我们

如有问题，请通过以下方式联系：
- GitHub Issues
- Email: your-email@example.com

---

最后更新：2025-11-02
