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
    thumbnail_url: '/images/projects/innovations.jpeg',
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
    thumbnail_url: '/images/projects/softpanion.jpeg',
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
    thumbnail_url: '/images/projects/smart-desk.png',
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
    thumbnail_url: '/images/projects/pet-shield.jpeg',
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
    thumbnail_url: '/images/banners/banner.jpeg',
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
    thumbnail_url: '/images/projects/soul-met.png',
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
    thumbnail_url: '/images/projects/idea-vault.jpeg',
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
    thumbnail_url: '/images/projects/my-true-companion.jpeg',
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
    id: 'evt-rabinjathon-prime-1',
    slug: 'rabinjathon-prime-1',
    name: 'Rabinjathon: Prime 1',
    description: 'RABINJATHON is a student-led, online-first innovation and project-building event by RABINJA SQUAD. Participants develop original ideas into working prototypes and present them before a judging panel. No single problem statement — build what you believe in.',
    start_date: '2027-01-01T00:00:00+05:30',
    end_date: '2027-02-05T00:00:00+05:30',
    submission_deadline: '2026-12-31T23:59:59+05:30',
    registration_opens: '2026-10-18T00:00:00+05:30',
    banner_url: '/images/events/poster-rabinjathon.png',
    status: 'active' as const,
    prize_info: 'Participation Certificate',
    organizer: 'RABINJA Squad',
    team_size: '1–4 Members (inter-college allowed)',
    whatsapp: 'https://chat.whatsapp.com/GFL3izBqAbJEov4AgpCKOI',
    register_url: 'https://unstop.com',
    eligibility: [
      'Undergraduate',
      'Postgraduate',
      'Engineering Students',
      'Management',
      'Arts, Commerce, Sciences & Others',
      'Law',
      'Medical',
    ],
    rounds: [
      {
        id: 1,
        name: 'Product Introduction Video',
        start: '2027-01-01T00:00:00+05:30',
        end: '2027-01-08T00:00:00+05:30',
        desc: 'Ad-style video up to 2 minutes introducing your product.',
        maxDuration: '2 min',
      },
      {
        id: 2,
        name: 'Project Showcase & Working Explainer',
        start: '2027-01-15T00:00:00+05:30',
        end: '2027-01-22T00:00:00+05:30',
        desc: 'Video up to 5 minutes showcasing your prototype and how it works.',
        maxDuration: '5 min',
      },
      {
        id: 3,
        name: 'Final Pitch & Presentation',
        start: '2027-01-29T00:00:00+05:30',
        end: '2027-02-05T00:00:00+05:30',
        desc: 'PPT/PDF presentation with live video call judging and YouTube broadcast.',
        maxDuration: 'Live pitch',
      },
    ],
    rules: [
      'Original work only. No plagiarism or fabricated results.',
      'Teams of 1–4 members; solo participation allowed. Inter-college teams welcome.',
      'No source code or GitHub disclosure required.',
      'AI tools, public APIs, and open-source frameworks are allowed.',
      'Never share credentials, API keys, or private/sensitive data in submissions.',
      'Late or incomplete submissions may not be considered.',
      'Judges evaluate based on criteria communicated per stage.',
    ],
    criteria: {
      idea: { label: 'Idea & Originality', weight: 25 },
      development: { label: 'Development & Prototype', weight: 30 },
      communication: { label: 'Communication & Presentation', weight: 25 },
      feasibility: { label: 'Feasibility & Real-World Impact', weight: 20 },
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
