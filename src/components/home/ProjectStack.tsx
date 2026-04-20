"use client";

import { useRouter } from "next/navigation";
import styles from "@/app/page.module.css";
import { ProjectCard } from "@/components/home/ProjectCard";
import { ProjectRing3D } from "@/components/home/ProjectRing3D";
import type { ProjectData } from "@/types/project";

interface ProjectStackProps {
    activeIndex: number;
    onProjectFocus: (projectId: number) => void;
    projects: ProjectData[];
}

export function ProjectStack({ activeIndex, onProjectFocus, projects }: ProjectStackProps) {
    const router = useRouter();

    return (
        <div className={styles.stackContainer}>
            <div className={styles.desktopRing}>
                <div className={styles.ringGlow} />
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
