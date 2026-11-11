import React from 'react';
import { Scale, CheckCircle2 } from 'lucide-react';
import type { JudgingCriterion } from '@/lib/types';
import { Card } from '@/components/ui/Card';

interface EventJudgingCriteriaProps {
  criteria: JudgingCriterion[];
}

export function EventJudgingCriteria({ criteria }: EventJudgingCriteriaProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Scale className="w-5 h-5 text-accent" />
            <span>Official Judging Rubrics & Weights</span>
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Every submission to Rabinjathon was evaluated against these 5 standardized criteria.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {criteria.map((crit) => (
          <Card key={crit.id} className="p-5 bg-bg-card border-border space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-bold text-sm text-text-primary">
                {crit.name}
              </h4>
              <span className="text-xs font-bold text-accent px-2 py-0.5 bg-accent-light rounded">
                {Math.round(crit.weight * 100)}% Weight
              </span>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">
              {crit.description}
            </p>

            <div className="text-[11px] text-text-muted pt-2 border-t border-border/60">
              Maximum Score: <strong>{crit.maxScore} points</strong>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
