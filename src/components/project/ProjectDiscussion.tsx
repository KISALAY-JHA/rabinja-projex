'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, ThumbsUp, Send, ShieldAlert, Flag, User, UserPlus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatShortDate } from '@/lib/utils';
import { apiGetDiscussions, apiCreateDiscussion, getStoredUser, type StoredDiscussion } from '@/lib/api-client';

interface ProjectDiscussionProps {
  projectId: string;
}

export function ProjectDiscussion({ projectId }: ProjectDiscussionProps) {
  const [discussions, setDiscussions] = useState<StoredDiscussion[]>([]);
  const [commentText, setCommentText] = useState('');
  const [titleText, setTitleText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getStoredUser());
    apiGetDiscussions(projectId).then(setDiscussions);
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      const newD = await apiCreateDiscussion({
        projectId,
        userId: user.id,
        displayName: user.displayName,
        username: user.username,
        title: titleText.trim() || 'Technical Inquiry',
        body: commentText.trim(),
        category: 'question',
      });
      setDiscussions((prev) => [newD, ...prev]);
      setCommentText('');
      setTitleText('');
    } catch {
      // ignore
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Community Discussion & Technical Inquiries</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Discuss architectural decisions, ask questions to the creators, and review community insights.
          </p>
        </div>
        <span className="text-xs text-zinc-500 font-mono">
          {discussions.length} active threads
        </span>
      </div>

      {/* Discussion List */}
      <div className="space-y-4">
        {discussions.length === 0 ? (
          <Card className="p-6 text-center bg-zinc-950 border-zinc-800">
            <p className="text-xs text-zinc-500 font-mono">
              No discussions have been opened for this project yet. Be the first to start a thread!
            </p>
          </Card>
        ) : (
          discussions.map((disc) => (
            <Card key={disc.id} className="p-5 bg-zinc-950 border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
                    {disc.author.displayName.slice(0, 1)}
                  </div>
                  <span className="font-semibold text-white">
                    {disc.author.displayName}
                  </span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-500 font-mono">
                    {formatShortDate(disc.createdAt)}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm text-white">
                  {disc.title}
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed mt-1">
                  {disc.body}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Post comment input */}
      <Card className="p-4 bg-zinc-950 border-zinc-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
          <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
          <span>Moderated Verified Guidelines</span>
        </div>

        {user ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
              placeholder="Inquiry Subject / Topic..."
              className="w-full p-2.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400"
            />
            <textarea
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Ask a technical question about the architecture or methodology..."
              className="w-full p-3 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400"
              required
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-zinc-500 font-mono">
                Posting as {user.displayName} (@{user.username})
              </span>
              <Button
                size="sm"
                disabled={isSubmitting || !commentText.trim()}
                className="flex items-center gap-1.5 text-xs shadow-sm bg-cyan-400 text-black font-bold hover:bg-cyan-300"
              >
                <Send className="w-3 h-3" />
                <span>Submit Inquiry</span>
              </Button>
            </div>
          </form>
        ) : (
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
            <p className="text-xs text-zinc-400 mb-3 font-mono">
              Sign up for free or sign in to open a technical inquiry.
            </p>
            <div className="flex justify-center gap-2">
              <Link href="/auth/signup" className="btn btn-primary text-xs py-1.5 px-3">
                Sign Up Free
              </Link>
              <Link href="/auth/login" className="btn btn-secondary text-xs py-1.5 px-3">
                Sign In
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
