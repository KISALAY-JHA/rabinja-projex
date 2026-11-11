import React from 'react';
import Link from 'next/link';
import { Trophy, Award, Star, ArrowRight } from 'lucide-react';
import type { ProjectAward } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface EventResultsProps {
  winners: ProjectAward[];
}

export function EventResults({ winners }: EventResultsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            <span>Official Event Winners & Recognitions</span>
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Top ranked projects based on audited jury scores and live project demonstrations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {winners.map((win) => {
          const isGold = win.rank === 1;
          return (
            <Link
              key={win.projectId}
              href={`/explore/${win.project.slug}`}
              className="block group"
            >
              <Card
                interactive
                className={`p-6 bg-bg-card border-border h-full flex flex-col justify-between gap-4 transition-all hover:border-accent hover:shadow-lg ${
                  isGold ? 'border-accent bg-bg-card-warm' : ''
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={isGold ? 'warning' : 'default'}
                      size="md"
                      className="font-bold flex items-center gap-1 shadow-xs"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>{win.award}</span>
                    </Badge>
                    <span className="font-bold text-sm text-text-primary">
                      Rank #{win.rank}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors">
                      {win.project.name}
                    </h4>
                    <p className="text-xs text-text-secondary mt-1 line-clamp-2 leading-relaxed">
                      {win.project.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                  <div className="text-text-muted">
                    Team: <strong className="text-text-primary">{win.project.team.name}</strong>
                  </div>
                  <div className="flex items-center gap-1 text-accent font-semibold">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
