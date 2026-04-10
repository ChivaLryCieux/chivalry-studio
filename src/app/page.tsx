"use client";

import styles from "./page.module.css";
import { ProjectChrome } from "@/components/home/ProjectChrome";
import { ProjectProgress } from "@/components/home/ProjectProgress";
import { ProjectStack } from "@/components/home/ProjectStack";
import { useProjectCarousel } from "@/hooks/useProjectCarousel";
import { getProjects } from "@/lib/projects";

export default function Home() {
    const projects = getProjects();
    const { activeIndex, currentProject, handleTouchEnd, handleTouchStart } = useProjectCarousel(projects);

    if (!currentProject) {
        return (
            <main className={styles.main}>
                <div>No projects found.</div>
            </main>
        );
    }

    return (
        <main
            className={styles.main}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <ProjectChrome currentProject={currentProject} />
            <ProjectProgress activeIndex={activeIndex} totalProjects={projects.length} />
            <ProjectStack activeIndex={activeIndex} projects={projects} />
        </main>
    );
}
