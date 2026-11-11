'use client';

import React, { useState, useRef, useCallback, type KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';

/* ============================================================
   Tabs — RABINJA Projex UI Primitive
   ============================================================ */

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: TabItem[];
  /** Controlled active tab id. */
  activeTab?: string;
  /** Callback when active tab changes. */
  onTabChange?: (tabId: string) => void;
}

export function Tabs({
  tabs,
  activeTab: controlledActive,
  onTabChange,
  className,
  ...rest
}: TabsProps) {
  const [internalActive, setInternalActive] = useState(tabs[0]?.id ?? '');
  const activeId = controlledActive ?? internalActive;

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const setActive = useCallback(
    (id: string) => {
      if (onTabChange) {
        onTabChange(id);
      } else {
        setInternalActive(id);
      }
    },
    [onTabChange],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      let nextIndex = index;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextIndex = (index + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      tabRefs.current[nextIndex]?.focus();
      setActive(tabs[nextIndex].id);
    },
    [tabs, setActive],
  );

  const activeTab = tabs.find((t) => t.id === activeId);

  return (
    <div className={cn('w-full', className)} {...rest}>
      {/* Tab list */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex border-b border-border overflow-x-auto"
      >
        {tabs.map((tab, idx) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[idx] = el; }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={cn(
                'relative px-4 py-2.5 text-sm font-medium whitespace-nowrap',
                'transition-colors duration-[var(--transition-fast)]',
                'cursor-pointer',
                'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent',
                isActive
                  ? 'text-accent'
                  : 'text-text-muted hover:text-text-primary',
              )}
            >
              {tab.label}
              {/* Active underline indicator */}
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab panel */}
      {activeTab && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab.id}`}
          aria-labelledby={`tab-${activeTab.id}`}
          tabIndex={0}
          className="pt-4 focus:outline-none"
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
}

Tabs.displayName = 'Tabs';

export default Tabs;
