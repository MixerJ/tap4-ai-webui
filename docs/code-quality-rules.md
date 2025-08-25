# Tap4 AI WebUI 代码质量规则

## 代码质量概述

高质量代码是项目成功的关键。本文档定义了 Tap4 AI WebUI 项目的代码质量标准和最佳实践。

## 1. TypeScript 质量标准

### 类型定义规范

#### 1.1 接口和类型定义
```typescript
// ✅ 推荐：明确的接口定义
interface User {
  readonly id: string;
  name: string;
  email: string;
  role: UserRole;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

// ✅ 推荐：联合类型用于枚举
type UserRole = 'admin' | 'user' | 'guest';
type UserStatus = 'active' | 'inactive' | 'suspended';

// ✅ 推荐：泛型约束
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

// ❌ 避免：使用 any
interface BadUser {
  id: any;        // 不明确的数据类型
  data: object;   // 过于宽泛
  meta?: any;     // 缺乏类型安全
}
```

#### 1.2 函数类型签名
```typescript
// ✅ 推荐：明确的函数签名
type FetchUserFn = (id: string) => Promise<User>;
type UpdateUserFn = (id: string, data: Partial<User>) => Promise<User>;

// ✅ 推荐：函数重载
function createUser(data: CreateUserData): Promise<User>;
function createUser(id: string, data: CreateUserData): Promise<User>;
function createUser(idOrData: string | CreateUserData, data?: CreateUserData): Promise<User> {
  // 实现
}

// ✅ 推荐：泛型函数
function createList<T>(items: T[]): List<T> {
  return new List(items);
}
```

### 类型安全最佳实践

#### 1.3 严格的 null 检查
```typescript
// ✅ 推荐：显式处理 null/undefined
function getUserDisplayName(user: User | null): string {
  return user?.name ?? 'Anonymous';
}

// ✅ 推荐：使用非空断言（仅在确定非空时）
function processUser(user: User | null): void {
  if (!user) {
    throw new Error('User is required');
  }

  // 这里 user 一定不为 null
  sendEmail(user.email);
}

// ✅ 推荐：类型谓词
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj
  );
}
```

## 2. React 组件质量标准

### 组件设计原则

#### 2.1 组件职责分离
```typescript
// ✅ 推荐：单一职责的组件
interface ToolCardProps {
  tool: Tool;
  onFavorite?: (toolId: string) => void;
  onShare?: (tool: Tool) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onFavorite, onShare }) => {
  return (
    <Card>
      <ToolHeader tool={tool} />
      <ToolActions tool={tool} onFavorite={onFavorite} onShare={onShare} />
    </Card>
  );
};

// ✅ 推荐：组合优于继承
const ToolList: React.FC<ToolListProps> = ({ tools, renderItem }) => {
  return (
    <div className="tool-list">
      {tools.map(tool => renderItem(tool))}
    </div>
  );
};
```

#### 2.2 Props 设计
```typescript
// ✅ 推荐：明确的 Props 接口
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

// ✅ 推荐：使用 children 进行组合
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // 实现
};
```

### 性能优化

#### 2.3 组件优化
```typescript
// ✅ 推荐：使用 React.memo
const ExpensiveComponent = React.memo<ExpensiveProps>(({ data, onClick }) => {
  // 只有当 data 或 onClick 变化时才重新渲染
  return <div onClick={onClick}>{data.value}</div>;
});

// ✅ 推荐：使用 useMemo 和 useCallback
const MemoizedValue = () => {
  const [items, setItems] = useState<Item[]>([]);

  const processedItems = useMemo(() => {
    return items.map(item => processItem(item));
  }, [items]);

  const handleItemClick = useCallback((itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  return (
    <ItemList
      items={processedItems}
      onItemClick={handleItemClick}
    />
  );
};
```

## 3. 代码组织和结构

### 文件组织规范

#### 3.1 文件命名
```typescript
// ✅ 推荐的文件命名
components/
  ui/
    button.tsx          // 基础UI组件
    input.tsx           // 输入组件
    modal.tsx           // 模态框组件
  home/
    hero-section.tsx    // 首页英雄区块
    feature-card.tsx    // 功能卡片组件
  explore/
    tool-list.tsx       // 工具列表组件
    filter-panel.tsx    // 过滤面板组件

lib/
  utils/
    string-utils.ts     // 字符串工具函数
    date-utils.ts       // 日期工具函数
  validations/
    user-schema.ts      // 用户验证模式
    tool-schema.ts      // 工具验证模式
```

#### 3.2 导出规范
```typescript
// ✅ 推荐：命名导出优先
export const formatDate = (date: Date): string => { /* ... */ };
export const parseDate = (str: string): Date => { /* ... */ };
export const validateEmail = (email: string): boolean => { /* ... */ };

// ✅ 推荐：组件导出
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => { /* ... */ };
export const Input: React.FC<InputProps> = (props) => { /* ... */ };

// ❌ 避免：默认导出（除非必要）
export default function Button() { /* ... */ }
```

