'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ClipboardCheck,
  Code,
  Lightbulb,
  TrendingUp,
  BookOpen,
  Scale,
  Presentation,
  Target,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import type { NexMode } from '@/lib/types';
import { nexModeLabels } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const iconMap: Record<string, React.ElementType> = {
  ClipboardCheck,
  Code,
  Lightbulb,
  TrendingUp,
  BookOpen,
  Scale,
  Presentation,
  Target,
};

export function NexWorkspaceSetup() {
  const router = useRouter();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [eventContext, setEventContext] = useState('Rabinjathon 2025 Rubric');
  const [selectedMode, setSelectedMode] = useState<NexMode>('full-analysis');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    setIsSubmitting(true);
    // In Stage 1 prototype, routes to the demo workspace
    setTimeout(() => {
      router.push('/nex/workspace/nex-ws-1');
    }, 600);
  };

  return (
    <Card className="p-6 sm:p-8 bg-bg-card border-border shadow-sm max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-nex-accent-light text-nex-primary text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Private Analysis Workspace</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          Configure NEX Evaluation Parameters
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          Specify your project scope and the evaluation rubric NEX should apply during document analysis and judge simulation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Name & Context */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-text-primary mb-1">
              Project Name *
            </label>
            <input
              type="text"
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. Autonomous Solar Navigation Rover"
              className="w-full px-3.5 py-2.5 text-sm bg-bg-card border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-nex-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary mb-1">
              Project Summary & Technical Claim Overview
            </label>
            <textarea
              rows={3}
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Briefly state the problem, your architecture, and key claims you want tested..."
              className="w-full p-3 text-sm bg-bg-card border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-nex-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary mb-1">
              Judging Context & Rubric Preset
            </label>
            <select
              value={eventContext}
              onChange={(e) => setEventContext(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-bg-card border border-border rounded-lg text-text-primary focus:outline-none focus:border-nex-primary"
            >
              <option value="Rabinjathon 2025 Rubric">
                Rabinjathon 2025 Official Rubric (5 Criteria)
              </option>
              <option value="Academic Defense Viva">
                Academic Master&apos;s Thesis & Research Defense
              </option>
              <option value="Investor Due Diligence">
                Investor Technical Due Diligence & Commercial Feasibility
              </option>
              <option value="Provisional NEX Framework">
                Standard NEX Deep-Audit Framework
              </option>
            </select>
          </div>
        </div>

        {/* Evaluation Mode Grid */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-text-primary">
            Select NEX Intelligence Mode
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(nexModeLabels).map(([modeKey, info]) => {
              const isSelected = selectedMode === modeKey;
              const Icon = iconMap[info.icon] || Sparkles;

              return (
                <div
                  key={modeKey}
                  onClick={() => setSelectedMode(modeKey as NexMode)}
                  className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-nex-primary bg-nex-accent-light/40 shadow-xs'
                      : 'border-border bg-bg-card hover:bg-surface-hover'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? 'text-nex-primary' : 'text-text-muted'
                      }`}
                    />
                    <span
                      className={`text-xs font-bold ${
                        isSelected ? 'text-nex-primary' : 'text-text-primary'
                      }`}
                    >
                      {info.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-snug">
                    {info.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Privacy Assurance */}
        <div className="p-3.5 bg-nex-bg rounded-lg border border-border flex items-start gap-2.5 text-xs text-text-secondary">
          <ShieldCheck className="w-4 h-4 text-nex-primary shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Confidentiality Guarantee:</strong> Private materials uploaded to NEX AI are isolated to your workspace and will never be published publicly or used to train third-party models without consent.
          </p>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="nex"
            size="lg"
            loading={isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 shadow-sm font-semibold"
          >
            <span>Initialize Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
}
