'use client';

import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ============================================================
   Toast — RABINJA Projex UI Primitive
   ============================================================ */

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastData {
  id: string;
  type: ToastType;
  message: string;
  duration?: number; // ms, default 5000
}

/* ---- Toast item ---- */

const typeConfig: Record<
  ToastType,
  { icon: LucideIcon; bg: string; border: string; text: string }
> = {
  success: { icon: CheckCircle, bg: 'bg-success-light', border: 'border-success/30', text: 'text-success' },
  error: { icon: AlertCircle, bg: 'bg-error-light', border: 'border-error/30', text: 'text-error' },
  warning: { icon: AlertTriangle, bg: 'bg-warning-light', border: 'border-warning/30', text: 'text-warning' },
  info: { icon: Info, bg: 'bg-nex-accent-light', border: 'border-nex-accent/30', text: 'text-nex-primary' },
};

interface ToastItemProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const { icon: Icon, bg, border, text } = typeConfig[toast.type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration ?? 5000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 px-4 py-3 rounded-lg border',
        'w-80 animate-in slide-in-from-right-full',
        bg,
        border,
      )}
      style={{ boxShadow: 'var(--shadow-md)' }}
    >
      <Icon size={18} className={cn('shrink-0 mt-0.5', text)} aria-hidden="true" />
      <p className="text-sm text-text-primary flex-1">{toast.message}</p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 rounded p-0.5 text-text-muted hover:text-text-primary transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}

/* ---- Toast container ---- */

export function ToastContainer({ toasts, onDismiss }: { toasts: ToastData[]; onDismiss: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

/* ---- Context-based hook for easy usage ---- */

interface ToastContextValue {
  toast: (type: ToastType, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastCounter = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((type: ToastType, message: string, duration?: number) => {
    const id = `toast-${++toastCounter}-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, message, duration }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }
  return ctx;
}

ToastContainer.displayName = 'ToastContainer';
ToastProvider.displayName = 'ToastProvider';
