import { clsx, type ClassValue } from 'clsx';

/**
 * Merge class names with clsx.
 * In Stage 2+ we may add tailwind-merge here.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format a date string for display.
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a short date (e.g., "Jan 15, 2025").
 */
export function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format file size in human-readable form.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Format a score as "X / Y".
 */
export function formatScore(score: number, maxScore: number): string {
  return `${score.toFixed(1)} / ${maxScore}`;
}

/**
 * Get percentage from score.
 */
export function scorePercentage(score: number, maxScore: number): number {
  if (maxScore === 0) return 0;
  return Math.round((score / maxScore) * 100);
}

/**
 * Truncate text to a given length.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Generate a URL-safe slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Get initials from a name (max 2 chars).
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/**
 * Evidence level display labels and colours.
 */
export const evidenceLevelConfig = {
  'supported': { label: 'Supported by Evidence', color: 'text-success', bg: 'bg-success-light' },
  'partially-supported': { label: 'Partially Supported', color: 'text-warning', bg: 'bg-warning-light' },
  'claimed-not-demonstrated': { label: 'Claimed, Not Demonstrated', color: 'text-accent', bg: 'bg-accent-light' },
  'insufficient-information': { label: 'Insufficient Information', color: 'text-text-muted', bg: 'bg-surface-hover' },
  'conflicting-evidence': { label: 'Conflicting Evidence', color: 'text-error', bg: 'bg-error-light' },
  'needs-verification': { label: 'Needs Verification', color: 'text-warning', bg: 'bg-warning-light' },
} as const;

/**
 * NEX mode display labels.
 */
export const nexModeLabels: Record<string, { label: string; description: string; icon: string }> = {
  'full-analysis': {
    label: 'Full Project Analysis',
    description: 'Comprehensive evaluation across all dimensions',
    icon: 'ClipboardCheck',
  },
  'technical-evaluation': {
    label: 'Technical Evaluation',
    description: 'Deep dive into architecture, implementation and code quality',
    icon: 'Code',
  },
  'innovation-evaluation': {
    label: 'Innovation Evaluation',
    description: 'Assess originality, novelty and creative problem-solving',
    icon: 'Lightbulb',
  },
  'feasibility': {
    label: 'Feasibility & Scalability',
    description: 'Evaluate real-world viability and growth potential',
    icon: 'TrendingUp',
  },
  'research-review': {
    label: 'Research & Evidence Review',
    description: 'Verify claims, citations and evidence quality',
    icon: 'BookOpen',
  },
  'judge-simulation': {
    label: 'Judge Simulation',
    description: 'Practice with AI-generated judge questions',
    icon: 'Scale',
  },
  'presentation-practice': {
    label: 'Presentation Practice',
    description: 'Rehearse your project presentation with feedback',
    icon: 'Presentation',
  },
  'improvement-coach': {
    label: 'Improvement Coach',
    description: 'Get actionable suggestions to strengthen your project',
    icon: 'Target',
  },
};
