import { ProjectDetailClient } from './ProjectDetailClient';
import { SAMPLE_PROJECTS } from '@/lib/sample-data';

export function generateStaticParams() {
  if (SAMPLE_PROJECTS.length === 0) {
    return [{ slug: 'preview' }];
  }
  return SAMPLE_PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectDetailClient slug={slug} />;
}
