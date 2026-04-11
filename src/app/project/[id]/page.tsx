import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { ProjectSidebar } from "@/components/project/ProjectSidebar";
import { BitcoinStoryPage } from "@/components/project/bitcoin/BitcoinStoryPage";
import { BitcoinMonolithPage } from "@/components/project/monolith/BitcoinMonolithPage";
import { getProjectById } from "@/lib/projects";
import styles from "./page.module.css";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProjectDetail({ params }: PageProps) {
    const resolvedParams = await params;
    const project = getProjectById(Number(resolvedParams.id));

    if (!project) {
        notFound();
    }

    if (project.template === "bitcoin-story") {
        return <BitcoinStoryPage />;
    }

    if (project.template === "bitcoin-monolith") {
        return <BitcoinMonolithPage />;
    }

    return (
        <main className={styles.page}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.navLink}>
                    WORKS
                </Link>
            </nav>

            <div className={styles.content}>
                <ProjectGallery project={project} />
                <ProjectSidebar project={project} />
            </div>
        </main>
    );
}