### 导入组织

#### 3.3 导入排序和分组
```typescript
// ✅ 推荐：导入分组和排序
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/use-user';
import { formatDate } from '@/lib/utils/date-utils';

import type { User, Tool } from '@/types';
```

## 4. 错误处理规范

### 错误处理策略

#### 4.1 统一的错误处理
```typescript
// ✅ 推荐：自定义错误类
export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

// ✅ 推荐：错误边界组件
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 记录错误信息
    logError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
```

#### 4.2 API 错误处理
```typescript
// ✅ 推荐：API 错误处理
export const apiClient = {
  async get<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new NetworkError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          await response.text()
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof NetworkError) {
        throw error;
      }

      throw new NetworkError('Network request failed', 0, error);
    }
  }
};
```

## 5. 测试质量标准

### 测试覆盖要求

#### 5.1 单元测试
```typescript
// ✅ 推荐：完整的测试用例
describe('formatDate', () => {
  it('formats date in default format', () => {
    const date = new Date('2023-12-25T10:30:00Z');
    const result = formatDate(date);
    expect(result).toBe('2023-12-25');
  });

  it('formats date with custom format', () => {
    const date = new Date('2023-12-25T10:30:00Z');
    const result = formatDate(date, 'MM/dd/yyyy');
    expect(result).toBe('12/25/2023');
  });

  it('handles null and undefined', () => {
    expect(() => formatDate(null)).toThrow();
    expect(() => formatDate(undefined)).toThrow();
  });
});
```

#### 5.2 组件测试
```typescript
// ✅ 推荐：组件测试最佳实践
describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn-primary');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Click me</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
```

### 测试组织

#### 5.3 测试文件结构
```
__tests__/
  components/
    ui/
      button.test.tsx
      input.test.tsx
  lib/
    utils/
      string-utils.test.ts
      date-utils.test.ts
  api/
    tools.test.ts
    users.test.ts
```

## 6. 性能和可维护性

### 性能优化标准

#### 6.1 代码分割
```typescript
// ✅ 推荐：路由级代码分割
const HomePage = lazy(() => import('@/pages/home'));
const ExplorePage = lazy(() => import('@/pages/explore'));

const App = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<ExplorePage />} />
    </Routes>
  </Suspense>
);
```

#### 6.2 内存优化
```typescript
// ✅ 推荐：清理副作用
const DataFetcher = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    fetchData(controller.signal)
      .then(data => {
        if (isMounted) {
          setData(data);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return <div>{data}</div>;
};
```

### 可维护性标准

#### 6.3 代码可读性
```typescript
// ✅ 推荐：清晰的命名和结构
const calculateUserScore = (user: User): number => {
  const baseScore = user.activityScore;
  const bonusMultiplier = getBonusMultiplier(user.membershipLevel);
  const penaltyFactor = calculatePenaltyFactor(user.violations);

  return Math.max(0, baseScore * bonusMultiplier - penaltyFactor);
};

// ✅ 推荐：提取复杂条件
const shouldShowPremiumFeature = (user: User): boolean => {
  const isPremium = user.membershipLevel === 'premium';
  const isActive = user.status === 'active';
  const hasValidSubscription = user.subscriptionEndDate > new Date();

  return isPremium && isActive && hasValidSubscription;
};
```

#### 6.4 注释规范
```typescript
// ✅ 推荐：有意义的注释

/**
 * 计算用户信誉分数
 * @param user - 用户对象
 * @returns 信誉分数 (0-100)
 */
const calculateUserScore = (user: User): number => {
  // 基础分数基于用户活动
  const baseScore = user.activityScore;

  // 根据会员等级计算奖励倍数
  const bonusMultiplier = getBonusMultiplier(user.membershipLevel);

  // 计算违规扣分因子
  const penaltyFactor = calculatePenaltyFactor(user.violations);

  // 确保分数不为负数
  return Math.max(0, baseScore * bonusMultiplier - penaltyFactor);
};

// 常量注释
const MAX_RETRY_ATTEMPTS = 3; // 最大重试次数，避免无限重试
const CACHE_TTL = 300000; // 缓存过期时间，5分钟
```

## 7. 安全编码标准

### 输入验证

#### 7.1 数据验证
```typescript
// ✅ 推荐：使用 Zod 进行验证
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string()
    .min(1, '姓名不能为空')
    .max(50, '姓名不能超过50个字符')
    .regex(/^[^<>&"']*$/, '姓名包含非法字符'),

  email: z.string()
    .email('请输入有效的邮箱地址')
    .toLowerCase(),

  age: z.number()
    .int('年龄必须是整数')
    .min(13, '年龄不能小于13岁')
    .max(120, '年龄不能超过120岁')
    .optional(),

  website: z.string()
    .url('请输入有效的网站地址')
    .refine(url => url.startsWith('https://'), '必须使用HTTPS协议')
    .optional()
});

type UserInput = z.infer<typeof UserSchema>;
```

