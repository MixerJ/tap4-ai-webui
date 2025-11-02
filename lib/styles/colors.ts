/**
 * 统一的色彩系统规范
 * 严格基于品牌色彩：Indigo、Purple、Cyan
 */

// 品牌主色
export const brandColors = {
  primary: '#6366f1', // Indigo
  secondary: '#8b5cf6', // Purple
  accent: '#06b6d4', // Cyan
  success: '#10b981', // Emerald
  warning: '#f59e0b', // Amber
  error: '#ef4444', // Red
} as const;

// 渐变背景（统一使用）
export const gradients = {
  // 主要渐变
  primary: 'bg-gradient-to-r from-indigo-600 to-purple-600',
  'primary-hover': 'hover:from-indigo-500 hover:to-purple-500',

  // 次要渐变
  secondary: 'bg-gradient-to-r from-purple-600 to-pink-600',
  'secondary-hover': 'hover:from-purple-500 hover:to-pink-500',

  // 强调渐变
  accent: 'bg-gradient-to-r from-cyan-500 to-blue-500',
  'accent-hover': 'hover:from-cyan-400 hover:to-blue-400',

  // 背景渐变
  'bg-primary': 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
  'bg-radial':
    'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent',

  // 文字渐变
  'text-primary': 'bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent',
  'text-accent': 'bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent',
} as const;

// 边框颜色（统一使用）
export const borders = {
  default: 'border-white/10',
  hover: 'hover:border-white/20',
  active: 'border-indigo-500/30',
  focus: 'focus:border-indigo-500/50',
} as const;

// 背景颜色（统一使用）
export const backgrounds = {
  // 卡片背景
  card: 'bg-slate-800/60',
  'card-hover': 'hover:bg-slate-700/60',

  // 毛玻璃效果
  glass: 'bg-slate-900/95 backdrop-blur-xl',
  'glass-light': 'bg-white/5 backdrop-blur-sm',

  // 交互背景
  interactive: 'bg-transparent hover:bg-white/5 active:bg-white/10',
} as const;

// 文字颜色（统一使用）
export const textColors = {
  primary: 'text-white',
  secondary: 'text-white/80',
  tertiary: 'text-white/60',
  muted: 'text-white/40',

  // 品牌色文字
  'brand-primary': 'text-indigo-400',
  'brand-secondary': 'text-purple-400',
  'brand-accent': 'text-cyan-400',

  // 状态色
  success: 'text-emerald-400',
  warning: 'text-amber-400',
  error: 'text-red-400',
} as const;

// 阴影效果（统一使用）
export const shadows = {
  sm: 'shadow-lg',
  md: 'shadow-xl shadow-indigo-500/20',
  lg: 'shadow-2xl shadow-indigo-500/30',

  // 特殊效果
  glow: 'shadow-lg shadow-indigo-500/25',
  'glow-purple': 'shadow-lg shadow-purple-500/25',
  'glow-cyan': 'shadow-lg shadow-cyan-500/25',
} as const;

// 工具函数：组合色彩类
export const getCombinedColors = (
  bg: keyof typeof backgrounds,
  border: keyof typeof borders,
  text: keyof typeof textColors,
): string => `${backgrounds[bg]} ${borders[border]} ${textColors[text]}`;

// 工具函数：获取渐变组合
export const getGradientWithHover = (gradient: keyof typeof gradients): string => {
  const hoverKey = `${gradient}-hover` as keyof typeof gradients;
  if (hoverKey in gradients) {
    return `${gradients[gradient]} ${gradients[hoverKey]}`;
  }
  return gradients[gradient];
};
