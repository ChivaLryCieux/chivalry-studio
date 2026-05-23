import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectGallery } from '@/components/project/ProjectGallery';
import { ProjectSidebar } from '@/components/project/ProjectSidebar';
import { SwissProjectPage } from '@/components/project/swiss/SwissProjectPage';
import { getProjectById } from '@/lib/projects';
import styles from '@/components/project/detailPage.module.css';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    fromProject?: string;
  }>;
}

export default async function DetailPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const project = getProjectById(Number(resolvedParams.id));

  if (!project) {
    notFound();
  }

  const sourceProjectId = Number(resolvedSearchParams.fromProject);
  const returnProjectId = Number.isFinite(sourceProjectId) && getProjectById(sourceProjectId)
    ? sourceProjectId
    : project.id;

  if (project.template === 'swiss-case') {
    return <SwissProjectPage project={project} returnProjectId={returnProjectId} />;
  }

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <Link href={`/displayPage?project=${returnProjectId}`} className={styles.navLink}>
          WORKS
        </Link>
      </nav>

      <div className={styles.content}>
        <ProjectGallery project={project} />
        <ProjectSidebar project={project} />
      </div>
    </main>
  );
}
