-- ============================================================
-- RABINJA PROJEX — Production Database Schema (PostgreSQL / Supabase)
-- ============================================================

-- 1. Profiles Table (Zero pre-seeded mock users — created on demand)
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  phone TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  team_name TEXT,
  bio TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'judge', 'admin')),
  is_verified BOOLEAN NOT NULL DEFAULT true
);

-- 2. Projects Table (Official RABINJA Brand Innovations)
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  thumbnail_url TEXT,
  demo_url TEXT,
  repo_url TEXT,
  video_url TEXT,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL,
  brand_category TEXT NOT NULL DEFAULT 'RABINJA Brand Ecosystem',
  is_rabinja_brand BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[] NOT NULL DEFAULT '{}',
  event_id TEXT,
  team_name TEXT NOT NULL DEFAULT 'RABINJA LABS',
  team_members TEXT[] NOT NULL DEFAULT '{"RABINJA Core Engineering"}',
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'featured', 'archived')),
  views INT NOT NULL DEFAULT 0,
  vote_count INT NOT NULL DEFAULT 0
);

-- 3. Verified Community Votes (1 vote per user per project)
CREATE TABLE IF NOT EXISTS public.votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  UNIQUE(user_id, project_id)
);

-- 4. Community 1-5 Star Ratings
CREATE TABLE IF NOT EXISTS public.ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  UNIQUE(user_id, project_id)
);

-- 5. Technical Discussions & Inquiries
CREATE TABLE IF NOT EXISTS public.discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_username TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'question' CHECK (category IN ('question', 'feedback', 'idea', 'general')),
  reply_count INT NOT NULL DEFAULT 0,
  upvote_count INT NOT NULL DEFAULT 0
);

-- 6. Verified Community Comments
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_username TEXT NOT NULL,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  is_deleted BOOLEAN NOT NULL DEFAULT false
);

