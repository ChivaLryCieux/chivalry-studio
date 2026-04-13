"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, PerspectiveCamera, Text } from "@react-three/drei";
import * as THREE from "three";
import bitcoinPriceDaily from "@/data/bitcoinPriceDaily.json";
import { satoshiHoldings, type BitcoinPricePoint } from "@/data/bitcoinStory";
import { formatNumberCompact, formatUsdCompact } from "@/lib/numberFormat";
import styles from "./bitcoin-monolith.module.css";

const priceSeries = bitcoinPriceDaily as BitcoinPricePoint[];
const peakValue = satoshiHoldings.estimatedCoins * satoshiHoldings.archiveAthPrice;

const storyNodes = [
    {
        position: [-7.4, 1.8, 3.4] as const,
        title: "Genesis Signal",
        metric: "2008.10",
        body: "中本聪留下的不是身份谜题，而是一套能独立运行的协议。分布式网络、密码学签名和工作量证明被拼成一台公共结算机器。",
    },
    {
        position: [6.7, 2.2, 1.2] as const,
        title: "Proof Machine",
        metric: "50 BTC",
        body: "白皮书定义规则，创世区块启动规则。《泰晤士报》头条被刻进 coinbase 文本，成为时间戳，也成为制度评论。",
    },
    {
        position: [-5.9, -0.6, -4.7] as const,
        title: "Price as Consensus",
        metric: "$126K ATH",
        body: "价格曲线不是装饰，它记录市场如何一次次重估这套制度想象力。螺旋线使用 Binance BTCUSDT 日线归档样本。",
    },
    {
        position: [5.0, -1.1, -5.6] as const,
        title: "Satoshi Silence",
        metric: "1.1M BTC",
        body: `如果 110 万枚估算成立，中本聪仓位接近总量上限的 ${(satoshiHoldings.shareOfCap * 100).toFixed(2)}%，按归档 ATH 估算约 ${formatUsdCompact(peakValue)}。`,
    },
    {
        position: [0, 2.9, -1.2] as const,
        title: "Bitcoin Star",
        metric: "21M CAP",
        body: `继续靠近中心。${formatNumberCompact(satoshiHoldings.capLimit)} 枚上限、减半节奏和全球节点，把这个项目从个人发布推向无人能单独拥有的共识恒星。`,
    },
];

const sceneAnchors = [
    { date: "2017-12-17", label: "2017 Exchange Peak" },
    { date: "2021-11-10", label: "2021 Institutional Peak" },
    { date: satoshiHoldings.archiveAthDate, label: "Archive ATH" },
    { date: satoshiHoldings.archiveLatestDate, label: "Latest Archive" },
];

interface LookState {
    yaw: number;
    pitch: number;
}

