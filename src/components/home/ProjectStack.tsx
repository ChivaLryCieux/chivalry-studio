import styles from "@/app/page.module.css";
import { ProjectCard } from "@/components/home/ProjectCard";
import type { ProjectData } from "@/types/project";

interface ProjectStackProps {
    activeIndex: number;
    projects: ProjectData[];
}

export function ProjectStack({ activeIndex, projects }: ProjectStackProps) {
    return (
        <div className={styles.stackContainer}>
            {projects.map((project, index) => (
                <ProjectCard
                    key={project.id}
                    activeIndex={activeIndex}
                    index={index}
                    project={project}
                />
            ))}
        </div>
    );
}
