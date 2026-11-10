'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import styles from './ProjectStack.module.css';
import { ProjectCard } from '@/components/home/ProjectCard';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import type { ProjectCardData } from '@/types/project';

const ProjectRing3D = dynamic(
  () =>
    import('@/components/home/ProjectRing3D').then((mod) => mod.ProjectRing3D),
  { ssr: false }
);

const MOBILE_QUERY = '(max-width: 768px)';

interface ProjectStackProps {
  activeIndex: number;
  displayMode: 'ring' | 'stack';
  onProjectFocus: (projectId: number) => void;
  projects: readonly ProjectCardData[];
}

export function ProjectStack({
  activeIndex,
  displayMode,
  onProjectFocus,
  projects,
}: ProjectStackProps) {
  const router = useRouter();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  // isMobile 为 null(SSR/首帧)时两侧均不挂载,splash 会覆盖该空窗
  const ringVisible = displayMode === 'ring' && isMobile === false;
  const stackVisible = displayMode === 'stack' || isMobile === true;
  const stackClassName = `${styles.stackContainer} ${displayMode === 'stack' ? styles.stackMode : ''}`;

  return (
    <div className={stackClassName}>
      <div className={styles.desktopRing}>
        {ringVisible ? (
          <ProjectRing3D
            activeIndex={activeIndex}
            onProjectFocus={onProjectFocus}
            onProjectOpen={(projectId) =>
              router.push(`/project/${projectId}?fromProject=${projectId}`)
            }
            projects={projects}
          />
        ) : null}
      </div>

      <div className={styles.mobileStack}>
        {stackVisible
          ? projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                activeIndex={activeIndex}
                index={index}
                project={project}
                totalProjects={projects.length}
              />
            ))
          : null}
      </div>
    </div>
  );
}
