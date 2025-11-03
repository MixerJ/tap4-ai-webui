# 环境变量配置说明

## 必需的环境变量

### Supabase 配置
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 网站配置
```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 可选的环境变量

### Google AdSense 配置

```bash
# 启用/禁用 AdSense
# 设置为 "true" 启用，"false" 或不设置则禁用
NEXT_PUBLIC_ADSENSE_ENABLED=false

# Google AdSense 客户端 ID
# 从 Google AdSense 控制台获取，格式：ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
```

**如何获取 AdSense 客户端 ID：**
1. 登录 [Google AdSense](https://www.google.com/adsense/)
2. 进入"账号" → "账号信息"
3. 复制"发布商 ID"（格式：ca-pub-xxxxxxxxxxxxxxxx）

### Google Analytics 配置

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 配置文件示例

创建 `.env.local` 文件（开发环境）：

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# AdSense (开发环境建议禁用)
NEXT_PUBLIC_ADSENSE_ENABLED=false
NEXT_PUBLIC_ADSENSE_CLIENT_ID=

# Analytics (开发环境建议禁用)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

创建 `.env.production` 文件（生产环境）：

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Site
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# AdSense (生产环境启用)
NEXT_PUBLIC_ADSENSE_ENABLED=true
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-1234567890123456

# Analytics (生产环境启用)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 注意事项

1. **敏感信息**: 永远不要将 `.env.local` 或 `.env.production` 提交到 Git
2. **环境区分**: 开发环境和生产环境使用不同的配置
3. **Vercel 部署**: 在 Vercel 项目设置中配置环境变量
4. **重启服务**: 修改环境变量后需要重启开发服务器

## Vercel 部署配置

在 Vercel 项目设置中：

1. 进入项目 → Settings → Environment Variables
2. 添加以下变量：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_ADSENSE_ENABLED`
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
3. 选择环境：Production, Preview, Development
4. 点击 Save

## 安全建议

- 使用环境变量存储敏感信息
- 定期轮换 API 密钥
- 限制 Supabase 密钥的权限
- 不要在客户端代码中硬编码敏感信息

