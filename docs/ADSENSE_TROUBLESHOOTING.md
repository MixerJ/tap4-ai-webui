# Google AdSense 广告无法显示排查指南

## 🔍 快速诊断工具

我已经为您添加了诊断工具。运行 `npm run dev` 后：

1. 打开浏览器开发者工具（F12）
2. 查看控制台（Console）
3. 会看到 **"🔍 AdSense 诊断结果"** 的详细输出
4. 开发环境下，右下角会显示诊断面板

## ✅ 排查清单

### 1. 环境变量配置

**检查 `.env.local` 文件是否正确配置：**

```bash
# .env.local
NEXT_PUBLIC_ADSENSE_ENABLED=true
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
```

**验证方法：**

打开浏览器控制台，运行：
```javascript
console.log('Enabled:', process.env.NEXT_PUBLIC_ADSENSE_ENABLED);
console.log('Client ID:', process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID);
```

**常见问题：**
- ❌ 环境变量名错误（必须以 `NEXT_PUBLIC_` 开头）
- ❌ 客户端 ID 格式错误（必须是 `ca-pub-` 开头）
- ❌ 修改 `.env.local` 后未重启开发服务器
- ❌ 有多余的空格或引号

**解决方案：**
```bash
# 重启开发服务器
npm run dev
```

---

### 2. CMP 用户同意

**广告需要用户同意广告 Cookie！**

**检查方法：**

打开浏览器控制台，运行：
```javascript
const consent = JSON.parse(localStorage.getItem('user_consent_preferences'));
console.log('广告Cookie同意:', consent?.preferences?.advertising);
```

**如果返回 `false` 或 `undefined`：**

1. 刷新页面，会看到同意横幅
2. 点击"接受全部"或"自定义"并启用广告Cookie
3. 刷新页面查看广告

**临时测试（跳过同意检查）：**

在 `components/ads/AdSense.tsx` 中临时注释掉检查：

```typescript
// 临时测试用 - 跳过同意检查
if (!adsenseEnabled || !adsenseClientId) {
  return null;
}

// 注释掉下面这段进行测试
// const consentData = localStorage.getItem('user_consent_preferences');
// if (!consentData || !JSON.parse(consentData).preferences.advertising) {
//   return null;
// }
```

---

### 3. AdSense 脚本加载

**检查脚本是否正确加载：**

打开浏览器控制台，运行：
```javascript
console.log('AdSense 脚本加载:', !!window.adsbygoogle);
console.log('adsbygoogle 队列:', window.adsbygoogle?.length);
```

**应该看到：**
```
AdSense 脚本加载: true
adsbygoogle 队列: 1 或更多
```

**如果返回 `false` 或 `undefined`：**

1. 检查 `app/[locale]/layout.tsx` 中的 `GoogleAdScript` 组件
2. 查看 Network 面板，搜索 "adsbygoogle.js"
3. 确认没有被广告拦截器屏蔽

**手动测试脚本加载：**

在 `<head>` 中添加（临时测试）：

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
     crossorigin="anonymous"></script>
