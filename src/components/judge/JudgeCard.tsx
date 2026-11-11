import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Judge } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface JudgeCardProps {
  judge: Judge;
}

export function JudgeCard({ judge }: JudgeCardProps) {
  return (
    <Link href={`/judges/${judge.id}`} className="block group">
      <Card
        interactive
        className="p-5 bg-bg-card border-border h-full flex flex-col justify-between gap-4 transition-all hover:border-accent hover:shadow-md"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent-light text-accent border border-accent/20 flex items-center justify-center font-bold text-sm shrink-0 group-hover:scale-105 transition-transform">
              {judge.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors truncate">
                {judge.name}
              </h4>
              <p className="text-xs text-text-muted truncate">
                {judge.title}
              </p>
              <p className="text-[11px] text-text-secondary font-medium truncate">
                {judge.organization}
              </p>
            </div>
          </div>

          <p className="text-xs text-text-secondary line-clamp-3 leading-relaxed">
            {judge.bio}
          </p>
        </div>

        <div className="space-y-2 pt-2 border-t border-border/60">
          <div className="flex flex-wrap gap-1">
            {judge.expertise.slice(0, 3).map((exp, idx) => (
              <span
                key={idx}
                className="text-[10px] px-1.5 py-0.5 rounded bg-surface-hover text-text-secondary font-medium"
              >
                {exp}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-accent font-semibold pt-1">
            <span>Read evaluations</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
