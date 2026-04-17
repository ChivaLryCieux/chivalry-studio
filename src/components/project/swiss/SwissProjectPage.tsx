import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { ProjectData } from "@/types/project";
import styles from "./swiss-project.module.css";

interface SwissProjectPageProps {
    project: ProjectData;
    returnProjectId?: number;
}

export function SwissProjectPage({ project, returnProjectId = project.id }: SwissProjectPageProps) {
    const caseStudy = project.caseStudy;
    const images = Array.from(new Set((project.detailImages ?? []).filter((image) => image !== project.src)));
    const shouldContainImages = caseStudy?.imageFit === "contain";
    const isBilingualCase = project.src.includes("/soa/");
    const useLightFrame = project.src.includes("/soa/");

    if (!caseStudy) {
        return null;
    }

    const pageStyle: CSSProperties & Record<"--accent", string> = {
        "--accent": caseStudy.accent
    };

    return (
        <main className={styles.page} style={pageStyle}>
            <nav className={styles.nav}>
                <Link href={`/displayPage?project=${returnProjectId}`} className={styles.navLink}>{isBilingualCase ? "WORKS / 项目" : "WORKS"}</Link>
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
                    {caseStudy.keywords ? (
                        <div className={styles.keywordRail} aria-label={`${project.title} Chinese keywords`}>
                            {caseStudy.keywords.map((keyword) => (
                                <span key={keyword}>{keyword}</span>
                            ))}
                        </div>
                    ) : null}
                </div>
                <p className={styles.deck}>{caseStudy.deck}</p>
            </div>
                <div className={`${styles.heroImage} ${useLightFrame ? styles.lightFrame : ""}`}>
                    <Image
                        src={project.src}
                        alt={`${project.title} cover`}
                        fill
                        sizes="100vw"
                        priority
                        className={`${shouldContainImages ? styles.containImage : styles.coverImage} ${useLightFrame ? styles.lightBackgroundImage : ""}`}
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
                    <p className={styles.sectionLabel}>{isBilingualCase ? "Reference / 参考信息" : "Repository"}</p>
                    <p className={styles.repoPath}>{caseStudy.repoPath}</p>
                </div>
                <div>
                    <p className={styles.sectionLabel}>{isBilingualCase ? "Technical Stack / 技术框架" : "Technical Stack"}</p>
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

            {images.length > 0 ? (
                <section className={styles.gallery}>
                    {images.map((imageSrc, index) => (
                        <figure key={`${imageSrc}-${index}`} className={styles.figure}>
                            <div className={`${styles.figureImage} ${useLightFrame ? styles.lightFrame : ""}`}>
                                <Image
                                    src={imageSrc}
                                    alt={`${project.title} visual ${index + 1}`}
                                    fill
                                    sizes="(max-width: 900px) 100vw, 72vw"
                                    className={`${shouldContainImages ? styles.containImage : styles.galleryImage} ${useLightFrame ? styles.lightBackgroundImage : ""}`}
                                />
                            </div>
                            <figcaption>{String(index + 1).padStart(2, "0")} / {project.title}</figcaption>
                        </figure>
                    ))}
                </section>
            ) : null}

            <section className={styles.highlights}>
                <p className={styles.sectionLabel}>{isBilingualCase ? "Key Contributions / 核心贡献" : "What I Built"}</p>
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