function useKeyboardState(enabled: boolean) {
    const keysRef = useRef(new Set<string>());

    useEffect(() => {
        const pressedKeys = keysRef.current;

        if (!enabled) {
            pressedKeys.clear();
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            pressedKeys.add(event.code);

            if (["KeyW", "KeyA", "KeyS", "KeyD", "Space", "ControlLeft", "ControlRight"].includes(event.code)) {
                event.preventDefault();
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            pressedKeys.delete(event.code);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            pressedKeys.clear();
        };
    }, [enabled]);

    return keysRef;
}

function usePointerLook(enabled: boolean, lookRef: React.MutableRefObject<LookState>) {
    useEffect(() => {
        if (!enabled) {
            return;
        }

        const handleMouseMove = (event: MouseEvent) => {
            lookRef.current.yaw += event.movementX * 0.002;
            lookRef.current.pitch = THREE.MathUtils.clamp(lookRef.current.pitch - event.movementY * 0.0014, -0.62, 0.62);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [enabled, lookRef]);
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

function MobiusLedger() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const geometry = useMemo(() => makeMobiusGeometry(), []);

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.elapsedTime;
        }

        if (meshRef.current) {
            meshRef.current.rotation.x = -0.42;
            meshRef.current.rotation.y = clock.elapsedTime * 0.1;
            meshRef.current.rotation.z = 0.12;
        }
    });

    return (
        <mesh ref={meshRef} geometry={geometry} scale={1.18}>
            <shaderMaterial
                ref={materialRef}
                transparent
                side={THREE.DoubleSide}
                uniforms={{ uTime: { value: 0 } }}
                vertexShader={`
                    varying vec2 vUv;
                    varying vec3 vNormal;
                    uniform float uTime;

                    void main() {
                        vUv = uv;
                        vNormal = normal;
                        vec3 p = position + normal * sin(uv.x * 34.0 + uTime * 1.6) * 0.035;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
                    }
                `}
                fragmentShader={`
                    varying vec2 vUv;
                    varying vec3 vNormal;
                    uniform float uTime;

                    void main() {
                        float ink = smoothstep(0.02, 0.032, abs(fract(vUv.x * 18.0 - uTime * 0.08) - 0.5));
                        float panel = step(fract(vUv.x * 8.0), 0.52);
                        float light = dot(normalize(vNormal), normalize(vec3(-0.4, 0.7, 0.6))) * 0.5 + 0.5;
                        vec3 paper = mix(vec3(0.08, 0.045, 0.035), vec3(0.95, 0.62, 0.16), panel * 0.55);
                        vec3 color = paper * (0.36 + light * 1.1);
                        color = mix(color, vec3(0.02, 0.015, 0.012), ink * 0.48);
                        gl_FragColor = vec4(color, 0.74);
                    }
                `}
            />
        </mesh>
    );
}

function BitcoinStar() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (!groupRef.current) {
            return;
        }

        groupRef.current.rotation.y = clock.elapsedTime * 0.22;
        groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.05;
    });

    return (
        <group ref={groupRef}>
            <pointLight intensity={72} distance={16} color="#ffbe54" />
            <mesh>
                <sphereGeometry args={[0.86, 64, 64]} />
                <meshStandardMaterial color="#f0a229" emissive="#f0a229" emissiveIntensity={1.5} roughness={0.35} />
            </mesh>
            <mesh scale={1.42}>
                <sphereGeometry args={[0.86, 64, 64]} />
                <meshBasicMaterial color="#ffd58e" transparent opacity={0.13} blending={THREE.AdditiveBlending} />
            </mesh>
            <Billboard position={[0, 0.02, 0.9]}>
                <Text fontSize={0.72} color="#2a1604" anchorX="center" anchorY="middle" fontWeight={700}>
                    ₿
                </Text>
            </Billboard>
        </group>
    );
}

function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null);
    const particleCount = 2200;
    const positions = useMemo(() => {
        const values = new Float32Array(particleCount * 3);
        const pseudoRandom = (seed: number) => {
            const wave = Math.sin(seed * 12.9898) * 43758.5453;
            return wave - Math.floor(wave);
        };

        for (let i = 0; i < particleCount; i += 1) {
            const radius = 4.2 + pseudoRandom(i + 1) * 11.8;
            const angle = pseudoRandom(i + 17) * Math.PI * 2;
            values[i * 3] = Math.cos(angle) * radius;
            values[i * 3 + 1] = (pseudoRandom(i + 41) - 0.5) * 8.5;
            values[i * 3 + 2] = Math.sin(angle) * radius;
        }

        return values;
    }, []);

    useFrame(({ clock }) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = clock.elapsedTime * 0.012;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#ffd58e" size={0.025} transparent opacity={0.54} depthWrite={false} />
        </points>
    );
}

