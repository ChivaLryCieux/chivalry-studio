"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Environment, Image as DreiImage, MeshReflectorMaterial, useCursor } from "@react-three/drei";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import * as easing from "maath/easing";
import { useRouter } from "next/navigation";
import * as THREE from "three";

const GOLDEN_RATIO = 1.61803398875;
const IDLE_IMAGE_SCALE: [number, number, number] = [0.86, 0.9, 1];
const ACTIVE_IMAGE_ZOOM = 1.85;
const POINTER_MAPPING_GAIN = 1.6;
const IMAGE_MATTE_INSET_X = 0.01;
const IMAGE_MATTE_INSET_Y = 0.12;
const IMAGE_INTERACTIVE_HALF_WIDTH = IDLE_IMAGE_SCALE[0] * 0.5;
const IMAGE_INTERACTIVE_HALF_HEIGHT = IDLE_IMAGE_SCALE[1] * 0.5;
const BITCOIN_STORY_PANEL_IMAGES = [
    "/images/projects/bitcoin-story/panels/panel-1.png",
    "/images/projects/bitcoin-story/panels/panel-2.png",
    "/images/projects/bitcoin-story/panels/panel-3.png",
    "/images/projects/bitcoin-story/panels/panel-4.png",
    "/images/projects/bitcoin-story/panels/panel-5.png",
    "/images/projects/bitcoin-story/panels/panel-6.png",
    "/images/projects/bitcoin-story/panels/panel-7.png",
    "/images/projects/bitcoin-story/panels/panel-8.png",
] as const;

interface GalleryFrameData {
    body: string[];
    id: string;
    kicker: string;
    metric: string;
    position: [number, number, number];
    rotation: [number, number, number];
    targetProjectId?: number;
    title: string;
}

const galleryFrames: GalleryFrameData[] = [
    {
        id: "origin",
        kicker: "LEFT 01 / ORIGIN",
        title: "从匿名名字开始",
        metric: "SATOSHI",
        body: ["身份悬案不是重点", "一个名字启动协议叙事", "创始人逐渐从系统里退场"],
        position: [-1.82, 0, 3.02],
        rotation: [0, Math.PI / 2.5, 0],
    },
    {
        id: "development",
        kicker: "LEFT 02 / 2008.10",
        title: "一份 8 页文档",
        metric: "8 PAGES",
        body: ["无中心记账", "密码学签名", "工作量证明", "时间戳服务器"],
        position: [-1.96, 0, 1.78],
        rotation: [0, Math.PI / 2.5, 0],
    },
    {
        id: "breakout",
        kicker: "LEFT 03 / 2009.01",
        title: "第一块石头",
        metric: "50 BTC",
        body: ["创世区块启动发行机制", "泰晤士报头条成为链上时间戳", "制度评论被写进起点"],
        position: [-1.75, 0, 0.25],
        rotation: [0, Math.PI / 2.5, 0],
    },
    {
        id: "bedrock",
        kicker: "BACK 04 / PROTOCOL",
        title: "协议扩张",
        metric: "P2P + POW",
        body: ["节点广播交易", "最长链形成共识", "区块把时间压缩成历史", "信任转移到可验证计算"],
        position: [-0.8, 0, -0.6],
        rotation: [0, 0, 0],
    },
    {
        id: "evolution",
        kicker: "BACK 05 / 2010.05",
        title: "第一次真实定价",
        metric: "10,000 BTC",
        body: ["两张披萨给抽象代币定价", "论坛实验进入商品交换", "价格成为共识的读数器"],
        position: [0.8, 0, -0.6],
        rotation: [0, 0, 0],
    },
    {
        id: "escalation",
        kicker: "RIGHT 06 / 2017",
        title: "交易所时代",
        metric: "$19.8K",
        body: ["全球流动性进入系统", "价格波动放大叙事", "Binance 日线成为后续样本"],
        position: [1.75, 0, 0.25],
        rotation: [0, -Math.PI / 2.5, 0],
    },
    {
        id: "expanding",
        kicker: "RIGHT 07 / 2025.10.06",
        title: "历史级重估",
        metric: "$126,199.63",
        body: ["归档日线样本高点", "市场重新定价制度想象力", "崩塌之后仍继续积累共识"],
        position: [1.96, 0, 1.78],
        rotation: [0, -Math.PI / 2.5, 0],
    },
    {
        id: "outlook",
        kicker: "RIGHT 08 / SATOSHI STACK",
        title: "沉默的仓位",
        metric: "1.1M BTC",
        body: ["约占 21M 上限 5.24%", "长期静止而被持续重估", "财富叙事背后是协议起源"],
        position: [1.82, 0, 3.02],
        rotation: [0, -Math.PI / 2.5, 0],
    },
    {
        id: "r3f-narrative",
        kicker: "CENTER 09 / NEXT ROOM",
        title: "R3F 游戏化叙事",
        metric: "PROJECT 10",
        body: ["进入第 10 个项目", "3D 数据叙事版本", "粒子、BTC 建模、交互式价格记忆"],
        position: [0, 0, 1.5],
        rotation: [0, 0, 0],
        targetProjectId: 10,
    },
];

