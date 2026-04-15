import Image from "next/image";
import styles from "@/components/project/detailPage.module.css";
import type { ProjectData } from "@/types/project";

interface ProjectGalleryProps {
    project: ProjectData;
}

export function ProjectGallery({ project }: ProjectGalleryProps) {
    const images = [project.src, ...(project.detailImages ?? [])];

    return (
        <div className={styles.gallery}>
            {images.map((imageSrc, index) => (
                <div key={`${project.id}-${index}`} className={styles.imageFrame}>
                    <Image
                        src={imageSrc}
                        alt={index === 0 ? project.title : `${project.title} detail ${index}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 72vw"
                        className={styles.detailImage}
                        priority={index === 0}
                    />
                    <div className={styles.imageOverlay} />
                </div>
            ))}
        </div>
    );
}
