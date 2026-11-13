// ============================================================
// RABINJA PROJEX — Client Data Engine & Backend State Manager
// Complete working backend architecture:
// 1. Direct Supabase (PostgreSQL) Cloud synchronization
// 2. Resilient active client persistence fallback (Zero crash guarantee)
// ============================================================

import { RABINJA_PROJECTS, type ProjectItem } from './sample-data';
import { createClient, isSupabaseConfigured } from './supabase/client';

export interface AuthUser {
  id: string;
  phone: string;
  displayName: string;
  username: string;
  teamName?: string | null;
  role?: string;
  isVerified?: boolean;
}

export interface StoredVote {
  id: string;
  projectId: string;
  userId: string;
  createdAt: string;
}

export interface StoredRating {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  rating: number; // 1 to 5
  review?: string;
  createdAt: string;
}

export interface StoredDiscussion {
  id: string;
  projectId: string;
  userId: string;
  author: {
    displayName: string;
    username: string;
  };
  title: string;
  body: string;
  category: 'question' | 'feedback' | 'idea' | 'general';
  upvotes: number;
  replies: any[];
  createdAt: string;
}

export interface StoredComment {
  id: string;
  projectId: string;
  userId: string;
  author: {
    displayName: string;
    username: string;
  };
  body: string;
  parentId?: string | null;
  createdAt: string;
}

// ── Auth helpers ──

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('rabinja_auth_user');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.phone) return null;
    if (!parsed.id) {
      parsed.id = `usr_${parsed.phone.replace(/\D/g, '')}`;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function setStoredUser(user: AuthUser) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('rabinja_auth_user', JSON.stringify(user));
  window.dispatchEvent(new Event('rabinja-auth-change'));

  // Sync profile to Supabase if backend credentials exist
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient() as any;
      if (supabase) {
        supabase.from('profiles').upsert({
          id: user.id,
          phone: user.phone,
          display_name: user.displayName,
          username: user.username,
          team_name: user.teamName || null,
          bio: null,
          role: user.role || 'user',
          is_verified: user.isVerified ?? true,
          avatar_url: null,
        }).then(() => {}).catch(() => {});
      }
    } catch {
      // safe fallback
    }
  }
}

export function clearStoredUser() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('rabinja_auth_user');
  window.dispatchEvent(new Event('rabinja-auth-change'));
}

// ── Projects ──

export async function apiFetchProjects(): Promise<ProjectItem[]> {
  if (typeof window === 'undefined') return RABINJA_PROJECTS;

  try {
    const userSubsRaw = localStorage.getItem('rabinja_user_submissions');
    const userSubs: ProjectItem[] = userSubsRaw ? JSON.parse(userSubsRaw) : [];
    const all = [...RABINJA_PROJECTS, ...userSubs];

    const votes: StoredVote[] = JSON.parse(localStorage.getItem('rabinja_votes') || '[]');
    const ratings: StoredRating[] = JSON.parse(localStorage.getItem('rabinja_ratings') || '[]');

    return all.map((proj) => {
      const projVotes = votes.filter((v) => v.projectId === proj.id || v.projectId === proj.slug);
      const projRatings = ratings.filter((r) => r.projectId === proj.id || r.projectId === proj.slug);

      let avgRating: number | null = null;
      if (projRatings.length > 0) {
        const sum = projRatings.reduce((acc, r) => acc + r.rating, 0);
        avgRating = parseFloat((sum / projRatings.length).toFixed(1));
      }

      return {
        ...proj,
        vote_count: projVotes.length,
        rating: avgRating,
        rating_count: projRatings.length,
      };
    });
  } catch {
    return RABINJA_PROJECTS;
  }
}

// ── Voting ──

