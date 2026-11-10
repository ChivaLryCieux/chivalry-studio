'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '@/app/page.module.css';
import { HomeSplashScreen } from '@/components/home/HomeSplashScreen';
import { ProjectChrome } from '@/components/home/ProjectChrome';
import { ProjectProgress } from '@/components/home/ProjectProgress';
import { ProjectStack } from '@/components/home/ProjectStack';
import { PROJECT_CARDS } from '@/data/cards';
import { useProjectCarousel } from '@/hooks/useProjectCarousel';

const CENTER_MODEL_ASSET = '/models/Poly-2.glb';

/** 展厅预载清单:全部卡片缩略图 + 中央 GLB,splash 进度即真实进度 */
const PRELOAD_MANIFEST = [
  ...new Set([
    ...PROJECT_CARDS.map((card) => card.cardSrc),
    CENTER_MODEL_ASSET,
  ]),
];

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new window.Image();
    image.decoding = 'async';
    image.onload = () => resolve();
    image.onerror = () => resolve(); // 降级处理,即使预加载失败也继续
    image.src = src;
  });
}

function preloadBinary(url: string) {
  return fetch(url, { cache: 'force-cache' })
    .then(() => undefined)
    .catch(() => undefined); // 降级处理
}

export function DisplayPage() {
  const searchParams = useSearchParams();
  const requestedProjectId = Number(searchParams.get('project'));
  const initialProjectId =
    Number.isFinite(requestedProjectId) && requestedProjectId > 0
      ? requestedProjectId
      : undefined;
  const {
    activeIndex,
    currentProject,
    goToProject,
    handleTouchEnd,
    handleTouchStart,
  } = useProjectCarousel(PROJECT_CARDS, initialProjectId);
  const [displayMode, setDisplayMode] = useState<'ring' | 'stack'>('ring');
  const [sceneProgress, setSceneProgress] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const [splashComplete, setSplashComplete] = useState(false);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverscroll = document.body.style.overscrollBehavior;
    const previousHtmlOverscroll =
      document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overscrollBehavior = previousBodyOverscroll;
      document.documentElement.style.overscrollBehavior =
        previousHtmlOverscroll;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let loadedAssets = 0;
    const totalAssets = PRELOAD_MANIFEST.length;

    const updateProgress = () => {
      if (cancelled) {
        return;
      }

      loadedAssets += 1;
      setSceneProgress(Math.round((loadedAssets / totalAssets) * 100));

      if (loadedAssets === totalAssets) {
        window.requestAnimationFrame(() => {
          if (!cancelled) {
            setSceneReady(true);
          }
        });
      }
    };

    PRELOAD_MANIFEST.forEach((url) => {
      const preloadTask = url.endsWith('.glb')
        ? preloadBinary(url)
        : preloadImage(url);
      preloadTask.finally(updateProgress);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // URL ?project= 参数 → 轮播定位(前进/后退导航)
  useEffect(() => {
    if (initialProjectId !== undefined) {
      goToProject(initialProjectId);
    }
  }, [initialProjectId, goToProject]);

  // 当前项目 → 回写 URL(replaceState 不触发路由,不会与上一条 effect 互踢)
  useEffect(() => {
    if (!currentProject) {
      return;
    }

    const nextUrl = `/?project=${currentProject.id}`;

    if (
      Number.isFinite(requestedProjectId) &&
      requestedProjectId !== currentProject.id
    ) {
      return;
    }

    if (`${window.location.pathname}${window.location.search}` !== nextUrl) {
      window.history.replaceState(null, '', nextUrl);
    }
  }, [currentProject, requestedProjectId]);

  if (!currentProject) {
    return (
      <main className={styles.main}>
        <div>No projects found.</div>
      </main>
    );
  }

  return (
    <main
      className={styles.main}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {!splashComplete ? (
        <HomeSplashScreen
          isReady={sceneReady}
          onComplete={() => setSplashComplete(true)}
          progress={sceneProgress}
        />
      ) : null}
      <ProjectChrome
        currentProject={currentProject}
        displayMode={displayMode}
        onDisplayModeToggle={() =>
          setDisplayMode((mode) => (mode === 'ring' ? 'stack' : 'ring'))
        }
      />
      <ProjectProgress
        activeIndex={activeIndex}
        totalProjects={PROJECT_CARDS.length}
      />
      <ProjectStack
        activeIndex={activeIndex}
        displayMode={displayMode}
        onProjectFocus={goToProject}
        projects={PROJECT_CARDS}
      />
    </main>
  );
}
