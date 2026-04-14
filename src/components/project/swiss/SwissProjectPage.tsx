import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { ProjectData } from "@/types/project";
import styles from "./swiss-project.module.css";

interface SwissProjectPageProps {
    project: ProjectData;
}

export function SwissProjectPage({ project }: SwissProjectPageProps) {
    const caseStudy = project.caseStudy;
    const images = [project.src, ...(project.detailImages ?? [])];

    if (!caseStudy) {
        return null;
    }

    const pageStyle: CSSProperties & Record<"--accent", string> = {
        "--accent": caseStudy.accent
    };

    return (
        <main className={styles.page} style={pageStyle}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.navLink}>WORKS</Link>
                <span>{project.year}</span>
            </nav>

            <section className={styles.hero}>
                <div className={styles.heroMeta}>
                    <span>{caseStudy.eyebrow}</span>
                    <span>0{project.id}</span>
                </div>
                <div className={styles.heroGrid}>
                    <div className={styles.heroCopy}>
                        <p className={styles.category}>{project.category}</p>
                        <h1>{caseStudy.headline}</h1>
                    </div>
                    <p className={styles.deck}>{caseStudy.deck}</p>
                </div>
                <div className={styles.heroImage}>
                    <Image
                        src={project.src}
                        alt={`${project.title} cover`}
                        fill
                        sizes="100vw"
                        priority
                        className={styles.coverImage}
                    />
                </div>
            </section>

            <section className={styles.metrics} aria-label={`${project.title} metrics`}>
                {caseStudy.metrics.map((metric) => (
                    <div key={metric.label} className={styles.metric}>
                        <span>{metric.label}</span>
                        <strong>{metric.value}</strong>
                    </div>
                ))}
            </section>

            <section className={styles.overview}>
                <div>
                    <p className={styles.sectionLabel}>Repository</p>
                    <p className={styles.repoPath}>{caseStudy.repoPath}</p>
                </div>
                <div>
                    <p className={styles.sectionLabel}>Technical Stack</p>
                    <div className={styles.stackList}>
                        {caseStudy.stack.map((item) => (
                            <span key={item}>{item}</span>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.narrative}>
                {caseStudy.sections.map((section) => (
                    <article key={section.kicker} className={styles.storyBlock}>
                        <p>{section.kicker}</p>
                        <h2>{section.title}</h2>
                        <span>{section.body}</span>
                    </article>
                ))}
            </section>

            <section className={styles.gallery}>
                {images.map((imageSrc, index) => (
                    <figure key={imageSrc} className={styles.figure}>
                        <div className={styles.figureImage}>
                            <Image
                                src={imageSrc}
                                alt={`${project.title} visual ${index + 1}`}
                                fill
                                sizes="(max-width: 900px) 100vw, 72vw"
                                className={styles.galleryImage}
                            />
                        </div>
                        <figcaption>{String(index + 1).padStart(2, "0")} / {project.title}</figcaption>
                    </figure>
                ))}
            </section>

            <section className={styles.highlights}>
                <p className={styles.sectionLabel}>What I Built</p>
                <div className={styles.highlightGrid}>
                    {caseStudy.highlights.map((highlight, index) => (
                        <div key={highlight} className={styles.highlight}>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <p>{highlight}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
