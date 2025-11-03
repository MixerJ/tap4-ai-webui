# CMP（意见征求管理平台）快速入门

## ✅ 已完成

### 1. CMP 组件
- ✅ 创建了 `components/consent/ConsentManager.tsx`
- ✅ 美观的UI设计，符合项目风格
- ✅ 完整的功能：接受全部/拒绝全部/自定义
- ✅ Cookie分类：必需、分析、广告
- ✅ Google Consent Mode v2 集成
- ✅ localStorage 持久化

### 2. 集成到项目
- ✅ 已添加到 `app/[locale]/layout.tsx`
- ✅ 自动延迟1秒显示，不影响首屏

### 3. 多语言支持
- ✅ 英语 (`messages/en.json`)
- ✅ 中文 (`messages/cn.json`)
- ⏳ 其他7种语言（见下方）

### 4. 文档
- ✅ 完整的集成指南 (`docs/CMP_INTEGRATION.md`)
- ✅ 快速入门指南 (本文档)

## 🚀 下一步操作

### 1. 添加其他语言翻译

运行脚本自动添加翻译：

```bash
cd /Users/mike/workspaces/tap4-ai-webui
node scripts/add-consent-translations.js
```

这将为以下语言添加翻译：
- 繁体中文 (tw)
- 德语 (de)
- 西班牙语 (es)
- 法语 (fr)
- 日语 (jp)
- 葡萄牙语 (pt)
- 俄语 (ru)

### 2. 测试 CMP

```bash
npm run dev
```

访问 `http://localhost:3000`，应该看到同意横幅。

**测试清单**：
- [ ] 首次访问是否显示横幅（延迟1秒）
- [ ] "接受全部"按钮是否工作
- [ ] "拒绝全部"按钮是否工作
- [ ] "自定义"按钮是否显示详细设置
- [ ] 切换开关是否工作
- [ ] "保存设置"是否保存偏好
- [ ] 刷新页面后是否记住设置
- [ ] 多语言切换是否正确显示

**清除测试**：

打开浏览器控制台，运行：

```javascript
localStorage.removeItem('user_consent_preferences');
location.reload();
```

### 3. 创建隐私政策页面

创建 `app/[locale]/(with-footer)/privacy-policy/page.tsx`：

```tsx
import { useTranslations } from 'next-intl';

export default function PrivacyPolicyPage() {
  const t = useTranslations('PrivacyPolicy');

  return (
    <div className='mx-auto max-w-4xl px-4 py-12'>
      <h1 className='mb-8 text-4xl font-bold text-white'>
        {t('title', { defaultValue: 'Privacy Policy' })}
      </h1>

      <div className='space-y-8 text-white/80'>
        <section>
          <h2 className='mb-4 text-2xl font-semibold text-white'>
            {t('cookiePolicy', { defaultValue: 'Cookie Policy' })}
          </h2>
          <p className='mb-4'>
            We use cookies and similar technologies to provide, protect and improve our services.
          </p>

          <h3 className='mb-2 text-xl font-semibold text-white'>
            Necessary Cookies
          </h3>
          <p className='mb-4'>
            These cookies are essential for the basic functions of the website.
          </p>

          <h3 className='mb-2 text-xl font-semibold text-white'>
            Analytics Cookies
          </h3>
          <p className='mb-4'>
            We use analytics cookies to understand how our website is used.
          </p>

          <h3 className='mb-2 text-xl font-semibold text-white'>
            Advertising Cookies
          </h3>
          <p className='mb-4'>
            We use advertising cookies to show you relevant personalized ads.
          </p>
        </section>

        {/* 添加更多隐私政策内容 */}
      </div>
    </div>
  );
}
```

### 4. 与 Google AdSense 完全集成

确保环境变量已配置：

```bash
# .env.local
NEXT_PUBLIC_ADSENSE_ENABLED=true
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
```

AdSense 组件会自动检测用户的同意状态：

```tsx
import ResponsiveAd from '@/components/ads/ResponsiveAd';

<ResponsiveAd adSlot="YOUR_AD_SLOT" />
```

## 📋 当前状态

### 已集成的功能
- [x] CMP 用户界面
- [x] 同意状态管理
- [x] localStorage 持久化
- [x] Google Consent Mode v2
- [x] 英语和中文翻译
- [x] 响应式设计
- [x] 动画效果

### 待完成的功能
- [ ] 其他7种语言翻译
- [ ] 隐私政策页面
- [ ] 重新选择同意的入口（页脚链接）
- [ ] 同意版本控制（定期重新询问）
- [ ] 更详细的Cookie说明

## 🎯 合规要求

### Google AdSense 要求
- ✅ 实现CMP
- ✅ 使用 Google Consent Mode v2
- ⏳ 根据同意状态控制广告个性化
- ⏳ 提供隐私政策页面

### GDPR 要求
- ✅ 明确的同意机制
- ✅ Cookie分类说明
- ✅ 用户可以拒绝
- ✅ 用户可以自定义选择
- ⏳ 提供完整的隐私政策

## 🔗 相关资源

- **主文档**: `docs/CMP_INTEGRATION.md` - 完整的CMP集成指南
- **AdSense文档**: `docs/ADSENSE_INTEGRATION.md` - Google AdSense集成指南
- **环境变量**: `docs/ENVIRONMENT_VARIABLES.md` - 环境变量配置

## 💡 提示

### 开发环境

在开发时，可以临时禁用CMP横幅以便调试：

```tsx
// components/consent/ConsentManager.tsx
// 临时设置为false以禁用横幅
const [showBanner, setShowBanner] = useState(false);
```

### 生产环境

确保在生产环境中启用CMP，以符合GDPR和AdSense政策。

### 性能

CMP已优化性能：
- 延迟1秒加载
- 使用localStorage，避免网络请求
- 最小化代码体积
- 不影响首屏渲染

## ❓ 常见问题

**Q: 为什么需要CMP？**
A: 根据GDPR和Google AdSense政策，面向欧洲经济区(EEA)、英国和瑞士的用户时必须获取同意。

**Q: 不实现CMP会怎样？**
A: 可能面临GDPR罚款（最高2000万欧元或全球营业额的4%），Google AdSense账号也可能被暂停。

**Q: 用户拒绝后还能展示广告吗？**
A: 可以，但只能展示非个性化广告（基于上下文的广告），收入可能较低。

**Q: 如何重新显示同意横幅？**
A: 用户可以在浏览器控制台运行 `localStorage.removeItem('user_consent_preferences')`，或在隐私政策页面提供"管理Cookie偏好"链接。

## 🎉 完成！

完成上述步骤后，您的网站将：
- ✅ 符合 GDPR 要求
- ✅ 符合 Google AdSense 政策
- ✅ 提供良好的用户体验
- ✅ 保护用户隐私

---

最后更新：2025-11-02

