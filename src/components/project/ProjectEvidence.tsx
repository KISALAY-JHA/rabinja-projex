import React from 'react';
import {
  FileText,
  FileCode,
  FileCheck,
  Download,
  ShieldCheck,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import type { Project } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface ProjectEvidenceProps {
  project: Project;
}

export function ProjectEvidence({ project }: ProjectEvidenceProps) {
  // Mock documents submitted for this project
  const submittedDocs = [
    {
      name: `${project.name}_Final_Report.pdf`,
      type: 'Technical Specification',
      size: '3.4 MB',
      verified: true,
      pages: 18,
    },
    {
      name: `${project.name}_SlideDeck_Rabinjathon.pdf`,
      type: 'Pitch & Architecture Deck',
      size: '5.1 MB',
      verified: true,
      pages: 24,
    },
    {
      name: 'System_Benchmark_Results.csv',
      type: 'Empirical Logs',
      size: '420 KB',
      verified: true,
      pages: 1,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-accent" />
            <span>Audited Project Evidence & Materials</span>
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Original documents submitted by {project.team.name} for Rabinjathon judging review.
          </p>
        </div>

        <Badge variant="outline" size="sm" className="bg-bg-card self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-success mr-1 inline" />
          <span>3 files verified by platform admins</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {submittedDocs.map((doc, idx) => (
          <Card
            key={idx}
            className="p-4 bg-bg-card border-border flex flex-col justify-between gap-4 transition-all hover:border-accent/40"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-hover flex items-center justify-center text-accent">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-text-muted">
                  {doc.size}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-text-primary line-clamp-1">
                  {doc.name}
                </h4>
                <p className="text-[11px] text-text-muted mt-0.5">
                  {doc.type} • {doc.pages} {doc.pages === 1 ? 'record' : 'pages'}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs text-accent hover:bg-accent-light/50 flex items-center justify-center gap-1.5"
            >
              <Download className="w-3 h-3" />
              <span>Inspect Document</span>
            </Button>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-nex-bg/80 border-border flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-nex-primary text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <strong className="text-text-primary">Want to test your own project materials?</strong>
            <p className="text-text-secondary">
              Upload your slide deck or whitepaper into NEX AI for private analysis and judge question rehearsal.
            </p>
          </div>
        </div>

        <Button variant="nex" size="sm" className="shrink-0 text-xs shadow-sm">
          Try NEX Upload
        </Button>
      </Card>
    </div>
  );
}
