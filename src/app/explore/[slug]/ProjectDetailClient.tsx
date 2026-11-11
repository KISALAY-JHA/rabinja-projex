'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp, Eye, MessageSquare, ExternalLink,
  Play, ChevronLeft, Share2, Bookmark, Flag, Sparkles,
  Trophy, Clock, Users, Code2, ArrowRight, ThumbsUp,
  CheckCircle2, User,
} from 'lucide-react';
import { SAMPLE_PROJECTS, SAMPLE_COMMENTS, SAMPLE_DISCUSSIONS, SAMPLE_EVALUATIONS } from '@/lib/sample-data';
import { AdSlot } from '@/components/ads/AdSlot';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

type Tab = 'overview' | 'evaluation' | 'discussions' | 'comments';

export function ProjectDetailClient({ slug }: { slug: string }) {
  const [tab, setTab] = useState<Tab>('overview');
  const [voted, setVoted] = useState(false);
  const [commentText, setCommentText] = useState('');

  const project = SAMPLE_PROJECTS.find((p) => p.slug === slug);
  const projectComments = SAMPLE_COMMENTS.filter((c) => c.project_id === project?.id);
  const projectDiscussions = SAMPLE_DISCUSSIONS.filter((d) => d.project_id === project?.id);
  const projectEvals = SAMPLE_EVALUATIONS.filter((e) => e.project_id === project?.id);

  if (!project) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-white mb-4">Project Not Found</h1>
          <Link href="/explore" className="btn btn-primary">
            <ChevronLeft size={16} /> Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const TABS: { key: Tab; label: string; count?: number }[] = [
    { key: 'overview',    label: 'Overview' },
    { key: 'evaluation',  label: 'Judge Evaluation', count: projectEvals.length },
    { key: 'discussions', label: 'Discussions',       count: projectDiscussions.length },
    { key: 'comments',    label: 'Comments',          count: projectComments.length },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* ── Breadcrumb ── */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-surface)]">
        <div className="container-page py-4">
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Link href="/explore" className="hover:text-white transition-colors flex items-center gap-1">
              <ChevronLeft size={14} /> Explore
            </Link>
            <span>/</span>
            <span className="text-[var(--text-secondary)]">{project.category}</span>
            <span>/</span>
            <span className="text-white font-medium truncate">{project.title}</span>
          </div>
        </div>
      </div>

      {/* ── Project Header ── */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-surface)]">
        <div className="container-page py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Title & Meta */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.status === 'featured' && <span className="badge badge-amber">⭐ Featured</span>}
                <span className="badge badge-purple">{project.category}</span>
                {project.event_id && <span className="badge badge-blue">Rabinjathon 2026</span>}
              </div>

              <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
                {project.title}
              </h1>
              {project.subtitle && (
                <p className="text-lg text-[var(--text-secondary)] mb-5 font-medium">{project.subtitle}</p>
              )}

              {/* Team */}
              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-brand flex items-center justify-center">
                    <Users size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{project.team_name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{project.team_members.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-5 text-sm text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5 text-[var(--green)]">
                  <TrendingUp size={14} /> {formatCount(project.vote_count)} votes
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye size={14} /> {formatCount(project.views)} views
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare size={14} /> {projectComments.length} comments
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> Submitted {formatDate(project.created_at)}
                </span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-col gap-3">
              <button
                id="project-vote-btn"
                onClick={() => setVoted(!voted)}
                className={`btn btn-lg justify-center w-full ${voted ? 'btn-secondary border-[var(--green)] text-[var(--green)]' : 'btn-primary'}`}
              >
                <TrendingUp size={18} />
                {voted ? `Voted ▲ ${project.vote_count + 1}` : `Vote ▲ ${project.vote_count}`}
              </button>

              <div className="grid grid-cols-3 gap-2">
                {project.demo_url && (
                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer" id="project-demo-btn" className="btn btn-secondary text-sm justify-center">
                    <Play size={14} /> Demo
                  </a>
                )}
                {project.repo_url && (
                  <a href={project.repo_url} target="_blank" rel="noopener noreferrer" id="project-repo-btn" className="btn btn-secondary text-sm justify-center">
                    <Code2 size={14} /> Code
                  </a>
                )}
                <button id="project-bookmark-btn" className="btn btn-ghost text-sm justify-center">
                  <Bookmark size={14} />
                </button>
                <button id="project-share-btn" className="btn btn-ghost text-sm justify-center">
                  <Share2 size={14} />
                </button>
              </div>

              {/* NEX AI quick analyse */}
              <Link
                href={`/nex?project=${project.slug}`}
                id="project-nex-btn"
                className="btn btn-ghost border border-[rgba(168,85,247,0.3)] justify-center hover:border-[var(--purple)] hover:text-[var(--purple)] transition-all"
              >
                <Sparkles size={15} className="text-[var(--purple)]" />
                Analyse with NEX AI
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-surface)] sticky top-16 z-30">
        <div className="container-page">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.key}
                id={`tab-${t.key}`}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                  tab === t.key
                    ? 'border-[var(--purple)] text-white'
                    : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {t.label}
                {t.count !== undefined && (
                  <span className={`badge text-[10px] px-1.5 py-0.5 ${tab === t.key ? 'badge-purple' : 'badge-gray'}`}>
                    {t.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="container-page py-10">
        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-xl font-bold text-white mb-4">About this Project</h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">{project.description}</p>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Code2 size={18} className="text-[var(--blue)]" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((t) => (
                    <span key={t} className="badge badge-blue text-sm px-3 py-1">{t}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="badge badge-gray"># {tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Score card */}
              {projectEvals.length > 0 && (
                <div className="card p-5">
                  <h4 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
                    Overall Score
                  </h4>
                  <div className="text-center mb-4">
                    <div className="score-display">{projectEvals[0].total_score}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">/ 100</div>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(projectEvals[0].scores as Record<string, number>).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between text-sm">
                        <span className="text-[var(--text-secondary)] capitalize">{key}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-[var(--bg-surface-3)] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-brand"
                              style={{ width: `${(val / 25) * 100}%` }}
                            />
                          </div>
                          <span className="font-mono text-xs text-white w-8 text-right">{val}/25</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick info */}
              <div className="card p-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Category</span>
                  <span className="text-white font-semibold">{project.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Team Size</span>
                  <span className="text-white font-semibold">{project.team_members.length} members</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Status</span>
                  <span className={`badge ${project.status === 'featured' ? 'badge-amber' : 'badge-green'}`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Tech Stack</span>
                  <span className="text-white font-semibold">{project.tech_stack.length} technologies</span>
                </div>
              </div>

              {/* ── Sidebar Sponsor Unit ── */}
              <AdSlot
                format="sidebar"
                title="Post-Quantum Cryptography & Secure Cloud Storage"
                description="HIPAA & GDPR-compliant storage infrastructure with NIST-approved PQC algorithms."
                href="https://cloudflare.com"
                sponsorLabel="Security Sponsor"
              />
            </div>
          </div>
        )}

        {/* EVALUATION */}
        {tab === 'evaluation' && (
          <div className="max-w-3xl space-y-6">
            {projectEvals.length === 0 ? (
              <div className="text-center py-16">
                <Trophy size={40} className="mx-auto mb-4 text-[var(--text-muted)]" />
                <h3 className="font-display text-xl font-bold text-white mb-2">No evaluations yet</h3>
                <p className="text-[var(--text-muted)]">Judge evaluations will appear here once submitted.</p>
              </div>
            ) : (
              projectEvals.map((ev) => (
                <div key={ev.id} className="card p-7">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-9 h-9 rounded-full bg-gradient-brand flex items-center justify-center">
                          <User size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{ev.judge_name}</p>
                          <p className="text-xs text-[var(--text-muted)]">{ev.judge_title}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="score-display text-4xl">{ev.total_score}</div>
                      <div className="text-xs text-[var(--text-muted)]">/ 100</div>
                    </div>
                  </div>

                  {/* Score bars */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {Object.entries(ev.scores as Record<string, number>).map(([key, val]) => (
                      <div key={key} className="bg-[var(--bg-surface-2)] rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-[var(--text-muted)] capitalize">{key}</span>
                          <span className="font-mono text-sm font-bold text-white">{val}/25</span>
                        </div>
                        <div className="h-1.5 bg-[var(--bg-surface-3)] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-brand transition-all"
                            style={{ width: `${(val / 25) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {ev.feedback && (
                    <div className="bg-[var(--bg-surface-2)] rounded-xl p-5 border border-[var(--border)]">
                      <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                        Judge Feedback
                      </p>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed italic">&quot;{ev.feedback}&quot;</p>
                    </div>
                  )}

                  {ev.is_final && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-[var(--green)]">
                      <CheckCircle2 size={13} /> Final evaluation — scores are locked
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* DISCUSSIONS */}
        {tab === 'discussions' && (
          <div className="max-w-3xl space-y-5">
            {projectDiscussions.length === 0 ? (
              <div className="text-center py-16">
                <MessageSquare size={40} className="mx-auto mb-4 text-[var(--text-muted)]" />
                <h3 className="font-display text-xl font-bold text-white mb-2">No discussions yet</h3>
                <p className="text-[var(--text-muted)]">Start a conversation about this project.</p>
              </div>
            ) : (
              projectDiscussions.map((d) => (
                <div key={d.id} className="card card-cyan p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`badge ${
                      d.category === 'question' ? 'badge-blue'
                        : d.category === 'idea' ? 'badge-purple'
                        : d.category === 'feedback' ? 'badge-green'
                        : 'badge-gray'
                    }`}>
                      {d.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">{d.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">{d.body}</p>
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span>by <strong className="text-[var(--text-secondary)]">{d.author.display_name}</strong></span>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1"><MessageSquare size={11} /> {d.reply_count}</span>
                      <span className="flex items-center gap-1 text-[var(--green)]">▲ {d.upvote_count}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* COMMENTS */}
        {tab === 'comments' && (
          <div className="max-w-3xl space-y-5">
            {/* Comment form */}
            <div className="card p-5">
              <h3 className="font-semibold text-white mb-4 text-sm">Leave a Comment</h3>
              <textarea
                id="comment-textarea"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts, ask a question, or give feedback..."
                className="input resize-none mb-3"
                rows={3}
              />
              <div className="flex justify-end">
                <button
                  id="submit-comment-btn"
                  disabled={!commentText.trim()}
                  className="btn btn-primary btn-sm"
                >
                  Post Comment <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Comments list */}
            {projectComments.length === 0 ? (
              <div className="text-center py-16">
                <MessageSquare size={40} className="mx-auto mb-4 text-[var(--text-muted)]" />
                <p className="text-[var(--text-muted)]">Be the first to comment.</p>
              </div>
            ) : (
              projectComments.map((c) => (
                <div key={c.id} className={`card p-5 ${c.parent_id ? 'ml-8 border-l-2 border-[var(--purple)]' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--bg-surface-3)] flex items-center justify-center shrink-0">
                      <User size={14} className="text-[var(--text-muted)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-sm text-white">{c.author.display_name}</span>
                        <span className="text-xs text-[var(--text-muted)] font-mono">@{c.author.username}</span>
                        <span className="text-xs text-[var(--text-muted)] ml-auto">{formatDate(c.created_at)}</span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{c.body}</p>
                      <button className="mt-3 flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--purple)] transition-colors">
                        <ThumbsUp size={12} /> Like · Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
