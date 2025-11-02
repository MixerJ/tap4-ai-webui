import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'full' | 'default' | 'narrow';
  padding?: boolean;
}

export default function Container({ children, className, size = 'default', padding = true }: ContainerProps) {
  const sizeStyles = {
    full: 'w-full',
    default: 'mx-auto w-full max-w-pc',
    narrow: 'mx-auto w-full max-w-4xl',
  };

  const paddingStyles = padding ? 'px-6 lg:px-0' : '';

  return <div className={cn(sizeStyles[size], paddingStyles, className)}>{children}</div>;
}
