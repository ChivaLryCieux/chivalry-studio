import styles from '@/app/page.module.css';
import { getProjectProgress } from '@/lib/projects';

interface ProjectProgressProps {
  activeIndex: number;
  totalProjects: number;
}

export function ProjectProgress({ activeIndex, totalProjects }: ProjectProgressProps) {
  const projectLabel = String(activeIndex + 1).padStart(2, '0');

  return (
    <div className={styles.bottomBar}>
      <div className={styles.ticks}>
        {Array.from({ length: 40 }).map((_, index) => (
          <span key={index} className={styles.tick}>|</span>
        ))}
      </div>
      <div className={styles.progressMarker} style={{ left: `${getProjectProgress(activeIndex, totalProjects)}%` }}>
        [ {projectLabel} ]
      </div>
    </div>
  );
}
