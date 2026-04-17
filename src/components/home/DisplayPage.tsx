"use client";

import { useEffect } from "react";
import styles from "@/app/page.module.css";
import { ProjectChrome } from "@/components/home/ProjectChrome";
import { ProjectProgress } from "@/components/home/ProjectProgress";
import { ProjectStack } from "@/components/home/ProjectStack";
import { useProjectCarousel } from "@/hooks/useProjectCarousel";
import { getProjects } from "@/lib/projects";

interface DisplayPageProps {
    initialProjectId?: number;
}

export function DisplayPage({ initialProjectId }: DisplayPageProps) {
    const projects = getProjects();
    const { activeIndex, currentProject, goToProject, handleTouchEnd, handleTouchStart } = useProjectCarousel(projects, initialProjectId);

    useEffect(() => {
        const previousBodyOverflow = document.body.style.overflow;
        const previousHtmlOverflow = document.documentElement.style.overflow;
        const previousBodyOverscroll = document.body.style.overscrollBehavior;
        const previousHtmlOverscroll = document.documentElement.style.overscrollBehavior;

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.body.style.overscrollBehavior = "none";
        document.documentElement.style.overscrollBehavior = "none";

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
            document.body.style.overscrollBehavior = previousBodyOverscroll;
            document.documentElement.style.overscrollBehavior = previousHtmlOverscroll;
        };
    }, []);

    useEffect(() => {
        const syncProjectFromUrl = () => {
            const projectId = Number(new URLSearchParams(window.location.search).get("project"));

            if (Number.isFinite(projectId)) {
                goToProject(projectId);
            }
        };

        const syncFrame = window.requestAnimationFrame(syncProjectFromUrl);
        window.addEventListener("popstate", syncProjectFromUrl);

        return () => {
            window.cancelAnimationFrame(syncFrame);
            window.removeEventListener("popstate", syncProjectFromUrl);
        };
    }, [goToProject]);

    useEffect(() => {
        if (!currentProject) {
            return;
        }

        const nextUrl = `/displayPage?project=${currentProject.id}`;
        const requestedProjectId = Number(new URLSearchParams(window.location.search).get("project"));

        if (Number.isFinite(requestedProjectId) && requestedProjectId !== currentProject.id) {
            return;
        }

        if (`${window.location.pathname}${window.location.search}` !== nextUrl) {
            window.history.replaceState(null, "", nextUrl);
        }
    }, [currentProject]);

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
