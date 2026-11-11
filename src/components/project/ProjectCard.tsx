'use client';

import React from 'react';
import Link from 'next/link';
import { Trophy, Star, Users, ArrowUpRight, Award } from 'lucide-react';
import type { Project } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

// Generate aesthetic fallback gradient per category
const categoryGradients: Record<string, string> = {
  'artificial-intelligence': 'from-blue-600/20 via-indigo-600/10 to-transparent',
  'sustainability': 'from-emerald-600/20 via-teal-600/10 to-transparent',
  'healthcare': 'from-rose-600/20 via-orange-600/10 to-transparent',
  'education': 'from-amber-600/20 via-yellow-600/10 to-transparent',
  'fintech': 'from-violet-600/20 via-purple-600/10 to-transparent',
  'web-development': 'from-cyan-600/20 via-sky-600/10 to-transparent',
  'social-impact': 'from-stone-600/20 via-neutral-600/10 to-transparent',
};

export function ProjectCard({
  project,
  variant = 'default',
  className,
}: ProjectCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';
  const categorySlug = project.category?.slug || '';
  const gradient = categoryGradients[categorySlug] || 'from-terracotta/20 via-stone/10 to-transparent';

  if (isCompact) {
    return (
      <Link href={`/explore/${project.slug}`} className="block group">
        <Card
          interactive
          className={cn(
            'p-3.5 flex items-center justify-between gap-4 transition-all hover:border-accent/40',
            className
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-md bg-surface-hover border border-border flex items-center justify-center font-bold text-xs text-text-secondary shrink-0 group-hover:border-accent/50 group-hover:text-accent transition-colors">
              {project.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-text-primary truncate group-hover:text-accent transition-colors">
                {project.name}
              </h4>
              <p className="text-xs text-text-muted truncate">
                {project.team.name} • {project.category.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {project.officialScore && (
              <div className="text-right">
                <span className="text-xs font-semibold text-text-primary">
                  {project.officialScore}
                </span>
                <span className="text-[10px] text-text-muted">/10</span>
              </div>
            )}
            <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/explore/${project.slug}`} className="block group h-full">
      <Card
        interactive
        className={cn(
          'flex flex-col h-full overflow-hidden transition-all duration-200 hover:border-accent/50 hover:shadow-md',
          isFeatured ? 'border-accent/30 bg-bg-card-warm/50' : 'bg-bg-card',
          className
        )}
      >
        {/* Card Header Media Placeholder */}
        <div className={cn(
          'relative w-full bg-gradient-to-br border-b border-border p-5 flex flex-col justify-between overflow-hidden',
          gradient,
          isFeatured ? 'h-48' : 'h-36'
        )}>
          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#292925_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex items-start justify-between gap-2">
            <Badge variant="outline" size="sm" className="bg-bg-card/90 backdrop-blur-sm border-border">
              {project.category.name}
            </Badge>

            {project.award ? (
              <Badge variant="warning" size="sm" className="font-semibold flex items-center gap-1 shadow-sm">
                <Award className="w-3 h-3" />
                <span>{project.award}</span>
              </Badge>
            ) : project.officialScore ? (
              <div className="px-2 py-0.5 rounded text-xs font-semibold bg-bg-card/90 backdrop-blur-sm border border-border text-text-primary flex items-center gap-1 shadow-sm">
                <Star className="w-3 h-3 text-accent fill-accent" />
                <span>{project.officialScore}</span>
                <span className="text-[10px] text-text-muted">/10</span>
              </div>
            ) : null}
          </div>

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-lg bg-bg-card border border-border shadow-sm flex items-center justify-center font-bold text-base text-accent group-hover:scale-105 transition-transform">
              {project.name.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-base text-text-primary group-hover:text-accent transition-colors line-clamp-1">
                {project.name}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-text-muted shrink-0 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>

            <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
              {project.shortDescription}
            </p>
          </div>

          {/* Tech tags & Team */}
          <div className="space-y-3 pt-2 border-t border-border/60">
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech.id}
                  className="inline-block px-1.5 py-0.5 text-[10px] font-medium bg-surface-hover text-text-secondary rounded border border-border/50"
                >
                  {tech.name}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="inline-block px-1.5 py-0.5 text-[10px] font-medium text-text-muted">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-text-muted">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-text-secondary" />
                <span className="font-medium text-text-secondary truncate max-w-[140px]">
                  {project.team.name}
                </span>
              </div>
              <span>Rabinjathon &apos;25</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
