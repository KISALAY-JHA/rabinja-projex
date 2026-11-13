/* ============================================================
   RABINJA Projex — Mock Data
   ============================================================
   DEMO CONTENT ONLY — Not real project information.
   All names, scores, and evaluations are fictional samples
   created for the frontend prototype.
   ============================================================ */

import type {
  Project, Category, Technology, Team, Event, Judge,
  JudgingCriterion, Evaluation, CriterionScore, Collection,
  User, NexWorkspace, NexDocument, NexAnalysisRun, NexFinding,
  NexReport, NexQuestion, Discussion, Comment,
} from './types';

// ---- Categories ----

export const categories: Category[] = [
  { id: 'cat-1', name: 'Artificial Intelligence', slug: 'artificial-intelligence', icon: 'Brain', projectCount: 3 },
  { id: 'cat-2', name: 'Web Development', slug: 'web-development', icon: 'Globe', projectCount: 2 },
  { id: 'cat-3', name: 'Healthcare', slug: 'healthcare', icon: 'Heart', projectCount: 1 },
  { id: 'cat-4', name: 'Sustainability', slug: 'sustainability', icon: 'Leaf', projectCount: 1 },
  { id: 'cat-5', name: 'Education', slug: 'education', icon: 'GraduationCap', projectCount: 1 },
  { id: 'cat-6', name: 'FinTech', slug: 'fintech', icon: 'Wallet', projectCount: 1 },
  { id: 'cat-7', name: 'Robotics', slug: 'robotics', icon: 'Cpu', projectCount: 0 },
  { id: 'cat-8', name: 'Social Impact', slug: 'social-impact', icon: 'Users', projectCount: 1 },
  { id: 'cat-9', name: 'Hardware', slug: 'hardware', icon: 'Smartphone', projectCount: 0 },
  { id: 'cat-10', name: 'Research & Innovation', slug: 'research-innovation', icon: 'FlaskConical', projectCount: 0 },
];

// ---- Technologies ----

