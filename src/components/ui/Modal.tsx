'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ============================================================
   Modal — RABINJA Projex UI Primitive
   ============================================================ */

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  children: React.ReactNode;
  className?: string;
}

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  /* ---- Focus trap ---- */
  const getFocusableElements = useCallback(() => {
    if (!dialogRef.current) return [];
    return Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      ),
    );
  }, []);

  const trapFocus = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [getFocusableElements],
  );

  /* ---- Escape key ---- */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      trapFocus(e);
    },
    [onClose, trapFocus],
  );

  /* ---- Mount / unmount ---- */
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);

      // Focus the first focusable element after render
      requestAnimationFrame(() => {
        const focusable = getFocusableElements();
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      });
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, handleKeyDown, getFocusableElements]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-text-primary/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className={cn(
          'relative w-full bg-bg-card border border-border rounded-xl',
          'flex flex-col max-h-[85vh]',
          sizeStyles[size],
          className,
        )}
        style={{ boxShadow: 'var(--shadow-xl)' }}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
            <h2 className="text-lg font-semibold text-text-primary">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Close button when no title */}
        {!title && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 rounded-lg p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors cursor-pointer z-10 focus-visible:outline-2 focus-visible:outline-accent"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        )}

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}

Modal.displayName = 'Modal';

export default Modal;
