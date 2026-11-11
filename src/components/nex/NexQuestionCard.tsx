'use client';

import React, { useState } from 'react';
import {
  Scale,
  BrainCircuit,
  Send,
  HelpCircle,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import type { NexQuestion } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface NexQuestionCardProps {
  question: NexQuestion;
  index: number;
}

export function NexQuestionCard({ question, index }: NexQuestionCardProps) {
  const [answer, setAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationFeedback, setEvaluationFeedback] = useState<string | null>(null);

  const handleEvaluate = () => {
    if (!answer.trim()) return;
    setIsEvaluating(true);

    setTimeout(() => {
      setIsEvaluating(false);
      setEvaluationFeedback(
        'Evaluation: You correctly addressed the threshold calibration and false-positive handling. However, you omitted explaining how your sensor fusion algorithm handles thermal noise over long periods. Recommend adding empirical test metrics for sustained operation.'
      );
    }, 700);
  };

  return (
    <Card className="p-5 bg-bg-card border-border space-y-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-nex-accent-light text-nex-primary flex items-center justify-center font-bold text-xs shrink-0">
            Q{index + 1}
          </span>
          <Badge variant="outline" size="sm" className="font-semibold text-text-primary">
            {question.category}
          </Badge>
        </div>

        <Badge
          variant={
            question.difficulty === 'advanced'
              ? 'warning'
              : question.difficulty === 'expert'
              ? 'error'
              : 'default'
          }
          size="sm"
          className="uppercase tracking-wider text-[10px] self-start sm:self-auto"
        >
          {question.difficulty} Probe
        </Badge>
      </div>

      {/* The Question Text */}
      <div className="space-y-1">
        <h4 className="text-sm sm:text-base font-bold text-text-primary leading-snug">
          &ldquo;{question.question}&rdquo;
        </h4>
        <p className="text-[11px] text-text-muted">
          Simulated question based on weak points identified in your submitted materials.
        </p>
      </div>

      {/* Expected Evaluation Topics */}
      {question.expectedTopics && question.expectedTopics.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-text-secondary">
          <span className="text-text-muted font-medium">Expected key topics:</span>
          {question.expectedTopics.map((topic, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded bg-surface-hover border border-border/60 text-text-primary"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Practice Answer Input */}
      <div className="space-y-2 pt-2">
        <textarea
          rows={3}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Draft your verbal or written defense to this judge inquiry..."
          className="w-full p-3 text-xs bg-bg-card-warm border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-nex-primary"
        />

        <div className="flex items-center justify-between">
          <span className="text-[10px] text-text-muted">
            NEX evaluates technical depth, relevance, and claim veracity.
          </span>
          <Button
            size="sm"
            variant="nex"
            disabled={!answer.trim()}
            loading={isEvaluating}
            onClick={handleEvaluate}
            className="text-xs shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Test My Answer</span>
          </Button>
        </div>
      </div>

      {/* AI Evaluation Feedback Output */}
      {evaluationFeedback && (
        <div className="p-3.5 rounded-lg bg-nex-accent-light/50 border border-nex-accent/30 text-xs text-text-secondary leading-relaxed space-y-1 animate-in fade-in-50">
          <strong className="text-nex-primary block font-semibold">
            NEX Practice Feedback:
          </strong>
          <p>{evaluationFeedback}</p>
        </div>
      )}
    </Card>
  );
}
