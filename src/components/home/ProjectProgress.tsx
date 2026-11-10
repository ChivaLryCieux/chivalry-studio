import styles from './ProjectProgress.module.css';
import { getCarouselProgress } from '@/lib/carousel';
import { formatOrdinal } from '@/lib/format';

interface ProjectProgressProps {
  activeIndex: number;
  totalProjects: number;
}

export function ProjectProgress({
  activeIndex,
  totalProjects,
}: ProjectProgressProps) {
  const projectLabel = formatOrdinal(activeIndex + 1);

  return (
    <div className={styles.bottomBar}>
      <div className={styles.ticks} aria-hidden="true" />
      <div
        className={styles.progressMarker}
        style={{
          left: `${getCarouselProgress(activeIndex, totalProjects)}%`,
        }}
      >
        [ {projectLabel} ]
      </div>
    </div>
  );
}