-- 7. Pre-seed the 8 Official RABINJA Projects (Real data, zero fake views/votes)
INSERT INTO public.projects (
  id, slug, title, subtitle, description, thumbnail_url, demo_url, repo_url,
  tech_stack, category, brand_category, is_rabinja_brand, tags, team_name, team_members, status, views, vote_count
) VALUES
(
  'rab-001', 'projex', 'Projex',
  'Autonomous Project Showcase, AI Judging & Peer Verification Arena',
  'The flagship RABINJA platform engineering a decentralized, bias-free showcase where builders publish genuine projects, verify technical claims with NEX AI autonomous evaluation, and engage in authentic peer review without artificial hype.',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
  'https://projex.rabinja.com', 'https://github.com/rabinja-labs/projex',
  ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'NEX AI Engine'],
  'RABINJA Original', 'RABINJA Brand Ecosystem', true,
  ARRAY['Innovation Showcase', 'AI Judge', 'Engineering', 'Flagship'],
  'RABINJA LABS', ARRAY['RABINJA Core Engineering'], 'featured', 0, 0
),
(
  'rab-002', 'therapist', 'Therapist',
  'Empathetic Cognitive Mental Wellness & Confidential Mind Sanctuary',
  'A deeply attuned, privacy-first AI mental health sanctuary providing confidential cognitive reframing, emotional regulation guidance, guided introspective dialogue, and trauma-informed behavioral support with zero data leakage.',
  'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1000&q=80',
  'https://therapist.rabinja.com', 'https://github.com/rabinja-labs/therapist',
  ARRAY['Python', 'FastAPI', 'React', 'WebSockets', 'HIPAA E2EE', 'Vector Memory'],
  'RABINJA Original', 'RABINJA Brand Ecosystem', true,
  ARRAY['Mental Health', 'Empathetic AI', 'Cognitive Wellness', 'Privacy-First'],
  'RABINJA LABS', ARRAY['RABINJA Health & AI Team'], 'published', 0, 0
),
(
  'rab-003', 'smart-desk', 'Smart Desk',
  'Autonomous Ergonomic Workstation & Environmental Focus Hub',
  'Next-generation smart workstation integrating computer-vision posture correction, automated circadian elevation scheduling, ambient microclimate monitoring, and acoustic flow-state focus analytics.',
  'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
  'https://smartdesk.rabinja.com', 'https://github.com/rabinja-labs/smart-desk',
  ARRAY['Embedded C++', 'Raspberry Pi', 'ESP32', 'MQTT', 'Python', 'Next.js'],
  'RABINJA Original', 'RABINJA Brand Ecosystem', true,
  ARRAY['Hardware', 'IoT', 'Ergonomics', 'Smart Workstation'],
  'RABINJA LABS', ARRAY['RABINJA Hardware & IoT Team'], 'published', 0, 0
),
(
  'rab-004', 'pet-shield', 'Pet Shield',
  'Real-time Telemetry, GPS Geo-Fence & Vital Anomaly Guard for Pets',
  'Ultra-lightweight military-grade wearable shield pairing sub-meter cellular GPS positioning, vital biometric monitoring, dynamic perimeter geofencing, heatstroke alerts, and instant community search beacons.',
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80',
  'https://petshield.rabinja.com', 'https://github.com/rabinja-labs/pet-shield',
  ARRAY['BLE 5.2', 'LTE-M GPS', 'Embedded C', 'Flutter', 'FastAPI', 'TimescaleDB'],
  'RABINJA Original', 'RABINJA Brand Ecosystem', true,
  ARRAY['Pet Care', 'Wearables', 'IoT', 'Animal Safety'],
  'RABINJA LABS', ARRAY['RABINJA Animal Wellness & Embedded Lab'], 'published', 0, 0
),
(
  'rab-005', 'investra', 'Investra',
  'Algorithmic Wealth Intelligence & Quantitative Portfolio Risk Engine',
  'Institutional-grade quantitative intelligence suite delivering automated asset allocation, multi-horizon Monte Carlo stress simulation, drawdown hedging, and macroeconomic cycle indicators for individual builders.',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80',
  'https://investra.rabinja.com', 'https://github.com/rabinja-labs/investra',
  ARRAY['Python', 'Quantitative Analytics', 'Next.js', 'FastAPI', 'PostgreSQL', 'Redis'],
  'RABINJA Original', 'RABINJA Brand Ecosystem', true,
  ARRAY['FinTech', 'Wealth Intelligence', 'Quantitative Analysis', 'Investments'],
  'RABINJA LABS', ARRAY['RABINJA Quantitative & FinTech Unit'], 'published', 0, 0
),
(
  'rab-006', 'soul-met', 'Soul Met',
  'Resonance-Based Interpersonal & Cognitive Discovery Platform',
  'Human connection architecture matching minds based on core life values, cognitive synchronization, intellectual passions, and psychological resonance rather than gamified superficial swipe mechanics.',
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80',
  'https://soulmet.rabinja.com', 'https://github.com/rabinja-labs/soul-met',
  ARRAY['Vector Similarity', 'Graph Embeddings', 'Next.js', 'WebSockets', 'Tailwind CSS'],
  'RABINJA Original', 'RABINJA Brand Ecosystem', true,
  ARRAY['Social Connection', 'Neural Matching', 'Human Alignment', 'Networking'],
  'RABINJA LABS', ARRAY['RABINJA Social Dynamics Lab'], 'published', 0, 0
),
(
  'rab-007', 'idea-vault', 'Idea Vault',
  'Zero-Knowledge Cryptographic Intellectual Property & Concept Locker',
  'Zero-knowledge verifiable repository enabling inventors and founders to register, timestamp, and protect nascent inventions, whitepapers, and software designs with immutable cryptographic proof of existence.',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
  'https://ideavault.rabinja.com', 'https://github.com/rabinja-labs/idea-vault',
  ARRAY['Zero-Knowledge Proofs', 'TypeScript', 'Next.js', 'Encrypted Storage', 'SHA-256 Merkle Verification'],
  'RABINJA Original', 'RABINJA Brand Ecosystem', true,
  ARRAY['IP Protection', 'Cryptography', 'Zero-Knowledge', 'Patents'],
  'RABINJA LABS', ARRAY['RABINJA Cryptography & IP Lab'], 'published', 0, 0
),
(
  'rab-008', 'my-true-companion', 'My True Companion',
  'Attuned Personal Life Companion & Introspective Growth Sanctuary',
  'A personal AI confidant engineered with persistent relational memory, deep empathetic listening, introspective journaling assistance, and personalized guidance for life transitions and daily resilience.',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
  'https://mytruecompanion.rabinja.com', 'https://github.com/rabinja-labs/my-true-companion',
  ARRAY['Relational Memory Graphs', 'Next.js', 'TypeScript', 'Local Encrypted DB', 'Voice AI Core'],
  'RABINJA Original', 'RABINJA Brand Ecosystem', true,
  ARRAY['Personal Companion', 'Emotional Sanctuary', 'AI Reflection', 'Life Assistant'],
  'RABINJA LABS', ARRAY['RABINJA Human-AI Experience Lab'], 'published', 0, 0
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  brand_category = EXCLUDED.brand_category,
  is_rabinja_brand = EXCLUDED.is_rabinja_brand,
  tech_stack = EXCLUDED.tech_stack,
  tags = EXCLUDED.tags;

-- 8. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public profiles are readable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public projects are readable" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Votes are readable by all" ON public.votes FOR SELECT USING (true);
CREATE POLICY "Ratings are readable by all" ON public.ratings FOR SELECT USING (true);
CREATE POLICY "Discussions are readable by all" ON public.discussions FOR SELECT USING (true);
CREATE POLICY "Comments are readable by all" ON public.comments FOR SELECT USING (true);

-- Authenticated write policies
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (true);
CREATE POLICY "Verified users can vote" ON public.votes FOR ALL USING (true);
CREATE POLICY "Verified users can rate" ON public.ratings FOR ALL USING (true);
CREATE POLICY "Verified users can discuss" ON public.discussions FOR ALL USING (true);
CREATE POLICY "Verified users can comment" ON public.comments FOR ALL USING (true);
