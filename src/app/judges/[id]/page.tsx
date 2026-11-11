import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Scale, Star, ArrowUpRight, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { getJudgeById, judges, projects } from '@/lib/mock-data';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface JudgeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return judges.map((j) => ({
    id: j.id,
  }));
}

export default async function JudgeDetailPage({ params }: JudgeDetailPageProps) {
  const { id } = await params;
  const judge = getJudgeById(id);

  if (!judge) {
    notFound();
  }

  // Find all evaluations authored by this judge
  const judgeEvaluations: { project: typeof projects[0]; evalItem: NonNullable<typeof projects[0]['evaluations']>[0] }[] = [];
  projects.forEach((p) => {
    p.evaluations?.forEach((ev) => {
      if (ev.judgeId === judge.id) {
        judgeEvaluations.push({ project: p, evalItem: ev });
      }
    });
  });

  return (
    <PageContainer>
      <div className="space-y-10 py-6 max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/judges"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Judges Panel</span>
        </Link>

        {/* Judge Profile Card */}
        <Card className="p-8 bg-bg-card border-border shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-accent-light text-accent border border-accent/20 flex items-center justify-center font-bold text-2xl shrink-0">
              {judge.name.slice(0, 2).toUpperCase()}
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface-hover text-text-secondary text-xs font-semibold">
                <Scale className="w-3 h-3 text-accent" />
                <span>Rabinjathon 2025 Official Judge</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                {judge.name}
              </h1>
              <p className="text-sm text-text-secondary">
                {judge.title} • <strong className="text-text-primary">{judge.organization}</strong>
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Biography & Academic Background
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {judge.bio}
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Domains of Expertise
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {judge.expertise.map((exp, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-bg-card-warm border border-border text-xs font-semibold text-text-secondary"
                >
                  {exp}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Evaluations Authored by this Judge */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-text-primary">
                Evaluations Authored by {judge.name.split(' ')[0]}
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Official scoring and feedback provided during live project evaluations.
              </p>
            </div>
            <span className="text-xs font-semibold text-text-secondary bg-surface-hover px-2.5 py-1 rounded">
              {judgeEvaluations.length} Published Evaluations
            </span>
          </div>

          <div className="space-y-4">
            {judgeEvaluations.map(({ project, evalItem }) => (
              <Card
                key={evalItem.id}
                className="p-6 bg-bg-card border-border space-y-4 transition-all hover:border-accent/40"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
                  <div>
                    <Link
                      href={`/explore/${project.slug}`}
                      className="text-base font-bold text-text-primary hover:text-accent transition-colors flex items-center gap-1.5"
                    >
                      <span>{project.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-text-muted" />
                    </Link>
                    <p className="text-xs text-text-muted">
                      Team: {project.team.name} • {project.category.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-bg-card-warm px-3 py-1.5 rounded-lg border border-border self-start sm:self-auto">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="font-bold text-sm text-text-primary">
                      {evalItem.overallScore}
                    </span>
                    <span className="text-xs text-text-muted">/ 10</span>
                  </div>
                </div>

                {evalItem.generalComments && (
                  <p className="text-xs text-text-secondary italic leading-relaxed bg-surface-hover/50 p-3 rounded border-l-2 border-accent">
                    &ldquo;{evalItem.generalComments}&rdquo;
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded bg-success-light/30 border border-success/20 space-y-1">
                    <span className="font-bold text-success flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3 h-3" /> Key Strengths
                    </span>
                    <ul className="text-text-secondary space-y-1">
                      {evalItem.strengths.slice(0, 2).map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2.5 rounded bg-warning-light/30 border border-warning/20 space-y-1">
                    <span className="font-bold text-warning flex items-center gap-1 text-[11px]">
                      <AlertTriangle className="w-3 h-3" /> Limitations Noted
                    </span>
                    <ul className="text-text-secondary space-y-1">
                      {evalItem.weaknesses.slice(0, 2).map((w, i) => (
                        <li key={i}>• {w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Link href={`/explore/${project.slug}`}>
                    <Button variant="ghost" size="sm" className="text-xs text-accent">
                      Read Complete Project & Consensus Scores →
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
