"use client";

import Link from "next/link";
import { type CSSProperties, type PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, PerspectiveCamera, Text } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";
import bitcoinPriceDaily from "@/data/bitcoinPriceDaily.json";
import { satoshiHoldings, type BitcoinPricePoint } from "@/data/bitcoinStory";
import { formatNumberCompact, formatUsdCompact } from "@/lib/numberFormat";
import styles from "./bitcoin-monolith.module.css";

const chapters = [
    {
        kicker: "01 / Genesis Signal",
        title: "从一个神秘人开始，但真正扩张的是协议",
        body: "关于中本聪，最重要的并不是身份悬案，而是他把哪些旧技术拼在一起，以及拼接方式为什么有效。Bitcoin 把分布式网络、密码学和区块链接成一台可自我维持的结算机器。",
        metric: "2008.10",
    },
    {
        kicker: "02 / Proof Machine",
        title: "白皮书与创世区块，把抽象规则压进第一块石头",
        body: "白皮书先定义问题，再给出规则；创世区块则把这套规则实际启动。那句《泰晤士报》头条既是可验证的时间戳，也是一句明确的制度评论。",
        metric: "50 BTC",
    },
    {
        kicker: "03 / Price as Consensus",
        title: "价格不是附属品，而是共识扩张的读数器",
        body: "价格曲线记录的不是单纯涨跌，而是市场对这套制度想象力的不断重估。交易所时代之后，每轮暴涨和回撤都把 Bitcoin 推向更大的公共叙事。",
        metric: "$126K ATH",
    },
    {
        kicker: "04 / Satoshi Silence",
        title: "110 万枚 BTC：把神话折算成资产规模",
        body: "中本聪持币量的估计存在误差，但数量级足够惊人。真正重要的不是这组数字本身，而是它背后的结构含义：这不是一个财富故事，而是一个充满技术理性和理想主义的故事。",
        metric: "1.1M BTC",
    },
];

const priceSeries = bitcoinPriceDaily as BitcoinPricePoint[];

function useScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let frame = 0;

        const update = () => {
            if (frame) {
                return;
            }

            frame = requestAnimationFrame(() => {
                frame = 0;
                const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
                setProgress(Math.min(Math.max(window.scrollY / maxScroll, 0), 1));
            });
        };

        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);

        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);

            if (frame) {
                cancelAnimationFrame(frame);
            }
        };
    }, []);

    return progress;
}

function useElementProgress<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let frame = 0;

        const update = () => {
            if (frame) {
                return;
            }

            frame = requestAnimationFrame(() => {
                frame = 0;
                const element = ref.current;

                if (!element) {
                    return;
                }

                const rect = element.getBoundingClientRect();
                const viewportHeight = window.innerHeight || 1;
                const start = viewportHeight * 0.88;
                const end = viewportHeight * 0.18;
                const nextProgress = (start - rect.top) / (start - end);
                setProgress(Math.min(Math.max(nextProgress, 0), 1));
            });
        };

        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);

        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);

            if (frame) {
                cancelAnimationFrame(frame);
            }
        };
    }, []);

    return { progress, ref };
}

function useHoldPower() {
    const [holdPower, setHoldPower] = useState(0);
    const [decoded, setDecoded] = useState(false);
    const decodedRef = useRef(false);
    const valueRef = useRef({ value: 0 });
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    const stop = () => {
        if (decodedRef.current) {
            valueRef.current.value = 1;
            setHoldPower(1);
            return;
        }

        tweenRef.current?.kill();
        tweenRef.current = gsap.to(valueRef.current, {
            value: 0,
            duration: 0.42,
            ease: "power3.out",
            onUpdate: () => setHoldPower(valueRef.current.value),
        });
    };

    const start = () => {
        if (decodedRef.current) {
            return;
        }

        tweenRef.current?.kill();
        setDecoded(false);
        tweenRef.current = gsap.to(valueRef.current, {
            value: 1,
            duration: 3,
            ease: "none",
            onUpdate: () => setHoldPower(valueRef.current.value),
            onComplete: () => {
                decodedRef.current = true;
                valueRef.current.value = 1;
                setHoldPower(1);
                setDecoded(true);
            },
        });
    };

    return { decoded, holdPower, start, stop };
}

