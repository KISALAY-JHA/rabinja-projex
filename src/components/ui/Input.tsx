'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/* ============================================================
   Input — RABINJA Projex UI Primitive
   ============================================================ */

type InputType = 'text' | 'search' | 'email' | 'password';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: InputType | 'textarea';
  label?: string;
  error?: string;
  helperText?: string;
  /** Lucide icon element rendered on the left side. */
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      type = 'text',
      label,
      error,
      helperText,
      icon,
      className,
      id,
      ...rest
    },
    ref,
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const hasError = !!error;

    const sharedClasses = cn(
      'w-full rounded-lg border bg-bg-card px-3 py-2 text-sm text-text-primary',
      'placeholder:text-text-muted',
      'transition-colors duration-[var(--transition-fast)]',
      'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent',
      hasError
        ? 'border-error focus:ring-error/40 focus:border-error'
        : 'border-border',
      icon && type !== 'textarea' && 'pl-10',
      className,
    );

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {icon && type !== 'textarea' && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              {icon}
            </span>
          )}

          {type === 'textarea' ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              id={inputId}
              className={cn(sharedClasses, 'min-h-[100px] resize-y')}
              aria-invalid={hasError}
              aria-describedby={
                hasError
                  ? `${inputId}-error`
                  : helperText
                    ? `${inputId}-helper`
                    : undefined
              }
              {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              id={inputId}
              type={type}
              className={sharedClasses}
              aria-invalid={hasError}
              aria-describedby={
                hasError
                  ? `${inputId}-error`
                  : helperText
                    ? `${inputId}-helper`
                    : undefined
              }
              {...rest}
            />
          )}
        </div>

        {hasError && (
          <p
            id={`${inputId}-error`}
            className="text-xs text-error"
            role="alert"
          >
            {error}
          </p>
        )}
        {!hasError && helperText && (
          <p id={`${inputId}-helper`} className="text-xs text-text-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
