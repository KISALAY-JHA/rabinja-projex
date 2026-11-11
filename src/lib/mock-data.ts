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

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'SafeRoute AI',
    slug: 'saferoute-ai',
    shortDescription: 'An intelligent road safety system that uses computer vision and sensor data to detect accidents in real time and alert emergency services automatically.',
    thumbnailUrl: '/images/projects/saferoute-thumb.jpg',
    status: 'published',
    problemStatement: 'Road accidents cause over 1.35 million deaths globally each year, with delayed emergency response being a major factor in preventable fatalities. In many regions, accident reporting relies on bystanders manually calling emergency services, leading to critical delays.',
    whyItMatters: 'Reducing emergency response time by even a few minutes can significantly improve survival rates in road accidents. An automated detection and notification system could save thousands of lives annually.',
    proposedSolution: 'SafeRoute AI uses a combination of dashboard camera footage analysis and vehicle sensor data to detect potential accidents in real time. When a collision is detected, the system automatically sends the GPS coordinates, severity assessment, and relevant footage to emergency services.',
    targetUsers: 'Vehicle owners, fleet management companies, emergency response services, insurance providers.',
    keyFeatures: [
      'Real-time collision detection using computer vision',
      'Multi-sensor fusion (accelerometer, gyroscope, GPS)',
      'Automatic emergency notification with GPS coordinates',
      'Severity classification for response prioritisation',
      'Dashboard camera footage preservation',
      'Offline-capable detection with queued notifications',
    ],
    innovation: 'Combines edge-based computer vision processing with multi-sensor data fusion to achieve reliable accident detection without constant cloud connectivity. Uses a novel lightweight model optimised for embedded deployment on standard dash cameras.',
    practicalApplications: [
      'Personal vehicle safety',
      'Fleet management and monitoring',
      'Insurance claim automation',
      'Traffic management and urban planning',
    ],
    architecture: 'The system uses a three-tier architecture: (1) Edge tier — a lightweight CNN runs on the dash camera hardware for real-time frame analysis; (2) Mobile tier — the companion app fuses camera output with phone sensor data and handles communications; (3) Cloud tier — stores incident data, manages notifications, and provides the management dashboard.',
    technologyStack: ['Python', 'TensorFlow', 'OpenCV', 'React', 'Node.js', 'PostgreSQL', 'Raspberry Pi'],
    implementationDetails: 'The collision detection model is a MobileNetV2-based classifier trained on a curated dataset of 12,000 annotated dash camera frames. The model achieves 94.2% accuracy on the test set with an inference time of 45ms on Raspberry Pi 4. Sensor fusion uses a Kalman filter to combine accelerometer and gyroscope readings with visual predictions.',
    dataSources: 'Training data sourced from publicly available dash camera datasets (BDD100K subset) augmented with simulated collision scenarios.',
    methodology: 'Transfer learning from ImageNet-pretrained MobileNetV2, fine-tuned on domain-specific data. Evaluated using 5-fold cross-validation with stratified splits.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoType: 'youtube',
    categoryId: 'cat-1',
    category: categories[0],
    eventId: 'event-1',
    team: teams[0],
    technologies: [technologies[0], technologies[2], technologies[8], technologies[1], technologies[4], technologies[5], technologies[14]],
    officialScore: 8.65,
    maxScore: 10,
    evaluations: [],
    rank: 1,
    award: "Judge's Choice",
    isFeatured: true,
    isPublished: true,
    publishedAt: '2025-03-20T10:00:00Z',
    createdAt: '2025-03-10T08:00:00Z',
    updatedAt: '2025-03-20T10:00:00Z',
  },
  {
    id: 'proj-2',
    name: 'EcoTrack',
    slug: 'ecotrack',
    shortDescription: 'A community-driven environmental monitoring platform that uses low-cost IoT sensors to track air quality, water quality, and noise levels in urban areas.',
    thumbnailUrl: '/images/projects/ecotrack-thumb.jpg',
    status: 'published',
    problemStatement: 'Environmental monitoring in developing urban areas is sparse and expensive. Government monitoring stations are few, placed far apart, and often do not provide real-time public data. Communities lack accessible information about their immediate environmental conditions.',
    whyItMatters: 'Air and water pollution are responsible for millions of premature deaths annually. Real-time, hyperlocal environmental data empowers communities to make informed decisions about their health and advocate for change.',
    proposedSolution: 'EcoTrack deploys low-cost sensor nodes across neighbourhoods, collecting air quality (PM2.5, PM10, CO2), water quality (pH, turbidity), and noise level data. A public dashboard visualises this data in real time, and automated alerts notify residents when conditions become hazardous.',
    targetUsers: 'Local communities, environmental activists, municipal governments, public health researchers.',
    keyFeatures: [
      'Low-cost IoT sensor nodes (under ₹2,000 per unit)',
      'Real-time environmental dashboard',
      'Automated hazard alerts via SMS and app',
      'Historical data analysis and trend visualisation',
      'Community-contributed sensor network',
      'API for researchers and third-party applications',
    ],
    innovation: 'Uses a mesh network of low-cost sensors with edge-computed calibration, achieving accuracy within 15% of professional-grade equipment at 1/50th the cost. Community crowdsourcing model enables dense coverage without institutional infrastructure.',
    practicalApplications: [
      'Public health monitoring',
      'Urban planning',
      'Environmental compliance',
      'Community awareness campaigns',
    ],
    technologyStack: ['Arduino', 'Raspberry Pi', 'Python', 'React', 'Node.js', 'MongoDB', 'Firebase'],
    implementationDetails: 'Sensor nodes use Arduino-based microcontrollers with PM2.5 (PMS5003), CO2 (MH-Z19B), pH (SEN0161), and sound level (MAX4466) sensors. Data is transmitted via LoRaWAN to a Raspberry Pi gateway, which forwards readings to Firebase. The web dashboard is built with React and Chart.js.',
    categoryId: 'cat-4',
    category: categories[3],
    eventId: 'event-1',
    team: teams[1],
    technologies: [technologies[9], technologies[14], technologies[0], technologies[1], technologies[4], technologies[10], technologies[7]],
    officialScore: 8.30,
    maxScore: 10,
    evaluations: [],
    rank: 2,
    award: 'Best Social Impact',
    isFeatured: true,
    isPublished: true,
    publishedAt: '2025-03-20T10:00:00Z',
    createdAt: '2025-03-10T08:00:00Z',
    updatedAt: '2025-03-20T10:00:00Z',
  },
  {
    id: 'proj-3',
    name: 'MedLens',
    slug: 'medlens',
    shortDescription: 'An AI-powered diagnostic assistant that helps rural healthcare workers identify common skin conditions and diseases from smartphone photos with evidence-based guidance.',
    thumbnailUrl: '/images/projects/medlens-thumb.jpg',
    status: 'published',
    problemStatement: 'Rural healthcare workers in underserved regions often lack access to specialist dermatologists. Skin conditions that are easily diagnosable by specialists go untreated or misdiagnosed, leading to delayed treatment and complications.',
    whyItMatters: 'Over 1.9 billion people worldwide suffer from skin diseases. In rural areas, the dermatologist-to-patient ratio can exceed 1:200,000. A tool that assists frontline healthcare workers could dramatically improve diagnostic accuracy and reduce referral delays.',
    proposedSolution: 'MedLens enables healthcare workers to photograph skin conditions using a standard smartphone. The AI system analyses the image, suggests potential diagnoses ranked by confidence, provides evidence-based treatment guidance, and flags cases that require urgent specialist referral.',
    targetUsers: 'Rural healthcare workers, community health volunteers, primary care doctors, telemedicine platforms.',
    keyFeatures: [
      'Smartphone-based skin condition photography',
      'AI-powered differential diagnosis (top 3 suggestions)',
      'Confidence scores and evidence-based reasoning',
      'Treatment guidance aligned with WHO protocols',
      'Urgent referral flagging',
      'Offline diagnosis capability',
      'Patient history tracking',
    ],
    innovation: 'Uses a diverse-skin-tone training dataset to reduce bias in dermatological AI. Implements a calibration protocol using a colour reference card to normalise lighting conditions across different smartphone cameras.',
    practicalApplications: [
      'Rural primary healthcare',
      'Telemedicine support',
      'Medical education and training',
      'Public health screening programmes',
    ],
    architecture: 'Mobile-first architecture with on-device inference using TensorFlow Lite. A Flutter app handles image capture, preprocessing, and local inference. When connectivity is available, cases sync to a cloud backend for specialist review and model improvement.',
    technologyStack: ['Flutter', 'TensorFlow', 'Python', 'FastAPI', 'PostgreSQL', 'Firebase'],
    implementationDetails: 'The classification model is an EfficientNet-B4 fine-tuned on the ISIC 2019 dataset augmented with a proprietary dataset of 3,200 images from partner rural clinics covering 23 common conditions. Achieves 87.3% top-3 accuracy on the held-out test set.',
    methodology: 'Collected with informed consent under institutional ethics approval. Used stratified sampling to ensure representation across Fitzpatrick skin types I-VI.',
    categoryId: 'cat-3',
    category: categories[2],
    eventId: 'event-1',
    team: teams[2],
    technologies: [technologies[6], technologies[2], technologies[0], technologies[11], technologies[5], technologies[7]],
    officialScore: 8.10,
    maxScore: 10,
    evaluations: [],
    rank: 3,
    isFeatured: true,
    isPublished: true,
    publishedAt: '2025-03-20T10:00:00Z',
    createdAt: '2025-03-10T08:00:00Z',
    updatedAt: '2025-03-20T10:00:00Z',
  },
  {
    id: 'proj-4',
    name: 'LearnLoop',
    slug: 'learnloop',
    shortDescription: 'An adaptive learning platform that personalises study paths using spaced repetition algorithms and learning analytics to improve knowledge retention for competitive exam preparation.',
    thumbnailUrl: '/images/projects/learnloop-thumb.jpg',
    status: 'published',
    problemStatement: 'Students preparing for competitive exams spend months studying, but research shows that traditional linear study methods lead to poor long-term retention. Students often re-study topics they already know well while neglecting weaker areas.',
    whyItMatters: 'Competitive exam outcomes have life-changing consequences. Improving retention by even 15-20% through evidence-based study techniques could meaningfully improve performance for millions of students.',
    proposedSolution: 'LearnLoop analyses each student\'s performance data to generate personalised study schedules based on spaced repetition science. It identifies weak areas, optimises review timing, and adapts difficulty to maintain engagement and maximise retention.',
    targetUsers: 'Students preparing for competitive exams (engineering, medical, civil services), self-learners, coaching institutes.',
    keyFeatures: [
      'Personalised spaced repetition scheduling',
      'Adaptive difficulty adjustment',
      'Performance analytics dashboard',
      'Weak area identification and targeted practice',
      'Study streak and motivation system',
      'Collaborative study groups',
    ],
    innovation: 'Extends the SM-2 spaced repetition algorithm with a neural network that incorporates time-of-day preferences, difficulty context, and question-type performance to produce more accurate review scheduling.',
    practicalApplications: [
      'Competitive exam preparation',
      'University coursework revision',
      'Professional certification study',
      'Corporate training programmes',
    ],
    technologyStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Python', 'Scikit-learn'],
    categoryId: 'cat-5',
    category: categories[4],
    eventId: 'event-1',
    team: teams[3],
    technologies: [technologies[3], technologies[13], technologies[12], technologies[4], technologies[5], technologies[0], technologies[16]],
    officialScore: 7.85,
    maxScore: 10,
    evaluations: [],
    rank: 4,
    isFeatured: false,
    isPublished: true,
    publishedAt: '2025-03-20T10:00:00Z',
    createdAt: '2025-03-10T08:00:00Z',
    updatedAt: '2025-03-20T10:00:00Z',
  },
  {
    id: 'proj-5',
    name: 'FraudShield',
    slug: 'fraudshield',
    shortDescription: 'A real-time transaction fraud detection system using machine learning to identify suspicious financial activities and protect users from digital payment fraud.',
    thumbnailUrl: '/images/projects/fraudshield-thumb.jpg',
    status: 'published',
    problemStatement: 'Digital payment fraud has increased by 300% in the past five years. Existing rule-based detection systems produce high false-positive rates and fail to catch sophisticated fraud patterns, leaving users and financial institutions vulnerable.',
    whyItMatters: 'Financial fraud causes billions in losses annually and disproportionately affects individuals who can least afford it. Real-time detection that balances accuracy with low false positives is critical for trust in digital payments.',
    proposedSolution: 'FraudShield uses an ensemble of machine learning models to analyse transaction patterns in real time, scoring each transaction for fraud risk. Suspicious transactions are flagged for review while legitimate ones pass through with minimal friction.',
    targetUsers: 'Digital payment platforms, banks, e-commerce companies, fintech startups.',
    keyFeatures: [
      'Real-time transaction scoring (<200ms latency)',
      'Ensemble ML model (gradient boosting + neural network)',
      'Behavioural pattern analysis',
      'Adaptive thresholds per user profile',
      'Explainable risk factor breakdown',
      'Dashboard for fraud analysts',
    ],
    innovation: 'Combines traditional feature engineering with deep learning embeddings for transaction sequences, achieving a 40% reduction in false positives compared to rule-based systems while maintaining 96% true positive rate.',
    practicalApplications: [
      'Digital payment protection',
      'Banking security',
      'E-commerce fraud prevention',
      'Insurance claim verification',
    ],
    technologyStack: ['Python', 'Scikit-learn', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
    categoryId: 'cat-6',
    category: categories[5],
    eventId: 'event-1',
    team: teams[4],
    technologies: [technologies[0], technologies[16], technologies[11], technologies[1], technologies[5], technologies[17]],
    officialScore: 7.55,
    maxScore: 10,
    evaluations: [],
    rank: 5,
    isFeatured: false,
    isPublished: true,
    publishedAt: '2025-03-20T10:00:00Z',
    createdAt: '2025-03-10T08:00:00Z',
    updatedAt: '2025-03-20T10:00:00Z',
  },
  {
    id: 'proj-6',
    name: 'CivicVoice',
    slug: 'civicvoice',
    shortDescription: 'A civic engagement platform that simplifies public grievance reporting, tracks resolution progress, and uses data analytics to help local governments prioritise community issues.',
    thumbnailUrl: '/images/projects/civicvoice-thumb.jpg',
    status: 'published',
    problemStatement: 'Citizens in many municipalities struggle to report civic issues effectively. Existing complaint systems are bureaucratic, opaque about resolution timelines, and lack accountability mechanisms. This leads to civic disengagement.',
    whyItMatters: 'Functional civic complaint systems are essential for responsive governance. When citizens see that their reports lead to action, civic participation and community trust increase.',
    proposedSolution: 'CivicVoice provides a simple mobile-first reporting system where citizens can report issues with photos, location, and descriptions. A public dashboard tracks complaint status, and analytics help municipal officials identify priority areas and measure response performance.',
    targetUsers: 'Citizens, municipal corporations, local government officials, ward councillors.',
    keyFeatures: [
      'Photo-based complaint reporting with GPS tagging',
      'Automatic category classification',
      'Public complaint status tracking',
      'Government analytics dashboard',
      'Ward-level performance metrics',
      'Community voting on issue priority',
    ],
    innovation: 'Uses NLP to automatically categorise and de-duplicate complaints, reducing processing overhead by an estimated 60%. Priority scoring combines official severity with community voting data.',
    practicalApplications: [
      'Municipal complaint management',
      'Infrastructure maintenance',
      'Public safety reporting',
      'Government performance tracking',
    ],
    technologyStack: ['React', 'Node.js', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    categoryId: 'cat-8',
    category: categories[7],
    eventId: 'event-1',
    team: teams[5],
    technologies: [technologies[1], technologies[4], technologies[15], technologies[13], technologies[12]],
    officialScore: 7.40,
    maxScore: 10,
    evaluations: [],
    rank: 6,
    isFeatured: false,
    isPublished: true,
    publishedAt: '2025-03-20T10:00:00Z',
    createdAt: '2025-03-10T08:00:00Z',
    updatedAt: '2025-03-20T10:00:00Z',
  },
  {
    id: 'proj-7',
    name: 'DevCollab',
    slug: 'devcollab',
    shortDescription: 'A real-time collaborative code editor with integrated video conferencing, version control, and AI-assisted code review designed for remote pair programming.',
    thumbnailUrl: '/images/projects/devcollab-thumb.jpg',
    status: 'published',
    problemStatement: 'Remote software teams struggle with effective pair programming. Existing tools require switching between video calls, code editors, and version control systems, creating friction and reducing collaboration quality.',
    whyItMatters: 'Pair programming has been shown to reduce bug density by 15-40%, but remote adoption remains low due to tooling friction. A unified environment could bring these benefits to distributed teams.',
    proposedSolution: 'DevCollab provides a browser-based collaborative code editor with built-in video chat, shared terminal, Git integration, and an AI assistant that suggests improvements during code review sessions.',
    targetUsers: 'Software development teams, coding bootcamps, open-source contributors, technical interviews.',
    keyFeatures: [
      'Real-time collaborative editing (CRDT-based)',
      'Integrated video and voice chat',
      'Shared terminal and code execution',
      'Git integration with visual diff',
      'AI-assisted code review suggestions',
      'Session recording and playback',
    ],
    innovation: 'Uses a CRDT (Conflict-free Replicated Data Type) algorithm optimised for code syntax awareness, reducing merge conflicts in simultaneous multi-cursor editing by 75% compared to OT-based approaches.',
    practicalApplications: [
      'Remote pair programming',
      'Technical interviews',
      'Code review sessions',
      'Collaborative debugging',
    ],
    technologyStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    categoryId: 'cat-2',
    category: categories[1],
    eventId: 'event-1',
    team: teams[6],
    technologies: [technologies[3], technologies[13], technologies[4], technologies[5], technologies[17]],
    officialScore: 7.20,
    maxScore: 10,
    evaluations: [],
    rank: 7,
    isFeatured: false,
    isPublished: true,
    publishedAt: '2025-03-20T10:00:00Z',
    createdAt: '2025-03-10T08:00:00Z',
    updatedAt: '2025-03-20T10:00:00Z',
  },
  {
    id: 'proj-8',
    name: 'PredictHealth',
    slug: 'predicthealth',
    shortDescription: 'A predictive analytics platform that uses patient health records and lifestyle data to estimate disease risk and recommend preventive measures through a personalised health dashboard.',
    thumbnailUrl: '/images/projects/predicthealth-thumb.jpg',
    status: 'published',
    problemStatement: 'Chronic diseases such as diabetes and cardiovascular conditions are often detected too late for effective prevention. While risk factors are well-understood, personalised risk communication remains poor at the primary care level.',
    whyItMatters: 'Preventive intervention for chronic diseases is far more cost-effective than treatment. Personalised risk predictions could motivate behaviour change and enable earlier medical intervention.',
    proposedSolution: 'PredictHealth analyses anonymised health records and self-reported lifestyle data to generate personalised risk scores for common chronic conditions. The platform provides actionable recommendations and connects users with relevant healthcare resources.',
    targetUsers: 'Primary care patients, preventive health clinics, corporate wellness programmes, health insurers.',
    keyFeatures: [
      'Multi-condition risk prediction',
      'Personalised health dashboard',
      'Lifestyle recommendation engine',
      'Health data trend visualisation',
      'Integration with wearable devices',
      'Anonymised population health analytics',
    ],
    innovation: 'Combines traditional epidemiological risk models with gradient-boosted decision trees trained on regional health data, accounting for population-specific risk factors that global models miss.',
    practicalApplications: [
      'Preventive healthcare',
      'Corporate wellness programmes',
      'Health insurance risk assessment',
      'Public health planning',
    ],
    technologyStack: ['Python', 'Scikit-learn', 'FastAPI', 'React', 'MongoDB', 'Docker'],
    categoryId: 'cat-1',
    category: categories[0],
    eventId: 'event-1',
    team: teams[7],
    technologies: [technologies[0], technologies[16], technologies[11], technologies[1], technologies[10], technologies[17]],
    officialScore: 7.00,
    maxScore: 10,
    evaluations: [],
    rank: 8,
    isFeatured: false,
    isPublished: true,
    publishedAt: '2025-03-20T10:00:00Z',
    createdAt: '2025-03-10T08:00:00Z',
    updatedAt: '2025-03-20T10:00:00Z',
  },
];

// Wire up evaluations for top 3 projects (abbreviated)
projects[0].evaluations = [
  makeEvaluation('eval-1a', 'proj-1', 'judge-1', judges[0], [9, 9, 8, 8, 9],
    ['Novel combination of edge AI with sensor fusion', 'Strong technical implementation with real hardware prototype', 'Clear problem-solution fit with measurable impact potential'],
    ['Dataset size could be larger for production deployment', 'Offline mode needs more testing in poor network conditions'],
    ['Consider partnerships with automotive OEMs', 'Test with more camera models and weather conditions'],
    'Impressive technical execution with a clear and important use case. The edge deployment approach is practical and the accuracy numbers are promising.'
  ),
  makeEvaluation('eval-1b', 'proj-1', 'judge-2', judges[1], [8, 9, 9, 8, 8],
    ['Well-architected three-tier system', 'Good engineering practices with clear documentation', 'Practical deployment considerations addressed'],
    ['Mobile app companion could use better UX design', 'Need load testing for the cloud notification service'],
    ['Add support for fleet management dashboards', 'Consider edge case handling for low-light conditions'],
    'Solid engineering work. The architecture is thoughtful and the team clearly understood both the technical and practical challenges.'
  ),
  makeEvaluation('eval-1c', 'proj-1', 'judge-3', judges[2], [8, 8, 9, 9, 9],
    ['Strong market potential in fleet management', 'Clear revenue model possibilities', 'Addresses a genuine pain point with measurable outcomes'],
    ['Go-to-market strategy needs more detail', 'Regulatory considerations for emergency notifications not fully addressed'],
    ['Develop partnerships with insurance companies', 'Explore integration with existing fleet management platforms'],
    'This project has strong commercial potential. The team presented their work clearly and demonstrated genuine understanding of the market.'
  ),
  makeEvaluation('eval-1d', 'proj-1', 'judge-4', judges[3], [9, 9, 8, 8, 9],
    ['Rigorous evaluation methodology', 'Hardware prototype demonstrates feasibility', 'Good consideration of real-world deployment constraints'],
    ['Could benefit from a larger and more diverse test dataset', 'Power consumption analysis for embedded deployment not presented'],
    ['Conduct field trials with local transport authorities', 'Document the sensor calibration process more thoroughly'],
    'Methodologically sound with a well-executed prototype. The cross-validation approach and honest reporting of limitations is commendable.'
  ),
];

projects[1].evaluations = [
  makeEvaluation('eval-2a', 'proj-2', 'judge-1', judges[0], [8, 8, 9, 7, 8],
    ['Creative use of low-cost sensors for environmental monitoring', 'Community-driven approach is innovative', 'Good data visualisation'],
    ['Sensor calibration methodology needs more rigour', 'LoRaWAN range limitations not fully explored'],
    ['Collaborate with environmental science researchers for calibration', 'Add machine learning for anomaly detection'],
    'A promising project with genuine social impact potential. The cost analysis is compelling but the accuracy claims need more validation.'
  ),
  makeEvaluation('eval-2b', 'proj-2', 'judge-4', judges[3], [9, 8, 9, 7, 8],
    ['Excellent alignment with sustainability goals', 'Hardware design is practical and reproducible', 'Community engagement model is well thought out'],
    ['Long-term sensor maintenance plan not addressed', 'Weather resistance of sensor enclosures needs testing'],
    ['Design weather-proof enclosures rated for monsoon conditions', 'Create a sensor maintenance guide for community volunteers'],
    'Strong project with clear environmental impact. The IoT architecture is appropriate for the use case.'
  ),
];

projects[2].evaluations = [
  makeEvaluation('eval-3a', 'proj-3', 'judge-1', judges[0], [8, 8, 9, 7, 8],
    ['Addresses a critical gap in rural healthcare', 'Good attention to dataset diversity and bias', 'Offline capability is essential for target users'],
    ['87.3% top-3 accuracy may not be sufficient for clinical use', 'Limited to 23 conditions — many common conditions excluded'],
    ['Expand the training dataset with more skin types', 'Conduct usability testing with actual rural health workers'],
    'Important application of AI for healthcare access. The team\'s attention to bias and ethics is noteworthy, but clinical validation is needed before any deployment claims.'
  ),
];

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

export const demoUser: User = {
  id: 'user-demo',
  email: 'demo@rabinja.com',
  name: 'Demo User',
  avatarUrl: '',
  bio: 'Exploring projects on RABINJA Projex.',
  interests: ['AI', 'Web Development', 'Design'],
  role: 'user',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z',
};

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

export const demoDiscussions: Discussion[] = [
  {
    id: 'disc-1',
    projectId: 'proj-1',
    userId: 'user-demo',
    user: { ...demoUser, name: 'Anil Kapoor', id: 'user-2' },
    title: 'How does the sensor fusion handle GPS signal loss in tunnels?',
    content: 'I noticed the system relies on GPS for location reporting. In urban areas with tunnels and multi-story parking, GPS signals can be completely lost. How does the system handle this edge case?',
    replyCount: 3,
    createdAt: '2025-03-21T14:00:00Z',
    updatedAt: '2025-03-21T14:00:00Z',
  },
  {
    id: 'disc-2',
    projectId: 'proj-1',
    userId: 'user-demo',
    user: { ...demoUser, name: 'Divya Nair', id: 'user-3' },
    title: 'Comparison with existing commercial solutions',
    content: 'Some newer vehicles already have built-in collision detection. How does SafeRoute AI compare with systems like BMW\'s Intelligent Emergency Call or OnStar? What is the value proposition for vehicles that already have these features?',
    replyCount: 1,
    createdAt: '2025-03-22T09:30:00Z',
    updatedAt: '2025-03-22T09:30:00Z',
  },
];

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
