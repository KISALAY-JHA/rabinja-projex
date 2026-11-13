// ============================================================
// RABINJA PROJEX — Official RABINJA Ecosystem Repository
// Real working projects under the official RABINJA Brand
// ============================================================

import type { Database } from '@/lib/supabase/database.types';

export type ProjectItem = Database['public']['Tables']['projects']['Row'] & {
  demo_url?: string | null;
  repo_url?: string | null;
  video_url?: string | null;
  nex_score?: number | null;
  is_rabinja_brand: boolean;
  brand_category: string;
  rating?: number | null;
  rating_count?: number;
};

export const RABINJA_PROJECTS: ProjectItem[] = [
  {
    id: 'rab-001',
    slug: 'projex',
    title: 'Projex',
    subtitle: 'Autonomous Project Showcase, AI Judging & Peer Verification Arena',
    description: 'The flagship RABINJA platform engineering a decentralized, bias-free showcase where builders publish genuine projects, verify technical claims with NEX AI autonomous evaluation, and engage in authentic peer review without artificial hype.',
    thumbnail_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    demo_url: 'https://projex.rabinja.com',
    repo_url: 'https://github.com/rabinja-labs/projex',
    video_url: null,
    tech_stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'NEX AI Engine'],
    category: 'RABINJA Original',
    brand_category: 'RABINJA Brand Ecosystem',
    tags: ['Innovation Showcase', 'AI Judge', 'Engineering', 'Flagship'],
    event_id: 'evt-001',
    team_name: 'RABINJA LABS',
    team_members: ['RABINJA Core Engineering'],
    status: 'featured',
    views: 0,
    vote_count: 0,
    rating: null,
    rating_count: 0,
    nex_score: null,
    is_rabinja_brand: true,
    created_at: '2026-11-01T00:00:00Z',
    updated_at: '2026-11-13T00:00:00Z',
  },
  {
    id: 'rab-002',
    slug: 'therapist',
    title: 'Therapist',
    subtitle: 'Empathetic Cognitive Mental Wellness & Confidential Mind Sanctuary',
    description: 'A deeply attuned, privacy-first AI mental health sanctuary providing confidential cognitive reframing, emotional regulation guidance, guided introspective dialogue, and trauma-informed behavioral support with zero data leakage.',
    thumbnail_url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1000&q=80',
    demo_url: 'https://therapist.rabinja.com',
    repo_url: 'https://github.com/rabinja-labs/therapist',
    video_url: null,
    tech_stack: ['Python', 'FastAPI', 'React', 'WebSockets', 'HIPAA E2EE', 'Vector Memory'],
    category: 'RABINJA Original',
    brand_category: 'RABINJA Brand Ecosystem',
    tags: ['Mental Health', 'Empathetic AI', 'Cognitive Wellness', 'Privacy-First'],
    event_id: 'evt-001',
    team_name: 'RABINJA LABS',
    team_members: ['RABINJA Health & AI Team'],
    status: 'published',
    views: 0,
    vote_count: 0,
    rating: null,
    rating_count: 0,
    nex_score: null,
    is_rabinja_brand: true,
    created_at: '2026-11-02T00:00:00Z',
    updated_at: '2026-11-13T00:00:00Z',
  },
  {
    id: 'rab-003',
    slug: 'smart-desk',
    title: 'Smart Desk',
    subtitle: 'Autonomous Ergonomic Workstation & Environmental Focus Hub',
    description: 'Next-generation smart workstation integrating computer-vision posture correction, automated circadian elevation scheduling, ambient microclimate monitoring, and acoustic flow-state focus analytics.',
    thumbnail_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
    demo_url: 'https://smartdesk.rabinja.com',
    repo_url: 'https://github.com/rabinja-labs/smart-desk',
    video_url: null,
    tech_stack: ['Embedded C++', 'Raspberry Pi', 'ESP32', 'MQTT', 'Python', 'Next.js'],
    category: 'RABINJA Original',
    brand_category: 'RABINJA Brand Ecosystem',
    tags: ['Hardware', 'IoT', 'Ergonomics', 'Smart Workstation'],
    event_id: 'evt-001',
    team_name: 'RABINJA LABS',
    team_members: ['RABINJA Hardware & IoT Team'],
    status: 'published',
    views: 0,
    vote_count: 0,
    rating: null,
    rating_count: 0,
    nex_score: null,
    is_rabinja_brand: true,
    created_at: '2026-11-03T00:00:00Z',
    updated_at: '2026-11-13T00:00:00Z',
  },
  {
    id: 'rab-004',
    slug: 'pet-shield',
    title: 'Pet Shield',
    subtitle: 'Real-time Telemetry, GPS Geo-Fence & Vital Anomaly Guard for Pets',
    description: 'Ultra-lightweight military-grade wearable shield pairing sub-meter cellular GPS positioning, vital biometric monitoring, dynamic perimeter geofencing, heatstroke alerts, and instant community search beacons.',
    thumbnail_url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80',
    demo_url: 'https://petshield.rabinja.com',
    repo_url: 'https://github.com/rabinja-labs/pet-shield',
    video_url: null,
    tech_stack: ['BLE 5.2', 'LTE-M GPS', 'Embedded C', 'Flutter', 'FastAPI', 'TimescaleDB'],
    category: 'RABINJA Original',
    brand_category: 'RABINJA Brand Ecosystem',
    tags: ['Pet Care', 'Wearables', 'IoT', 'Animal Safety'],
    event_id: 'evt-001',
    team_name: 'RABINJA LABS',
    team_members: ['RABINJA Animal Wellness & Embedded Lab'],
    status: 'published',
    views: 0,
    vote_count: 0,
    rating: null,
    rating_count: 0,
    nex_score: null,
    is_rabinja_brand: true,
    created_at: '2026-11-04T00:00:00Z',
    updated_at: '2026-11-13T00:00:00Z',
  },
  {
    id: 'rab-005',
    slug: 'investra',
    title: 'Investra',
    subtitle: 'Algorithmic Wealth Intelligence & Quantitative Portfolio Risk Engine',
    description: 'Institutional-grade quantitative intelligence suite delivering automated asset allocation, multi-horizon Monte Carlo stress simulation, drawdown hedging, and macroeconomic cycle indicators for individual builders.',
    thumbnail_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80',
    demo_url: 'https://investra.rabinja.com',
    repo_url: 'https://github.com/rabinja-labs/investra',
    video_url: null,
    tech_stack: ['Python', 'Quantitative Analytics', 'Next.js', 'FastAPI', 'PostgreSQL', 'Redis'],
    category: 'RABINJA Original',
    brand_category: 'RABINJA Brand Ecosystem',
    tags: ['FinTech', 'Wealth Intelligence', 'Quantitative Analysis', 'Investments'],
    event_id: 'evt-001',
    team_name: 'RABINJA LABS',
    team_members: ['RABINJA Quantitative & FinTech Unit'],
    status: 'published',
    views: 0,
    vote_count: 0,
    rating: null,
    rating_count: 0,
    nex_score: null,
    is_rabinja_brand: true,
    created_at: '2026-11-05T00:00:00Z',
    updated_at: '2026-11-13T00:00:00Z',
  },
  {
    id: 'rab-006',
    slug: 'soul-met',
    title: 'Soul Met',
    subtitle: 'Resonance-Based Interpersonal & Cognitive Discovery Platform',
    description: 'Human connection architecture matching minds based on core life values, cognitive synchronization, intellectual passions, and psychological resonance rather than gamified superficial swipe mechanics.',
    thumbnail_url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80',
    demo_url: 'https://soulmet.rabinja.com',
    repo_url: 'https://github.com/rabinja-labs/soul-met',
    video_url: null,
    tech_stack: ['Vector Similarity', 'Graph Embeddings', 'Next.js', 'WebSockets', 'Tailwind CSS'],
    category: 'RABINJA Original',
    brand_category: 'RABINJA Brand Ecosystem',
    tags: ['Social Connection', 'Neural Matching', 'Human Alignment', 'Networking'],
    event_id: 'evt-001',
    team_name: 'RABINJA LABS',
    team_members: ['RABINJA Social Dynamics Lab'],
    status: 'published',
    views: 0,
    vote_count: 0,
    rating: null,
    rating_count: 0,
    nex_score: null,
    is_rabinja_brand: true,
    created_at: '2026-11-06T00:00:00Z',
    updated_at: '2026-11-13T00:00:00Z',
  },
  {
    id: 'rab-007',
    slug: 'idea-vault',
    title: 'Idea Vault',
    subtitle: 'Zero-Knowledge Cryptographic Intellectual Property & Concept Locker',
    description: 'Zero-knowledge verifiable repository enabling inventors and founders to register, timestamp, and protect nascent inventions, whitepapers, and software designs with immutable cryptographic proof of existence.',
    thumbnail_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    demo_url: 'https://ideavault.rabinja.com',
    repo_url: 'https://github.com/rabinja-labs/idea-vault',
    video_url: null,
    tech_stack: ['Zero-Knowledge Proofs', 'TypeScript', 'Next.js', 'Encrypted Storage', 'SHA-256 Merkle Verification'],
    category: 'RABINJA Original',
    brand_category: 'RABINJA Brand Ecosystem',
    tags: ['IP Protection', 'Cryptography', 'Zero-Knowledge', 'Patents'],
    event_id: 'evt-001',
    team_name: 'RABINJA LABS',
    team_members: ['RABINJA Cryptography & IP Lab'],
    status: 'published',
    views: 0,
    vote_count: 0,
    rating: null,
    rating_count: 0,
    nex_score: null,
    is_rabinja_brand: true,
    created_at: '2026-11-07T00:00:00Z',
    updated_at: '2026-11-13T00:00:00Z',
  },
  {
    id: 'rab-008',
    slug: 'my-true-companion',
    title: 'My True Companion',
    subtitle: 'Attuned Personal Life Companion & Introspective Growth Sanctuary',
    description: 'A personal AI confidant engineered with persistent relational memory, deep empathetic listening, introspective journaling assistance, and personalized guidance for life transitions and daily resilience.',
    thumbnail_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    demo_url: 'https://mytruecompanion.rabinja.com',
    repo_url: 'https://github.com/rabinja-labs/my-true-companion',
    video_url: null,
    tech_stack: ['Relational Memory Graphs', 'Next.js', 'TypeScript', 'Local Encrypted DB', 'Voice AI Core'],
    category: 'RABINJA Original',
    brand_category: 'RABINJA Brand Ecosystem',
    tags: ['Personal Companion', 'Emotional Sanctuary', 'AI Reflection', 'Life Assistant'],
    event_id: 'evt-001',
    team_name: 'RABINJA LABS',
    team_members: ['RABINJA Human-AI Experience Lab'],
    status: 'published',
    views: 0,
    vote_count: 0,
    rating: null,
    rating_count: 0,
    nex_score: null,
    is_rabinja_brand: true,
    created_at: '2026-11-08T00:00:00Z',
    updated_at: '2026-11-13T00:00:00Z',
  },
];

