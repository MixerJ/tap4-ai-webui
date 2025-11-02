import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  interactive?: boolean;
  gradient?: boolean;
}

export default function Card({ children, className, hover = false, interactive = false, gradient = false }: CardProps) {
  const baseStyles = 'rounded-2xl border border-white/10 bg-slate-800/60 backdrop-blur-sm transition-all duration-300';

  const hoverStyles = hover ? 'hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10' : '';

  const interactiveStyles = interactive ? 'hover:scale-[1.02] active:scale-[0.98] cursor-pointer' : '';

  const gradientStyles = gradient ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80' : '';

  return <div className={cn(baseStyles, hoverStyles, interactiveStyles, gradientStyles, className)}>{children}</div>;
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('p-6 pb-4', className)}>{children}</div>;
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn('text-xl font-semibold text-white lg:text-2xl', className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-sm text-white/60 lg:text-base', className)}>{children}</p>;
}
