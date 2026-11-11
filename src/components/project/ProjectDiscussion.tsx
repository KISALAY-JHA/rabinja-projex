'use client';

import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, ShieldAlert, Flag, User } from 'lucide-react';
import type { Discussion } from '@/lib/types';
import { demoDiscussions } from '@/lib/mock-data';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatShortDate } from '@/lib/utils';

interface ProjectDiscussionProps {
  projectId: string;
}

export function ProjectDiscussion({ projectId }: ProjectDiscussionProps) {
  const discussions = demoDiscussions.filter((d) => d.projectId === projectId);
  const [commentText, setCommentText] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-accent" />
            <span>Community Discussion & Technical Inquiries</span>
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Discuss architectural decisions, ask questions to the creators, and review community insights.
          </p>
        </div>
        <span className="text-xs text-text-muted">
          {discussions.length} active threads
        </span>
      </div>

      {/* Discussion List */}
      <div className="space-y-4">
        {discussions.length === 0 ? (
          <Card className="p-6 text-center bg-bg-card border-border">
            <p className="text-xs text-text-muted">
              No discussions have been opened for this project yet.
            </p>
          </Card>
        ) : (
          discussions.map((disc) => (
            <Card key={disc.id} className="p-5 bg-bg-card border-border space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-accent-light text-accent flex items-center justify-center font-bold text-[10px]">
                    {disc.user.name.slice(0, 1)}
                  </div>
                  <span className="font-semibold text-text-primary">
                    {disc.user.name}
                  </span>
                  <span className="text-text-muted">•</span>
                  <span className="text-text-muted">
                    {formatShortDate(disc.createdAt)}
                  </span>
                </div>

                <button
                  type="button"
                  className="text-text-muted hover:text-error transition-colors text-[11px] flex items-center gap-1"
                  title="Report inappropriate content"
                >
                  <Flag className="w-3 h-3" />
                  <span>Report</span>
                </button>
              </div>

              <div>
                <h4 className="font-bold text-sm text-text-primary">
                  {disc.title}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed mt-1">
                  {disc.content}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-2 border-t border-border/50 text-xs text-text-muted">
                <button className="flex items-center gap-1 hover:text-accent transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful (4)</span>
                </button>
                <span>•</span>
                <span>{disc.replyCount} replies from creator & judges</span>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Post comment input mockup */}
      <Card className="p-4 bg-bg-card-warm border-border space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
          <ShieldAlert className="w-3.5 h-3.5 text-accent" />
          <span>Moderated Community Guidelines</span>
        </div>
        <textarea
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Ask a technical question about the architecture or methodology..."
          className="w-full p-3 text-xs bg-bg-card border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
        />
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-text-muted">
            Comments are held for editorial review to prevent spam and toxicity.
          </span>
          <Button
            size="sm"
            disabled={!commentText.trim()}
            className="flex items-center gap-1.5 text-xs shadow-sm"
          >
            <Send className="w-3 h-3" />
            <span>Submit Inquiry</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
