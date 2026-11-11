// ============================================================
// RABINJA PROJEX — Full Database Type Definitions
// ============================================================

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          phone: string;
          display_name: string;
          username: string;
          avatar_url: string | null;
          team_name: string | null;
          bio: string | null;
          role: 'user' | 'judge' | 'admin';
          is_verified: boolean;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      projects: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          slug: string;
          title: string;
          subtitle: string | null;
          description: string;
          thumbnail_url: string | null;
          demo_url: string | null;
          repo_url: string | null;
          video_url: string | null;
          tech_stack: string[];
          category: string;
          tags: string[];
          event_id: string | null;
          team_name: string;
          team_members: string[];
          status: 'draft' | 'published' | 'featured' | 'archived';
          views: number;
          vote_count: number;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'created_at' | 'updated_at' | 'views' | 'vote_count'>;
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      events: {
        Row: {
          id: string;
          created_at: string;
          slug: string;
          name: string;
          description: string;
          rules: string | null;
          criteria: Json | null;
          banner_url: string | null;
          start_date: string;
          end_date: string;
          submission_deadline: string | null;
          status: 'upcoming' | 'active' | 'judging' | 'completed';
          prize_pool: string | null;
          max_teams: number | null;
        };
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['events']['Insert']>;
      };
      votes: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          project_id: string;
        };
        Insert: Omit<Database['public']['Tables']['votes']['Row'], 'id' | 'created_at'>;
        Update: never;
      };
      comments: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          project_id: string;
          user_id: string;
          parent_id: string | null;
          body: string;
          is_deleted: boolean;
        };
        Insert: Omit<Database['public']['Tables']['comments']['Row'], 'id' | 'created_at' | 'updated_at' | 'is_deleted'>;
        Update: Partial<Pick<Database['public']['Tables']['comments']['Row'], 'body'>>;
      };
      discussions: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          project_id: string;
          user_id: string;
          title: string;
          body: string;
          category: 'question' | 'feedback' | 'idea' | 'general';
          reply_count: number;
          upvote_count: number;
        };
        Insert: Omit<Database['public']['Tables']['discussions']['Row'], 'id' | 'created_at' | 'updated_at' | 'reply_count' | 'upvote_count'>;
        Update: Partial<Pick<Database['public']['Tables']['discussions']['Row'], 'title' | 'body' | 'category'>>;
      };
      evaluations: {
        Row: {
          id: string;
          created_at: string;
          project_id: string;
          judge_id: string;
          event_id: string;
          scores: Json;
          total_score: number;
          feedback: string | null;
          is_final: boolean;
        };
        Insert: Omit<Database['public']['Tables']['evaluations']['Row'], 'id' | 'created_at'>;
        Update: never;
      };
      nex_workspaces: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          user_id: string;
          project_id: string | null;
          title: string;
          mode: 'analysis' | 'viva' | 'general';
          document_url: string | null;
          document_text: string | null;
        };
        Insert: Omit<Database['public']['Tables']['nex_workspaces']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['nex_workspaces']['Insert'], 'user_id'>>;
      };
      nex_messages: {
        Row: {
          id: string;
          created_at: string;
          workspace_id: string;
          role: 'user' | 'assistant';
          content: string;
          metadata: Json | null;
        };
        Insert: Omit<Database['public']['Tables']['nex_messages']['Row'], 'id' | 'created_at'>;
        Update: never;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// ── Convenience types ──────────────────────────────────────

export type Profile       = Database['public']['Tables']['profiles']['Row'];
export type Project       = Database['public']['Tables']['projects']['Row'];
export type Event         = Database['public']['Tables']['events']['Row'];
export type Vote          = Database['public']['Tables']['votes']['Row'];
export type Comment       = Database['public']['Tables']['comments']['Row'];
export type Discussion    = Database['public']['Tables']['discussions']['Row'];
export type Evaluation    = Database['public']['Tables']['evaluations']['Row'];
export type NexWorkspace  = Database['public']['Tables']['nex_workspaces']['Row'];
export type NexMessage    = Database['public']['Tables']['nex_messages']['Row'];

export type CommentWithAuthor = Comment & { profiles: Profile };
export type ProjectWithEvent  = Project & { events: Event | null };
