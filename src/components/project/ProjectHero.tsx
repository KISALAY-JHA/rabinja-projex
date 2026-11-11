import React from 'react';
import Link from 'next/link';
import { Award, Star, Users, Calendar, ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';
import type { Project } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <div className="space-y-6">
      {/* Breadcrumb / Back button */}
      <div className="flex items-center justify-between">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Explore</span>
        </Link>

        <div className="flex items-center gap-2">
          {project.award && (
            <Badge variant="warning" size="md" className="font-semibold flex items-center gap-1.5 shadow-sm">
              <Award className="w-3.5 h-3.5" />
              <span>{project.award}</span>
            </Badge>
          )}

          {project.officialScore && (
            <div className="px-3 py-1 rounded-md bg-bg-card border border-border text-sm font-bold text-text-primary flex items-center gap-1.5 shadow-sm">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span>{project.officialScore}</span>
              <span className="text-xs text-text-muted font-normal">/ 10 Official Score</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Title & Badges */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default" size="sm">
            {project.category.name}
          </Badge>
          <span className="text-xs text-text-muted">•</span>
          <span className="text-xs font-medium text-text-secondary">
            Rabinjathon 2025
          </span>
          {project.publishedAt && (
            <>
              <span className="text-xs text-text-muted">•</span>
              <span className="text-xs text-text-muted">
                Evaluated {formatDate(project.publishedAt)}
              </span>
            </>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-[1.15]">
          {project.name}
        </h1>

        <p className="text-base sm:text-lg text-text-secondary max-w-3xl leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Team Members & Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-light text-accent flex items-center justify-center font-bold text-sm border border-accent/20">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-text-muted">Built by Team:</div>
              <div className="text-sm font-semibold text-text-primary">
                {project.team.name}
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-border text-xs text-text-secondary">
              {project.team.members.map((m) => (
                <span key={m.id} className="bg-surface-hover px-2 py-0.5 rounded border border-border/50">
                  {m.name} ({m.role.split('&')[0].trim()})
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/nex?project=${project.slug}`}>
              <Button variant="nex" size="sm" className="flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulate Viva with NEX</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