function makeMobiusGeometry() {
    const radialSegments = 168;
    const widthSegments = 16;
    const positions: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    for (let i = 0; i <= radialSegments; i += 1) {
        const u = (i / radialSegments) * Math.PI * 2;

        for (let j = 0; j <= widthSegments; j += 1) {
            const v = (j / widthSegments - 0.5) * 0.82;
            const radius = 1.92 + v * Math.cos(u / 2);
            const x = radius * Math.cos(u);
            const y = v * Math.sin(u / 2);
            const z = radius * Math.sin(u);
            positions.push(x, y, z);
            normals.push(Math.cos(u), Math.sin(u / 2), Math.sin(u));
            uvs.push(i / radialSegments, j / widthSegments);
        }
    }

    for (let i = 0; i < radialSegments; i += 1) {
        for (let j = 0; j < widthSegments; j += 1) {
            const a = i * (widthSegments + 1) + j;
            const b = a + widthSegments + 1;
            indices.push(a, b, a + 1, b, b + 1, a + 1);
        }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
}

function MobiusLedger({ progress, holdPower }: { progress: number; holdPower: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const geometry = useMemo(() => makeMobiusGeometry(), []);

    useFrame(({ clock }) => {
        const material = materialRef.current;

        if (material) {
            material.uniforms.uTime.value = clock.elapsedTime;
            material.uniforms.uProgress.value = progress;
            material.uniforms.uHold.value = holdPower;
        }

        if (meshRef.current) {
            meshRef.current.rotation.x = -0.52 + holdPower * 0.22;
            meshRef.current.rotation.y = progress * Math.PI * 2.2 + clock.elapsedTime * 0.08;
            meshRef.current.rotation.z = 0.12;
        }
    });

    return (
        <mesh ref={meshRef} geometry={geometry}>
            <shaderMaterial
                ref={materialRef}
                transparent
                side={THREE.DoubleSide}
                uniforms={{
                    uTime: { value: 0 },
                    uProgress: { value: 0 },
                    uHold: { value: 0 },
                }}
                vertexShader={`
                    varying vec2 vUv;
                    varying vec3 vNormal;
                    uniform float uTime;
                    uniform float uHold;

                    void main() {
                        vUv = uv;
                        vNormal = normal;
                        vec3 p = position;
                        p += normal * (sin(uv.x * 34.0 + uTime * 1.6) * 0.035 + uHold * 0.06);
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
                    }
                `}
                fragmentShader={`
                    varying vec2 vUv;
                    varying vec3 vNormal;
                    uniform float uTime;
                    uniform float uProgress;
                    uniform float uHold;

                    void main() {
                        float ink = smoothstep(0.02, 0.032, abs(fract(vUv.x * 18.0 - uTime * 0.08) - 0.5));
                        float panel = step(fract(vUv.x * 8.0 + uProgress * 2.0), 0.52);
                        float light = dot(normalize(vNormal), normalize(vec3(-0.4, 0.7, 0.6))) * 0.5 + 0.5;
                        vec3 paper = mix(vec3(0.08, 0.055, 0.04), vec3(0.95, 0.73, 0.28), panel * 0.45 + uHold * 0.32);
                        vec3 color = paper * (0.42 + light * 0.95);
                        color = mix(color, vec3(0.02, 0.015, 0.012), ink * 0.55);
                        gl_FragColor = vec4(color, 0.86);
                    }
                `}
            />
        </mesh>
    );
}

function BtcCoin({ progress, holdPower }: { progress: number; holdPower: number }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (!groupRef.current) {
            return;
        }

        groupRef.current.position.set(0, holdPower * 0.18, 0);
        groupRef.current.rotation.y = progress * Math.PI * 1.2 + clock.elapsedTime * 0.18;
        groupRef.current.rotation.x = 1.28 + Math.sin(clock.elapsedTime * 0.8) * 0.05;
        groupRef.current.scale.setScalar(0.84 + holdPower * 0.28);
    });

    return (
        <group ref={groupRef}>
            <mesh castShadow>
                <cylinderGeometry args={[0.48, 0.48, 0.16, 96]} />
                <meshStandardMaterial color="#f0a229" metalness={0.72} roughness={0.22} emissive="#5c2f06" emissiveIntensity={0.55 + holdPower} />
            </mesh>
            <Billboard>
                <Text
                    fontSize={0.62}
                    color="#2a1604"
                    anchorX="center"
                    anchorY="middle"
                    position={[0, 0.09, 0.49]}
                    fontWeight={700}
                >
                    ₿
                </Text>
            </Billboard>
        </group>
    );
}

