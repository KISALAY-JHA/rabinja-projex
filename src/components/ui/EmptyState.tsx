import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from './Button';

/* ============================================================
   EmptyState — RABINJA Projex UI Primitive
   ============================================================ */

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
  variant?: ButtonProps['variant'];
}

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lucide icon name (e.g. "FolderOpen"). */
  icon?: string;
  title: string;
  description?: string;
  action?: EmptyStateAction;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...rest
}: EmptyStateProps) {
  /* Dynamically resolve the Lucide icon by name. */
  const IconComponent = icon
    ? (LucideIcons as unknown as Record<string, React.ComponentType<LucideIcons.LucideProps>>)[icon]
    : null;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-16 px-6',
        className,
      )}
      {...rest}
    >
      {IconComponent && (
        <div className="mb-4 rounded-full bg-surface-hover p-4">
          <IconComponent
            size={32}
            className="text-text-muted"
            aria-hidden="true"
          />
        </div>
      )}

      <h3 className="text-lg font-semibold text-text-primary mb-1">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-text-muted max-w-sm mb-6">
          {description}
        </p>
      )}

      {action && (
        <Button
          variant={action.variant ?? 'solid'}
          size="md"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}

EmptyState.displayName = 'EmptyState';

export default EmptyState;
