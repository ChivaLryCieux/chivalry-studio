'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from '@/app/page.module.css';
import { HomeSplashScreen } from '@/components/home/HomeSplashScreen';
import { ProjectChrome } from '@/components/home/ProjectChrome';
import { ProjectProgress } from '@/components/home/ProjectProgress';
import { ProjectStack } from '@/components/home/ProjectStack';
import { useProjectCarousel } from '@/hooks/useProjectCarousel';
import { getProjects } from '@/lib/projects';

interface DisplayPageProps {
  initialProjectId?: number;
}

const DISPLAY_HDR_ASSET = '/hdri/kiara_1_dawn_1k.hdr';
const DISPLAY_CENTER_MODEL_ASSET = '/models/newStar.glb';

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new window.Image();
    image.decoding = 'async';
    image.onload = () => resolve();
    image.onerror = () => resolve(); // 降级处理，即使预加载失败也继续
    image.src = src;
  });
}

function preloadBinary(url: string) {
  return fetch(url, { cache: 'force-cache' })
    .then(() => undefined)
    .catch(() => undefined); // 降级处理
}

export function DisplayPage({ initialProjectId }: DisplayPageProps) {
  const projects = useMemo(() => getProjects(), []);
  const { activeIndex, currentProject, goToProject, handleTouchEnd, handleTouchStart } = useProjectCarousel(
    projects,
    initialProjectId
  );
  const [displayMode, setDisplayMode] = useState<'ring' | 'stack'>('ring');
  const [sceneProgress, setSceneProgress] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const [splashComplete, setSplashComplete] = useState(false);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverscroll = document.body.style.overscrollBehavior;
    const previousHtmlOverscroll = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overscrollBehavior = previousBodyOverscroll;
      document.documentElement.style.overscrollBehavior = previousHtmlOverscroll;
    };
  }, []);

  useEffect(() => {
    if (!currentProject) {
      return;
    }

    let cancelled = false;
    const assetUrls = Array.from(new Set([currentProject.src, DISPLAY_HDR_ASSET, DISPLAY_CENTER_MODEL_ASSET]));
    const totalAssets = assetUrls.length;
    let loadedAssets = 0;

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

    assetUrls.forEach((url) => {
      const assetPath = url.split('?')[0];
      const preloadTask = assetPath.endsWith('.hdr') || assetPath.endsWith('.glb') ? preloadBinary(url) : preloadImage(url);
      preloadTask.finally(updateProgress);
    });

    return () => {
      cancelled = true;
    };
  }, [currentProject]);

  useEffect(() => {
    const syncProjectFromUrl = () => {
      const projectId = Number(new URLSearchParams(window.location.search).get('project'));

      if (Number.isFinite(projectId)) {
        goToProject(projectId);
      }
    };

    const syncFrame = window.requestAnimationFrame(syncProjectFromUrl);
    window.addEventListener('popstate', syncProjectFromUrl);

    return () => {
      window.cancelAnimationFrame(syncFrame);
      window.removeEventListener('popstate', syncProjectFromUrl);
    };
  }, [goToProject]);

  useEffect(() => {
    if (!currentProject) {
      return;
    }

    const nextUrl = `/displayPage?project=${currentProject.id}`;
    const requestedProjectId = Number(new URLSearchParams(window.location.search).get('project'));

    if (Number.isFinite(requestedProjectId) && requestedProjectId !== currentProject.id) {
      return;
    }

    if (`${window.location.pathname}${window.location.search}` !== nextUrl) {
      window.history.replaceState(null, '', nextUrl);
    }
  }, [currentProject]);

  if (!currentProject) {
    return (
      <main className={styles.main}>
        <div>No projects found.</div>
      </main>
    );
  }

  return (
    <main className={styles.main} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {!splashComplete ? (
        <HomeSplashScreen isReady={sceneReady} onComplete={() => setSplashComplete(true)} progress={sceneProgress} />
      ) : null}
      <ProjectChrome
        currentProject={currentProject}
        displayMode={displayMode}
        onDisplayModeToggle={() => setDisplayMode((mode) => (mode === 'ring' ? 'stack' : 'ring'))}
      />
      <ProjectProgress activeIndex={activeIndex} totalProjects={projects.length} />
      <ProjectStack
        activeIndex={activeIndex}
        displayMode={displayMode}
        onProjectFocus={goToProject}
        projects={projects}
      />
    </main>
  );
}
