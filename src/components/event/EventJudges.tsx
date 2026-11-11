import React from 'react';
import type { Judge } from '@/lib/types';
import { JudgeCard } from '@/components/judge/JudgeCard';
import { Users } from 'lucide-react';

interface EventJudgesProps {
  judges: Judge[];
}

export function EventJudges({ judges }: EventJudgesProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            <span>The Judging Panel</span>
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Distinguished academicians, startup founders, and engineering leaders who conducted live vivas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {judges.map((judge) => (
          <JudgeCard key={judge.id} judge={judge} />
        ))}
      </div>
    </div>
  );
}
