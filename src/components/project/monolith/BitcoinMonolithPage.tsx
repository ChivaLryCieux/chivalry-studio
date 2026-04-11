"use client";

import Link from "next/link";
import { type CSSProperties, type PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";
import bitcoinPriceDaily from "@/data/bitcoinPriceDaily.json";
import { satoshiHoldings, type BitcoinPricePoint } from "@/data/bitcoinStory";
import { formatUsdCompact } from "@/lib/numberFormat";
import styles from "./bitcoin-monolith.module.css";

const chapters = [
    {
        kicker: "01 / Genesis Signal",
        title: "匿名不是悬案，而是协议的第一层阴影",
        body: "2008 年，中本聪把一份短白皮书投进密码学邮件列表。故事真正开始的地方，不是身份谜题，而是一个问题：没有可信第三方时，陌生人如何共享同一本账？",
        metric: "2008.10",
    },
    {
        kicker: "02 / Proof Machine",
        title: "区块、哈希、工作量证明，被折成一条莫比乌斯链",
        body: "比特币把签名、时间戳、最长链和算力竞争绕成一个闭环。每个节点都能验证过去，每个新区块都把历史重新压实，信任被改写成可重复计算的光。",
        metric: "50 BTC",
    },
    {
        kicker: "03 / Price as Consensus",
        title: "价格曲线不是行情背景，而是共识的噪声图谱",
        body: "2017 到 2026 的交易所数据，把比特币从极客实验拖进全球市场。暴涨、回撤和再定价像漫画分镜一样切开页面，让价格成为社会想象力的读数器。",
        metric: "$126K ATH",
    },
    {
        kicker: "04 / Satoshi Silence",
        title: "最庞大的角色，最后选择从画面里消失",
        body: "约 110 万枚 BTC 长期沉默。它们既是财富规模，也是叙事装置：当创造者不再出现，协议必须独自站立，中本聪于是变成了系统边缘的一块黑色巨石。",
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

function useHoldPower() {
    const [holdPower, setHoldPower] = useState(0);
    const [decoded, setDecoded] = useState(false);
    const valueRef = useRef({ value: 0 });
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    const stop = () => {
        tweenRef.current?.kill();
        tweenRef.current = gsap.to(valueRef.current, {
            value: 0,
            duration: 0.42,
            ease: "power3.out",
            onUpdate: () => setHoldPower(valueRef.current.value),
        });
    };

    const start = () => {
        tweenRef.current?.kill();
        setDecoded(false);
        tweenRef.current = gsap.to(valueRef.current, {
            value: 1,
            duration: 1.15,
            ease: "power2.inOut",
            onUpdate: () => setHoldPower(valueRef.current.value),
            onComplete: () => setDecoded(true),
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

        const orbit = progress * Math.PI * 2.35;
        groupRef.current.position.set(Math.sin(orbit) * 2.35, Math.cos(orbit * 0.7) * 0.72 + holdPower * 0.28, Math.cos(orbit) * 0.84);
        groupRef.current.rotation.y = clock.elapsedTime * 1.8 + progress * Math.PI * 3;
        groupRef.current.rotation.x = 1.28 + Math.sin(clock.elapsedTime) * 0.08;
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

function PriceRibbon({ progress }: { progress: number }) {
    const { path, activePoint, viewBox } = useMemo(() => {
        const sample = priceSeries.filter((_, index) => index % 12 === 0);
        const width = 920;
        const height = 260;
        const min = Math.min(...sample.map((point) => point.close));
        const max = Math.max(...sample.map((point) => point.high));
        const points = sample.map((point, index) => {
            const x = (index / Math.max(sample.length - 1, 1)) * width;
            const normalized = (Math.log(point.close) - Math.log(min)) / (Math.log(max) - Math.log(min));
            const y = height - normalized * height;
            return { ...point, x, y };
        });
        const d = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
        const active = points[Math.min(Math.floor(progress * (points.length - 1)), points.length - 1)];
        return { activePoint: active, path: d, viewBox: `0 0 ${width} ${height}` };
    }, [progress]);

    return (
        <div className={styles.pricePanel}>
            <div>
                <span>PRICE TAPE / BINANCE DAILY ARCHIVE</span>
                <strong>{activePoint?.date}</strong>
            </div>
            <svg viewBox={viewBox} className={styles.priceSvg} aria-label="Bitcoin price line">
                <path d={path} />
                {activePoint ? <circle cx={activePoint.x} cy={activePoint.y} r="9" /> : null}
            </svg>
            <p>{activePoint ? formatUsdCompact(activePoint.close) : "$0"} closes the current panel.</p>
        </div>
    );
}

export function BitcoinMonolithPage() {
    const progress = useScrollProgress();
    const { decoded, holdPower, start, stop } = useHoldPower();
    const activeChapter = Math.min(Math.floor(progress * chapters.length), chapters.length - 1);
    const peakValue = satoshiHoldings.estimatedCoins * satoshiHoldings.archiveAthPrice;

    const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        start();
    };

    const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
        event.currentTarget.releasePointerCapture(event.pointerId);
        stop();
    };

    return (
        <main className={styles.page}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.navLink}>
                    Works
                </Link>
                <span>Project 06 / Satoshi Monolith</span>
            </nav>

            <div className={styles.sceneBackdrop}>
                <MonolithScene progress={progress} holdPower={holdPower} />
            </div>

            <section className={styles.heroStage}>
                <div className={styles.overlay}>
                    <div className={styles.heroCopy}>
                        <p className={styles.kicker}>Mobius Manga Data Story</p>
                        <h1>中本聪与比特币黑色巨石</h1>
                        <p>
                            同一个故事，换成一条会扭转的区块链漫画卷轴。滚动推进场景，按住解码，让价格、协议和沉默的 BTC 仓位在同一个 3D 分镜里互相撞击。
                        </p>
                    </div>

                    <button
                        type="button"
                        className={styles.holdButton}
                        onPointerDown={handlePointerDown}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={stop}
                        onPointerLeave={stop}
                        style={{ "--hold": holdPower } as CSSProperties}
                    >
                        <span>Tap Hold to Decode</span>
                        <strong>{decoded ? "GENESIS MESSAGE UNLOCKED" : `${Math.round(holdPower * 100)}%`}</strong>
                    </button>
                </div>
            </section>

            <section className={styles.scrollPanels}>
                {chapters.map((chapter, index) => (
                    <article key={chapter.kicker} className={`${styles.panel} ${index === activeChapter ? styles.panelActive : ""}`}>
                        <div>
                            <p className={styles.kicker}>{chapter.kicker}</p>
                            <h2>{chapter.title}</h2>
                            <p>{chapter.body}</p>
                        </div>
                        <strong>{chapter.metric}</strong>
                    </article>
                ))}
            </section>

            <section className={styles.dataSection}>
                <PriceRibbon progress={progress} />

                <div className={styles.holdingsPanel}>
                    <p className={styles.kicker}>STATIC TREASURE / MOVING STORY</p>
                    <h2>约 110 万枚 BTC 在链上保持沉默</h2>
                    <p>
                        按归档高点估算，这组早期仓位的账面峰值约为 {formatUsdCompact(peakValue)}。项目 6 不把它画成普通资产卡，而是让它成为场景中心的黑色巨石：价格在运动，身份在消失，协议在自己发光。
                    </p>
                </div>
            </section>
        </main>
    );
}
