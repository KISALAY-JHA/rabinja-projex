import React from 'react';
import {
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Users,
  Sparkles,
  Briefcase,
  HelpCircle,
} from 'lucide-react';
import type { Project } from '@/lib/types';
import { Card } from '@/components/ui/Card';

interface ProjectOverviewProps {
  project: Project;
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <div className="space-y-8">
      {/* Problem & Impact side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-bg-card border-border space-y-3">
          <div className="flex items-center gap-2 text-error font-semibold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>The Problem Statement</span>
          </div>
          <h3 className="text-lg font-bold text-text-primary">
            What real-world challenge is being addressed?
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {project.problemStatement}
          </p>
        </Card>

        <Card className="p-6 bg-bg-card border-border space-y-3">
          <div className="flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Why This Problem Matters</span>
          </div>
          <h3 className="text-lg font-bold text-text-primary">
            Significance & urgency of resolution
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {project.whyItMatters}
          </p>
        </Card>
      </div>

      {/* Proposed Solution & Innovation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-bg-card border-border space-y-3">
          <div className="flex items-center gap-2 text-secondary font-semibold text-xs uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>Proposed Solution</span>
          </div>
          <h3 className="text-lg font-bold text-text-primary">
            The core conceptual approach
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {project.proposedSolution}
          </p>
          <div className="pt-2 text-xs text-text-muted">
            <strong>Target Audience:</strong> {project.targetUsers}
          </div>
        </Card>

        <Card className="p-6 bg-bg-card-warm border-border space-y-3">
          <div className="flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Novelty & Innovation</span>
          </div>
          <h3 className="text-lg font-bold text-text-primary">
            What makes this distinct?
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {project.innovation}
          </p>
        </Card>
      </div>

      {/* Key Features */}
      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <Card className="p-6 bg-bg-card border-border space-y-4">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span>Demonstrated Key Capabilities</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-md bg-surface-hover/60 border border-border/50 text-xs text-text-primary"
              >
                <span className="w-5 h-5 rounded-full bg-accent-light text-accent flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{feat}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Practical Applications */}
      {project.practicalApplications && project.practicalApplications.length > 0 && (
        <Card className="p-6 bg-bg-card border-border space-y-4">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-secondary" />
            <span>Real-World & Commercial Applications</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.practicalApplications.map((app, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-md bg-secondary-light/60 text-secondary font-medium text-xs border border-secondary/20"
              >
                {app}
              </span>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
