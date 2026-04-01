import styles from "@/app/page.module.css";
import { ModelViewer } from "@/components/ModelViewer";
import type { ProjectData } from "@/types/project";

interface ProjectChromeProps {
    currentProject: ProjectData;
}

export function ProjectChrome({ currentProject }: ProjectChromeProps) {
    return (
        <>
            <div className={styles.topLeft}>
                <div className={styles.logo}>Luo Ruiyang<br />Projects</div>
                <div className={styles.yearDisplay}>
                    <span className={styles.label}>Year</span>
                    <span className={styles.value}>{currentProject.year}</span>
                </div>
            </div>

            <div className={styles.topCenter}>
                <div className={styles.modelContainer}>
                    <ModelViewer />
                </div>
            </div>

            <div className={styles.topRight}>
                <span>01 Work</span>
                <span className={styles.menuTrigger}>.... Menu</span>
                <div className={styles.scrollHint}>Scroll</div>
            </div>

            <div className={styles.bottomLeft}>
                <a href="mailto:chivalrycieux@qq.com" className={styles.email}>chivalrycieux@qq.com</a>
            </div>

            <div className={styles.bottomRight}>
                <span>Shanghai, China</span>
                <div className={styles.circleIndicator} />
            </div>
        </>
    );
}
