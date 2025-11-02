/**
 * 统一的样式系统入口
 * 导出所有设计系统规范
 */

export * from './responsive';
export * from './animations';
export * from './colors';

// 快捷组合样式
export const commonStyles = {
  // 页面容器
  pageContainer: 'mx-auto w-full max-w-pc px-6 lg:px-0',
  pageSection: 'py-10 lg:py-16',

  // 卡片样式
  card: 'rounded-2xl border border-white/10 bg-slate-800/60 backdrop-blur-sm transition-all duration-300',
  cardHover: 'hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10',
  cardInteractive: 'hover:scale-[1.02] active:scale-[0.98] cursor-pointer',

  // 按钮基础样式
  button:
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 touch-manipulation min-h-[44px]',

  // 输入框样式
  input:
    'rounded-xl border border-white/20 bg-transparent px-4 py-2 text-white transition-all duration-300 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50',

  // 链接样式
  link: 'text-indigo-400 transition-colors duration-200 hover:text-indigo-300 active:text-indigo-400',

  // 毛玻璃效果
  glass: 'bg-slate-900/95 backdrop-blur-xl border border-white/10',
  glassLight: 'bg-white/5 backdrop-blur-sm border border-white/5',
} as const;

// 快捷使用示例：
// import { commonStyles, typography, gradients } from '@/lib/styles';
// className={`${commonStyles.card} ${commonStyles.cardHover} ${typography.h3}`}
