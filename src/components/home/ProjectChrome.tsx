import styles from '@/app/page.module.css';
import type { ProjectData } from '@/types/project';

interface ProjectChromeProps {
  currentProject: ProjectData;
  displayMode: 'ring' | 'stack';
  onDisplayModeToggle: () => void;
}

export function ProjectChrome({ currentProject, displayMode, onDisplayModeToggle }: ProjectChromeProps) {
  const previewTitle = (currentProject.cardTitleLines ?? [currentProject.title]).join(' ');
  const nextModeLabel = displayMode === 'ring' ? 'Switch to 2D stack' : 'Switch to 3D ring';

  return (
    <>
      <div className={styles.topLeft}>
        <button
          type="button"
          className={styles.logoButton}
          onClick={onDisplayModeToggle}
          aria-label={nextModeLabel}
          title={nextModeLabel}
        >
          <span className={styles.logo}>
            Luo Ruiyang
            <br />
            Projects
          </span>
        </button>
        <div className={styles.yearDisplay}>
          <span className={styles.label}>Year</span>
          <span className={styles.value}>{currentProject.year}</span>
        </div>
      </div>

      <div className={styles.topCenter}>
        <div className={styles.topProjectTitle}>{previewTitle}</div>
      </div>

      <div className={styles.topRight}>
        <span>SCROLL TO</span>
        <span>PORTRAY ME</span>
        <span>TAP TO</span>
        <span>UNVEIL MORE</span>
      </div>

      <div className={styles.bottomLeft}>
        <a href="mailto:chivalrycieux@qq.com" className={styles.email}>
          chivalrycieux@qq.com
        </a>
      </div>

      <div className={styles.bottomRight}>
        <span>Shanghai, China</span>
        <div className={styles.circleIndicator} />
      </div>
    </>
  );
}