export const technologies: Technology[] = [
  { id: 'tech-1', name: 'Python', slug: 'python', color: '#3776AB' },
  { id: 'tech-2', name: 'React', slug: 'react', color: '#61DAFB' },
  { id: 'tech-3', name: 'TensorFlow', slug: 'tensorflow', color: '#FF6F00' },
  { id: 'tech-4', name: 'Next.js', slug: 'nextjs', color: '#000000' },
  { id: 'tech-5', name: 'Node.js', slug: 'nodejs', color: '#339933' },
  { id: 'tech-6', name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1' },
  { id: 'tech-7', name: 'Flutter', slug: 'flutter', color: '#02569B' },
  { id: 'tech-8', name: 'Firebase', slug: 'firebase', color: '#FFCA28' },
  { id: 'tech-9', name: 'OpenCV', slug: 'opencv', color: '#5C3EE8' },
  { id: 'tech-10', name: 'Arduino', slug: 'arduino', color: '#00979D' },
  { id: 'tech-11', name: 'MongoDB', slug: 'mongodb', color: '#47A248' },
  { id: 'tech-12', name: 'FastAPI', slug: 'fastapi', color: '#009688' },
  { id: 'tech-13', name: 'Tailwind CSS', slug: 'tailwind-css', color: '#06B6D4' },
  { id: 'tech-14', name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
  { id: 'tech-15', name: 'Raspberry Pi', slug: 'raspberry-pi', color: '#A22846' },
  { id: 'tech-16', name: 'Supabase', slug: 'supabase', color: '#3ECF8E' },
  { id: 'tech-17', name: 'Scikit-learn', slug: 'scikit-learn', color: '#F7931E' },
  { id: 'tech-18', name: 'Docker', slug: 'docker', color: '#2496ED' },
];

// ---- Teams ----

const teams: Team[] = [
  {
    id: 'team-1',
    name: 'NeuralVision',
    members: [
      { id: 'tm-1', name: 'Arjun Mehta', role: 'Team Lead & ML Engineer', avatarUrl: '' },
      { id: 'tm-2', name: 'Priya Sharma', role: 'Frontend Developer', avatarUrl: '' },
      { id: 'tm-3', name: 'Rohan Das', role: 'Backend Developer', avatarUrl: '' },
    ],
  },
  {
    id: 'team-2',
    name: 'GreenTech Solutions',
    members: [
      { id: 'tm-4', name: 'Sneha Patel', role: 'Team Lead & IoT Engineer', avatarUrl: '' },
      { id: 'tm-5', name: 'Vikram Singh', role: 'Data Analyst', avatarUrl: '' },
    ],
  },
  {
    id: 'team-3',
    name: 'MedAssist',
    members: [
      { id: 'tm-6', name: 'Dr. Ananya Gupta', role: 'Domain Expert & Lead', avatarUrl: '' },
      { id: 'tm-7', name: 'Karthik Rao', role: 'Full-Stack Developer', avatarUrl: '' },
      { id: 'tm-8', name: 'Meera Nair', role: 'UI/UX Designer', avatarUrl: '' },
    ],
  },
  {
    id: 'team-4',
    name: 'EduSpark',
    members: [
      { id: 'tm-9', name: 'Aditya Verma', role: 'Team Lead & Frontend', avatarUrl: '' },
      { id: 'tm-10', name: 'Ishita Banerjee', role: 'Backend Developer', avatarUrl: '' },
    ],
  },
  {
    id: 'team-5',
    name: 'FinSecure',
    members: [
      { id: 'tm-11', name: 'Rahul Joshi', role: 'Team Lead & Backend', avatarUrl: '' },
      { id: 'tm-12', name: 'Nisha Agarwal', role: 'ML Engineer', avatarUrl: '' },
      { id: 'tm-13', name: 'Deepak Kumar', role: 'Frontend Developer', avatarUrl: '' },
    ],
  },
  {
    id: 'team-6',
    name: 'CivicConnect',
    members: [
      { id: 'tm-14', name: 'Tanvi Reddy', role: 'Team Lead & Designer', avatarUrl: '' },
      { id: 'tm-15', name: 'Suresh Iyer', role: 'Full-Stack Developer', avatarUrl: '' },
    ],
  },
  {
    id: 'team-7',
    name: 'CodeCrafters',
    members: [
      { id: 'tm-16', name: 'Amit Choudhury', role: 'Team Lead', avatarUrl: '' },
      { id: 'tm-17', name: 'Sara Fernandes', role: 'Backend Developer', avatarUrl: '' },
      { id: 'tm-18', name: 'Dev Patel', role: 'Frontend Developer', avatarUrl: '' },
    ],
  },
  {
    id: 'team-8',
    name: 'DataDriven',
    members: [
      { id: 'tm-19', name: 'Kavya Srinivasan', role: 'Data Scientist & Lead', avatarUrl: '' },
      { id: 'tm-20', name: 'Manish Tiwari', role: 'Backend Developer', avatarUrl: '' },
    ],
  },
];

// ---- Judges ----

export const judges: Judge[] = [
  {
    id: 'judge-1',
    name: 'Dr. Ramesh Krishnamurthy',
    title: 'Professor of Computer Science',
    organization: 'Indian Institute of Technology, Bangalore',
    bio: 'Dr. Krishnamurthy is a distinguished professor with over 20 years of experience in artificial intelligence and machine learning. He has published over 150 research papers and has been a keynote speaker at major international conferences. His research focuses on deep learning applications in healthcare and natural language processing.',
    avatarUrl: '',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'NLP'],
    eventIds: ['event-1'],
  },
  {
    id: 'judge-2',
    name: 'Sunita Raghavan',
    title: 'Chief Technology Officer',
    organization: 'TechNova Solutions',
    bio: 'Sunita is a technology leader with 15 years of experience building scalable products used by millions. She has led engineering teams at multiple startups and established companies, specialising in cloud architecture, distributed systems, and developer experience. She is passionate about mentoring young engineers and fostering innovation.',
    avatarUrl: '',
    expertise: ['Cloud Architecture', 'Product Development', 'Engineering Leadership', 'Web Technologies'],
    eventIds: ['event-1'],
  },
  {
    id: 'judge-3',
    name: 'Vikram Desai',
    title: 'Founder & CEO',
    organization: 'InnoVentures Capital',
    bio: 'Vikram is an entrepreneur and investor who has founded three successful technology companies and invested in over 40 startups. He evaluates projects with a focus on practical impact, market viability, and scalability. He believes in technology that solves real problems for real people.',
    avatarUrl: '',
    expertise: ['Entrepreneurship', 'Product Strategy', 'Market Viability', 'Business Development'],
    eventIds: ['event-1'],
  },
  {
    id: 'judge-4',
    name: 'Dr. Meenakshi Sundaram',
    title: 'Director of Innovation',
    organization: 'National Research Institute of Technology',
    bio: 'Dr. Sundaram leads innovation programmes that bridge academic research with practical applications. With expertise in IoT, embedded systems, and sustainability technology, she brings a unique perspective combining rigorous research standards with real-world impact assessment.',
    avatarUrl: '',
    expertise: ['IoT', 'Embedded Systems', 'Sustainability', 'Research Methodology'],
    eventIds: ['event-1'],
  },
];

// ---- Judging Criteria ----

export const judgingCriteria: JudgingCriterion[] = [
  { id: 'crit-1', name: 'Innovation & Originality', description: 'How novel and creative is the approach? Does it offer a fresh perspective or unique solution?', maxScore: 10, weight: 0.25, eventId: 'event-1' },
  { id: 'crit-2', name: 'Technical Implementation', description: 'Quality of code, architecture, and technical execution. Is the system well-designed and functional?', maxScore: 10, weight: 0.25, eventId: 'event-1' },
  { id: 'crit-3', name: 'Practical Impact', description: 'Does the project solve a real problem? How significant is its potential impact?', maxScore: 10, weight: 0.20, eventId: 'event-1' },
  { id: 'crit-4', name: 'Feasibility & Scalability', description: 'Can this project be realistically implemented and scaled? Is the approach sustainable?', maxScore: 10, weight: 0.15, eventId: 'event-1' },
  { id: 'crit-5', name: 'Presentation & Communication', description: 'Clarity of explanation, quality of documentation, and effectiveness of the demonstration.', maxScore: 10, weight: 0.15, eventId: 'event-1' },
];

// ---- Sample Evaluations ----

function makeEvaluation(
  id: string, projectId: string, judgeId: string, judge: Judge,
  scores: [number, number, number, number, number],
  strengths: string[], weaknesses: string[], suggestions: string[],
  comments: string,
): Evaluation {
  const criterionScores: CriterionScore[] = judgingCriteria.map((c, i) => ({
    criterionId: c.id,
    criterion: c,
    score: scores[i],
    comment: '',
  }));
  const overall = scores.reduce((sum, s, i) => sum + s * judgingCriteria[i].weight, 0);
  return {
    id, projectId, judgeId, judge,
    eventId: 'event-1',
    scores: criterionScores,
    overallScore: parseFloat(overall.toFixed(2)),
    maxPossibleScore: 10,
    strengths, weaknesses, suggestions,
    generalComments: comments,
    isPublished: true,
    evaluatedAt: '2025-03-15T18:00:00Z',
  };
}

// ---- Projects ----

import { RABINJA_PROJECTS } from './sample-data';

export const projects: Project[] = RABINJA_PROJECTS.map((p, idx) => ({
  id: p.id,
  name: p.title,
  slug: p.slug,
  shortDescription: p.subtitle || p.description,
  thumbnailUrl: p.thumbnail_url || '',
  status: 'published',
  problemStatement: p.description,
  whyItMatters: p.subtitle || p.description,
  proposedSolution: p.description,
  targetUsers: 'Engineers, builders, and researchers.',
  keyFeatures: p.tags,
  innovation: 'Official ' + p.category + ' innovation developed under RABINJA LABS.',
  practicalApplications: p.tags,
  technologyStack: p.tech_stack,
  demoUrl: p.demo_url || undefined,
  repositoryUrl: p.repo_url || undefined,
  categoryId: 'cat-1',
  category: categories[0],
  eventId: 'event-1',
  team: { id: 'team-rabinja', name: 'RABINJA LABS', members: [{ id: 'm-1', name: 'RABINJA Core Engineering', role: 'Engineering Lead', avatarUrl: '' }] },
  technologies: p.tech_stack.map((t, i) => ({ id: 'tech-' + i, name: t, slug: t.toLowerCase() })),
  isFeatured: p.status === 'featured',
  isPublished: true,
  createdAt: p.created_at,
  updatedAt: p.updated_at,
}));

// ---- Event ----

export const rabinjathonEvent: Event = {
  id: 'event-1',
  name: 'Rabinjathon 2025',
  slug: 'rabinjathon',
  tagline: 'Build what matters. Show what works.',
  description: 'Rabinjathon is RABINJA\'s flagship project-building competition. Participants demonstrate real technical implementations, present their work to expert judges, and compete to create the most impactful, innovative, and well-executed projects.\n\nUnlike typical hackathons focused on quick prototypes, Rabinjathon emphasises depth of implementation, genuine problem-solving, and the ability to communicate technical work clearly.',
  theme: 'Technology for Real-World Impact',
  objectives: [
    'Encourage innovative technical solutions to genuine problems',
    'Promote thorough implementation over superficial prototyping',
    'Develop project communication and presentation skills',
    'Connect creators with industry experts and mentors',
    'Recognise outstanding technical achievement and social impact',
  ],
  rules: [
    'Teams of 2-5 members',
    'Projects must be substantially original work created by the team',
    'Use of open-source libraries and frameworks is permitted with proper attribution',
    'Pre-existing codebases must be clearly disclosed',
    'All submissions must include a working demonstration',
    'Teams must present their work to the judging panel in person',
    'Judges\' decisions are final',
  ],
  guidelines: [
    'Focus on solving a real problem with clear impact',
    'Prioritise working functionality over polished presentations',
    'Document your technical approach and architecture',
    'Be honest about limitations and future work',
    'Prepare for technical questions about your implementation',
    'Respect all participants, judges, and organisers',
  ],
  startDate: '2025-03-01T09:00:00Z',
  endDate: '2025-03-15T18:00:00Z',
  location: 'RABINJA Innovation Campus',
  status: 'completed',
  categories: categories.slice(0, 8),
  judges: judges,
  judgingCriteria: judgingCriteria,
  projects: projects,
  winners: [
    { projectId: 'proj-1', project: projects[0], award: "Judge's Choice", rank: 1 },
    { projectId: 'proj-2', project: projects[1], award: 'Best Social Impact', rank: 2 },
    { projectId: 'proj-3', project: projects[2], award: 'Runner-Up', rank: 3 },
  ],
  bannerUrl: '/images/events/rabinjathon-banner.jpg',
  isPublished: true,
  createdAt: '2025-01-15T10:00:00Z',
  updatedAt: '2025-03-20T10:00:00Z',
};

// ---- Collections (demo) ----

export const sampleCollections: Collection[] = [
  {
    id: 'col-1',
    name: 'AI & Machine Learning',
    description: 'Projects using artificial intelligence and machine learning',
    userId: 'user-demo',
    isPublic: false,
    projectIds: ['proj-1', 'proj-3', 'proj-8'],
    projects: [projects[0], projects[2], projects[7]],
    createdAt: '2025-03-20T10:00:00Z',
    updatedAt: '2025-03-20T10:00:00Z',
  },
  {
    id: 'col-2',
    name: 'Favourites',
    description: 'My favourite projects from Rabinjathon',
    userId: 'user-demo',
    isPublic: false,
    projectIds: ['proj-1', 'proj-2'],
    projects: [projects[0], projects[1]],
    createdAt: '2025-03-20T10:00:00Z',
    updatedAt: '2025-03-20T10:00:00Z',
  },
];

// ---- Demo User ----

export const demoUser: User = { id: "", email: "", name: "", role: "visitor", createdAt: "", updatedAt: "" };

// ---- NEX AI Demo Workspace ----

export const demoNexWorkspace: NexWorkspace = {
  id: 'nex-ws-1',
  userId: 'user-demo',
  projectName: 'SafeRoute AI',
  projectDescription: 'An intelligent road safety system using computer vision and sensor data.',
  eventContext: 'Rabinjathon 2025',
  mode: 'full-analysis',
  status: 'complete',
  documents: [
    { id: 'doc-1', workspaceId: 'nex-ws-1', fileName: 'SafeRoute_Presentation.pdf', fileType: 'application/pdf', fileSize: 4500000, status: 'ready', uploadedAt: '2025-03-18T10:00:00Z', processedAt: '2025-03-18T10:02:00Z' },
    { id: 'doc-2', workspaceId: 'nex-ws-1', fileName: 'Technical_Report.pdf', fileType: 'application/pdf', fileSize: 2800000, status: 'ready', uploadedAt: '2025-03-18T10:01:00Z', processedAt: '2025-03-18T10:03:00Z' },
    { id: 'doc-3', workspaceId: 'nex-ws-1', fileName: 'model_architecture.png', fileType: 'image/png', fileSize: 350000, status: 'ready', uploadedAt: '2025-03-18T10:01:30Z', processedAt: '2025-03-18T10:02:00Z' },
  ],
  analysisRuns: [
    {
      id: 'run-1',
      workspaceId: 'nex-ws-1',
      mode: 'full-analysis',
      status: 'complete',
      findings: [
        {
          id: 'find-1',
          category: 'Technical Implementation',
          title: 'Collision Detection Model Performance',
          description: 'The team reports 94.2% accuracy on their test set using a MobileNetV2-based classifier. The test set contains 12,000 annotated frames from the BDD100K dataset subset with simulated collision augmentation.',
          evidenceLevel: 'partially-supported',
          evidenceRefs: [
            { documentId: 'doc-2', documentName: 'Technical_Report.pdf', type: 'document', location: 'Page 7-8', excerpt: 'Our model achieves 94.2% accuracy on the held-out test set...' },
            { documentId: 'doc-1', documentName: 'SafeRoute_Presentation.pdf', type: 'slide', location: 'Slide 14', excerpt: 'Performance Metrics: 94.2% accuracy' },
          ],
          severity: 'major',
        },
        {
          id: 'find-2',
          category: 'Innovation',
          title: 'Edge-Based Processing Approach',
          description: 'The project claims to run inference on a Raspberry Pi 4 with 45ms latency. This is feasible for MobileNetV2 at the reported input resolution, though real-world performance may vary with environmental conditions.',
          evidenceLevel: 'supported',
          evidenceRefs: [
            { documentId: 'doc-2', documentName: 'Technical_Report.pdf', type: 'document', location: 'Page 12', excerpt: 'Inference time: 45ms on Raspberry Pi 4 (4GB RAM)' },
          ],
        },
        {
          id: 'find-3',
          category: 'Limitations',
          title: 'Night-time and Adverse Weather Performance',
          description: 'The training dataset and evaluation do not appear to include significant night-time or adverse weather conditions. Real-world deployment would require robust performance across all conditions.',
          evidenceLevel: 'insufficient-information',
          evidenceRefs: [
            { documentId: 'doc-2', documentName: 'Technical_Report.pdf', type: 'document', location: 'Page 9', excerpt: 'Training data sourced from BDD100K subset...' },
          ],
          severity: 'major',
        },
      ],
      report: {
        id: 'report-1',
        analysisRunId: 'run-1',
        summary: 'SafeRoute AI presents a technically sound approach to real-time accident detection using edge computing. The core architecture is well-designed, and the choice of MobileNetV2 for embedded deployment is appropriate. However, several claims require additional validation, particularly around real-world performance in adverse conditions.',
        sections: [],
        overallAssessment: 'A promising project with strong technical foundations. The edge AI approach is practical and the problem is genuinely important. Key areas for improvement include expanding the training dataset, testing under adverse conditions, and validating the sensor fusion accuracy.',
        practiceScore: 7.8,
        maxScore: 10,
        generatedAt: '2025-03-18T10:15:00Z',
      },
      startedAt: '2025-03-18T10:05:00Z',
      completedAt: '2025-03-18T10:15:00Z',
    },
  ],
  createdAt: '2025-03-18T10:00:00Z',
  updatedAt: '2025-03-18T10:15:00Z',
};

// ---- NEX Demo Questions ----

export const demoNexQuestions: NexQuestion[] = [
  {
    id: 'q-1',
    workspaceId: 'nex-ws-1',
    question: 'Your presentation claims the system identifies road accidents using vehicle sensor information. How does it distinguish an actual accident from sudden braking or a sharp turn? What data did you use to validate this distinction?',
    category: 'Technical Depth',
    difficulty: 'advanced',
    basedOn: [
      { documentId: 'doc-1', documentName: 'SafeRoute_Presentation.pdf', type: 'slide', location: 'Slide 8' },
      { documentId: 'doc-2', documentName: 'Technical_Report.pdf', type: 'document', location: 'Page 10-11' },
    ],
    expectedTopics: ['sensor fusion logic', 'threshold calibration', 'false positive handling', 'training data composition'],
  },
  {
    id: 'q-2',
    workspaceId: 'nex-ws-1',
    question: 'You report 94.2% accuracy on your test set. How was this test set constructed? Does it include night-time footage, rain, fog, or varying road types? What is the false-positive rate specifically for non-accident events like sudden stops?',
    category: 'Validation',
    difficulty: 'advanced',
    basedOn: [
      { documentId: 'doc-2', documentName: 'Technical_Report.pdf', type: 'document', location: 'Page 7-8' },
    ],
    expectedTopics: ['test set composition', 'environmental conditions', 'false positive rate', 'cross-validation methodology'],
  },
  {
    id: 'q-3',
    workspaceId: 'nex-ws-1',
    question: 'Your system runs on a Raspberry Pi with 45ms inference time. What happens when the device is under thermal throttling after extended use in a hot vehicle? Have you tested sustained performance over realistic driving durations?',
    category: 'Feasibility',
    difficulty: 'intermediate',
    basedOn: [
      { documentId: 'doc-2', documentName: 'Technical_Report.pdf', type: 'document', location: 'Page 12' },
    ],
    expectedTopics: ['thermal management', 'sustained performance', 'hardware limitations', 'power consumption'],
  },
  {
    id: 'q-4',
    workspaceId: 'nex-ws-1',
    question: 'Walk me through the exact sequence of events from the moment a collision is detected to when emergency services receive the notification. What is the total end-to-end latency, and what happens if cellular connectivity is unavailable?',
    category: 'Architecture',
    difficulty: 'intermediate',
    basedOn: [
      { documentId: 'doc-1', documentName: 'SafeRoute_Presentation.pdf', type: 'slide', location: 'Slide 10-11' },
    ],
    expectedTopics: ['notification pipeline', 'connectivity fallback', 'end-to-end latency', 'reliability'],
  },
  {
    id: 'q-5',
    workspaceId: 'nex-ws-1',
    question: 'What ethical considerations arise from automatically contacting emergency services? How do you handle false alarms, and what is the potential impact of false notifications on already-strained emergency response systems?',
    category: 'Ethics & Impact',
    difficulty: 'basic',
    basedOn: [],
    expectedTopics: ['false alarm impact', 'emergency service load', 'user consent', 'liability'],
  },
];

// ---- Discussions (demo) ----

export const demoDiscussions: Discussion[] = [];

// ---- Helper functions ----

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getJudgeById(id: string): Judge | undefined {
  return judges.find((j) => j.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.isFeatured && p.isPublished);
}

export function getProjectsByCategory(categoryId: string): Project[] {
  return projects.filter((p) => p.categoryId === categoryId && p.isPublished);
}

export function getProjectsByEvent(eventId: string): Project[] {
  return projects.filter((p) => p.eventId === eventId && p.isPublished);
}

export function searchProjects(query: string): Project[] {
  const q = query.toLowerCase();
  return projects.filter((p) =>
    p.isPublished && (
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.team.name.toLowerCase().includes(q) ||
      p.technologies.some((t) => t.name.toLowerCase().includes(q)) ||
      p.category.name.toLowerCase().includes(q)
    )
  );
}
