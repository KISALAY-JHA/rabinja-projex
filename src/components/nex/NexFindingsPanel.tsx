'use client';

import React from 'react';
import {
  FileCheck,
  AlertCircle,
  HelpCircle,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import type { NexFinding, EvidenceLevel } from '@/lib/types';
import { evidenceLevelConfig } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface NexFindingsPanelProps {
  findings: NexFinding[];
}

export function NexFindingsPanel({ findings }: NexFindingsPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-nex-primary" />
            <span>Evidence-Grounded Findings ({findings.length})</span>
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Every technical claim is validated against citations and submitted slides.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {findings.map((finding) => {
          const config = evidenceLevelConfig[finding.evidenceLevel] || {
            label: finding.evidenceLevel,
            color: 'text-text-muted',
            bg: 'bg-surface-hover',
          };

          return (
            <Card
              key={finding.id}
              className="p-5 bg-bg-card border-border space-y-4 shadow-xs hover:border-nex-accent/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                    {finding.category}
                  </span>
                  <span className="text-xs text-text-muted">•</span>
                  <h4 className="text-sm font-bold text-text-primary">
                    {finding.title}
                  </h4>
                </div>

                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 self-start sm:self-auto ${config.bg} ${config.color}`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{config.label}</span>
                </span>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed">
                {finding.description}
              </p>

              {/* Citations & Evidence References */}
              {finding.evidenceRefs.length > 0 && (
                <div className="p-3 bg-bg-card-warm rounded-lg border border-border/80 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-nex-primary" />
                    <span>Submitted Source Evidence</span>
                  </span>

                  <div className="space-y-1.5">
                    {finding.evidenceRefs.map((ref, i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-text-secondary"
                      >
                        <span className="font-medium text-text-primary">
                          📄 {ref.documentName} &nbsp;
                          <span className="text-nex-primary font-mono text-[10px] font-semibold">
                            [{ref.location}]
                          </span>
                        </span>
                        {ref.excerpt && (
                          <span className="italic text-text-muted text-[10px] truncate max-w-sm">
                            &ldquo;{ref.excerpt}&rdquo;
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