function ParticleField({ progress, holdPower }: { progress: number; holdPower: number }) {
    const pointsRef = useRef<THREE.Points>(null);
    const particleCount = 1800;
    const positions = useMemo(() => {
        const values = new Float32Array(particleCount * 3);
        const pseudoRandom = (seed: number) => {
            const wave = Math.sin(seed * 12.9898) * 43758.5453;
            return wave - Math.floor(wave);
        };

        for (let i = 0; i < particleCount; i += 1) {
            const radius = 2.4 + pseudoRandom(i + 1) * 3.4;
            const angle = pseudoRandom(i + 17) * Math.PI * 2;
            values[i * 3] = Math.cos(angle) * radius;
            values[i * 3 + 1] = (pseudoRandom(i + 41) - 0.5) * 4.8;
            values[i * 3 + 2] = Math.sin(angle) * radius;
        }

        return values;
    }, []);

    useFrame(({ clock }) => {
        if (!pointsRef.current) {
            return;
        }

        pointsRef.current.rotation.y = clock.elapsedTime * 0.035 + progress * 1.8;
        pointsRef.current.rotation.x = holdPower * 0.18;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#ffd58e" size={0.018 + holdPower * 0.018} transparent opacity={0.5 + holdPower * 0.28} depthWrite={false} />
        </points>
    );
}

function DeferredBackdrop({ progress, holdPower }: { progress: number; holdPower: number }) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame(({ clock }) => {
        const material = materialRef.current;

        if (!material) {
            return;
        }

        material.uniforms.uTime.value = clock.elapsedTime;
        material.uniforms.uProgress.value = progress;
        material.uniforms.uHold.value = holdPower;
    });

    return (
        <mesh renderOrder={-10}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                depthWrite={false}
                depthTest={false}
                uniforms={{
                    uTime: { value: 0 },
                    uProgress: { value: 0 },
                    uHold: { value: 0 },
                }}
                vertexShader={`
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = vec4(position.xy, 0.0, 1.0);
                    }
                `}
                fragmentShader={`
                    varying vec2 vUv;
                    uniform float uTime;
                    uniform float uProgress;
                    uniform float uHold;

                    void main() {
                        vec2 p = vUv * 2.0 - 1.0;
                        float depthBuffer = smoothstep(1.2, 0.0, length(p + vec2(sin(uProgress * 6.28) * 0.25, 0.0)));
                        float normalBuffer = sin((p.x - p.y) * 16.0 + uTime * 0.8) * 0.5 + 0.5;
                        float lightBuffer = smoothstep(0.64, 0.0, abs(p.x * 0.7 + p.y + sin(uTime * 0.22) * 0.2));
                        vec3 ink = vec3(0.025, 0.019, 0.014);
                        vec3 gold = vec3(0.95, 0.55, 0.12);
                        vec3 crimson = vec3(0.28, 0.04, 0.035);
                        vec3 color = mix(ink, crimson, depthBuffer * 0.42);
                        color += gold * lightBuffer * (0.15 + uHold * 0.26);
                        color += gold * normalBuffer * depthBuffer * 0.08;
                        gl_FragColor = vec4(color, 1.0);
                    }
                `}
            />
        </mesh>
    );
}

function MonolithScene({ progress, holdPower }: { progress: number; holdPower: number }) {
    return (
        <Canvas camera={{ position: [0, 0.55, 6.2], fov: 42 }} dpr={[1, 1.8]} gl={{ antialias: true }}>
            <ScrollCamera progress={progress} holdPower={holdPower} />
            <DeferredBackdrop progress={progress} holdPower={holdPower} />
            <fog attach="fog" args={["#090806", 7, 14]} />
            <ambientLight intensity={0.46} />
            <pointLight position={[2.8, 2.3, 3.8]} intensity={28} color="#ffcf7a" />
            <pointLight position={[-3.8, -1.4, 2.2]} intensity={12} color="#b54831" />
            <ParticleField progress={progress} holdPower={holdPower} />
            <MobiusLedger progress={progress} holdPower={holdPower} />
            <BtcCoin progress={progress} holdPower={holdPower} />
        </Canvas>
    );
}

function ScrollCamera({ progress, holdPower }: { progress: number; holdPower: number }) {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);

    useFrame(() => {
        const camera = cameraRef.current;

        if (!camera) {
            return;
        }

        const chapterProgress = Math.min(Math.max((progress - 0.05) / 0.82, 0), 1);
        const orbit = chapterProgress * Math.PI * 2.25 - Math.PI * 0.45;
        const radius = THREE.MathUtils.lerp(7.8, 3.25, chapterProgress);
        const height = THREE.MathUtils.lerp(1.55, 0.42, chapterProgress) + holdPower * 0.24;
        const target = new THREE.Vector3(0, THREE.MathUtils.lerp(0.1, 0.0, chapterProgress), 0);

        camera.position.set(Math.sin(orbit) * radius, height, Math.cos(orbit) * radius);
        camera.lookAt(target);
    });

    return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0.55, 6.2]} fov={42} />;
}

