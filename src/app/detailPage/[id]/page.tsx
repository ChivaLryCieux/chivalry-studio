import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { ProjectSidebar } from "@/components/project/ProjectSidebar";
import { BitcoinStoryPage } from "@/components/project/bitcoin/BitcoinStoryPage";
import { BitcoinMonolithPage } from "@/components/project/monolith/BitcoinMonolithPage";
import { SwissProjectPage } from "@/components/project/swiss/SwissProjectPage";
import { getProjectById } from "@/lib/projects";
import styles from "@/components/project/detailPage.module.css";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function DetailPage({ params }: PageProps) {
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

    if (project.template === "swiss-case") {
        return <SwissProjectPage project={project} />;
    }

    return (
        <main className={styles.page}>
            <nav className={styles.nav}>
                <Link href={`/displayPage?project=${project.id}`} className={styles.navLink}>
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
