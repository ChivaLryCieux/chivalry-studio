import styles from "@/app/project/[id]/page.module.css";
import type { ProjectData } from "@/types/project";

interface ProjectSidebarProps {
    project: ProjectData;
}

export function ProjectSidebar({ project }: ProjectSidebarProps) {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarInner}>
                <div className={styles.titleBlock}>
                    <div className={styles.projectMeta}>
                        0{project.id} / {project.category}
                    </div>
                    <h1 className={styles.projectTitle}>{project.title || "Untitled"}</h1>
                </div>

                <div className={styles.infoBlock}>
                    <p><strong>YEAR:</strong> {project.year}</p>
                    <p><strong>DESC:</strong> {project.description || "Coming soon."}</p>
                    {project.content ? <p><strong>DETAILS:</strong> {project.content}</p> : null}
                </div>
            </div>
        </aside>
    );
}
