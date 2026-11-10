import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectGallery } from '@/components/project/ProjectGallery';
import { ProjectSidebar } from '@/components/project/ProjectSidebar';
import { SwissProjectPage } from '@/components/project/swiss/SwissProjectPage';
import { WorksBackLink } from '@/components/project/WorksBackLink';
import { PROJECTS, getProjectById } from '@/data';
import styles from '@/components/project/projectPage.module.css';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    id: String(project.id),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectById(Number(resolvedParams.id));

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const description =
    project.description ||
    (project.template === 'swiss-case'
      ? project.caseStudy.deck
      : `${project.title} - ${project.category}`);

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      images: [
        {
          url: project.src,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = getProjectById(Number(resolvedParams.id));

  if (!project) {
    notFound();
  }

  if (project.template === 'swiss-case') {
    return <SwissProjectPage project={project} />;
  }

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <WorksBackLink
          className={styles.navLink}
          fallbackProjectId={project.id}
          label="WORKS"
        />
      </nav>

      <div className={styles.content}>
        <ProjectGallery project={project} />
        <ProjectSidebar project={project} />
      </div>
    </main>
  );
}
