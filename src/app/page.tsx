"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link"; //
import { ModelViewer } from "@/components/ModelViewer";
import { projects } from "@/data/projects";

export default function Home() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // 触摸状态引用
    const touchStartY = useRef(0);

    // 切换逻辑
    const changeSlide = (direction: "next" | "prev") => {
        if (isAnimating) return;

        if (direction === "next" && activeIndex < projects.length - 1) {
            setIsAnimating(true);
            setActiveIndex((prev) => prev + 1);
            setTimeout(() => setIsAnimating(false), 800); // 锁定时间需匹配CSS过渡时间
        } else if (direction === "prev" && activeIndex > 0) {
            setIsAnimating(true);
            setActiveIndex((prev) => prev - 1);
            setTimeout(() => setIsAnimating(false), 800);
        }
    };

    // 监听键盘、滚轮
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > 20) {
                changeSlide(e.deltaY > 0 ? "next" : "prev");
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown" || e.key === "ArrowRight") changeSlide("next");
            if (e.key === "ArrowUp" || e.key === "ArrowLeft") changeSlide("prev");
        };

        window.addEventListener("wheel", handleWheel);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeIndex, isAnimating]);

    // 监听触摸（移动端适配）
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY.current - touchEndY;

        if (Math.abs(diff) > 50) {
            changeSlide(diff > 0 ? "next" : "prev");
        }
    };

    // 动态设置背景色
    useEffect(() => {
        document.body.style.backgroundColor = projects[activeIndex].color;
    }, [activeIndex]);

    const currentProject = projects[activeIndex];

    return (
        <main
            className={styles.main}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* --- UI 层 (固定在屏幕四周) --- */}

            {/* 顶部左侧 */}
            <div className={styles.topLeft}>
                <div className={styles.logo}>Luo Ruiyang<br/>Projects</div>
                <div className={styles.yearDisplay}>
                    <span className={styles.label}>Year</span>
                    <span className={styles.value}>{currentProject.year}</span>
                </div>
            </div>

            {/* 顶部中间 - 3D模型 */}
            <div className={styles.topCenter}>
                <div className={styles.modelContainer}>
                    <ModelViewer />
                </div>
            </div>

            {/* 顶部右侧 */}
            <div className={styles.topRight}>
                <span>01 Work</span>
                <span className={styles.menuTrigger}>.... Menu</span>
                <div className={styles.scrollHint}>Scroll</div>
            </div>

            {/* 底部左侧 */}
            <div className={styles.bottomLeft}>
                <a href="mailto:chivalrycieux@qq.com" className={styles.email}>chivalrycieux@qq.com</a>
            </div>

            {/* 底部右侧 */}
            <div className={styles.bottomRight}>
                <span>Shanghai, China</span>
                <div className={styles.circleIndicator}></div>
            </div>

            {/* 底部进度条 (Ruler) */}
            <div className={styles.bottomBar}>
                <div className={styles.ticks}>
                    {Array.from({ length: 40 }).map((_, i) => (
                        <span key={i} className={styles.tick}>|</span>
                    ))}
                </div>
                <div
                    className={styles.progressMarker}
                    style={{ left: `${(activeIndex / (projects.length - 1)) * 90 + 5}%` }}
                >
                    [ 0{activeIndex + 1} ]
                </div>
            </div>


            {/* --- 内容层 (卡片堆叠) --- */}
            <div className={styles.stackContainer}>
                {projects.map((proj, index) => {
                    let cardClass = styles.card;
                    if (index === activeIndex) cardClass += ` ${styles.active}`;
                    else if (index === activeIndex + 1) cardClass += ` ${styles.next}`;
                    else if (index < activeIndex) cardClass += ` ${styles.prev}`;
                    else cardClass += ` ${styles.hidden}`;

                    return (
                        // ✅ Link 包裹
                        <Link
                            key={proj.id}
                            href={`/project/${proj.id}`}
                            className={cardClass}
                        >
                            <div className={styles.cardInner}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={proj.src}
                                        alt={proj.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className={styles.realImage}
                                        priority={index === 0}
                                    />

                                    <h2 className={styles.cardTitle}>
                                        {/* 处理可能的空标题 */}
                                        {proj.title ? proj.title.split(' ').map((word, i) => (
                                            <span
                                                key={i}
                                                style={{
                                                    display: 'block',  // 保持块级元素，让每个文字独占一行
                                                    textAlign: 'center',  // 文字水平居中
                                                }}
                                            >
                                                {word}
                                            </span>
                                        )) : (
                                            <span style={{ display: 'block' }}>UNTITLED</span>
                                        )}
                                    </h2>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}