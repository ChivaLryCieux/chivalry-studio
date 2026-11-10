'use client';

import type { TouchEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PROJECT_CARD_INDEX } from '@/data/cards';
import { getLoopedIndex } from '@/lib/carousel';
import type { ProjectCardData, ProjectId } from '@/types/project';

const SLIDE_TRANSITION_MS = 800;
const WHEEL_THRESHOLD = 20;
const SWIPE_THRESHOLD = 50;

function getInitialIndex(initialProjectId?: ProjectId) {
  if (initialProjectId === undefined) {
    return 0;
  }

  return PROJECT_CARD_INDEX.get(initialProjectId) ?? 0;
}

export function useProjectCarousel(
  projects: readonly ProjectCardData[],
  initialProjectId?: ProjectId
) {
  const [activeIndex, setActiveIndex] = useState(() =>
    getInitialIndex(initialProjectId)
  );
  const isAnimatingRef = useRef(false);
  const touchStartY = useRef(0);
  const animationTimeoutRef = useRef<number | null>(null);
  const safeIndex = getLoopedIndex(activeIndex, projects.length);

  const lockAnimation = useCallback(() => {
    isAnimatingRef.current = true;
    if (animationTimeoutRef.current) {
      window.clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = window.setTimeout(() => {
      isAnimatingRef.current = false;
      animationTimeoutRef.current = null;
    }, SLIDE_TRANSITION_MS);
  }, []);

  const changeSlide = useCallback(
    (direction: 'next' | 'prev') => {
      if (isAnimatingRef.current || projects.length === 0) {
        return;
      }

      lockAnimation();
      setActiveIndex((prev) =>
        getLoopedIndex(prev + (direction === 'next' ? 1 : -1), projects.length)
      );
    },
    [lockAnimation, projects.length]
  );

  const goToProject = useCallback((projectId?: ProjectId) => {
    setActiveIndex(getInitialIndex(projectId));
  }, []);

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