function escapeSvgText(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

function createSwissPoster(frame: GalleryFrameData, index: number) {
    const accent = index % 2 === 0 ? "#f0a229" : "#f6d28a";
    const ruleColor = index % 2 === 0 ? "#20130a" : "#2c1b0d";
    const body = frame.body.map((line, lineIndex) => (
        `<text x="96" y="${1060 + lineIndex * 74}" font-size="46" font-weight="700" fill="#20140b">${escapeSvgText(line)}</text>`
    )).join("");

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600">
            <rect width="1200" height="1600" fill="#f4efe5"/>
            <path d="M0 0H1200V330H0Z" fill="${accent}"/>
            <path d="M0 330H1200V1600H0Z" fill="#eee5d7"/>
            <g opacity="0.45">
                ${Array.from({ length: 12 }, (_, i) => `<path d="M${96 + i * 88} 380V1500" stroke="#c9bca9" stroke-width="2"/>`).join("")}
                ${Array.from({ length: 10 }, (_, i) => `<path d="M70 ${430 + i * 110}H1130" stroke="#d7ccbb" stroke-width="2"/>`).join("")}
            </g>
            <circle cx="960" cy="245" r="138" fill="none" stroke="${ruleColor}" stroke-width="18"/>
            <path d="M960 105V385" stroke="${ruleColor}" stroke-width="18"/>
            <text x="94" y="138" font-family="Helvetica, Arial, sans-serif" font-size="36" font-weight="700" letter-spacing="8" fill="#241508">${escapeSvgText(frame.kicker)}</text>
            <text x="92" y="650" font-family="Helvetica, Arial, sans-serif" font-size="140" font-weight="900" letter-spacing="-6" fill="#20140b">${escapeSvgText(frame.metric)}</text>
            <text x="92" y="835" font-family="Helvetica, Arial, sans-serif" font-size="92" font-weight="900" letter-spacing="-2" fill="#20140b">${escapeSvgText(frame.title)}</text>
            <path d="M96 945H1096" stroke="#20140b" stroke-width="10"/>
            ${body}
            <text x="96" y="1460" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="6" fill="#6b5b47">SATOSHI / BITCOIN / DATA STORY</text>
            <text x="1096" y="1460" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="900" text-anchor="end" fill="#20140b">${String(index + 1).padStart(2, "0")}</text>
        </svg>
    `;

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function createLabelTexture(value: string, fontFamily: string) {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 256;
    const context = canvas.getContext("2d");

    if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#f5efe6";
        context.font = `700 92px ${fontFamily}`;
        context.textBaseline = "top";
        context.fillText(value, 0, 22);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    return texture;
}

function createPortalPoster(fontFamily: string) {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1600;
    const context = canvas.getContext("2d");

    if (context) {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "#2563eb";
        context.textAlign = "center";
        context.textBaseline = "alphabetic";

        context.font = `700 72px ${fontFamily}`;
        context.fillText("TAP TO ENTER", 600, 740);

        context.font = `900 104px ${fontFamily}`;
        context.fillText("R3F NARRATIVE", 600, 860);
    }

    return canvas.toDataURL("image/png");
}

function Frames({ frames, onOpenProject }: { frames: GalleryFrameData[]; onOpenProject: (projectId: number) => void }) {
    const groupRef = useRef<THREE.Group>(null);
    const targetPosition = useRef(new THREE.Vector3(0, 0, 5.5));
    const targetQuaternion = useRef(new THREE.Quaternion());
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        const group = groupRef.current;
        const activeObject = activeId && group ? group.getObjectByName(activeId) : null;

        if (activeObject?.parent) {
            activeObject.parent.updateWorldMatrix(true, true);
            activeObject.parent.localToWorld(targetPosition.current.set(0, GOLDEN_RATIO / 2, 1.25));
            activeObject.parent.getWorldQuaternion(targetQuaternion.current);
            return;
        }

        targetPosition.current.set(0, 0, 5.5);
        targetQuaternion.current.identity();
    }, [activeId]);

    useFrame((state, delta) => {
        easing.damp3(state.camera.position, targetPosition.current, 0.42, delta);
        easing.dampQ(state.camera.quaternion, targetQuaternion.current, 0.42, delta);
    });

    const handlePointerMissed = () => setActiveId(null);

    return (
        <group ref={groupRef} onPointerMissed={handlePointerMissed}>
            {frames.map((frame, index) => (
                <Frame
                    key={frame.id}
                    activeId={activeId}
                    frame={frame}
                    index={index}
                    onOpenProject={onOpenProject}
                    onSelect={setActiveId}
                />
            ))}
        </group>
    );
}

interface FrameProps {
    activeId: string | null;
    frame: GalleryFrameData;
    index: number;
    onOpenProject: (projectId: number) => void;
    onSelect: (id: string | null) => void;
}

type PatchedImageShader = {
    fragmentShader: string;
    uniforms: Record<string, THREE.IUniform>;
};

function getLabelFontFamily() {
    if (typeof window === "undefined" || typeof document === "undefined") {
        return '"Times New Roman", serif';
    }

    const cssFontFamily = getComputedStyle(document.body).getPropertyValue("--font-serif").trim();
    return cssFontFamily || '"Times New Roman", serif';
}

function Frame({ activeId, frame, index, onOpenProject, onSelect }: FrameProps) {
    const panelRef = useRef<THREE.Mesh>(null);
    const imageRef = useRef<THREE.Mesh>(null);
    const frameRef = useRef<THREE.Mesh>(null);
    const imageShaderRef = useRef<PatchedImageShader | null>(null);
    const [hovered, setHovered] = useState(false);
    const [labelTextureVersion, setLabelTextureVersion] = useState(0);
    const [phase] = useState(() => index * 1.7);
    const pointerUvRef = useRef(new THREE.Vector2(0.5, 0.5));
    const targetUvRef = useRef(new THREE.Vector2(0.5, 0.5));
    const posterUrl = useMemo(
        () => frame.targetProjectId === 10
            ? createPortalPoster(getLabelFontFamily())
            : BITCOIN_STORY_PANEL_IMAGES[index] ?? createSwissPoster(frame, index),
        [frame, index, labelTextureVersion]
    );
    const labelTexture = useMemo(
        () => createLabelTexture(`${String(index + 1).padStart(2, "0")} / ${frame.id.toUpperCase()}`, getLabelFontFamily()),
        [frame.id, index, labelTextureVersion]
    );
    const isActive = activeId === frame.id;

    useCursor(hovered);

    useEffect(() => () => labelTexture.dispose(), [labelTexture]);
    useEffect(() => {
        let cancelled = false;

        document.fonts.ready.then(() => {
            if (!cancelled) {
                setLabelTextureVersion((version) => version + 1);
            }
        });

        return () => {
            cancelled = true;
        };
    }, []);
    useEffect(() => {
        const imageMesh = imageRef.current;

        if (!imageMesh) {
            return;
        }

        const material = imageMesh.material as THREE.ShaderMaterial & {
            userData?: { panPatched?: boolean };
        };

        if (material.userData?.panPatched) {
            return;
        }

        const originalOnBeforeCompile = material.onBeforeCompile.bind(material);
        material.onBeforeCompile = (shader, renderer) => {
            originalOnBeforeCompile(shader, renderer);
            shader.uniforms.uPan = { value: new THREE.Vector2(0, 0) };
            shader.uniforms.uMatteInset = { value: new THREE.Vector2(IMAGE_MATTE_INSET_X, IMAGE_MATTE_INSET_Y) };
            shader.fragmentShader = shader.fragmentShader
                .replace(
                    "uniform float opacity;",
                    "uniform float opacity;\n  uniform vec2 uPan;\n  uniform vec2 uMatteInset;"
                )
                .replace(
                    "vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);",
                    [
                        "vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5) + uPan;",
                        "vec2 matteMin = uMatteInset;",
                        "vec2 matteMax = vec2(1.0) - uMatteInset;",
                        "vec2 framedUv = (zUv - matteMin) / (matteMax - matteMin);",
                        "float matteMask = step(matteMin.x, zUv.x) * step(matteMin.y, zUv.y) * step(zUv.x, matteMax.x) * step(zUv.y, matteMax.y);"
                    ].join("\n    ")
                )
                .replace(
                    "gl_FragColor = toGrayscale(texture2D(map, zUv) * vec4(color, opacity * a), grayscale);",
                    "vec4 sampled = matteMask > 0.5 ? texture2D(map, framedUv) : vec4(0.0, 0.0, 0.0, 1.0);\n    gl_FragColor = toGrayscale(sampled * vec4(color, opacity * a), grayscale);"
                );
            imageShaderRef.current = shader;
        };

        material.userData = { ...(material.userData ?? {}), panPatched: true };
        material.needsUpdate = true;

        return () => {
            imageShaderRef.current = null;
        };
    }, []);

    useFrame((state, delta) => {
        if (!imageRef.current || !frameRef.current) {
            return;
        }

        const frameMaterial = frameRef.current.material as THREE.MeshBasicMaterial;
        const imageMaterial = imageRef.current.material as THREE.Material & { zoom?: number };
        const idleZoom = 1.18 + Math.sin(phase + state.clock.elapsedTime / 4) * 0.05;

        easing.damp(imageMaterial, "zoom", isActive ? ACTIVE_IMAGE_ZOOM : idleZoom, 0.16, delta);

        if (isActive) {
            pointerUvRef.current.lerp(targetUvRef.current, 1 - Math.exp(-delta * 10));
            easing.damp3(imageRef.current.position, [0, 0, 0.72], 0.2, delta);
            easing.damp3(imageRef.current.scale, IDLE_IMAGE_SCALE, 0.16, delta);
        } else {
            easing.damp3(imageRef.current.position, [0, 0, 0.72], 0.18, delta);
            easing.damp3(imageRef.current.scale, [IDLE_IMAGE_SCALE[0] * (hovered ? 0.94 : 1), IDLE_IMAGE_SCALE[1] * (hovered ? 0.94 : 1), 1], 0.12, delta);
        }

        const panUniform = imageShaderRef.current?.uniforms.uPan as THREE.IUniform<THREE.Vector2> | undefined;

        if (panUniform) {
            const currentZoom = isActive ? ACTIVE_IMAGE_ZOOM : idleZoom;
            const maxPan = Math.max(0, (1 - (1 / currentZoom)) * 0.5);
            const panU = isActive ? (pointerUvRef.current.x - 0.5) * 2 * maxPan : 0;
            const panV = isActive ? (pointerUvRef.current.y - 0.5) * 2 * maxPan : 0;
            panUniform.value.set(panU, panV);
        }

        easing.dampC(frameMaterial.color, hovered ? "#f0a229" : "#f5efe6", 0.12, delta);
    });

    const handleClick = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();

        if (frame.targetProjectId && isActive) {
            onOpenProject(frame.targetProjectId);
            return;
        }

        onSelect(isActive ? null : frame.id);
    };

    const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        setHovered(true);
    };

    const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
        if (!isActive || !panelRef.current) {
            return;
        }

        event.stopPropagation();
        const localPoint = panelRef.current.worldToLocal(event.point.clone());
        const normalizedX = THREE.MathUtils.clamp((localPoint.x / IMAGE_INTERACTIVE_HALF_WIDTH) * 0.5 + 0.5, 0, 1);
        const normalizedY = THREE.MathUtils.clamp((localPoint.y / IMAGE_INTERACTIVE_HALF_HEIGHT) * 0.5 + 0.5, 0, 1);
        const boostedX = THREE.MathUtils.clamp((normalizedX - 0.5) * POINTER_MAPPING_GAIN + 0.5, 0, 1);
        const boostedY = THREE.MathUtils.clamp((normalizedY - 0.5) * POINTER_MAPPING_GAIN + 0.5, 0, 1);

        targetUvRef.current.set(
            boostedX,
            boostedY
        );
    };

    const handlePointerOut = () => {
        setHovered(false);
        targetUvRef.current.set(0.5, 0.5);
    };

    return (
        <group position={frame.position} rotation={frame.rotation}>
            <mesh
                ref={panelRef}
                name={frame.id}
                position={[0, GOLDEN_RATIO / 2, 0]}
                scale={[1, GOLDEN_RATIO, 0.06]}
                onClick={handleClick}
                onPointerMove={handlePointerMove}
                onPointerOut={handlePointerOut}
                onPointerOver={handlePointerOver}
            >
                <boxGeometry />
                <meshStandardMaterial color="#15110d" metalness={0.25} roughness={0.55} envMapIntensity={1.2} />
                <mesh ref={frameRef} raycast={() => null} scale={[0.91, 0.94, 0.9]} position={[0, 0, 0.22]}>
                    <boxGeometry />
                    <meshBasicMaterial toneMapped={false} fog={false} color="#f5efe6" />
                </mesh>
                <DreiImage
                    raycast={() => null}
                    ref={imageRef}
                    position={[0, 0, 0.72]}
                    url={posterUrl}
                    toneMapped={false}
                />
            </mesh>
            <mesh position={[1.13, GOLDEN_RATIO - 0.14, 0]}>
                <planeGeometry args={[1.2, 0.15]} />
                <meshBasicMaterial depthTest depthWrite={false} map={labelTexture} toneMapped={false} transparent />
            </mesh>
        </group>
    );
}

export function BitcoinNarrativeGallery() {
    const router = useRouter();

    return (
        <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
            <color attach="background" args={["#14100c"]} />
            <fog attach="fog" args={["#14100c", 0, 16]} />
            <group position={[0, -0.5, 0]}>
                <Frames
                    frames={galleryFrames}
                    onOpenProject={(projectId) => router.push(`/detailPage/${projectId}?fromProject=9`)}
                />
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[50, 50]} />
                    <MeshReflectorMaterial
                        blur={[300, 100]}
                        color="#050403"
                        depthScale={1.2}
                        maxDepthThreshold={1.4}
                        metalness={0.45}
                        minDepthThreshold={0.4}
                        mixBlur={1}
                        mixStrength={62}
                        resolution={1024}
                        roughness={1}
                    />
                </mesh>
            </group>
            <Environment files="/hdr/potsdamer_platz_1k.hdr" />
        </Canvas>
    );
}