function fadeHoldRange(progress: number, start: number, fadeInEnd: number, holdEnd: number, end: number) {
    const fadeIn = THREE.MathUtils.smoothstep(progress, start, fadeInEnd);
    const fadeOut = 1 - THREE.MathUtils.smoothstep(progress, holdEnd, end);
    return Math.min(fadeIn, fadeOut);
}

function ChapterPanel({ active, chapter }: { active: boolean; chapter: (typeof chapters)[number] }) {
    const { progress, ref } = useElementProgress<HTMLElement>();
    const opacity = fadeHoldRange(progress, 0.02, 0.18, 0.74, 0.96);

    return (
        <article
            ref={ref}
            className={`${styles.panel} ${active ? styles.panelActive : ""}`}
            style={{ opacity, transform: `translateY(${(1 - opacity) * 22}px)` }}
        >
            <div>
                <p className={styles.kicker}>{chapter.kicker}</p>
                <h2>{chapter.title}</h2>
                <p>{chapter.body}</p>
            </div>
            <strong>{chapter.metric}</strong>
        </article>
    );
}

function PriceRibbon({ holdPower }: { holdPower: number }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { path, activePoint, points, viewBox } = useMemo(() => {
        const sample = priceSeries;
        const width = 920;
        const height = 260;
        const min = 0;
        const max = Math.max(...sample.map((point) => point.high));
        const points = sample.map((point, index) => {
            const x = (index / Math.max(sample.length - 1, 1)) * width;
            const normalized = (point.close - min) / (max - min);
            const y = height - normalized * height;
            return { ...point, x, y };
        });
        const visibleCount = Math.max(2, Math.floor(holdPower * (points.length - 1)) + 1);
        const visiblePoints = points.slice(0, visibleCount);
        const visiblePath = visiblePoints.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
        const active = visiblePoints[visiblePoints.length - 1];
        return { activePoint: active, path: visiblePath, points: visiblePoints, viewBox: `0 0 ${width} ${height}` };
    }, [holdPower]);

    const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 920;
        const nearestIndex = Math.min(Math.max(Math.round((x / 920) * Math.max(points.length - 1, 1)), 0), points.length - 1);
        setHoveredIndex(nearestIndex);
    };

    const tooltip = hoveredIndex === null ? null : points[Math.min(hoveredIndex, points.length - 1)];

    return (
        <div className={styles.pricePanel}>
            <div>
                <span>PRICE TAPE / BINANCE DAILY ARCHIVE</span>
                <strong>{activePoint?.date}</strong>
            </div>
            <div className={styles.priceChartFrame}>
            <svg
                viewBox={viewBox}
                className={styles.priceSvg}
                aria-label="Bitcoin price line"
                onPointerMove={handlePointerMove}
                onPointerLeave={() => setHoveredIndex(null)}
            >
                <path d={path} />
                {activePoint ? <circle cx={activePoint.x} cy={activePoint.y} r="9" /> : null}
                {tooltip ? <circle className={styles.priceHoverDot} cx={tooltip.x} cy={tooltip.y} r="11" /> : null}
            </svg>
            {tooltip ? (
                <div
                    className={styles.priceTooltip}
                    style={{
                        left: `${(tooltip.x / 920) * 100}%`,
                        top: `${(tooltip.y / 260) * 100}%`,
                    }}
                >
                    <span>{tooltip.date}</span>
                    <strong>{formatUsdCompact(tooltip.close)}</strong>
                    <em>High {formatUsdCompact(tooltip.high)}</em>
                </div>
            ) : null}
            </div>
            <p>{activePoint ? formatUsdCompact(activePoint.close) : "$0"} closes the current panel.</p>
        </div>
    );
}

function HoldingsDonut({ holdPower }: { holdPower: number }) {
    const share = satoshiHoldings.shareOfCap;
    const radius = 88;
    const circumference = 2 * Math.PI * radius;
    const revealedShare = share * holdPower;

    return (
        <div className={styles.holdingsViz}>
            <svg viewBox="0 0 240 240" className={styles.holdingsSvg} aria-label="Satoshi holdings share of Bitcoin cap">
                <circle className={styles.holdingsTrack} cx="120" cy="120" r={radius} />
                <circle
                    className={styles.holdingsArc}
                    cx="120"
                    cy="120"
                    r={radius}
                    strokeDasharray={`${revealedShare * circumference} ${circumference}`}
                />
            </svg>
            <div className={styles.holdingsCenter}>
                <strong>{(revealedShare * 100).toFixed(2)}%</strong>
                <span>of 21M cap</span>
            </div>
            <div className={styles.holdingsStats}>
                <span>{formatNumberCompact(satoshiHoldings.estimatedCoins)} BTC</span>
                <span>{formatNumberCompact(satoshiHoldings.capLimit)} max supply</span>
            </div>
        </div>
    );
}

