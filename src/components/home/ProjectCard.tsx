import Image from "next/image";
import Link from "next/link";
import styles from "@/app/page.module.css";
import type { ProjectData } from "@/types/project";

interface ProjectCardProps {
    activeIndex: number;
    index: number;
    project: ProjectData;
}

function getCardClassName(index: number, activeIndex: number) {
    const classNames = [styles.card];

    if (index === activeIndex) {
        classNames.push(styles.active);
    } else if (index === activeIndex + 1) {
        classNames.push(styles.next);
    } else if (index < activeIndex) {
        classNames.push(styles.prev);
    } else {
        classNames.push(styles.hidden);
    }

    return classNames.join(" ");
}

export function ProjectCard({ activeIndex, index, project }: ProjectCardProps) {
    return (
        <Link
            key={project.id}
            href={`/detailPage/${project.id}`}
            className={getCardClassName(index, activeIndex)}
        >
            <div className={styles.cardInner}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={project.src}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`${styles.realImage} ${project.id === 3 ? styles.realImageTop : ""}`}
                        priority={index === 0}
                    />
                </div>
            </div>
        </Link>
    );
}
