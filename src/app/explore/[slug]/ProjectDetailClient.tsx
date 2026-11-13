'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp, MessageSquare, ExternalLink,
  Play, ChevronLeft, Share2, Bookmark, Flag, Sparkles,
  Trophy, Users, Code2, ArrowRight, ThumbsUp,
  CheckCircle2, User, Star, Send, ShieldAlert, LogIn, UserPlus
} from 'lucide-react';
import { RABINJA_PROJECTS, type ProjectItem } from '@/lib/sample-data';
import {
  getStoredUser,
  apiGetVote,
  apiToggleVote,
  apiGetRatings,
  apiSubmitRating,
  apiGetDiscussions,
  apiCreateDiscussion,
  apiGetComments,
  apiPostComment,
  type AuthUser
} from '@/lib/api-client';
import { AdSlot } from '@/components/ads/AdSlot';

type Tab = 'overview' | 'rate' | 'discussions' | 'comments';

export function ProjectDetailClient({ slug }: { slug: string }) {
  const [tab, setTab] = useState<Tab>('overview');
  const [user, setUser] = useState<AuthUser | null>(null);

  // Live real data states
  const [voteCount, setVoteCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [votingLoading, setVotingLoading] = useState(false);

  // Ratings state
  const [avgRating, setAvgRating] = useState<number | null>(null);
  const [totalRatings, setTotalRatings] = useState(0);
  const [ratingsList, setRatingsList] = useState<any[]>([]);
  const [selectedStar, setSelectedStar] = useState(5);
  const [ratingReview, setRatingReview] = useState('');
  const [ratingSubmitting, setRatingSubmitting] = useState(false);
  const [ratingSuccess, setRatingSuccess] = useState(false);

  // Discussions state
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [discTitle, setDiscTitle] = useState('');
  const [discBody, setDiscBody] = useState('');
  const [discCategory, setDiscCategory] = useState<'question' | 'feedback' | 'idea' | 'general'>('question');
  const [discSubmitting, setDiscSubmitting] = useState(false);
  const [showNewDiscForm, setShowNewDiscForm] = useState(false);

  // Comments state
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  // Auth prompt modal state
  const [authPromptAction, setAuthPromptAction] = useState<string | null>(null);

  const project = RABINJA_PROJECTS.find((p) => p.slug === slug || p.id === slug);

  // Sync auth state
  useEffect(() => {
    const checkUser = () => setUser(getStoredUser());
    checkUser();
    window.addEventListener('rabinja-auth-change', checkUser);
    return () => window.removeEventListener('rabinja-auth-change', checkUser);
  }, []);

  // Fetch live backend metrics on mount
  useEffect(() => {
    if (!project) return;
    const currentUserId = user?.id;

    // Fetch vote status
    apiGetVote(project.id, currentUserId).then((res) => {
      setVoteCount(res.voteCount);
      setHasVoted(res.hasVoted);
    });

    // Fetch ratings
    apiGetRatings(project.id).then((res) => {
      setAvgRating(res.averageRating);
      setTotalRatings(res.totalRatings);
      setRatingsList(res.ratings || []);
    });

    // Fetch discussions
    apiGetDiscussions(project.id).then((res) => {
      setDiscussions(res);
    });

    // Fetch comments
    apiGetComments(project.id).then((res) => {
      setComments(res);
    });
  }, [project, user?.id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center max-w-md hud-panel p-8 rounded-2xl border border-zinc-800">
          <h1 className="font-display text-2xl font-bold text-white mb-3">Project Not Found</h1>
          <p className="text-xs text-zinc-400 mb-6">
            The project requested does not exist or has been relocated within the RABINJA ecosystem.
          </p>
          <Link href="/explore" className="btn btn-primary text-xs">
            <ChevronLeft size={16} /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // ── Actions ──

  const handleVoteClick = async () => {
    if (!user) {
      setAuthPromptAction('vote on this project');
      return;
    }
    setVotingLoading(true);
    try {
      const res = await apiToggleVote(project.id, user.id);
      setVoteCount(res.voteCount);
      setHasVoted(res.hasVoted);
    } catch (err: any) {
      alert(err?.message || 'Vote failed');
    } finally {
      setVotingLoading(false);
    }
  };

  const handleRatingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setAuthPromptAction('rate this innovation');
      return;
    }
    setRatingSubmitting(true);
    try {
      const res = await apiSubmitRating({
        projectId: project.id,
        userId: user.id,
        userName: user.displayName,
        rating: selectedStar,
        review: ratingReview,
      });
      setAvgRating(res.averageRating);
      setTotalRatings(res.totalRatings);
      setRatingsList((prev) => [res.ratingItem, ...prev.filter((r) => r.userId !== user.id)]);
      setRatingSuccess(true);
      setRatingReview('');
      setTimeout(() => setRatingSuccess(false), 3000);
    } catch (err: any) {
      alert(err?.message || 'Rating failed');
    } finally {
      setRatingSubmitting(false);
    }
  };

  const handleDiscussionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setAuthPromptAction('start a technical discussion');
      return;
    }
    if (!discTitle.trim() || !discBody.trim()) return;

    setDiscSubmitting(true);
    try {
      const newDisc = await apiCreateDiscussion({
        projectId: project.id,
        userId: user.id,
        displayName: user.displayName,
        username: user.username,
        title: discTitle,
        body: discBody,
        category: discCategory,
      });
      setDiscussions((prev) => [newDisc, ...prev]);
      setDiscTitle('');
      setDiscBody('');
      setShowNewDiscForm(false);
    } catch (err: any) {
      alert(err?.message || 'Discussion creation failed');
    } finally {
      setDiscSubmitting(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setAuthPromptAction('leave a comment');
      return;
    }
    if (!commentText.trim()) return;

    setCommentSubmitting(true);
    try {
      const newComment = await apiPostComment({
        projectId: project.id,
        userId: user.id,
        displayName: user.displayName,
        username: user.username,
        body: commentText,
      });
      setComments((prev) => [...prev, newComment]);
      setCommentText('');
    } catch (err: any) {
      alert(err?.message || 'Failed to post comment');
    } finally {
      setCommentSubmitting(false);
    }
  };

  const TABS: { key: Tab; label: string; count?: number }[] = [
    { key: 'overview',    label: 'Overview' },
    { key: 'rate',        label: 'Community Ratings', count: totalRatings },
    { key: 'discussions', label: 'Discussions',       count: discussions.length },
    { key: 'comments',    label: 'Comments',          count: comments.length },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ── Breadcrumb ── */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/80">
        <div className="container-page py-3.5">
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <Link href="/explore" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <ChevronLeft size={14} /> Projects
            </Link>
            <span>/</span>
            <span className="text-cyan-400">{project.category}</span>
            <span>/</span>
            <span className="text-white font-medium truncate">{project.title}</span>
          </div>
        </div>
      </div>

      {/* ── Project Header ── */}
      <div className="border-b border-zinc-800/80 bg-gradient-to-b from-zinc-950 to-black">
        <div className="container-page py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Title & Meta */}
            <div className="lg:col-span-2">
              {/* Special Category Emblem for RABINJA Brand */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/50 text-[11px] font-mono font-bold text-cyan-300 uppercase tracking-widest shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                  <Sparkles size={12} className="text-cyan-400" />
                  RABINJA ORIGINAL // BRAND PART
                </span>
                <span className="badge badge-purple text-xs">
                  {project.brand_category}
                </span>
              </div>

              <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
                {project.title}
              </h1>
              {project.subtitle && (
                <p className="text-base sm:text-lg text-zinc-300 mb-5 font-normal leading-relaxed">
                  {project.subtitle}
                </p>
              )}

              {/* Team attribution */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-black border border-cyan-400/50 p-1 flex items-center justify-center shadow-[0_0_10px_rgba(0,212,255,0.2)]">
                  <img src="/logo.png" alt="RABINJA" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    {project.team_name}
                  </p>
                  <p className="text-xs text-cyan-400 font-mono">
                    {project.team_members.join(' • ')}
                  </p>
                </div>
              </div>

              {/* Real Genuine Metrics Display (No fake views or inflated numbers) */}
              <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <TrendingUp size={14} />
                  <span>{voteCount} verified community {voteCount === 1 ? 'vote' : 'votes'}</span>
                </span>
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star size={14} className="fill-amber-400" />
                  <span>
                    {avgRating !== null ? `${avgRating} / 5.0 (${totalRatings} ${totalRatings === 1 ? 'rating' : 'ratings'})` : 'No ratings yet'}
                  </span>
                </span>
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <MessageSquare size={14} />
                  <span>{discussions.length} technical {discussions.length === 1 ? 'inquiry' : 'inquiries'}</span>
                </span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-col gap-3 justify-center">
              {/* Live Real Vote Button */}
              <button
                id="project-vote-btn"
                onClick={handleVoteClick}
                disabled={votingLoading}
                className={`btn btn-lg justify-center w-full font-mono font-bold text-sm tracking-wider transition-all active:scale-95 ${
                  hasVoted
                    ? 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'btn-primary shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                }`}
              >
                <TrendingUp size={18} className={hasVoted ? 'text-emerald-400' : ''} />
                {votingLoading ? 'Updating...' : hasVoted ? `Voted ▲ ${voteCount}` : `Vote ▲ ${voteCount}`}
              </button>

              <div className="grid grid-cols-2 gap-2">
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary text-xs justify-center"
                  >
                    <Play size={13} /> Demo URL
                  </a>
                )}
                {project.repo_url && (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary text-xs justify-center"
                  >
                    <Code2 size={13} /> Repository
                  </a>
                )}
              </div>

              {/* NEX AI Stress Testing */}
              <Link
                href={`/nex?project=${project.slug}`}
                className="btn btn-ghost border border-cyan-500/30 text-cyan-300 justify-center hover:border-cyan-400 transition-all font-mono text-xs py-2.5"
              >
                <Sparkles size={14} className="text-cyan-400" />
                Stress Test with NEX AI
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/90 sticky top-14 sm:top-16 z-30 backdrop-blur-md">
        <div className="container-page">
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                id={`tab-${t.key}`}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-mono font-bold border-b-2 transition-all whitespace-nowrap ${
                  tab === t.key
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                {t.label}
                {t.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    tab === t.key ? 'bg-cyan-400 text-black font-bold' : 'bg-zinc-800 text-zinc-400'
                  }`}>
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
        {/* TAB: OVERVIEW */}
        {tab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-lg sm:text-xl font-bold text-white mb-3">
                  About {project.title}
                </h2>
                <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>
              </div>

              <div>
                <h3 className="font-display text-base font-bold text-white mb-3 flex items-center gap-2">
                  <Code2 size={16} className="text-cyan-400" />
                  Engineering Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-cyan-300 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-base font-bold text-white mb-3">
                  Ecosystem Domains
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="card p-5 bg-[#05070E] border border-cyan-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
                    RABINJA BRAND PART
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Official Ecosystem Innovation
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  This project is engineered by RABINJA LABS as a core piece of the RABINJA ecosystem. All feedback, community ratings, and architectural discussions feed directly into development.
                </p>
                <div className="text-[11px] font-mono text-zinc-500 space-y-1.5 border-t border-zinc-900 pt-3">
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="text-white font-bold">{project.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-emerald-400 font-bold uppercase">{project.status}</span>
                  </div>
                </div>
              </div>

              <AdSlot
                format="sidebar"
                title="RABINJA Autonomous Systems"
                description="Engineered for high-throughput, decentralized verification and AI-assisted stress-testing."
                href="https://rabinja.com"
                sponsorLabel="Brand Partner"
              />
            </div>
          </div>
        )}

        {/* TAB: COMMUNITY RATINGS (Real working ratings) */}
        {tab === 'rate' && (
          <div className="max-w-3xl space-y-8 text-left">
            {/* Rating Summary Card */}
            <div className="card p-6 sm:p-8 bg-[#05070E] border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest block mb-1">
                  // COMMUNITY CONSENSUS
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
                  Real Community Score
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Scores calculated exclusively from verified user accounts. Zero artificial ratings.
                </p>
              </div>

              <div className="text-center bg-black/80 px-6 py-4 rounded-2xl border border-zinc-800">
                <div className="font-mono text-3xl sm:text-4xl font-black text-amber-400">
                  {avgRating !== null ? `${avgRating}` : '—'}
                </div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
                  {totalRatings === 0 ? 'No Ratings Yet' : `Out of 5.0 (${totalRatings})`}
                </div>
              </div>
            </div>

            {/* Rate This Project Form */}
            <div className="card p-6 bg-zinc-950 border border-zinc-800">
              <h4 className="font-display text-base font-bold text-white mb-2">
                Submit Your Rating for {project.title}
              </h4>
              <p className="text-xs text-zinc-400 mb-4">
                Evaluate this project on engineering depth, usability, and architecture.
              </p>

              {user ? (
                <form onSubmit={handleRatingSubmit} className="space-y-4">
                  {/* Star Selector */}
                  <div>
                    <label className="text-xs font-mono text-zinc-400 block mb-1.5">
                      Select Star Score (1 - 5)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setSelectedStar(star)}
                          className={`p-2 rounded-xl transition-all ${
                            selectedStar >= star
                              ? 'text-amber-400 bg-amber-400/10 border border-amber-400/40'
                              : 'text-zinc-600 bg-zinc-900 border border-zinc-800 hover:text-zinc-400'
                          }`}
                        >
                          <Star size={20} className={selectedStar >= star ? 'fill-amber-400' : ''} />
                        </button>
                      ))}
                      <span className="font-mono text-xs text-amber-400 font-bold ml-2">
                        {selectedStar} of 5 Stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-400 block mb-1.5">
                      Review / Constructive Feedback (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={ratingReview}
                      onChange={(e) => setRatingReview(e.target.value)}
                      placeholder="Share your thoughts on the architecture, technical viability, or feature suggestions..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  {ratingSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      Your verified rating has been published!
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={ratingSubmitting}
                    className="btn btn-primary text-xs py-2.5 px-4 font-mono font-bold"
                  >
                    {ratingSubmitting ? 'Submitting...' : 'Publish Rating'}
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
                  <p className="text-xs text-zinc-300 mb-3">
                    Sign in or create your free innovator account to rate and review this project.
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
            </div>

            {/* Ratings List */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Verified Community Reviews ({ratingsList.length})
              </h4>
              {ratingsList.length === 0 ? (
                <div className="card p-6 text-center border-dashed border-zinc-800 text-zinc-500 text-xs font-mono">
                  No community reviews submitted yet. Be the first verified builder to rate {project.title}!
                </div>
              ) : (
                ratingsList.map((r, i) => (
                  <div key={r.id || i} className="card p-4 bg-zinc-950 border border-zinc-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] flex items-center justify-center font-bold">
                          {r.userName?.slice(0, 1) || 'U'}
                        </div>
                        <span className="font-bold text-xs text-white">{r.userName}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-mono font-bold">
                        <Star size={12} className="fill-amber-400" />
                        <span>{r.rating}.0 / 5.0</span>
                      </div>
                    </div>
                    {r.review && (
                      <p className="text-xs text-zinc-300 leading-relaxed mt-2 pl-8">
                        &quot;{r.review}&quot;
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB: DISCUSSIONS (Real working discussions) */}
        {tab === 'discussions' && (
          <div className="max-w-3xl space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Technical Inquiries & Discussions
                </h3>
                <p className="text-xs text-zinc-400">
                  Direct questions to the RABINJA core team regarding {project.title}.
                </p>
              </div>

              {user ? (
                <button
                  onClick={() => setShowNewDiscForm(!showNewDiscForm)}
                  className="btn btn-primary text-xs py-2 px-3.5 font-mono"
                >
                  {showNewDiscForm ? 'Cancel' : '+ Start Discussion'}
                </button>
              ) : (
                <Link href="/auth/signup" className="btn btn-secondary text-xs py-2 px-3 font-mono">
                  Sign In to Inquire
                </Link>
              )}
            </div>

            {/* New Discussion Form */}
            {showNewDiscForm && user && (
              <form onSubmit={handleDiscussionSubmit} className="card p-5 bg-[#05070E] border-2 border-cyan-400/60 rounded-2xl space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                  Open a New Technical Inquiry
                </h4>
                <div>
                  <input
                    type="text"
                    value={discTitle}
                    onChange={(e) => setDiscTitle(e.target.value)}
                    placeholder="Inquiry subject (e.g. How is data encrypted at rest?)"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    value={discBody}
                    onChange={(e) => setDiscBody(e.target.value)}
                    placeholder="Provide details about your question, suggestion, or feedback..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <select
                    value={discCategory}
                    onChange={(e) => setDiscCategory(e.target.value as any)}
                    className="bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 rounded-xl px-3 py-2 focus:outline-none"
                  >
                    <option value="question">Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="idea">Idea Proposal</option>
                    <option value="general">General</option>
                  </select>
                  <button
                    type="submit"
                    disabled={discSubmitting}
                    className="btn btn-primary text-xs py-2 px-4 font-mono font-bold"
                  >
                    {discSubmitting ? 'Publishing...' : 'Publish Inquiry'}
                  </button>
                </div>
              </form>
            )}

            {/* Discussion List */}
            {discussions.length === 0 ? (
              <div className="card p-10 text-center border-dashed border-zinc-800 text-zinc-500">
                <MessageSquare size={32} className="mx-auto mb-2 opacity-50 text-cyan-400" />
                <p className="text-xs font-mono mb-2">No technical discussions opened yet for {project.title}.</p>
                <p className="text-[11px] text-zinc-600">
                  Ask a question or propose an architectural consideration to the team.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {discussions.map((d) => (
                  <div key={d.id} className="card p-5 bg-[#05070E] border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-400 uppercase font-bold">
                          {d.category}
                        </span>
                        <span className="text-xs font-bold text-white">{d.author?.displayName || 'Innovator'}</span>
                        <span className="text-[11px] font-mono text-zinc-500">@{d.author?.username}</span>
                      </div>
                    </div>
                    <h4 className="font-display text-sm font-bold text-white mb-1.5">{d.title}</h4>
                    <p className="text-xs text-zinc-300 leading-relaxed mb-3">{d.body}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-900 text-[11px] font-mono text-zinc-500">
                      <span>RABINJA Verified Thread</span>
                      <span>{new Date(d.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: COMMENTS (Real working comments) */}
        {tab === 'comments' && (
          <div className="max-w-3xl space-y-6 text-left">
            {/* Comment Form */}
            <div className="card p-5 bg-[#05070E] border border-zinc-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Leave a Verified Comment
              </h4>
              {user ? (
                <form onSubmit={handleCommentSubmit} className="space-y-3">
                  <textarea
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share quick thoughts, impressions, or congratulations..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                    required
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={commentSubmitting || !commentText.trim()}
                      className="btn btn-primary text-xs py-2 px-4 font-mono font-bold"
                    >
                      {commentSubmitting ? 'Posting...' : 'Post Comment'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
                  <p className="text-xs text-zinc-300 mb-3">
                    Sign in or register for free to post comments under your innovator profile.
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
            </div>

            {/* Comments List */}
            {comments.length === 0 ? (
              <div className="card p-8 text-center border-dashed border-zinc-800 text-zinc-500 text-xs font-mono">
                No comments posted yet. Be the first to leave a comment on {project.title}!
              </div>
            ) : (
              <div className="space-y-3">
                {comments.map((c) => (
                  <div key={c.id} className="card p-4 bg-zinc-950 border border-zinc-800">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 font-mono text-[10px] flex items-center justify-center font-bold">
                        {c.author?.displayName?.slice(0, 1) || 'U'}
                      </div>
                      <span className="font-bold text-xs text-white">{c.author?.displayName}</span>
                      <span className="text-[11px] font-mono text-zinc-500">@{c.author?.username}</span>
                      <span className="text-[10px] text-zinc-600 ml-auto font-mono">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed pl-8">{c.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── GUEST AUTH PROMPT MODAL ── */}
      {authPromptAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-sm w-full card p-6 bg-[#05070E] border-2 border-cyan-400 rounded-3xl text-center shadow-[0_0_50px_rgba(0,212,255,0.3)] animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-gradient-brand mx-auto mb-3 flex items-center justify-center shadow-md">
              <UserPlus size={22} className="text-black" />
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-1">
              Authentication Required
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed mb-5">
              To {authPromptAction}, create your free innovator profile or sign in. This ensures verified peer interaction without bot manipulation.
            </p>
            <div className="space-y-2">
              <Link
                href="/auth/signup"
                className="btn btn-primary w-full justify-center text-xs py-2.5 font-bold"
              >
                Sign Up for Free
              </Link>
              <Link
                href="/auth/login"
                className="btn btn-secondary w-full justify-center text-xs py-2.5 font-mono"
              >
                Sign In
              </Link>
              <button
                onClick={() => setAuthPromptAction(null)}
                className="w-full text-[11px] text-zinc-500 hover:text-white py-1 font-mono"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
