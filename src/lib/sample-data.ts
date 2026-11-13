// ============================================================
// RABINJA PROJEX — Seed / Realtime Project Repository
// Ready for live community & Rabinjathon project submissions
// ============================================================

import type { Database } from '@/lib/supabase/database.types';

type Project = Database['public']['Tables']['projects']['Row'];

export const SAMPLE_PROJECTS: (Project & { 
  demo_url?: string | null; 
  repo_url?: string | null; 
  video_url?: string | null;
  nex_score?: number;
})[] = [
  {
    id: 'proj-001',
    slug: 'saferoute-ai',
    title: 'SafeRoute AI',
    subtitle: 'Edge Vision & Real-time Collision Rescue Dispatch',
    description: 'An intelligent edge computing road safety system combining Raspberry Pi 4 dash cameras with sensor fusion to detect accidents in under 45ms and autonomously transmit telemetry to first responders.',
    thumbnail_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
    demo_url: 'https://saferoute-ai.rabinja.dev',
    repo_url: 'https://github.com/rabinja-labs/saferoute-ai',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tech_stack: ['Python', 'TensorFlow', 'OpenCV', 'Raspberry Pi', 'Next.js', 'FastAPI'],
    category: 'DeepTech',
    tags: ['Edge AI', 'Computer Vision', 'IoT', 'Safety'],
    event_id: 'evt-001',
    team_name: 'NeuralVision Labs',
    team_members: ['Arjun Mehta', 'Priya Sharma', 'Rohan Das'],
    status: 'featured',
    views: 4820,
    vote_count: 1240,
    nex_score: 9.4,
    created_at: '2026-10-12T14:30:00Z',
    updated_at: '2026-11-10T18:00:00Z',
  },
  {
    id: 'proj-002',
    slug: 'cleangrid-solar',
    title: 'CleanGrid Autonomous',
    subtitle: 'Decentralized Microgrid Balancing for Rural Clusters',
    description: 'A reinforcement-learning powered inverter orchestration network that optimizes localized solar energy distribution and battery cycling across 500+ decentralized village microgrids.',
    thumbnail_url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=900&q=80',
    demo_url: 'https://cleangrid.rabinja.dev',
    repo_url: 'https://github.com/rabinja-labs/cleangrid',
    video_url: null,
    tech_stack: ['Rust', 'PyTorch', 'MQTT', 'Embedded C', 'React', 'TimescaleDB'],
    category: 'CleanTech',
    tags: ['Renewable Energy', 'Smart Grid', 'Rust', 'Hardware'],
    event_id: 'evt-001',
    team_name: 'GreenPulse Dynamics',
    team_members: ['Sneha Patel', 'Vikram Singh'],
    status: 'published',
    views: 3190,
    vote_count: 980,
    nex_score: 9.2,
    created_at: '2026-10-15T09:15:00Z',
    updated_at: '2026-11-08T11:20:00Z',
  },
  {
    id: 'proj-003',
    slug: 'medassist-ar',
    title: 'MedAssist AR',
    subtitle: 'Low-latency Intraoperative Surgical Hologram Overlay',
    description: 'Sub-millimeter accurate mixed-reality headset visualization rendering 3D CT/MRI scans in real time onto surgical fields with zero sensory desync.',
    thumbnail_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
    demo_url: 'https://medassist.rabinja.dev',
    repo_url: 'https://github.com/rabinja-labs/medassist-ar',
    video_url: null,
    tech_stack: ['WebXR', 'C++', 'Unity', 'PyTorch', 'DICOM API'],
    category: 'HealthTech',
    tags: ['Healthcare', 'AR/VR', 'Biomedical', 'Computer Vision'],
    event_id: 'evt-001',
    team_name: 'BioSynthetix',
    team_members: ['Dr. Ananya Gupta', 'Karthik Rao', 'Meera Nair'],
    status: 'published',
    views: 6420,
    vote_count: 1530,
    nex_score: 9.6,
    created_at: '2026-10-18T16:00:00Z',
    updated_at: '2026-11-12T10:45:00Z',
  },
  {
    id: 'proj-004',
    slug: 'finshield-fraud-guardian',
    title: 'FinShield Guardian',
    subtitle: 'Graph Neural Network UPI Fraud Preemption Engine',
    description: 'Sub-15ms graph inference layer detecting syndication money laundering and synthetic account creation across high-volume instant payment rails.',
    thumbnail_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80',
    demo_url: 'https://finshield.rabinja.dev',
    repo_url: 'https://github.com/rabinja-labs/finshield',
    video_url: null,
    tech_stack: ['Go', 'DGL (Graph NN)', 'Kafka', 'Redis', 'PostgreSQL'],
    category: 'FinTech',
    tags: ['FinTech', 'Cybersecurity', 'GNN', 'Payments'],
    event_id: 'evt-001',
    team_name: 'ZeroTrust Fintech',
    team_members: ['Rahul Joshi', 'Nisha Agarwal', 'Deepak Kumar'],
    status: 'published',
    views: 2840,
    vote_count: 810,
    nex_score: 9.1,
    created_at: '2026-10-20T12:00:00Z',
    updated_at: '2026-11-05T14:10:00Z',
  },
  {
    id: 'proj-005',
    slug: 'quantumvault-lattice',
    title: 'QuantumVault',
    subtitle: 'Post-Quantum Kyber-1024 TLS Gateway Proxy',
    description: 'Drop-in reverse proxy securing web application infrastructure against harvest-now-decrypt-later attacks using NIST-standardized module lattice cryptography.',
    thumbnail_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
    demo_url: 'https://quantumvault.rabinja.dev',
    repo_url: 'https://github.com/rabinja-labs/quantumvault',
    video_url: null,
    tech_stack: ['Rust', 'Liboqs', 'Tokio', 'eBPF', 'Docker'],
    category: 'Cybersecurity',
    tags: ['Cryptography', 'Security', 'Post-Quantum', 'Rust'],
    event_id: 'evt-001',
    team_name: 'CipherMesh Labs',
    team_members: ['Sameer Saxena', 'Kavya Raman'],
    status: 'published',
    views: 4100,
    vote_count: 1120,
    nex_score: 9.5,
    created_at: '2026-10-22T08:30:00Z',
    updated_at: '2026-11-09T17:20:00Z',
  },
  {
    id: 'proj-006',
    slug: 'eduspark-offline-ai',
    title: 'EduSpark Adaptive',
    subtitle: 'Offline Local SLM for Multilingual Rural Classrooms',
    description: 'A quantized 1.5B parameter tutor model running entirely on local solar-powered tablets, delivering personalized STEM curricula in 9 Indian vernacular languages.',
    thumbnail_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
    demo_url: 'https://eduspark.rabinja.dev',
    repo_url: 'https://github.com/rabinja-labs/eduspark',
    video_url: null,
    tech_stack: ['llama.cpp', 'ONNX', 'Flutter', 'SQLite', 'Python'],
    category: 'EdTech',
    tags: ['Education', 'Offline AI', 'On-Device LLM', 'Open Source'],
    event_id: 'evt-001',
    team_name: 'VidyaAI Collective',
    team_members: ['Aditya Verma', 'Ishita Banerjee'],
    status: 'published',
    views: 3560,
    vote_count: 940,
    nex_score: 8.9,
    created_at: '2026-10-25T11:00:00Z',
    updated_at: '2026-11-11T09:30:00Z',
  },
];

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
    banner_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
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
    banner_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
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

