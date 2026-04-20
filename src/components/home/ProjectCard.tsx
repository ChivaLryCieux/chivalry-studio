import Image from "next/image";
import Link from "next/link";
import styles from "@/app/page.module.css";
import type { ProjectData } from "@/types/project";

interface ProjectCardProps {
    activeIndex: number;
    index: number;
    project: ProjectData;
    totalProjects: number;
}

function getCardClassName(index: number, activeIndex: number, totalProjects: number) {
    const classNames = [styles.card];
    const nextIndex = totalProjects > 0 ? (activeIndex + 1) % totalProjects : activeIndex + 1;

    if (index === activeIndex) {
        classNames.push(styles.active);
    } else if (index === nextIndex) {
        classNames.push(styles.next);
    } else if (index < activeIndex || (activeIndex === 0 && index === totalProjects - 1)) {
        classNames.push(styles.prev);
    } else {
        classNames.push(styles.hidden);
    }

    return classNames.join(" ");
}

export function ProjectCard({ activeIndex, index, project, totalProjects }: ProjectCardProps) {
    return (
        <Link
            href={`/detailPage/${project.id}?fromProject=${project.id}`}
            className={getCardClassName(index, activeIndex, totalProjects)}
        >
            <div className={styles.cardInner}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={project.src}
                        alt={project.title}
                        fill
                        sizes="100vw"
                        className={`${styles.realImage} ${project.src.includes("/soa/") ? styles.realImageTop : ""}`}
                        priority={index === 0}
                    />
                </div>
            </div>
        </Link>
    );
}
