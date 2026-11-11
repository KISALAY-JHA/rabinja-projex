import React from 'react';
import type { Project } from '@/lib/types';
import { ProjectCard } from '@/components/project/ProjectCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { cn } from '@/lib/utils';

interface ProjectGridProps {
  projects: Project[];
  variant?: 'default' | 'featured' | 'compact';
  columns?: 2 | 3 | 4;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

export function ProjectGrid({
  projects,
  variant = 'default',
  columns = 3,
  emptyTitle = 'No projects found',
  emptyDescription = 'Try adjusting your search criteria or filters to find what you are looking for.',
  className,
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="py-12">
        <EmptyState
          icon="Compass"
          title={emptyTitle}
          description={emptyDescription}
        />
      </div>
    );
  }

  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      className={cn(
        'grid gap-5 md:gap-6',
        columnClasses[columns],
        className
      )}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          variant={variant}
        />
      ))}
    </div>
  );
}
