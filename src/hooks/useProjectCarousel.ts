'use client';

import type { TouchEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ProjectData } from '@/types/project';

const SLIDE_TRANSITION_MS = 800;
const WHEEL_THRESHOLD = 20;
const SWIPE_THRESHOLD = 50;

function getInitialIndex(projects: ProjectData[], initialProjectId?: number) {
  if (!initialProjectId) {
    return 0;
  }

  const projectIndex = projects.findIndex((project) => project.id === initialProjectId);
  return projectIndex >= 0 ? projectIndex : 0;
}

function getLoopedIndex(index: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  return ((index % total) + total) % total;
}

export function useProjectCarousel(projects: ProjectData[], initialProjectId?: number) {
  const [activeIndex, setActiveIndex] = useState(() => getInitialIndex(projects, initialProjectId));
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartY = useRef(0);
  const animationTimeoutRef = useRef<number | null>(null);
  const safeIndex = getLoopedIndex(activeIndex, projects.length);

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

  const changeSlide = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating || projects.length === 0) {
      return;
    }

    lockAnimation();
    setActiveIndex((prev) => getLoopedIndex(prev + (direction === 'next' ? 1 : -1), projects.length));
  }, [isAnimating, projects.length]);

  const goToProject = useCallback((projectId?: number) => {
    setActiveIndex(getInitialIndex(projects, projectId));
  }, [projects]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      if (Math.abs(event.deltaY) > WHEEL_THRESHOLD) {
        changeSlide(event.deltaY > 0 ? 'next' : 'prev');
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        changeSlide('next');
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        changeSlide('prev');
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [changeSlide]);

  useEffect(() => {
    return () => {
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
      changeSlide(diff > 0 ? 'next' : 'prev');
    }
  };

  return {
    activeIndex: safeIndex,
    currentProject: projects[safeIndex] ?? null,
    goToProject,
    handleTouchEnd,
    handleTouchStart,
    projects,
  };
}
