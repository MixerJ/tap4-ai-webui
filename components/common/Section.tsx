import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  spacing?: 'sm' | 'md' | 'lg';
}

export default function Section({ children, className, title, description, spacing = 'md' }: SectionProps) {
  const spacingStyles = {
    sm: 'py-6 lg:py-10',
    md: 'py-10 lg:py-16',
    lg: 'py-16 lg:py-24',
  };

  return (
    <section className={cn(spacingStyles[spacing], className)}>
      {(title || description) && (
        <div className='mb-8 text-center lg:mb-12'>
          {title && (
            <h2 className='mb-4 text-3xl font-bold text-white lg:text-5xl'>
              <span className='bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent'>
                {title}
              </span>
            </h2>
          )}
          {description && <p className='mx-auto max-w-3xl text-base text-white/70 lg:text-xl'>{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