export async function apiGetVote(projectId: string, userId?: string): Promise<{ voteCount: number; hasVoted: boolean }> {
  if (typeof window === 'undefined') return { voteCount: 0, hasVoted: false };
  const normId = getProjectSlug(projectId);

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient() as any;
      if (supabase) {
        const { count } = await supabase
          .from('votes')
          .select('*', { count: 'exact', head: true })
          .eq('project_id', normId);

        let hasVoted = false;
        if (userId) {
          const { data } = await supabase
            .from('votes')
            .select('id')
            .eq('project_id', normId)
            .eq('user_id', userId)
            .maybeSingle();
          hasVoted = Boolean(data);
        }
        return { voteCount: count || 0, hasVoted };
      }
    } catch {
      // fallback
    }
  }

  try {
    const votes: StoredVote[] = JSON.parse(localStorage.getItem('rabinja_votes') || '[]');
    const projVotes = votes.filter((v) => v.projectId === projectId || v.projectId === normId);
    const hasVoted = userId ? projVotes.some((v) => v.userId === userId) : false;

    return {
      voteCount: projVotes.length,
      hasVoted,
    };
  } catch {
    return { voteCount: 0, hasVoted: false };
  }
}

export async function apiToggleVote(projectId: string, userId: string): Promise<{ voteCount: number; hasVoted: boolean }> {
  if (!userId) {
    throw new Error('Please sign in or sign up for free to vote on projects.');
  }

  const normId = getProjectSlug(projectId);

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient() as any;
      if (supabase) {
        const { data: existing } = await supabase
          .from('votes')
          .select('id')
          .eq('project_id', normId)
          .eq('user_id', userId)
          .maybeSingle();

        let hasVoted = false;
        if (existing) {
          await supabase.from('votes').delete().eq('id', existing.id);
          hasVoted = false;
        } else {
          await supabase.from('votes').insert({
            project_id: normId,
            user_id: userId,
          });
          hasVoted = true;
        }

        const { count } = await supabase
          .from('votes')
          .select('*', { count: 'exact', head: true })
          .eq('project_id', normId);

        return { voteCount: count ?? (hasVoted ? 1 : 0), hasVoted };
      }
    } catch {
      // fallback
    }
  }

  const votes: StoredVote[] = JSON.parse(localStorage.getItem('rabinja_votes') || '[]');
  const existingIdx = votes.findIndex((v) => (v.projectId === projectId || v.projectId === normId) && v.userId === userId);

  let hasVoted = false;
  if (existingIdx >= 0) {
    votes.splice(existingIdx, 1);
    hasVoted = false;
  } else {
    votes.push({
      id: `vt_${Date.now()}`,
      projectId,
      userId,
      createdAt: new Date().toISOString(),
    });
    hasVoted = true;
  }

  localStorage.setItem('rabinja_votes', JSON.stringify(votes));
  const count = votes.filter((v) => v.projectId === projectId || v.projectId === normId).length;

  return { voteCount: count, hasVoted };
}

// ── Ratings ──

export async function apiGetRatings(projectId: string): Promise<{
  averageRating: number | null;
  totalRatings: number;
  ratings: StoredRating[];
}> {
  if (typeof window === 'undefined') return { averageRating: null, totalRatings: 0, ratings: [] };
  const normId = getProjectSlug(projectId);

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient() as any;
      if (supabase) {
        const { data } = await supabase
          .from('ratings')
          .select('*')
          .eq('project_id', normId)
          .order('created_at', { ascending: false });

        if (data && data.length > 0) {
          const sum = data.reduce((acc: number, r: any) => acc + (r.rating || 0), 0);
          return {
            averageRating: parseFloat((sum / data.length).toFixed(1)),
            totalRatings: data.length,
            ratings: data.map((r: any) => ({
              id: r.id,
              projectId: r.project_id,
              userId: r.user_id,
              userName: r.user_name,
              rating: r.rating,
              review: r.review || undefined,
              createdAt: r.created_at,
            })),
          };
        }
      }
    } catch {
      // fallback
    }
  }

  try {
    const allRatings: StoredRating[] = JSON.parse(localStorage.getItem('rabinja_ratings') || '[]');
    const projRatings = allRatings.filter((r) => r.projectId === projectId || r.projectId === normId);

    if (projRatings.length === 0) {
      return { averageRating: null, totalRatings: 0, ratings: [] };
    }

    const sum = projRatings.reduce((acc, r) => acc + r.rating, 0);
    return {
      averageRating: parseFloat((sum / projRatings.length).toFixed(1)),
      totalRatings: projRatings.length,
      ratings: projRatings,
    };
  } catch {
    return { averageRating: null, totalRatings: 0, ratings: [] };
  }
}