```

---

### 4. 广告元素检查

**检查广告位是否正确渲染：**

打开浏览器控制台，运行：
```javascript
const ads = document.querySelectorAll('ins.adsbygoogle');
console.log('找到广告位:', ads.length);
ads.forEach((ad, i) => {
  console.log(`广告 #${i + 1}:`, {
    client: ad.getAttribute('data-ad-client'),
    slot: ad.getAttribute('data-ad-slot'),
    status: ad.getAttribute('data-ad-status'),
  });
});
```

**应该看到：**
```
找到广告位: 1 或更多
广告 #1: {
  client: "ca-pub-xxxxxxxxxxxxxxxx",
  slot: "1234567890",
  status: "filled" 或 "unfilled"
}
```

**如果 `status` 是 `unfilled`：**
- Google 没有找到合适的广告
- 广告单元 ID 不正确
- 网站未通过审核
- 地理位置限制

---

### 5. 广告单元 ID

**确认广告单元 ID 正确：**

1. 登录 [Google AdSense](https://www.google.com/adsense/)
2. 进入"广告" → "按广告单元"
3. 找到对应的广告单元
4. 复制 `data-ad-slot` 值（10位数字）

**常见错误：**
- ❌ 复制了客户端 ID 而不是广告单元 ID
- ❌ 广告单元 ID 包含空格或特殊字符
- ❌ 使用了已删除的广告单元

**正确格式：**
```typescript
adSlot="1234567890"  // 10位数字
```

---

### 6. Google AdSense 账号状态

**检查您的 AdSense 账号状态：**

1. 登录 AdSense 控制台
2. 查看账号状态

**可能的状态：**

| 状态 | 说明 | 解决方案 |
|------|------|----------|
| ✅ **已批准** | 可以展示广告 | 正常使用 |
| ⏳ **审核中** | 等待 Google 审核 | 等待 1-7 天 |
| ⚠️ **需要关注** | 网站不符合政策 | 查看具体原因并修复 |
| ❌ **已暂停** | 违反政策 | 联系 Google 或申诉 |

**审核期间：**
- 可能看到空白广告位
- 可能看到测试广告
- 需要等待审核通过

---

### 7. 广告拦截器

**检查是否安装了广告拦截器：**

常见的广告拦截器：
- AdBlock
- AdBlock Plus
- uBlock Origin
- Brave 浏览器内置

**测试方法：**

1. 打开无痕/隐私浏览模式
2. 或临时禁用广告拦截器
3. 刷新页面查看广告

**如果广告拦截器被检测到，诊断工具会显示警告。**

---

### 8. 网络请求检查

**查看 Network 面板：**

1. 打开开发者工具 → Network
2. 刷新页面
3. 搜索 "adsbygoogle" 或 "googlesyndication"

**应该看到：**
- ✅ `adsbygoogle.js` 状态 200
- ✅ `show_ads_impl.js` 状态 200
- ✅ 广告请求（可能以 `ads?` 开头）

**如果请求失败：**
- 检查网络连接
- 检查防火墙设置
- 检查 CORS 设置

---

### 9. 常见错误信息

#### "adsbygoogle.push() error: No slot size for availableWidth=0"

**原因：** 广告容器宽度为 0

**解决方案：**
```css
/* 确保广告容器有宽度 */
.adsense-container {
  width: 100%;
  min-height: 50px;
}
```

#### "adsbygoogle.push() error: All ins elements in the DOM with class=adsbygoogle already have ads in them."

**原因：** 重复调用 `adsbygoogle.push()`

**解决方案：** 使用 `isAdPushed.current` 标志避免重复（已实现）

#### "This page does not show Google ads because ad serving has not yet been enabled for your account."

**原因：** AdSense 账号未激活或审核未通过

**解决方案：** 等待 Google 审核或检查账号状态

---

### 10. 测试广告代码

**使用 Google 测试广告代码：**

临时替换为测试客户端 ID：

```typescript
// 仅用于测试！生产环境必须用真实 ID
const TEST_CLIENT_ID = 'ca-pub-0000000000000000';
```

**注意：** 这会显示测试广告，确认代码正确后恢复真实 ID。

---

## 🚀 快速修复步骤

### 步骤 1：验证环境变量

```bash
# 检查 .env.local
cat .env.local | grep ADSENSE

# 应该看到：
# NEXT_PUBLIC_ADSENSE_ENABLED=true
# NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
```

### 步骤 2：重启开发服务器

```bash
# 停止当前服务器 (Ctrl+C)
# 重新启动
npm run dev
```

### 步骤 3：同意广告 Cookie

1. 打开浏览器
2. 清除 localStorage: `localStorage.clear()`
3. 刷新页面
4. 点击"接受全部"

### 步骤 4：检查控制台

1. 打开开发者工具（F12）
2. 查看 Console
3. 查找 "🔍 AdSense 诊断结果"
4. 按提示修复问题

### 步骤 5：等待广告加载

- 首次加载可能需要 3-5 秒
- 审核期间可能不显示广告
- 某些地区可能没有广告

---

## 📞 仍然无法解决？

### 提供以下信息：

1. **控制台输出**：
   - 完整的 "🔍 AdSense 诊断结果"
   - 任何错误信息

2. **环境信息**：
   ```javascript
   console.log({
     enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED,
     clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.substring(0, 15) + '...',
     scriptLoaded: !!window.adsbygoogle,
     adElements: document.querySelectorAll('ins.adsbygoogle').length,
   });
   ```

3. **AdSense 账号状态**：
   - 是否已审核通过
   - 是否有警告或错误

4. **广告代码示例**：
   - 您在哪个页面添加的广告
   - 使用的是哪个组件

---

## 💡 额外提示

### 开发环境 vs 生产环境

- **开发环境**：localhost 可能不显示广告
- **生产环境**：部署后通常正常显示
- **解决方案**：部署到 Vercel 测试

### 审核期间

- Google 需要 1-7 天审核新网站
- 审核期间可能不显示广告
- 确保网站有足够的原创内容

### 地理位置

- 某些地区广告库存较少
- 可能看到空白广告位
- 属于正常现象

---

最后更新：2025-11-03

