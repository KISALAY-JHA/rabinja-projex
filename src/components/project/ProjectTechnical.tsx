import React from 'react';
import {
  Cpu,
  Layers,
  Database,
  GitBranch,
  Terminal,
  ExternalLink,
  Code2,
  Settings,
} from 'lucide-react';
import type { Project } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ProjectTechnicalProps {
  project: Project;
}

export function ProjectTechnical({ project }: ProjectTechnicalProps) {
  return (
    <div className="space-y-6">
      {/* Tech Stack Banner */}
      <Card className="p-6 bg-bg-card border-border space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <Cpu className="w-4 h-4 text-accent" />
            <span>Core Engineering & Technology Stack</span>
          </h3>
          <span className="text-xs text-text-muted">
            {project.technologies.length} verified technologies
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <div
              key={tech.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-card-warm border border-border shadow-xs"
            >
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: tech.color || 'var(--accent)' }}
              />
              <span className="text-xs font-semibold text-text-primary">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Architecture & Implementation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.architecture && (
          <Card className="p-6 bg-bg-card border-border space-y-3">
            <div className="flex items-center gap-2 text-text-secondary text-xs font-semibold uppercase tracking-wider">
              <Layers className="w-4 h-4 text-accent" />
              <span>System Architecture</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {project.architecture}
            </p>
          </Card>
        )}

        {project.implementationDetails && (
          <Card className="p-6 bg-bg-card border-border space-y-3">
            <div className="flex items-center gap-2 text-text-secondary text-xs font-semibold uppercase tracking-wider">
              <Terminal className="w-4 h-4 text-accent" />
              <span>Implementation & Algorithmic Details</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {project.implementationDetails}
            </p>
          </Card>
        )}
      </div>

      {/* Data Sources & Methodology */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.dataSources && (
          <Card className="p-6 bg-bg-card border-border space-y-3">
            <div className="flex items-center gap-2 text-text-secondary text-xs font-semibold uppercase tracking-wider">
              <Database className="w-4 h-4 text-secondary" />
              <span>Data Sources & Benchmark Corpus</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {project.dataSources}
            </p>
          </Card>
        )}

        {project.methodology && (
          <Card className="p-6 bg-bg-card border-border space-y-3">
            <div className="flex items-center gap-2 text-text-secondary text-xs font-semibold uppercase tracking-wider">
              <Settings className="w-4 h-4 text-secondary" />
              <span>Evaluation Methodology & Validation</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {project.methodology}
            </p>
          </Card>
        )}
      </div>

      {/* Code Repository & Demonstration Links */}
      <Card className="p-5 bg-bg-card-warm border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-text-primary">
            Code Repository & Live Build
          </h4>
          <p className="text-xs text-text-muted">
            All code repositories submitted to Rabinjathon were audited during the judging session.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 border-border hover:border-accent text-xs"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Audited Repository</span>
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-1.5 text-xs shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Sandbox Demo</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
