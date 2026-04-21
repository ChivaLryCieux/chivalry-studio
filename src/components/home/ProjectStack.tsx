"use client";

import { useRouter } from "next/navigation";
import styles from "@/app/page.module.css";
import { ProjectCard } from "@/components/home/ProjectCard";
import { ProjectRing3D } from "@/components/home/ProjectRing3D";
import type { ProjectData } from "@/types/project";

interface ProjectStackProps {
    activeIndex: number;
    displayMode: "ring" | "stack";
    onProjectFocus: (projectId: number) => void;
    projects: ProjectData[];
}

export function ProjectStack({ activeIndex, displayMode, onProjectFocus, projects }: ProjectStackProps) {
    const router = useRouter();
    const stackClassName = `${styles.stackContainer} ${displayMode === "stack" ? styles.stackMode : ""}`;

    return (
        <div className={stackClassName}>
            <div className={styles.desktopRing}>
                <ProjectRing3D
                    activeIndex={activeIndex}
                    onProjectFocus={onProjectFocus}
                    onProjectOpen={(projectId) => router.push(`/detailPage/${projectId}?fromProject=${projectId}`)}
                    projects={projects}
                />
            </div>

            <div className={styles.mobileStack}>
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        activeIndex={activeIndex}
                        index={index}
                        project={project}
                        totalProjects={projects.length}
                    />
                ))}
            </div>
        </div>
    );
}
