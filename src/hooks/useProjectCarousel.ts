"use client";

import type { TouchEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectData } from "@/types/project";

const SLIDE_TRANSITION_MS = 800;
const WHEEL_THRESHOLD = 20;
const SWIPE_THRESHOLD = 50;

export function useProjectCarousel(projects: ProjectData[]) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const touchStartY = useRef(0);
    const animationTimeoutRef = useRef<number | null>(null);

    const lockAnimation = () => {
        setIsAnimating(true);
        if (animationTimeoutRef.current) {
            window.clearTimeout(animationTimeoutRef.current);
        }

        animationTimeoutRef.current = window.setTimeout(() => {
            setIsAnimating(false);
            animationTimeoutRef.current = null;
        }, SLIDE_TRANSITION_MS);
    };

    const changeSlide = useCallback((direction: "next" | "prev") => {
        if (isAnimating) {
            return;
        }

        if (direction === "next" && activeIndex < projects.length - 1) {
            lockAnimation();
            setActiveIndex((prev) => prev + 1);
        }

        if (direction === "prev" && activeIndex > 0) {
            lockAnimation();
            setActiveIndex((prev) => prev - 1);
        }
    }, [activeIndex, isAnimating, projects.length]);

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            if (Math.abs(event.deltaY) > WHEEL_THRESHOLD) {
                changeSlide(event.deltaY > 0 ? "next" : "prev");
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                changeSlide("next");
            }

            if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                changeSlide("prev");
            }
        };

        window.addEventListener("wheel", handleWheel);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [changeSlide]);

    useEffect(() => {
        document.body.style.backgroundColor = projects[activeIndex]?.color ?? "";
    }, [activeIndex, projects]);

    useEffect(() => {
        return () => {
            document.body.style.backgroundColor = "";
            if (animationTimeoutRef.current) {
                window.clearTimeout(animationTimeoutRef.current);
            }
        };
    }, []);

    const handleTouchStart = (event: TouchEvent) => {
        touchStartY.current = event.touches[0].clientY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
        const diff = touchStartY.current - event.changedTouches[0].clientY;

        if (Math.abs(diff) > SWIPE_THRESHOLD) {
            changeSlide(diff > 0 ? "next" : "prev");
        }
    };

    return {
        activeIndex,
        currentProject: projects[activeIndex],
        handleTouchEnd,
        handleTouchStart,
        projects,
    };
}
