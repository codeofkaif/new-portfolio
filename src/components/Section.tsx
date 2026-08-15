import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  spacing?: 'default' | 'tight' | 'loose';
}

const spacingMap = {
  tight: 'py-10 md:py-14',
  default: 'py-16 md:py-24',
  loose: 'py-24 md:py-32',
};

/**
 * Reusable Section wrapper with consistent max-width and padding.
 */
export function Section({ id, className, children, spacing = 'default' }: SectionProps) {
  return (
    <section id={id} className={cn('w-full', spacingMap[spacing], className)}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