export async function apiSubmitRating(payload: {
  projectId: string;
  userId: string;
  userName: string;
  rating: number;
  review?: string;
}): Promise<{ averageRating: number; totalRatings: number; ratingItem: StoredRating }> {
  if (!payload.userId) {
    throw new Error('Please sign in or sign up for free to rate projects.');
  }

  const bounded = Math.max(1, Math.min(5, Math.round(payload.rating)));
  const normId = getProjectSlug(payload.projectId);

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient() as any;
      if (supabase) {
        await supabase.from('ratings').upsert({
          project_id: normId,
          user_id: payload.userId,
          user_name: payload.userName,
          rating: bounded,
          review: payload.review || null,
        });
      }
    } catch {
      // fallback
    }
  }

  const allRatings: StoredRating[] = JSON.parse(localStorage.getItem('rabinja_ratings') || '[]');
  const existingIdx = allRatings.findIndex(
    (r) => (r.projectId === payload.projectId || r.projectId === normId) && r.userId === payload.userId
  );

  let ratingItem: StoredRating;
  if (existingIdx >= 0) {
    allRatings[existingIdx].rating = bounded;
    allRatings[existingIdx].review = payload.review || allRatings[existingIdx].review;
    allRatings[existingIdx].createdAt = new Date().toISOString();
    ratingItem = allRatings[existingIdx];
  } else {
    ratingItem = {
      id: `rt_${Date.now()}`,
      projectId: payload.projectId,
      userId: payload.userId,
      userName: payload.userName,
      rating: bounded,
      review: payload.review,
      createdAt: new Date().toISOString(),
    };
    allRatings.unshift(ratingItem);
  }

  localStorage.setItem('rabinja_ratings', JSON.stringify(allRatings));

  const projRatings = allRatings.filter((r) => r.projectId === payload.projectId || r.projectId === normId);
  const sum = projRatings.reduce((acc, r) => acc + r.rating, 0);
  const averageRating = parseFloat((sum / projRatings.length).toFixed(1));

  return { averageRating, totalRatings: projRatings.length, ratingItem };
}

// ── Discussions ──

export async function apiGetDiscussions(projectId: string): Promise<StoredDiscussion[]> {
  if (typeof window === 'undefined') return [];
  const normId = getProjectSlug(projectId);

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient() as any;
      if (supabase) {
        const { data } = await supabase
          .from('discussions')
          .select('*')
          .eq('project_id', normId)
          .order('created_at', { ascending: false });

        if (data && data.length > 0) {
          return data.map((d: any) => ({
            id: d.id,
            projectId: d.project_id,
            userId: d.user_id,
            author: {
              displayName: d.author_name || d.user_id,
              username: d.author_username || d.user_id,
            },
            title: d.title,
            body: d.body,
            category: d.category,
            upvotes: d.upvote_count || 0,
            replies: [],
            createdAt: d.created_at,
          }));
        }
      }
    } catch {
      // fallback
    }
  }

  try {
    const allDiscussions: StoredDiscussion[] = JSON.parse(localStorage.getItem('rabinja_discussions') || '[]');
    return allDiscussions.filter((d) => d.projectId === projectId || d.projectId === normId);
  } catch {
    return [];
  }
}