export function BitcoinMonolithPage() {
    const progress = useScrollProgress();
    const priceHold = useHoldPower();
    const holdingsHold = useHoldPower();
    const sceneHoldPower = Math.max(priceHold.holdPower, holdingsHold.holdPower);
    const activeChapter = Math.min(Math.floor(progress * chapters.length), chapters.length - 1);
    const peakValue = satoshiHoldings.estimatedCoins * satoshiHoldings.archiveAthPrice;
    const titleOpacity = fadeHoldRange(progress, 0.04, 0.09, 0.16, 0.21);

    const handlePointerDown = (event: PointerEvent<HTMLButtonElement>, controls: ReturnType<typeof useHoldPower>) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        controls.start();
    };

    const handlePointerUp = (event: PointerEvent<HTMLButtonElement>, controls: ReturnType<typeof useHoldPower>) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        controls.stop();
    };

    return (
        <main className={styles.page}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.navLink}>
                    Works
                </Link>
                <span>Project 06 / Satoshi Bitcoin 3D Story</span>
            </nav>

            <div className={styles.sceneBackdrop}>
                <MonolithScene progress={progress} holdPower={sceneHoldPower} />
            </div>

            <section className={styles.heroStage} aria-label="Opening 3D camera move">
                <div
                    className={styles.titleLayer}
                    style={{ opacity: titleOpacity, transform: `translate(-50%, -50%) translateY(${(1 - titleOpacity) * 18}px)` }}
                >
                    <p className={styles.kicker}>3D Data Story</p>
                    <h1>神秘人中本聪与他的个人比特币项目</h1>
                    <p>
                        去中心化共识的 18 年野蛮生长。这个页面把白皮书里的技术零件、2009 年的创世区块、交易所时代的价格重估，以及约 110 万枚 BTC 所代表的制度级含义，重新组织成一个 3D 滚动叙事。
                    </p>
                </div>
            </section>

            <section className={styles.scrollPanels}>
                {chapters.map((chapter, index) => (
                    <ChapterPanel
                        key={chapter.kicker}
                        active={index === activeChapter}
                        chapter={chapter}
                    />
                ))}
            </section>

            <section className={styles.dataSection}>
                <div className={styles.priceUnlock}>
                    <button
                        type="button"
                        className={styles.holdButton}
                        onPointerDown={(event) => handlePointerDown(event, priceHold)}
                        onPointerUp={(event) => handlePointerUp(event, priceHold)}
                        onPointerCancel={priceHold.stop}
                        onPointerLeave={priceHold.stop}
                        style={{ "--hold": priceHold.holdPower, opacity: 1 } as CSSProperties}
                    >
                        <span>长按展开价格曲线</span>
                        <strong>{priceHold.decoded ? "价格曲线已展开" : `${Math.round(priceHold.holdPower * 100)}%`}</strong>
                    </button>
                    <PriceRibbon holdPower={priceHold.holdPower} />
                </div>

                <div className={styles.holdingsUnlock}>
                    <button
                        type="button"
                        className={styles.holdButton}
                        onPointerDown={(event) => handlePointerDown(event, holdingsHold)}
                        onPointerUp={(event) => handlePointerUp(event, holdingsHold)}
                        onPointerCancel={holdingsHold.stop}
                        onPointerLeave={holdingsHold.stop}
                        style={{ "--hold": holdingsHold.holdPower, opacity: 1 } as CSSProperties}
                    >
                        <span>长按展开中本聪持仓占比</span>
                        <strong>{holdingsHold.decoded ? "持仓占比已展开" : `${Math.round(holdingsHold.holdPower * 100)}%`}</strong>
                    </button>
                    <div className={styles.holdingsPanel}>
                        <p className={styles.kicker}>Satoshi Holdings / Estimated Share</p>
                        <h2>约 110 万枚 BTC 在链上保持沉默</h2>
                        <HoldingsDonut holdPower={holdingsHold.holdPower} />
                        <p>
                            按 Binance 官方现货日线归档口径，2025 年 10 月 6 日 UTC 的日内高点约为 126,199.63 美元。用这个价格估算，110 万枚 BTC 的账面峰值约为 {formatUsdCompact(peakValue)}。这批长期静止的币，像一组未被兑现的原始承诺，把协议早期的克制、匿名性和自我约束保留在链上历史里。
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