// Re-export for compatibility across pages
export const SAMPLE_PROJECTS = RABINJA_PROJECTS;

// Events
export const SAMPLE_EVENTS = [
  {
    id: 'evt-001',
    slug: 'rabinjathon-2026',
    name: 'Rabinjathon 2026: Genesis Edition',
    description: 'The national engineering & deep-tech competition where innovation meets peer verification and autonomous NEX AI stress testing.',
    start_date: '2026-10-01T00:00:00Z',
    end_date: '2026-11-30T23:59:59Z',
    submission_deadline: '2026-11-20T23:59:59Z',
    banner_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    status: 'active' as const,
    prize_pool: '₹25,00,000 INR',
    max_teams: 500,
    rules: 'Build real engineering solutions. Zero fake prototypes. Evaluated by NEX AI & community builders.',
    criteria: {
      technical: { label: 'Technical Depth & Architecture', weight: 30 },
      originality: { label: 'Originality & Novelty', weight: 25 },
      execution: { label: 'Execution & Completeness', weight: 25 },
      impact: { label: 'Real-World Value & Usability', weight: 20 },
    } as Record<string, { label: string; weight: number }>,
  },
];

// Real initial state for community data - NO fake user comments, discussions or evaluations!
export interface SampleDiscussion {
  id: string;
  project_id: string;
  user_id: string;
  title: string;
  body: string;
  category: 'question' | 'feedback' | 'idea' | 'general';
  reply_count: number;
  upvote_count: number;
  created_at: string;
  author: {
    display_name: string;
    username: string;
  };
}

export interface SampleComment {
  id: string;
  project_id: string;
  user_id: string;
  parent_id?: string | null;
  body: string;
  created_at: string;
  author: {
    display_name: string;
    username: string;
  };
}

export interface SampleEvaluation {
  id: string;
  project_id: string;
  judge_name: string;
  judge_title: string;
  total_score: number;
  feedback: string;
  is_final: boolean;
  scores: Record<string, number>;
}

// Clean initial states: zero fake comments, zero fake discussions, zero fake evaluations
export const SAMPLE_DISCUSSIONS: SampleDiscussion[] = [];
export const SAMPLE_COMMENTS: SampleComment[] = [];
export const SAMPLE_EVALUATIONS: SampleEvaluation[] = [];
