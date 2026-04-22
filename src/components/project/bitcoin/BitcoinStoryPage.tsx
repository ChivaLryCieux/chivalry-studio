"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { HomeSplashScreen } from "@/components/home/HomeSplashScreen";
import styles from "./bitcoin-story.module.css";
import { BitcoinNarrativeGallery } from "./BitcoinNarrativeGallery";

interface BitcoinStoryPageProps {
    returnProjectId?: number;
}

const BITCOIN_STORY_ASSETS = [
    "/images/projects/bitcoin-story/panels/panel-1.png",
    "/images/projects/bitcoin-story/panels/panel-2.png",
    "/images/projects/bitcoin-story/panels/panel-3.png",
    "/images/projects/bitcoin-story/panels/panel-4.png",
    "/images/projects/bitcoin-story/panels/panel-5.png",
    "/images/projects/bitcoin-story/panels/panel-6.png",
    "/images/projects/bitcoin-story/panels/panel-7.png",
    "/images/projects/bitcoin-story/panels/panel-8.png",
    "/hdr/potsdamer_platz_1k.hdr",
] as const;

function preloadImage(src: string) {
    return new Promise<void>((resolve, reject) => {
        const image = new window.Image();
        image.decoding = "async";
        image.onload = () => resolve();
        image.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
        image.src = src;
    });
}

function preloadBinary(url: string) {
    return fetch(url, { cache: "force-cache" }).then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to preload asset: ${url}`);
        }

        return response.blob().then(() => undefined);
    });
}

export function BitcoinStoryPage({ returnProjectId = 9 }: BitcoinStoryPageProps) {
    const [sceneProgress, setSceneProgress] = useState(0);
    const [sceneReady, setSceneReady] = useState(false);
    const [splashComplete, setSplashComplete] = useState(false);
    const assetUrls = useMemo(() => Array.from(new Set(BITCOIN_STORY_ASSETS)), []);

    useEffect(() => {
        let cancelled = false;
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
            const preloadTask = url.endsWith(".hdr") ? preloadBinary(url) : preloadImage(url);

            preloadTask
                .catch(() => undefined)
                .finally(updateProgress);
        });

        return () => {
            cancelled = true;
        };
    }, [assetUrls]);

    return (
        <main className={styles.roomPage}>
            {!splashComplete ? (
                <HomeSplashScreen
                    isReady={sceneReady}
                    onComplete={() => setSplashComplete(true)}
                    progress={sceneProgress}
                    title="SATOSHI BITCOIN"
                />
            ) : null}

            <nav className={styles.roomNav}>
                <Link href={`/displayPage?project=${returnProjectId}`} className={styles.roomNavLink}>
                    Works
                </Link>
                <div className={styles.roomNavMeta}>Satoshi / Bitcoin / Narrative Room</div>
            </nav>

            <div className={styles.roomCanvas}>
                <BitcoinNarrativeGallery />
            </div>
        </main>
    );
}
