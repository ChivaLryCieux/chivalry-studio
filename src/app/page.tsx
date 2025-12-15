"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { ModelViewer } from "@/components/ModelViewer";

const projects = [
    {
        id: 1,
        title: "",
        year: "2025",
        category: "Architecture",
        color: "#3e1c1c", // 深红棕色
        imagePlaceholder: "CP",
        src: "/images/1.PNG"
    },
    {
        id: 2,
        title: "",
        year: "2025",
        category: "Interior",
        color: "#4a2b22",
        imagePlaceholder: "HO",
        src: "/images/2.PNG"
    },
    {
        id: 3,
        title: "",
        year: "2025",
        category: "Digital Art",
        color: "#572f27",
        imagePlaceholder: "NV",
        src: "/images/3.PNG"
    },
    {
        id: 4,
        title: "",
        year: "2025",
        category: "Concept",
        color: "#90573b",
        imagePlaceholder: "SH",
        src: "/images/4.PNG"
    },
    {
        id: 5,
        title: "",
        year: "2025",
        category: "Concept",
        color: "#3e1c1c",
        imagePlaceholder: "SH",
        src: "/images/5.PNG"
    },
    {
        id: 6,
        title: "",
        year: "2025",
        category: "Concept",
        color: "#4a2b22",
        imagePlaceholder: "SH",
        src: "/images/6.PNG"
    },
    {
        id: 7,
        title: "",
        year: "2025",
        category: "Concept",
        color: "#572f27",
        imagePlaceholder: "SH",
        src: "/images/7.PNG"
    },
    {
        id: 8,
        title: "",
        year: "2025",
        category: "Concept",
        color: "#90573b",
        imagePlaceholder: "SH",
        src: "/images/8.PNG"
    },
    {
        id: 9,
        title: "",
        year: "2025",
        category: "Concept",
        color: "#3e1c1c",
        imagePlaceholder: "SH",
        src: "/images/9.PNG"
    },
    {
        id: 10,
        title: "",
        year: "2025",
        category: "Concept",
        color: "#4a2b22",
        imagePlaceholder: "SH",
        src: "/images/10.PNG"
    },
    {
        id: 11,
        title: "",
        year: "2025",
        category: "Concept",
        color: "#572f27",
        imagePlaceholder: "SH",
        src: "/images/11.PNG"
    },
    {
        id: 12,
        title: "",
        year: "2025",
        category: "Concept",
        color: "#90573b",
        imagePlaceholder: "SH",
        src: "/images/12.PNG"
    },
];

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
            // 简单的防抖逻辑
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

        if (Math.abs(diff) > 50) { // 滑动超过50px才触发
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

            {/* 顶部中间 - 只保留3D模型 */}
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
                <a href="chivalrycieux@qq.com" className={styles.email}>chivalrycieux@qq.com</a>
            </div>

            {/* 底部右侧 */}
            <div className={styles.bottomRight}>
                <span>Shanghai, China</span>
                {/* 简单的圆形进度指示 */}
                <div className={styles.circleIndicator}></div>
            </div>

            {/* 底部进度条 (Ruler) */}
            <div className={styles.bottomBar}>
                <div className={styles.ticks}>
                    {/* 生成一些刻度线 */}
                    {Array.from({ length: 40 }).map((_, i) => (
                        <span key={i} className={styles.tick}>|</span>
                    ))}
                </div>
                {/* 当前进度指示 */}
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
                    // 计算卡片状态
                    let cardClass = styles.card;
                    if (index === activeIndex) cardClass += ` ${styles.active}`;
                    else if (index === activeIndex + 1) cardClass += ` ${styles.next}`;
                    else if (index < activeIndex) cardClass += ` ${styles.prev}`;
                    else cardClass += ` ${styles.hidden}`;

                    return (
                        <div key={proj.id} className={cardClass}>
                            <div className={styles.cardInner}>

                                {/* ✅ 修改开始：使用真实图片 */}
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={proj.src}
                                        alt={proj.title}
                                        fill // 让图片自动填满父容器
                                        sizes="(max-width: 768px) 100vw, 50vw" // 性能优化：移动端加载小图，桌面端加载大图
                                        className={styles.realImage}
                                        priority={index === 0} // 优化：优先加载第一张图，防止闪烁
                                    />

                                    {/* 标题依然盖在图片上面 */}
                                    <h2 className={styles.cardTitle}>
                                        {proj.title.split(' ').map((word, i) => (
                                            <span key={i} style={{ display: 'block', marginLeft: i * 40 + 'px' }}>
                   {word}
                 </span>
                                        ))}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}