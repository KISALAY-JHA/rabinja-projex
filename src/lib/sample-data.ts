// ============================================================
// RABINJA PROJEX — Seed / Realtime Project Repository
// Ready for live community & Rabinjathon project submissions
// ============================================================

import type { Database } from '@/lib/supabase/database.types';

type Project = Database['public']['Tables']['projects']['Row'];

export const SAMPLE_PROJECTS: (Project & { demo_url?: string | null; repo_url?: string | null; video_url?: string | null })[] = [];

export const SAMPLE_EVENTS = [
  {
    id: 'evt-001',
    slug: 'rabinjathon-2026',
    name: 'Rabinjathon 2026',
    description: 'The flagship annual innovation challenge by RABINJA SQUAD. Teams from across India compete across 7 verticals: HealthTech, CleanTech, Cybersecurity, AgriTech, EdTech, FinTech, and Deep Tech. With ₹25L prize pool and direct mentorship from leading industry experts.',
    rules: null,
    criteria: {
      innovation: { weight: 25, label: 'Innovation & Originality' },
      impact: { weight: 25, label: 'Real-World Impact' },
      technical: { weight: 25, label: 'Technical Execution' },
      presentation: { weight: 25, label: 'Clarity & Presentation' },
    },
    banner_url: null,
    start_date: '2026-10-01T00:00:00Z',
    end_date: '2026-11-30T23:59:59Z',
    submission_deadline: '2026-10-31T23:59:59Z',
    status: 'active' as const,
    prize_pool: '₹25,00,000',
    max_teams: 500,
    created_at: '2026-09-01T00:00:00Z',
  },
  {
    id: 'evt-002',
    slug: 'nex-ai-sprint',
    name: 'NEX AI Sprint',
    description: 'A focused 72-hour sprint where teams build AI-powered solutions to real humanitarian challenges. Partner NGOs submit problem statements; teams compete to build production-ready MVPs.',
    rules: null,
    criteria: null,
    banner_url: null,
    start_date: '2026-11-15T00:00:00Z',
    end_date: '2026-11-18T00:00:00Z',
    submission_deadline: '2026-11-17T23:59:59Z',
    status: 'upcoming' as const,
    prize_pool: '₹5,00,000',
    max_teams: 100,
    created_at: '2026-10-15T00:00:00Z',
  },
];

export interface SampleDiscussion {
  id: string;
  project_id: string;
  user_id: string;
  author: { display_name: string; username: string; avatar_url: string | null };
  title: string;
  body: string;
  category: 'question' | 'idea' | 'feedback' | 'general';
  reply_count: number;
  upvote_count: number;
  created_at: string;
}

export const SAMPLE_DISCUSSIONS: SampleDiscussion[] = [];

export interface SampleComment {
  id: string;
  project_id: string;
  parent_id: string | null;
  user_id: string;
  author: { display_name: string; username: string; avatar_url: string | null };
  body: string;
  created_at: string;
  is_deleted: boolean;
}

export const SAMPLE_COMMENTS: SampleComment[] = [];

export interface SampleEvaluation {
  id: string;
  project_id: string;
  judge_id: string;
  event_id: string;
  judge_name: string;
  judge_title: string;
  scores: {
    innovation: number;
    impact: number;
    technical: number;
    presentation: number;
  };
  total_score: number;
  feedback: string;
  is_final: boolean;
  created_at: string;
}

export const SAMPLE_EVALUATIONS: SampleEvaluation[] = [];
