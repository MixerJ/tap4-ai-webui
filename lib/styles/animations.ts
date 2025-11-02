/**
 * 统一的动画和过渡规范
 * 基于tailwind.config.ts的动画系统
 */

// 统一的过渡时长
export const durations = {
  fast: 'duration-150',
  normal: 'duration-300',
  slow: 'duration-500',
  slower: 'duration-700',
} as const;

// 统一的过渡效果
export const transitions = {
  all: 'transition-all',
  colors: 'transition-colors',
  opacity: 'transition-opacity',
  transform: 'transition-transform',
  default: 'transition-all duration-300 ease-out',
} as const;

// 统一的悬停效果
export const hoverEffects = {
  // 缩放效果
  'scale-sm': 'hover:scale-[1.02] active:scale-[0.98]',
  scale: 'hover:scale-105 active:scale-95',
  'scale-lg': 'hover:scale-110 active:scale-90',

  // 阴影效果
  'shadow-sm': 'hover:shadow-lg',
  shadow: 'hover:shadow-xl hover:shadow-indigo-500/20',
  'shadow-lg': 'hover:shadow-2xl hover:shadow-indigo-500/30',

  // 组合效果（推荐）
  card: 'hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/20 active:scale-[0.98]',
  button: 'hover:scale-105 hover:shadow-lg active:scale-95',
  interactive: 'hover:bg-white/5 active:bg-white/10',
} as const;

// 统一的动画类（基于tailwind.config.ts）
export const animations = {
  'fade-in': 'animate-fade-in',
  'slide-up': 'animate-slide-up',
  'slide-in-left': 'animate-slide-in-left',
  'scale-in': 'animate-scale-in',
  glow: 'animate-glow',
  float: 'animate-float',
  shimmer: 'animate-shimmer',
  pulse: 'animate-pulse',
  spin: 'animate-spin',
} as const;

// 动画延迟工具
export const animationDelays = {
  none: '',
  100: 'style={{ animationDelay: "0.1s" }}',
  200: 'style={{ animationDelay: "0.2s" }}',
  300: 'style={{ animationDelay: "0.3s" }}',
  400: 'style={{ animationDelay: "0.4s" }}',
  500: 'style={{ animationDelay: "0.5s" }}',
} as const;

// 统一的交互状态
export const interactiveStates = {
  // 标准交互元素
  default: 'transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] touch-manipulation',

  // 按钮交互
  button:
    'transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation disabled:opacity-50 disabled:pointer-events-none',

  // 卡片交互
  card: 'transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/20 active:scale-[0.98] touch-manipulation',

  // 链接交互
  link: 'transition-colors duration-200 hover:text-indigo-300 active:text-indigo-400',
} as const;

// 性能优化：GPU加速的属性
export const gpuAccelerated = {
  transform: 'transform-gpu',
  'will-change': 'will-change-transform',
} as const;

// 组合使用示例的工具函数
export const getAnimationClasses = (animation: keyof typeof animations, delay?: string): string => {
  const baseAnimation = animations[animation];
  return delay ? `${baseAnimation} ${delay}` : baseAnimation;
};

export const getHoverEffect = (effect: keyof typeof hoverEffects): string =>
  `${transitions.default} ${hoverEffects[effect]}`;
