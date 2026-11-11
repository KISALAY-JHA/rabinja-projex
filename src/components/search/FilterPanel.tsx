'use client';

import React from 'react';
import { Filter, X, ArrowUpDown } from 'lucide-react';
import type { Category } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export type SortOption = 'featured' | 'score' | 'newest' | 'name';

interface FilterPanelProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categorySlug: string | null) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  selectedEvent: string | null;
  onSelectEvent: (event: string | null) => void;
  totalCount: number;
  filteredCount: number;
  className?: string;
}

export function FilterPanel({
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  selectedEvent,
  onSelectEvent,
  totalCount,
  filteredCount,
  className,
}: FilterPanelProps) {
  const hasActiveFilters = selectedCategory !== null || selectedEvent !== null;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Category Pills horizontal scroll */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => onSelectCategory(null)}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border',
            selectedCategory === null
              ? 'bg-accent text-white border-accent'
              : 'bg-bg-card text-text-secondary border-border hover:bg-surface-hover'
          )}
        >
          All Categories ({totalCount})
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.slug)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border flex items-center gap-1.5',
                isSelected
                  ? 'bg-accent text-white border-accent'
                  : 'bg-bg-card text-text-secondary border-border hover:bg-surface-hover'
              )}
            >
              <span>{cat.name}</span>
              {typeof cat.projectCount === 'number' && (
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.2 rounded-full',
                    isSelected ? 'bg-white/20 text-white' : 'bg-surface-hover text-text-muted'
                  )}
                >
                  {cat.projectCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Second row: Status/Event filter, Sort, and active reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60">
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span className="font-medium text-text-primary">
            Showing {filteredCount} of {totalCount} projects
          </span>

          {hasActiveFilters && (
            <button
              onClick={() => {
                onSelectCategory(null);
                onSelectEvent(null);
              }}
              className="text-accent hover:underline text-xs flex items-center gap-1 font-medium ml-2"
            >
              <X className="w-3 h-3" />
              Reset filters
            </button>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs text-text-muted flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3" />
            <span>Sort by:</span>
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="text-xs bg-bg-card border border-border rounded-md px-2.5 py-1 text-text-primary focus:outline-none focus:border-accent"
          >
            <option value="featured">Featured First</option>
            <option value="score">Official Score (High → Low)</option>
            <option value="newest">Newest First</option>
            <option value="name">Project Name (A → Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