#### 7.2 XSS 防护
```typescript
// ✅ 推荐：内容清理
import DOMPurify from 'dompurify';

const sanitizeUserInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false
  });
};

// ✅ 推荐：安全的内联样式
const SafeComponent = ({ userContent }: { userContent: string }) => {
  const sanitizedContent = sanitizeUserInput(userContent);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className="user-content"
    />
  );
};
```

### 认证和授权

#### 7.3 安全的 API 调用
```typescript
// ✅ 推荐：安全的认证检查
const requireAuth = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const user = await verifyToken(token);
      (req as any).user = user;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};
```

## 8. 文档质量标准

### 代码文档

#### 8.1 JSDoc 注释
```typescript
/**
 * 用户服务类
 * 处理用户相关的业务逻辑
 */
class UserService {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  /**
   * 创建新用户
   * @param userData - 用户数据
   * @returns 创建的用户对象
   * @throws {ValidationError} 当用户数据无效时
   * @throws {DatabaseError} 当数据库操作失败时
   */
  async createUser(userData: CreateUserData): Promise<User> {
    // 验证输入
    const validatedData = UserSchema.parse(userData);

    // 检查邮箱是否已存在
    const existingUser = await this.db.users.findByEmail(validatedData.email);
    if (existingUser) {
      throw new ValidationError('Email already exists', 'email', 'DUPLICATE_EMAIL');
    }

    // 创建用户
    const user = await this.db.users.create(validatedData);
    return user;
  }
}
```

### README 文档

#### 8.2 完整的项目文档
```markdown
# 项目名称

简短的项目描述。

## 功能特性

- 特性1：描述
- 特性2：描述

## 技术栈

- 前端：Next.js 14, TypeScript, Tailwind CSS
- 后端：Next.js API Routes
- 数据库：Supabase PostgreSQL
- 部署：Vercel

## 快速开始

### 环境要求

- Node.js >= 20.0.0
- pnpm >= 8.0.0

### 安装步骤

```bash
# 克隆项目
git clone <repository-url>

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env.local

# 启动开发服务器
pnpm dev
```

## 项目结构

```
项目根目录/
├── app/                 # Next.js 14 应用路由
├── components/          # React 组件
├── lib/                 # 工具函数和配置
├── docs/                # 项目文档
└── public/              # 静态资源
```

## API 文档

详细的 API 接口说明...

## 部署指南

部署到 Vercel 的详细步骤...

## 贡献指南

如何为项目贡献代码...

## 许可证

项目使用的许可证...
```

## 9. 质量检查清单

### 代码提交前检查

#### 9.1 开发人员检查清单
- [ ] 代码通过 TypeScript 编译
- [ ] ESLint 检查无错误
- [ ] Prettier 格式化正确
- [ ] 所有测试通过
- [ ] 新功能有相应测试
- [ ] 代码有适当注释
- [ ] 文档已更新
- [ ] 相关的环境变量已更新

#### 9.2 代码审查检查清单
- [ ] 代码符合项目规范
- [ ] 类型安全无误
- [ ] 错误处理完善
- [ ] 性能优化到位
- [ ] 安全问题已处理
- [ ] 测试覆盖足够
- [ ] 命名清晰准确
- [ ] 代码可维护性好

### 自动化检查

#### 9.3 CI/CD 检查
```yaml
# GitHub Actions 配置示例
name: Code Quality

on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Type checking
        run: pnpm tsc --noEmit

      - name: Linting
        run: pnpm lint

      - name: Testing
        run: pnpm test

      - name: Build
        run: pnpm build

      - name: Bundle analysis
        run: pnpm analyze
```

## 10. 持续改进

### 质量度量指标

#### 10.1 代码质量指标
- **测试覆盖率**: >= 80%
- **类型安全**: 0 TypeScript 错误
- **代码重复率**: < 5%
- **圈复杂度**: < 10
- **ESLint 错误**: 0

#### 10.2 性能指标
- **首次内容绘制**: < 2s
- **最大内容绘制**: < 3s
- **Lightouse 评分**: >= 90
- **包大小**: < 500KB

### 定期审查和改进

#### 10.3 代码审查周期
- **新功能**: 每次提交前审查
- **重构**: 计划性审查
- **安全修复**: 紧急审查
- **性能优化**: 定期审查

#### 10.4 技术债务管理
- 识别技术债务
- 优先级排序
- 制定修复计划
- 定期清理

通过遵循这些代码质量规则，我们可以确保 Tap4 AI WebUI 项目具有高可维护性、高性能和高质量的代码库。
