# Tap4 AI WebUI 开发规则

## 开发环境设置

### 环境要求
- Node.js >= 20.0.0
- pnpm >= 8.0.0
- Git >= 2.30.0

### 开发环境配置
```bash
# 克隆项目
git clone https://github.com/6677-ai/tap4-ai-webui.git

# 进入项目目录
cd tap4-ai-webui

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env.local

# 启动开发服务器
pnpm dev
```

### 环境变量配置
```env
# 应用配置
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME="Tap4 AI"

# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 爬虫配置
CRAWLER_API=https://your-crawler-domain.com/site/crawl_async
CRAWLER_API_KEY=your_crawler_api_key

# 认证配置
CRON_AUTH_KEY=your_cron_auth_key
SUBMIT_AUTH_KEY=your_submit_auth_key

# 分析配置
GOOGLE_TRACKING_ID=G-XXXXXXXXXX
GOOGLE_ADSENSE_URL=https://your-adsense-url

# 联系信息
CONTACT_US_EMAIL=contact@your-domain.com
```

## 代码规范

### TypeScript 规范

#### 类型定义
```typescript
// 好的做法
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

type UserRole = 'admin' | 'user' | 'guest';

// 避免的做法
interface User {
  id: any;
  name: string;
  email?: string;
  created_at: string;
}
```

#### 组件 Props 类型
```typescript
// 好的做法
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick
}) => {
  // 组件实现
};
```

### React 组件规范

#### 函数组件优先
```typescript
// ✅ 推荐
const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

// ❌ 避免
class UserCard extends React.Component<UserCardProps> {
  render() {
    return (
      <div className="user-card">
        <h3>{this.props.user.name}</h3>
        <p>{this.props.user.email}</p>
      </div>
    );
  }
}
```

#### Hooks 使用规范
```typescript
// ✅ 推荐的自定义 Hook
const useUserData = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading, error };
};

// 使用自定义 Hook
const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const { user, loading, error } = useUserData(userId);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <NotFound />;

  return <UserCard user={user} />;
};
```

### 文件和目录结构

#### 组件文件结构
```
components/
  ui/                    # 基础 UI 组件
    button.tsx         # 按钮组件
    input.tsx          # 输入框组件
    modal.tsx          # 模态框组件
  home/                 # 首页相关组件
    hero-section.tsx   # 英雄区块
    feature-card.tsx   # 功能卡片
  explore/              # 探索页组件
    tool-list.tsx      # 工具列表
    filter-panel.tsx   # 过滤面板
```

#### 页面文件结构
```
app/
  [locale]/             # 国际化路由
    (with-footer)/     # 带页脚的页面组
      (home)/          # 首页组
        page.tsx       # 首页
        layout.tsx     # 首页布局
      category/        # 分类页面
        [code]/        # 动态路由
          page.tsx
      explore/         # 探索页面
        page.tsx
        layout.tsx
```

### 样式规范

#### Tailwind CSS 使用
```typescript
// ✅ 推荐
const Button = ({ variant, size, className }: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors";

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
};
```

#### CSS 变量使用
```css
/* styles/globals.css */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #6b7280;
  --color-success: #10b981;
  --color-error: #ef4444;
}

@layer components {
  .btn-primary {
    @apply bg-[var(--color-primary)] text-white hover:bg-blue-700;
  }
}
```

### API 开发规范

#### API 路由结构
```typescript
// app/api/tools/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');

    // 参数验证
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters' },
        { status: 400 }
      );
    }

    // 获取数据
    const tools = await getTools({ page, limit, category });

    return NextResponse.json({
      data: tools,
      pagination: {
        page,
        limit,
        total: tools.length
      }
    });
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

#### 数据库操作
```typescript
// lib/db/queries.ts
import { supabase } from '@/lib/supabase/client';

