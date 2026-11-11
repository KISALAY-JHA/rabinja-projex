import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function PageContainer({
  children,
  className,
  noPadding = false,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        noPadding ? 'w-full' : 'container-page py-6 md:py-10',
        className
      )}
    >
      {children}
    </div>
  );
}