function PriceDataRibbon() {
    const groupRef = useRef<THREE.Group>(null);
    const { lineObject, markers } = useMemo(() => {
        const stride = Math.max(1, Math.floor(priceSeries.length / 260));
        const sampled = priceSeries.filter((_, index) => index % stride === 0);
        const minClose = Math.min(...sampled.map((point) => Math.max(point.close, 1)));
        const maxClose = Math.max(...sampled.map((point) => point.high));
        const logMin = Math.log(minClose);
        const logRange = Math.max(Math.log(maxClose) - logMin, 1);

        const pointToPosition = (point: BitcoinPricePoint, index: number, total: number) => {
            const t = index / Math.max(total - 1, 1);
            const angle = t * Math.PI * 4.15 - Math.PI * 0.48;
            const radius = 1.7 + t * 4.8;
            const logPrice = (Math.log(Math.max(point.close, 1)) - logMin) / logRange;

            return new THREE.Vector3(
                Math.cos(angle) * radius,
                (logPrice - 0.45) * 5.2,
                Math.sin(angle) * radius,
            );
        };

        const positions: number[] = [];
        sampled.forEach((point, index) => {
            const position = pointToPosition(point, index, sampled.length);
            positions.push(position.x, position.y, position.z);
        });

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        const material = new THREE.LineBasicMaterial({
            color: "#f0a229",
            transparent: true,
            opacity: 0.78,
        });
        const lineObject = new THREE.Line(geometry, material);

        const markers = sceneAnchors.map((anchor) => {
            const nearestIndex = sampled.reduce((bestIndex, point, index) => {
                const bestDistance = Math.abs(new Date(sampled[bestIndex].date).getTime() - new Date(anchor.date).getTime());
                const nextDistance = Math.abs(new Date(point.date).getTime() - new Date(anchor.date).getTime());
                return nextDistance < bestDistance ? index : bestIndex;
            }, 0);
            const point = sampled[nearestIndex];

            return {
                ...anchor,
                price: point.close,
                position: pointToPosition(point, nearestIndex, sampled.length),
            };
        });

        return { lineObject, markers };
    }, []);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = clock.elapsedTime * 0.018;
        }
    });

    return (
        <group ref={groupRef}>
            <primitive object={lineObject} />
            {markers.map((marker) => (
                <Billboard key={marker.label} position={marker.position}>
                    <mesh>
                        <sphereGeometry args={[0.12, 18, 18]} />
                        <meshStandardMaterial color="#ffd58e" emissive="#f0a229" emissiveIntensity={1.4} />
                    </mesh>
                    <Text position={[0, 0.34, 0]} fontSize={0.16} color="#fff6ea" anchorX="center" anchorY="middle">
                        {`${marker.label}\n${formatUsdCompact(marker.price)}`}
                    </Text>
                </Billboard>
            ))}
        </group>
    );
}

function StoryStarPanel({ node }: { node: (typeof storyNodes)[number] }) {
    return (
        <group position={node.position}>
            <mesh>
                <sphereGeometry args={[0.14, 24, 24]} />
                <meshStandardMaterial color="#ffd58e" emissive="#f0a229" emissiveIntensity={1.55} />
            </mesh>
            <pointLight intensity={4.8} distance={4.2} color="#f0a229" />
            <Billboard position={[0.74, 0.34, 0]}>
                <mesh position={[0, 0, -0.02]}>
                    <planeGeometry args={[2.85, 1.32]} />
                    <meshBasicMaterial color="#120906" transparent opacity={0.78} />
                </mesh>
                <mesh position={[0, 0, -0.03]}>
                    <planeGeometry args={[2.96, 1.43]} />
                    <meshBasicMaterial color="#6f261c" transparent opacity={0.38} />
                </mesh>
                <Text position={[0, 0.43, 0.01]} fontSize={0.16} maxWidth={2.44} color="#ffd58e" anchorX="center" anchorY="middle">
                    {node.title}
                </Text>
                <Text position={[0, 0.19, 0.01]} fontSize={0.13} maxWidth={2.44} color="#f0a229" anchorX="center" anchorY="middle">
                    {node.metric}
                </Text>
                <Text position={[0, -0.19, 0.01]} fontSize={0.105} lineHeight={1.45} maxWidth={2.48} color="#f8efe2" anchorX="center" anchorY="middle">
                    {node.body}
                </Text>
            </Billboard>
        </group>
    );
}