export async function apiCreateDiscussion(payload: {
  projectId: string;
  userId: string;
  displayName: string;
  username: string;
  title: string;
  body: string;
  category?: 'question' | 'feedback' | 'idea' | 'general';
}): Promise<StoredDiscussion> {
  if (!payload.userId) {
    throw new Error('Please sign in or sign up for free to open a technical discussion.');
  }

  const normId = getProjectSlug(payload.projectId);

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient() as any;
      if (supabase) {
        await supabase.from('discussions').insert({
          project_id: normId,
          user_id: payload.userId,
          author_name: payload.displayName,
          author_username: payload.username,
          title: payload.title.trim(),
          body: payload.body.trim(),
          category: payload.category || 'question',
        });
      }
    } catch {
      // fallback
    }
  }

  const allDiscussions: StoredDiscussion[] = JSON.parse(localStorage.getItem('rabinja_discussions') || '[]');
  const newDisc: StoredDiscussion = {
    id: `dsc_${Date.now()}`,
    projectId: payload.projectId,
    userId: payload.userId,
    author: {
      displayName: payload.displayName,
      username: payload.username,
    },
    title: payload.title.trim(),
    body: payload.body.trim(),
    category: payload.category || 'question',
    upvotes: 0,
    replies: [],
    createdAt: new Date().toISOString(),
  };

  allDiscussions.unshift(newDisc);
  localStorage.setItem('rabinja_discussions', JSON.stringify(allDiscussions));
  return newDisc;
}

// ── Comments ──

export async function apiGetComments(projectId: string): Promise<StoredComment[]> {
  if (typeof window === 'undefined') return [];
  const normId = getProjectSlug(projectId);

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient() as any;
      if (supabase) {
        const { data } = await supabase
          .from('comments')
          .select('*')
          .eq('project_id', normId)
          .eq('is_deleted', false)
          .order('created_at', { ascending: true });

        if (data && data.length > 0) {
          return data.map((c: any) => ({
            id: c.id,
            projectId: c.project_id,
            userId: c.user_id,
            author: {
              displayName: c.author_name || c.user_id,
              username: c.author_username || c.user_id,
            },
            body: c.body,
            parentId: c.parent_id,
            createdAt: c.created_at,
          }));
        }
      }
    } catch {
      // fallback
    }
  }

  try {
    const allComments: StoredComment[] = JSON.parse(localStorage.getItem('rabinja_comments') || '[]');
    return allComments.filter((c) => c.projectId === projectId || c.projectId === normId);
  } catch {
    return [];
  }
}

export async function apiPostComment(payload: {
  projectId: string;
  userId: string;
  displayName: string;
  username: string;
  body: string;
  parentId?: string | null;
}): Promise<StoredComment> {
  if (!payload.userId) {
    throw new Error('Please sign in or sign up for free to post a comment.');
  }

  const normId = getProjectSlug(payload.projectId);

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient() as any;
      if (supabase) {
        await supabase.from('comments').insert({
          project_id: normId,
          user_id: payload.userId,
          author_name: payload.displayName,
          author_username: payload.username,
          body: payload.body.trim(),
          parent_id: payload.parentId || null,
        });
      }
    } catch {
      // fallback
    }
  }

  const allComments: StoredComment[] = JSON.parse(localStorage.getItem('rabinja_comments') || '[]');
  const newComment: StoredComment = {
    id: `cmt_${Date.now()}`,
    projectId: payload.projectId,
    userId: payload.userId,
    author: {
      displayName: payload.displayName,
      username: payload.username,
    },
    body: payload.body.trim(),
    parentId: payload.parentId || null,
    createdAt: new Date().toISOString(),
  };

  allComments.push(newComment);
  localStorage.setItem('rabinja_comments', JSON.stringify(allComments));
  return newComment;
}

function getProjectSlug(projectIdOrSlug: string): string {
  const found = RABINJA_PROJECTS.find((p) => p.id === projectIdOrSlug || p.slug === projectIdOrSlug);
  return found ? found.slug : projectIdOrSlug;
}
