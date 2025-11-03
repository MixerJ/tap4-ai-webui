# 意见征求管理平台 (CMP) 集成指南

## 什么是 CMP？

CMP (Consent Management Platform) 意见征求管理平台是一个用于管理用户同意和隐私偏好的系统。根据 GDPR（欧盟通用数据保护条例）和其他隐私法规，网站必须在使用 Cookie 和其他追踪技术之前获得用户的明确同意。

## 为什么需要 CMP？

### 法律要求

1. **GDPR**（欧盟）- 2018年5月25日生效
   - 适用于欧洲经济区 (EEA)、英国和瑞士的用户
   - 要求网站在使用非必需Cookie前获得用户同意

2. **Google AdSense 政策**
   - 参考：[Google AdSense - 欧盟地区用户意见征求政策](https://support.google.com/adsense/answer/13554020?hl=zh-Hans)
   - 要求使用经Google认证且与IAB透明度和用户意见征求框架(TCF)集成的CMP
   - 违规可能导致账号被暂停或终止

3. **其他法规**
   - CCPA (加州消费者隐私法案)
   - LGPD (巴西通用数据保护法)
   - 等等...

### 商业价值

- **提高用户信任**：透明的隐私政策增加用户信任
- **优化广告收入**：合规的同意可以展示个性化广告，提高收入
- **避免法律风险**：遵守法规避免罚款和法律诉讼

## 项目中的 CMP 实现

本项目实现了一个自定义的CMP解决方案，具有以下特点：

### 功能特性

✅ **完整的用户同意管理**
- 接受全部/拒绝全部/自定义选项
- Cookie分类（必需、分析、广告）
- 同意状态持久化

✅ **美观的UI设计**
- 符合项目整体设计风格
- 响应式设计，适配所有设备
- 动画效果，提升用户体验

✅ **多语言支持**
- 支持9种语言（英语、中文、繁体中文、德语、西班牙语、法语、日语、葡萄牙语、俄语）
- 使用 next-intl 进行国际化

✅ **Google AdSense 集成**
- 通过 Google Consent Mode v2 与 AdSense 集成
- 根据用户同意状态控制广告展示

✅ **性能优化**
- 延迟1秒加载，避免影响首屏体验
- 使用 localStorage 持久化同意状态

## 技术实现

### 1. CMP 组件

文件：`components/consent/ConsentManager.tsx`

```typescript
// 同意偏好接口
interface ConsentPreferences {
  analytics: boolean;      // 分析Cookie
  advertising: boolean;    // 广告Cookie
  functional: boolean;     // 功能性Cookie（必需，不可禁用）
}
```

**核心功能**：
- `handleAcceptAll()` - 接受所有Cookie
- `handleRejectAll()` - 拒绝非必需Cookie
- `handleSavePreferences()` - 保存自定义偏好
- `applyConsent()` - 应用用户同意状态

### 2. Google Consent Mode v2 集成

```typescript
// 通知 Google AdSense 用户的同意状态
(window as any).gtag('consent', 'update', {
  analytics_storage: prefs.analytics ? 'granted' : 'denied',
  ad_storage: prefs.advertising ? 'granted' : 'denied',
  ad_user_data: prefs.advertising ? 'granted' : 'denied',
  ad_personalization: prefs.advertising ? 'granted' : 'denied',
  functionality_storage: prefs.functional ? 'granted' : 'denied',
});
```

### 3. 数据持久化

```typescript
// 存储结构
{
  version: '1.0',              // 同意版本
  timestamp: '2025-11-02...',  // 时间戳
  preferences: {               // 用户偏好
    analytics: true,
    advertising: false,
    functional: true
  }
}
```

存储位置：`localStorage` - `user_consent_preferences`

## 使用指南

### 1. 已集成到项目

CMP 已自动集成到 `app/[locale]/layout.tsx`：

```tsx
import ConsentManager from '@/components/consent/ConsentManager';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <NextIntlClientProvider>
          {children}
          <ConsentManager />  {/* CMP 组件 */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### 2. 多语言支持

已添加到 `messages/en.json` 和 `messages/cn.json`：

```json
{
  "Consent": {
    "title": "我们重视您的隐私",
    "description": "...",
    "acceptAll": "接受全部",
    "rejectAll": "拒绝全部",
    "customize": "自定义",
    // ...更多翻译
  }
}
```

**需要操作**：为其他语言添加翻译（见下方）

### 3. 与 AdSense 配合使用

当用户同意广告Cookie时，广告才会展示个性化内容：

```tsx
// AdSense组件会自动检测用户同意状态
import ResponsiveAd from '@/components/ads/ResponsiveAd';

<ResponsiveAd adSlot="YOUR_AD_SLOT" />
```

## Cookie 分类说明

### 必需的Cookie（Functional）

**用途**：网站基本功能所必需

**示例**：
- 用户会话管理
- 语言偏好
- 登录状态

**特点**：
- 不可禁用
- 不需要用户同意
- 始终启用

### 分析Cookie（Analytics）

**用途**：帮助我们了解网站使用情况

**示例**：
- Google Analytics
- Vercel Analytics
- Microsoft Clarity

**数据收集**：
- 页面浏览量
- 用户停留时间
- 流量来源
- 设备信息

### 广告Cookie（Advertising）

**用途**：展示个性化广告

**示例**：
- Google AdSense
- 第三方广告网络

**数据收集**：
- 用户兴趣
- 浏览历史
- 广告点击
- 转化数据

## 用户体验流程

### 首次访问

1. 用户访问网站
2. 延迟1秒后显示同意横幅
3. 用户选择：
   - **接受全部** → 启用所有Cookie，关闭横幅
   - **拒绝全部** → 仅启用必需Cookie，关闭横幅
   - **自定义** → 显示详细设置

### 自定义设置

1. 点击"自定义"按钮
2. 查看详细的Cookie分类说明
3. 使用开关切换分析和广告Cookie
4. 点击"保存设置"

### 后续访问

- 不再显示同意横幅（已保存偏好）
- 用户可通过"隐私政策"页面修改设置

## 完成其他语言的翻译

需要为以下语言添加 `Consent` 部分的翻译：

### 待添加语言

- [ ] `messages/tw.json` - 繁体中文
- [ ] `messages/de.json` - 德语
- [ ] `messages/es.json` - 西班牙语
- [ ] `messages/fr.json` - 法语
- [ ] `messages/jp.json` - 日语
- [ ] `messages/pt.json` - 葡萄牙语
- [ ] `messages/ru.json` - 俄语

### 翻译模板

在每个语言文件的 `"Blog"` 之前添加以下内容（需要翻译）：

```json
  "Consent": {
    "title": "We Value Your Privacy",
    "description": "We and our partners use cookies and similar technologies to provide, protect and improve our services, and to personalize content and ads. Click 'Accept All' to consent to the use of these technologies.",
    "learnMore": "Learn More",
    "acceptAll": "Accept All",
    "rejectAll": "Reject All",
    "customize": "Customize",
    "privacySettings": "Privacy Settings",
    "functional": {
      "title": "Necessary Cookies",
      "description": "These cookies are essential for the basic functions of the website and cannot be disabled."
    },
    "analytics": {
      "title": "Analytics Cookies",
      "description": "Help us understand how the website is used to improve user experience."
    },
    "advertising": {
      "title": "Advertising Cookies",
      "description": "Used to show you more relevant personalized advertising content."
    },
    "alwaysActive": "Always Active",
    "savePreferences": "Save Preferences",
    "back": "Back",
    "policyText": "For more information, please see our",
    "privacyPolicy": "Privacy Policy"
  },
```

## 测试 CMP

### 1. 本地测试

```bash
npm run dev
```

访问 `http://localhost:3000`，应该看到同意横幅。

### 2. 清除存储测试

```javascript
// 浏览器控制台
localStorage.removeItem('user_consent_preferences');
location.reload();
```

### 3. 测试不同选项

- **接受全部**：应该启用所有Cookie和广告
- **拒绝全部**：应该仅启用必需Cookie，广告不展示个性化内容
- **自定义**：应该根据用户选择启用相应Cookie

### 4. 多语言测试

切换不同语言，确认翻译正确显示。

## 隐私政策页面

### 需要创建

创建 `app/[locale]/(with-footer)/privacy-policy/page.tsx`：

```tsx
export default function PrivacyPolicyPage() {
  return (
    <div className='mx-auto max-w-4xl px-4 py-12'>
      <h1>Privacy Policy</h1>
      
      {/* 隐私政策内容 */}
      
      <h2>Cookie Policy</h2>
      <p>We use the following types of cookies:</p>
      
      <h3>Necessary Cookies</h3>
      <p>These cookies are essential...</p>
      
      <h3>Analytics Cookies</h3>
      <p>We use analytics cookies to...</p>
      
      <h3>Advertising Cookies</h3>
      <p>We use advertising cookies to...</p>
      
      {/* 更多内容... */}
    </div>
  );
}
```

## 最佳实践

### 1. 透明度

- 清楚说明Cookie的用途
- 提供详细的隐私政策
- 让用户容易理解和控制

### 2. 用户体验

- 不要过早显示（延迟1秒）
- 提供简单的"接受全部"选项
- 允许用户自定义选择

### 3. 性能

- 延迟加载，不影响首屏
- 使用 localStorage，避免每次请求服务器
- 最小化代码体积

### 4. 合规性

- 遵守GDPR要求
- 与Google AdSense政策一致
- 定期review和更新

## 常见问题

### Q1: 为什么需要延迟显示同意横幅？

**A**: 延迟1秒显示有以下好处：
- 避免影响首屏加载性能
- 给用户时间看到页面内容
- 更好的用户体验

### Q2: 用户拒绝广告Cookie后还能展示广告吗？

**A**: 可以，但只能展示非个性化广告（基于上下文的广告）。个性化广告需要用户同意。

### Q3: 同意状态保存多久？

**A**: 当前实现中永久保存（直到用户清除浏览器数据或修改设置）。建议每12个月重新询问用户。

### Q4: 如何符合 Google AdSense 的要求？

**A**: 
1. 实现CMP（已完成）
2. 使用 Google Consent Mode v2（已集成）
3. 根据用户同意状态控制广告（需要实现）
4. 定期审查和更新

### Q5: 功能性Cookie为什么不能禁用？

**A**: 功能性Cookie是网站基本功能所必需的（如语言偏好、会话管理），根据GDPR，这类Cookie不需要用户同意。

## 下一步

1. ✅ CMP 组件已创建并集成
2. ✅ 添加了英文和中文翻译
3. ⏳ 为其他7种语言添加翻译
4. ⏳ 创建隐私政策页面
5. ⏳ 与 AdSense 完全集成
6. ⏳ 添加重新选择同意的功能
7. ⏳ 实现同意版本控制

## 相关资源

- [Google AdSense - 欧盟地区用户意见征求政策](https://support.google.com/adsense/answer/13554020?hl=zh-Hans)
- [Google Consent Mode v2](https://support.google.com/analytics/answer/9976101)
- [GDPR 官方网站](https://gdpr.eu/)
- [IAB Europe 透明度和用户意见征求框架](https://iabeurope.eu/tcf-2-0/)

---

最后更新：2025-11-02