function Ship() {
    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
                <coneGeometry args={[0.18, 0.58, 4]} />
                <meshStandardMaterial color="#f8efe2" metalness={0.45} roughness={0.3} emissive="#4d120d" emissiveIntensity={0.18} />
            </mesh>
            <mesh position={[0, -0.02, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.17, 0.025, 8, 24]} />
                <meshStandardMaterial color="#f0a229" emissive="#f0a229" emissiveIntensity={1.1} />
            </mesh>
            <pointLight position={[0, 0, 0.34]} intensity={3.2} distance={2.6} color="#f0a229" />
        </group>
    );
}

function PlayerRig({
    controlsEnabled,
    keysRef,
    lookRef,
}: {
    controlsEnabled: boolean;
    keysRef: React.MutableRefObject<Set<string>>;
    lookRef: React.MutableRefObject<LookState>;
}) {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const shipRef = useRef<THREE.Group>(null);
    const positionRef = useRef(new THREE.Vector3(0, 0.15, 10.2));
    const velocityRef = useRef(new THREE.Vector3());
    const forwardRef = useRef(new THREE.Vector3());
    const viewForwardRef = useRef(new THREE.Vector3());
    const rightRef = useRef(new THREE.Vector3());
    const lookTargetRef = useRef(new THREE.Vector3());

    useFrame((_, delta) => {
        const camera = cameraRef.current;
        const ship = shipRef.current;

        if (!camera || !ship) {
            return;
        }

        const look = lookRef.current;
        const keys = keysRef.current;
        const forward = forwardRef.current.set(Math.sin(look.yaw), 0, -Math.cos(look.yaw)).normalize();
        const viewForward = viewForwardRef.current.set(
            Math.sin(look.yaw) * Math.cos(look.pitch),
            Math.sin(look.pitch),
            -Math.cos(look.yaw) * Math.cos(look.pitch),
        ).normalize();
        const right = rightRef.current.set(-forward.z, 0, forward.x).normalize();
        const move = velocityRef.current.set(0, 0, 0);

        if (controlsEnabled) {
            if (keys.has("KeyW")) move.add(forward);
            if (keys.has("KeyS")) move.sub(forward);
            if (keys.has("KeyD")) move.add(right);
            if (keys.has("KeyA")) move.sub(right);
            if (keys.has("Space")) move.y += 1;
            if (keys.has("ControlLeft") || keys.has("ControlRight")) move.y -= 1;
        }

        if (move.lengthSq() > 0) {
            move.normalize().multiplyScalar(4.8 * delta);
            positionRef.current.add(move);
        }

        const distanceFromCore = positionRef.current.length();
        if (distanceFromCore < 1.55) {
            positionRef.current.setLength(1.55);
        }

        positionRef.current.y = THREE.MathUtils.clamp(positionRef.current.y, -3.5, 4.2);
        ship.position.lerp(positionRef.current, 0.42);
        const shipLookTarget = lookTargetRef.current.copy(ship.position).add(viewForward);
        ship.lookAt(shipLookTarget);

        const cameraOffset = viewForward.clone().multiplyScalar(-1.85).add(new THREE.Vector3(0, 0.72, 0));
        const cameraTarget = positionRef.current.clone().add(cameraOffset);
        const lookTarget = positionRef.current.clone().add(viewForward.clone().multiplyScalar(3.4));

        camera.position.lerp(cameraTarget, 0.18);
        camera.lookAt(lookTarget);
    });

    return (
        <>
            <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 1.2, 12.4]} fov={55} />
            <group ref={shipRef}>
                <Ship />
            </group>
        </>
    );
}