export const SAMPLE_DISCUSSIONS: SampleDiscussion[] = [
  {
    id: 'disc-001',
    project_id: 'proj-001',
    user_id: 'usr-101',
    author: { display_name: 'Kisalay Jha', username: 'kisalay_jha', avatar_url: null },
    title: 'How does SafeRoute handle camera occlusion in severe downpours?',
    body: 'Impressive inference rate on the Pi 4! Are you applying temporal optical flow or relying strictly on the accelerometer spikes when torrential rain blurs the lens?',
    category: 'question',
    reply_count: 4,
    upvote_count: 28,
    created_at: '2026-11-10T11:00:00Z',
  },
  {
    id: 'disc-002',
    project_id: 'proj-003',
    user_id: 'usr-102',
    author: { display_name: 'Dr. Ramesh Nair', username: 'dr_nair', avatar_url: null },
    title: 'Clinical trials validation and DICOM synchronization latency',
    body: 'The holographic alignment shown in the demo is surgical-grade. Have you benchmarked the frame latency when streaming high-resolution 4D cardiac ultrasound arrays?',
    category: 'feedback',
    reply_count: 7,
    upvote_count: 45,
    created_at: '2026-11-11T15:20:00Z',
  },
];

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

export const SAMPLE_COMMENTS: SampleComment[] = [
  {
    id: 'comm-001',
    project_id: 'proj-001',
    parent_id: null,
    user_id: 'usr-101',
    author: { display_name: 'Kisalay Jha', username: 'kisalay_jha', avatar_url: null },
    body: 'One of the best edge implementations seen in Rabinjathon 2026. Clean architecture and practical hardware constraints.',
    created_at: '2026-11-10T12:00:00Z',
    is_deleted: false,
  },
];

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

export const SAMPLE_EVALUATIONS: SampleEvaluation[] = [
  {
    id: 'eval-001',
    project_id: 'proj-001',
    judge_id: 'judge-nex',
    event_id: 'evt-001',
    judge_name: 'NEX Autonomous AI Judge',
    judge_title: 'Neural Architecture Evaluator v3.8',
    scores: {
      innovation: 9.5,
      impact: 9.6,
      technical: 9.2,
      presentation: 9.3,
    },
    total_score: 9.4,
    feedback: 'Exceptional optimization on embedded hardware. Model pruning achieves under 45ms inference latency. Multi-sensor Kalman filter successfully mitigates false positive impact triggers.',
    is_final: true,
    created_at: '2026-11-09T18:00:00Z',
  },
];
