'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Scale,
  Star,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  User,
  Quote,
  ChevronDown,
} from 'lucide-react';
import type { Project, Evaluation } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { judgingCriteria } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface ProjectEvaluationProps {
  project: Project;
}

export function ProjectEvaluation({ project }: ProjectEvaluationProps) {
  const evaluations = project.evaluations || [];
  const [activeJudgeIndex, setActiveJudgeIndex] = useState(0);

  if (evaluations.length === 0) {
    return (
      <Card className="p-8 text-center bg-bg-card border-border space-y-3">
        <Scale className="w-10 h-10 text-text-muted mx-auto" />
        <h3 className="text-base font-bold text-text-primary">
          Official Evaluation Pending
        </h3>
        <p className="text-xs text-text-muted max-w-md mx-auto">
          The official judging scores for this project are currently being compiled and audited by the Rabinjathon review committee.
        </p>
      </Card>
    );
  }

  const activeEval = evaluations[activeJudgeIndex];

  return (
    <div className="space-y-6">
      {/* Official Score & Audit Banner */}
      <Card className="p-6 bg-bg-card border-border shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Rabinjathon 2025 Official Evaluation
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
              Consensus Judging Review
            </h3>
            <p className="text-xs text-text-muted">
              Evaluated across 5 standardized rubrics by {evaluations.length} independent industry judges.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-bg-card-warm p-4 rounded-xl border border-border">
            <div className="text-right">
              <div className="text-xs text-text-muted font-medium">Aggregated Score</div>
              <div className="text-2xl sm:text-3xl font-bold text-text-primary">
                {project.officialScore} <span className="text-sm font-normal text-text-muted">/ 10</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-accent-light text-accent flex items-center justify-center font-bold text-base">
              <Star className="w-5 h-5 fill-accent" />
            </div>
          </div>
        </div>

        {/* Rubric Breakdown Progress Bars */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
            Criterion-Wise Breakdown (Weighted Consensus)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {judgingCriteria.map((criterion, idx) => {
              // Calculate average score for this criterion across judges
              const totalScore = evaluations.reduce((sum, ev) => {
                const found = ev.scores.find((s) => s.criterionId === criterion.id);
                return sum + (found ? found.score : 0);
              }, 0);
              const avgScore = totalScore / evaluations.length;
              const percentage = (avgScore / criterion.maxScore) * 100;

              return (
                <div
                  key={criterion.id}
                  className="p-3.5 rounded-lg bg-bg-card-warm border border-border space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-text-primary">
                      {criterion.name}
                    </span>
                    <span className="font-mono font-bold text-accent">
                      {avgScore.toFixed(1)} <span className="text-[10px] text-text-muted font-normal">/ {criterion.maxScore}</span>
                    </span>
                  </div>

                  <div className="w-full bg-border h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-accent h-full rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-text-muted leading-tight">
                    {criterion.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-text-muted pt-2 border-t border-border">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            <span>Official evaluations are immutable and signed by the Rabinjathon committee.</span>
          </div>
          <span>Audit Ref: RJ-2025-EV-{project.id}</span>
        </div>
      </Card>

      {/* Individual Judges' Perspectives */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-text-primary flex items-center gap-2">
            <Scale className="w-4 h-4 text-accent" />
            <span>Individual Judges&apos; Feedback</span>
          </h4>
          <span className="text-xs text-text-muted">
            Select a judge to read their specific notes
          </span>
        </div>

        {/* Judge selector tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {evaluations.map((evalItem, idx) => (
            <button
              key={evalItem.id}
              onClick={() => setActiveJudgeIndex(idx)}
              className={cn(
                'px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-2',
                activeJudgeIndex === idx
                  ? 'bg-accent text-white border-accent shadow-sm'
                  : 'bg-bg-card text-text-secondary border-border hover:bg-surface-hover'
              )}
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                {evalItem.judge.name.slice(0, 1)}
              </div>
              <span>{evalItem.judge.name.split(' ')[0]} {evalItem.judge.name.split(' ')[1] || ''}</span>
              <span className="text-[10px] opacity-80">
                ({evalItem.overallScore})
              </span>
            </button>
          ))}
        </div>

        {/* Active Judge Evaluation Card */}
        {activeEval && (
          <Card className="p-6 bg-bg-card border-border space-y-6 animate-in fade-in-50 duration-200">
            {/* Judge Bio Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-surface-hover border border-border flex items-center justify-center font-bold text-sm text-text-secondary">
                  {activeEval.judge.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <Link
                    href={`/judges/${activeEval.judge.id}`}
                    className="font-bold text-sm sm:text-base text-text-primary hover:text-accent transition-colors"
                  >
                    {activeEval.judge.name}
                  </Link>
                  <p className="text-xs text-text-secondary">
                    {activeEval.judge.title} • {activeEval.judge.organization}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-text-muted">Judge Score</div>
                <div className="text-xl font-bold text-accent">
                  {activeEval.overallScore} <span className="text-xs text-text-muted">/ 10</span>
                </div>
              </div>
            </div>

            {/* General Feedback Quote */}
            {activeEval.generalComments && (
              <div className="p-4 rounded-lg bg-bg-card-warm border-l-4 border-accent text-xs sm:text-sm text-text-secondary leading-relaxed italic relative">
                &ldquo;{activeEval.generalComments}&rdquo;
              </div>
            )}

            {/* Strengths & Weaknesses 2-col */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Strengths */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-success flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Key Strengths Identified</span>
                </h5>
                <ul className="space-y-2 text-xs text-text-secondary">
                  {activeEval.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2 bg-success-light/40 p-2 rounded border border-success/20">
                      <span className="text-success font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-warning flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Limitations & Weaknesses</span>
                </h5>
                <ul className="space-y-2 text-xs text-text-secondary">
                  {activeEval.weaknesses.map((wk, i) => (
                    <li key={i} className="flex items-start gap-2 bg-warning-light/40 p-2 rounded border border-warning/20">
                      <span className="text-warning font-bold">•</span>
                      <span>{wk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-nex-primary flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Recommendations</span>
                </h5>
                <ul className="space-y-2 text-xs text-text-secondary">
                  {activeEval.suggestions.map((sug, i) => (
                    <li key={i} className="flex items-start gap-2 bg-nex-accent-light/40 p-2 rounded border border-nex-accent/20">
                      <span className="text-nex-primary font-bold">•</span>
                      <span>{sug}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