function DeferredBackdrop() {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.elapsedTime;
        }
    });

    return (
        <mesh renderOrder={-10}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                depthWrite={false}
                depthTest={false}
                uniforms={{ uTime: { value: 0 } }}
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

                    void main() {
                        vec2 p = vUv * 2.0 - 1.0;
                        float depthBuffer = smoothstep(1.2, 0.0, length(p + vec2(sin(uTime * 0.08) * 0.14, 0.0)));
                        float normalBuffer = sin((p.x - p.y) * 16.0 + uTime * 0.8) * 0.5 + 0.5;
                        float lightBuffer = smoothstep(0.64, 0.0, abs(p.x * 0.7 + p.y + sin(uTime * 0.22) * 0.2));
                        vec3 ink = vec3(0.025, 0.019, 0.014);
                        vec3 gold = vec3(0.95, 0.55, 0.12);
                        vec3 crimson = vec3(0.28, 0.04, 0.035);
                        vec3 color = mix(ink, crimson, depthBuffer * 0.42);
                        color += gold * lightBuffer * 0.16;
                        color += gold * normalBuffer * depthBuffer * 0.08;
                        gl_FragColor = vec4(color, 1.0);
                    }
                `}
            />
        </mesh>
    );
}

function MonolithGameScene({
    controlsEnabled,
    keysRef,
    lookRef,
}: {
    controlsEnabled: boolean;
    keysRef: React.MutableRefObject<Set<string>>;
    lookRef: React.MutableRefObject<LookState>;
}) {
    return (
        <Canvas dpr={[1, 1.8]} gl={{ antialias: true }}>
            <PlayerRig controlsEnabled={controlsEnabled} keysRef={keysRef} lookRef={lookRef} />
            <DeferredBackdrop />
            <fog attach="fog" args={["#090806", 9, 22]} />
            <ambientLight intensity={0.34} />
            <pointLight position={[4.8, 3.2, 5.8]} intensity={18} color="#ffcf7a" />
            <pointLight position={[-5.8, -2.4, 2.2]} intensity={9} color="#b54831" />
            <ParticleField />
            <PriceDataRibbon />
            <MobiusLedger />
            <BitcoinStar />
            {storyNodes.map((node) => (
                <StoryStarPanel key={node.title} node={node} />
            ))}
        </Canvas>
    );
}

export function BitcoinMonolithPage() {
    const [controlsEnabled, setControlsEnabled] = useState(false);
    const stageRef = useRef<HTMLDivElement>(null);
    const lookRef = useRef<LookState>({ yaw: 0, pitch: 0 });
    const keysRef = useKeyboardState(controlsEnabled);

    usePointerLook(controlsEnabled, lookRef);

    useEffect(() => {
        const handlePointerLockChange = () => {
            setControlsEnabled(document.pointerLockElement === stageRef.current);
        };

        document.addEventListener("pointerlockchange", handlePointerLockChange);

        return () => document.removeEventListener("pointerlockchange", handlePointerLockChange);
    }, []);

    const enterControls = () => {
        stageRef.current?.requestPointerLock();
    };

    return (
        <main className={styles.page}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.navLink}>
                    Works
                </Link>
                <span>Project 06 / R3F Bitcoin Flight</span>
            </nav>

            <div ref={stageRef} className={styles.gameStage}>
                <MonolithGameScene controlsEnabled={controlsEnabled} keysRef={keysRef} lookRef={lookRef} />
            </div>

            <div className={styles.flightBrief}>
                <p className={styles.kicker}>3D Data Story Game</p>
                <h1>飞向比特币恒星</h1>
                <p>驾驶小飞船穿过价格螺旋。每一颗亮星旁边都有一块叙事面板，靠近中心处的比特币恒星，阅读中本聪与 Bitcoin 共识扩张的关键节点。</p>
            </div>

            <button type="button" className={styles.controlButton} onClick={enterControls}>
                {controlsEnabled ? "操控中 · ESC 退出" : "点击进入操控"}
            </button>

            <div className={styles.controlHelp}>
                <span>WASD 移动</span>
                <span>SPACE 上升</span>
                <span>CTRL 下降</span>
                <span>鼠标转向</span>
                <span>ESC 退出</span>
            </div>
        </main>
    );
}
