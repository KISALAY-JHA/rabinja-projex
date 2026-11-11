/* ============================================================
   RABINJA Projex — TypeScript Type Definitions
   ============================================================ */

// ---- Identity & Access ----

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  interests?: string[];
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'visitor' | 'user' | 'editor' | 'judge' | 'admin';

// ---- Projects ----

export interface Project {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  thumbnailUrl: string;
  status: ProjectStatus;

  // Content
  problemStatement: string;
  whyItMatters: string;
  proposedSolution: string;
  targetUsers: string;
  keyFeatures: string[];
  innovation: string;
  practicalApplications: string[];

  // Technical
  architecture?: string;
  technologyStack: string[];
  implementationDetails?: string;
  dataSources?: string;
  methodology?: string;
  repositoryUrl?: string;
  demoUrl?: string;

  // Media
  videoUrl?: string;
  videoType?: 'youtube' | 'vimeo' | 'hosted';
  galleryImages?: string[];
  presentationUrl?: string;

  // Relations
  categoryId: string;
  category: Category;
  eventId?: string;
  event?: Event;
  team: Team;
  technologies: Technology[];

  // Evaluation
  officialScore?: number;
  maxScore?: number;
  evaluations?: Evaluation[];
  rank?: number;
  award?: string;

  // Meta
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatus = 'draft' | 'published' | 'archived';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  projectCount?: number;
}

export interface Technology {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  profileUrl?: string;
}

// ---- Events ----

export interface Event {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  theme?: string;
  objectives: string[];
  rules: string[];
  guidelines: string[];
  startDate: string;
  endDate: string;
  location?: string;
  status: EventStatus;

  // Relations
  categories: Category[];
  judges: Judge[];
  judgingCriteria: JudgingCriterion[];
  projects?: Project[];
  winners?: ProjectAward[];

  // Media
  bannerUrl?: string;
  galleryImages?: string[];
  documentaryUrl?: string;

  // Meta
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export type EventStatus = 'upcoming' | 'active' | 'judging' | 'completed';

export interface ProjectAward {
  projectId: string;
  project: Project;
  award: string;
  rank: number;
}

// ---- Judging ----

export interface Judge {
  id: string;
  name: string;
  title: string;
  organization: string;
  bio: string;
  avatarUrl?: string;
  expertise: string[];
  eventIds: string[];
}

export interface JudgingCriterion {
  id: string;
  name: string;
  description: string;
  maxScore: number;
  weight: number;
  eventId: string;
}

export interface Evaluation {
  id: string;
  projectId: string;
  judgeId: string;
  judge: Judge;
  eventId: string;
  scores: CriterionScore[];
  overallScore: number;
  maxPossibleScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  generalComments: string;
  isPublished: boolean;
  evaluatedAt: string;
}

export interface CriterionScore {
  criterionId: string;
  criterion: JudgingCriterion;
  score: number;
  comment?: string;
}

// ---- Collections ----

export interface Collection {
  id: string;
  name: string;
  description?: string;
  userId: string;
  isPublic: boolean;
  projectIds: string[];
  projects?: Project[];
  createdAt: string;
  updatedAt: string;
}

// ---- Community ----

export interface Discussion {
  id: string;
  projectId: string;
  userId: string;
  user: User;
  title: string;
  content: string;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  discussionId?: string;
  projectId?: string;
  parentId?: string;
  userId: string;
  user: User;
  content: string;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}

// ---- NEX AI ----

export interface NexWorkspace {
  id: string;
  userId: string;
  projectName: string;
  projectDescription: string;
  eventContext?: string;
  mode: NexMode;
  status: NexWorkspaceStatus;
  documents: NexDocument[];
  analysisRuns: NexAnalysisRun[];
  createdAt: string;
  updatedAt: string;
}

export type NexMode =
  | 'full-analysis'
  | 'technical-evaluation'
  | 'innovation-evaluation'
  | 'feasibility'
  | 'research-review'
  | 'judge-simulation'
  | 'presentation-practice'
  | 'improvement-coach';

export type NexWorkspaceStatus = 'setup' | 'uploading' | 'processing' | 'ready' | 'analyzing' | 'complete' | 'error';

export interface NexDocument {
  id: string;
  workspaceId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  status: NexDocumentStatus;
  uploadedAt: string;
  processedAt?: string;
  error?: string;
}

export type NexDocumentStatus = 'uploading' | 'processing' | 'ready' | 'error';

export interface NexAnalysisRun {
  id: string;
  workspaceId: string;
  mode: NexMode;
  status: 'running' | 'complete' | 'error';
  findings: NexFinding[];
  report?: NexReport;
  startedAt: string;
  completedAt?: string;
}

export interface NexFinding {
  id: string;
  category: string;
  title: string;
  description: string;
  evidenceLevel: EvidenceLevel;
  evidenceRefs: EvidenceReference[];
  severity?: 'info' | 'minor' | 'major' | 'critical';
}

export type EvidenceLevel =
  | 'supported'
  | 'partially-supported'
  | 'claimed-not-demonstrated'
  | 'insufficient-information'
  | 'conflicting-evidence'
  | 'needs-verification';

export interface EvidenceReference {
  documentId: string;
  documentName: string;
  type: 'document' | 'slide' | 'code' | 'video' | 'image' | 'external';
  location?: string; // e.g., "Page 5", "Slide 12", "src/main.py:45-60", "02:30"
  excerpt?: string;
}

export interface NexReport {
  id: string;
  analysisRunId: string;
  summary: string;
  sections: NexReportSection[];
  overallAssessment: string;
  practiceScore?: number;
  maxScore?: number;
  generatedAt: string;
}

export interface NexReportSection {
  title: string;
  content: string;
  findings: NexFinding[];
}

export interface NexQuestion {
  id: string;
  workspaceId: string;
  question: string;
  category: string;
  difficulty: 'basic' | 'intermediate' | 'advanced' | 'expert';
  basedOn: EvidenceReference[];
  expectedTopics: string[];
}

export interface NexVivaSession {
  id: string;
  workspaceId: string;
  status: 'preparing' | 'active' | 'paused' | 'completed';
  turns: NexVivaTurn[];
  duration: number; // seconds
  maxDuration: number;
  startedAt: string;
  completedAt?: string;
  report?: NexVivaReport;
}

export interface NexVivaTurn {
  id: string;
  type: 'question' | 'answer' | 'follow-up' | 'feedback';
  content: string;
  timestamp: number; // seconds from session start
  evaluation?: TurnEvaluation;
}

export interface TurnEvaluation {
  relevance: 'strong' | 'adequate' | 'weak' | 'off-topic';
  completeness: 'complete' | 'partial' | 'incomplete';
  accuracy: 'accurate' | 'partially-accurate' | 'inaccurate' | 'unverifiable';
  feedback: string;
}

export interface NexVivaReport {
  sessionSummary: string;
  questionsAsked: number;
  strongAnswers: string[];
  weakAnswers: string[];
  unsupportedClaims: string[];
  missedOpportunities: string[];
  practiceScore?: number;
  suggestions: string[];
}

// ---- Navigation ----

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
}

// ---- Admin ----

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  changes?: Record<string, unknown>;
  createdAt: string;
}

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  updatedAt: string;
}
