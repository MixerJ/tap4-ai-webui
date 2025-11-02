/**
 * 统一的响应式设计规范
 * 基于Tailwind配置的断点系统
 */

// 断点定义（与tailwind.config.ts保持一致）
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px',
} as const;

// 统一的字体大小响应式规范
export const typography = {
  // 标题
  h1: 'text-4xl lg:text-6xl font-bold',
  h2: 'text-3xl lg:text-5xl font-bold',
  h3: 'text-2xl lg:text-4xl font-semibold',
  h4: 'text-xl lg:text-3xl font-semibold',
  h5: 'text-lg lg:text-2xl font-medium',
  h6: 'text-base lg:text-xl font-medium',

  // 正文
  'body-lg': 'text-base lg:text-xl',
  body: 'text-sm lg:text-base',
  'body-sm': 'text-xs lg:text-sm',

  // 特殊
  lead: 'text-lg lg:text-2xl font-light',
  caption: 'text-xs lg:text-sm text-white/60',
} as const;

// 统一的间距响应式规范
export const spacing = {
  // 容器padding
  'container-padding': 'px-6 lg:px-0',

  // 页面section间距
  'section-y': 'py-10 lg:py-16',
  'section-y-sm': 'py-6 lg:py-10',
  'section-y-lg': 'py-16 lg:py-24',

  // 内容间距
  'content-gap': 'gap-4 lg:gap-6',
  'content-gap-sm': 'gap-2 lg:gap-4',
  'content-gap-lg': 'gap-6 lg:gap-10',
} as const;

// 统一的触摸目标尺寸（符合WCAG标准）
export const touchTargets = {
  sm: 'min-h-[36px] min-w-[36px]',
  md: 'min-h-[44px] min-w-[44px]', // 推荐最小尺寸
  lg: 'min-h-[48px] min-w-[48px]',
  xl: 'min-h-[56px] min-w-[56px]',
} as const;

// 统一的网格系统
export const grid = {
  'col-auto': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  'col-cards': 'grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5',
  'col-2': 'grid grid-cols-1 lg:grid-cols-2',
  'col-3': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  'col-4': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
} as const;

// 响应式工具函数
export const getResponsiveClass = (key: keyof typeof typography | keyof typeof spacing | keyof typeof grid): string => {
  if (key in typography) return typography[key as keyof typeof typography];
  if (key in spacing) return spacing[key as keyof typeof spacing];
  if (key in grid) return grid[key as keyof typeof grid];
  return '';
};
