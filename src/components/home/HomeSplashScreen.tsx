'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/app/page.module.css';

interface HomeSplashScreenProps {
  isReady: boolean;
  onComplete: () => void;
  progress: number;
  title?: string;
}

type SplashPhase = 'loading' | 'exiting';

export function HomeSplashScreen({ isReady, onComplete, progress, title = 'LUO RUIYANG' }: HomeSplashScreenProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [phase, setPhase] = useState<SplashPhase>('loading');
  const holdTimerRef = useRef<number | null>(null);
  const completeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const targetProgress = isReady ? 100 : Math.min(progress, 90);
    let frameId = 0;
    const tick = () => {
      setDisplayProgress((current) => {
        if (current >= targetProgress) {
          return current;
        }

        const delta = Math.max(0.4, (targetProgress - current) * 0.12);
        return Math.min(targetProgress, current + delta);
      });

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isReady, progress]);

  useEffect(() => {
    if (!isReady || displayProgress < 100 || phase !== 'loading') {
      return;
    }

    holdTimerRef.current = window.setTimeout(() => {
      setPhase('exiting');
    }, 700);

    return () => {
      if (holdTimerRef.current) {
        window.clearTimeout(holdTimerRef.current);
      }
    };
  }, [displayProgress, isReady, phase]);

  useEffect(() => {
    if (phase !== 'exiting') {
      return;
    }

    completeTimerRef.current = window.setTimeout(() => {
      onComplete();
    }, 1050);

    return () => {
      if (completeTimerRef.current) {
        window.clearTimeout(completeTimerRef.current);
      }
    };
  }, [onComplete, phase]);

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) {
        window.clearTimeout(holdTimerRef.current);
      }

      if (completeTimerRef.current) {
        window.clearTimeout(completeTimerRef.current);
      }
    };
  }, []);

  const progressValue = isReady ? Math.min(100, Math.round(displayProgress)) : Math.min(90, Math.floor(displayProgress));
  const isExiting = phase === 'exiting';

  return (
    <div className={`${styles.splashOverlay} ${isExiting ? styles.splashOverlayExiting : ''}`}>
      <div className={styles.splashContent}>
        <div className={`${styles.splashBrand} ${isExiting ? styles.splashBrandExiting : ''}`}>{title}</div>

        <div className={`${styles.splashProgress} ${isExiting ? styles.splashProgressExiting : ''}`}>
          <span className={styles.splashProgressValue}>{progressValue}</span>
          <div className={styles.splashProgressTrack} aria-hidden="true">
            <span
              className={styles.splashProgressFill}
              style={{ transform: `scaleX(${progressValue / 100})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