export const getTools = async (params: {
  page?: number;
  limit?: number;
  category?: string;
}) => {
  const { page = 1, limit = 20, category } = params;

  let query = supabase
    .from('web_navigation')
    .select('*')
    .range((page - 1) * limit, page * limit - 1)
    .order('collection_time', { ascending: false });

  if (category) {
    query = query.eq('category_name', category);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch tools: ${error.message}`);
  }

  return data || [];
};
```

### 错误处理

#### 统一错误处理
```typescript
// lib/error-handler.ts
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown): NextResponse => {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }

  console.error('Unexpected error:', error);
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
};
```

### 测试规范

#### 组件测试
```typescript
// __tests__/components/button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-600');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### API 测试
```typescript
// __tests__/api/tools.test.ts
import { GET } from '@/app/api/tools/route';
import { NextRequest } from 'next/server';

describe('/api/tools', () => {
  it('returns tools with default pagination', async () => {
    const request = new NextRequest('http://localhost:3000/api/tools');
    const response = await GET(request);

    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('data');
    expect(data).toHaveProperty('pagination');
    expect(Array.isArray(data.data)).toBe(true);
  });

  it('validates pagination parameters', async () => {
    const request = new NextRequest('http://localhost:3000/api/tools?page=-1');
    const response = await GET(request);

    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.error).toBe('Invalid pagination parameters');
  });
});
```

### 性能优化

#### 组件优化
```typescript
// ✅ 使用 React.memo
const ToolCard = React.memo<ToolCardProps>(({ tool, onClick }) => {
  return (
    <div onClick={() => onClick(tool.id)}>
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>
    </div>
  );
});

// ✅ 使用 useMemo
const filteredTools = useMemo(() => {
  return tools.filter(tool => tool.category === selectedCategory);
}, [tools, selectedCategory]);

// ✅ 使用 useCallback
const handleToolClick = useCallback((toolId: string) => {
  navigate(`/tools/${toolId}`);
}, [navigate]);
```

#### 图片优化
```typescript
// components/image/optimized-image.tsx
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 400,
  height = 300,
  priority = false
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
    />
  );
};
```

### 安全规范

#### 输入验证
```typescript
// lib/validations/tool.ts
import { z } from 'zod';

export const createToolSchema = z.object({
  name: z.string()
    .min(1, '名称不能为空')
    .max(100, '名称不能超过100个字符')
    .regex(/^[^<>&"']*$/, '名称包含非法字符'),

  url: z.string()
    .url('请输入有效的URL')
    .refine(url => url.startsWith('https://'), '必须使用HTTPS'),

  description: z.string()
    .max(500, '描述不能超过500个字符')
    .optional(),

  category: z.string()
    .min(1, '请选择分类')
    .optional()
});

export type CreateToolInput = z.infer<typeof createToolSchema>;
```

#### XSS 防护
```typescript
// lib/utils/sanitize.ts
import DOMPurify from 'dompurify';

export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
};

export const sanitizeText = (text: string): string => {
  return text.replace(/[<>]/g, '');
};
```

### 提交规范

#### Git 提交信息格式
```
type(scope): description

[optional body]

[optional footer]
```

#### 提交类型
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建工具或辅助工具的变动

#### 示例提交信息
```
feat(tools): add search functionality

Add real-time search for AI tools with debouncing and highlighting

Closes #123
```

### 代码审查规范

#### 审查清单
- [ ] 代码符合项目规范
- [ ] TypeScript 类型正确
- [ ] 组件遵循设计系统
- [ ] 测试覆盖率足够
- [ ] 性能优化到位
- [ ] 安全问题已处理
- [ ] 文档已更新

#### 审查意见格式
```
✅ 好的做法
- 使用了 TypeScript 严格模式
- 组件设计符合单一职责原则

❌ 需要改进
- 缺少错误边界处理
- 测试覆盖不完整

💡 建议
- 考虑使用自定义 Hook 提取逻辑
- 添加 loading 状态处理
```

## 工具和配置

### 开发工具配置

#### VS Code 设置
```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

#### Prettier 配置
```javascript
// .prettierrc.js
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  plugins: [require('@ianvs/prettier-plugin-sort-imports')]
};
```

#### ESLint 配置
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    'airbnb-typescript',
    'prettier'
  ],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' }
    ]
  }
};
```

### CI/CD 配置

#### GitHub Actions 工作流
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Run linter
        run: pnpm lint

      - name: Run tests
        run: pnpm test

      - name: Build
        run: pnpm build
```

## 最佳实践

### 代码组织原则
1. **单一职责**: 每个文件、函数、组件都有明确的职责
2. **DRY 原则**: 避免代码重复，通过抽象和复用
3. **KISS 原则**: 保持简单，避免过度设计
4. **SOLID 原则**: 面向对象设计原则

### 性能最佳实践
1. **组件懒加载**: 使用 `React.lazy` 和 `Suspense`
2. **代码分割**: 按路由分割代码
3. **图片优化**: 使用 Next.js Image 组件
4. **缓存策略**: 合理使用缓存减少重复请求
5. **Bundle 分析**: 定期分析和优化包大小

### 可维护性最佳实践
1. **清晰的命名**: 变量、函数、组件命名要语义化
2. **代码注释**: 复杂逻辑需要适当注释
3. **类型安全**: 充分利用 TypeScript 类型系统
4. **错误处理**: 完善的错误处理机制
5. **测试覆盖**: 核心功能需要测试覆盖

### 协作最佳实践
1. **分支策略**: 清晰的分支管理和合并流程
2. **代码审查**: 所有代码都需要审查
3. **文档更新**: 及时更新相关文档
4. **沟通透明**: 及时沟通项目进展和问题
5. **知识分享**: 定期分享技术和经验
