"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Line, Text } from "@react-three/drei";
import * as THREE from "three";
import styles from "./bitcoin-story.module.css";
import type { TechPillar } from "@/data/bitcoinStory";

type NodeGroup = "core" | "pillar" | "distributed" | "cryptography" | "blockchain";

interface GraphNode {
    id: string;
    label: string;
    group: NodeGroup;
    size: number;
    position: [number, number, number];
    labelOffset: number;
}

interface GraphLink {
    source: string;
    target: string;
}

const nodes: GraphNode[] = [
    { id: "bitcoin", label: "Bitcoin", group: "core", size: 0.44, position: [0, 0.15, 0], labelOffset: 0.68 },
    { id: "distributed", label: "Distributed", group: "pillar", size: 0.34, position: [-1.85, 1.05, -0.18], labelOffset: 0.58 },
    { id: "cryptography", label: "Crypto", group: "pillar", size: 0.34, position: [1.95, 1.18, 0.28], labelOffset: 0.58 },
    { id: "blockchain", label: "Block Chain", group: "pillar", size: 0.34, position: [1.52, -1.2, -0.22], labelOffset: 0.58 },
    { id: "nodes", label: "Nodes", group: "distributed", size: 0.2, position: [-3.12, 1.78, -0.42], labelOffset: 0.38 },
    { id: "broadcast", label: "Broadcast", group: "distributed", size: 0.22, position: [-3.25, 0.18, 0.12], labelOffset: 0.4 },
    { id: "keys", label: "Keys", group: "cryptography", size: 0.2, position: [3.22, 1.92, -0.32], labelOffset: 0.38 },
    { id: "hash", label: "Hash", group: "cryptography", size: 0.22, position: [3.1, 0.38, 0.4], labelOffset: 0.4 },
    { id: "pow", label: "PoW", group: "blockchain", size: 0.22, position: [2.98, -0.7, 0.18], labelOffset: 0.4 },
    { id: "timestamp", label: "Timestamp", group: "blockchain", size: 0.2, position: [2.6, -2.08, -0.4], labelOffset: 0.38 },
    { id: "incentives", label: "Incentives", group: "core", size: 0.2, position: [-0.9, -1.72, 0.24], labelOffset: 0.38 },
];

const links: GraphLink[] = [
    { source: "bitcoin", target: "distributed" },
    { source: "bitcoin", target: "cryptography" },
    { source: "bitcoin", target: "blockchain" },
    { source: "bitcoin", target: "incentives" },
    { source: "distributed", target: "nodes" },
    { source: "distributed", target: "broadcast" },
    { source: "cryptography", target: "keys" },
    { source: "cryptography", target: "hash" },
    { source: "blockchain", target: "pow" },
    { source: "blockchain", target: "timestamp" },
];

const focusMap: Record<string, string[]> = {
    distributed: ["distributed", "nodes", "broadcast", "bitcoin"],
    cryptography: ["cryptography", "keys", "hash", "bitcoin"],
    blockchain: ["blockchain", "pow", "timestamp", "bitcoin"],
};

function nodeColor(node: GraphNode, highlighted: boolean) {
    if (highlighted) {
        return node.group === "core" ? "#ffbf61" : "#ffe0a7";
    }

    return node.group === "core" ? "#f7f1e8" : "#ece3d7";
}

function labelColor(node: GraphNode, highlighted: boolean) {
    if (highlighted) {
        return "#fff8ee";
    }

    return node.group === "core" || node.group === "pillar"
        ? "rgba(245, 239, 230, 0.9)"
        : "rgba(245, 239, 230, 0.7)";
}

function FloatingNode({ node, highlighted }: { node: GraphNode; highlighted: boolean }) {
    const seed = useMemo(() => node.id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0), [node.id]);
    const scaleTarget = highlighted ? 1.16 : 1;
    const meshRef = useRef<THREE.Group>(null);
    const labelRef = useRef<THREE.Group>(null);

    useFrame(({ clock }, delta) => {
        const mesh = meshRef.current;
        const label = labelRef.current;

        if (!mesh || !label) {
            return;
        }

        const t = clock.getElapsedTime() * 0.9 + seed * 0.03;
        const drift = Math.sin(t) * 0.075;
        const sway = Math.cos(t * 0.7) * 0.06;
        const pulse = 1 + Math.sin(t * 1.4) * 0.045;
        const nextScale = mesh.scale.x + (scaleTarget * pulse - mesh.scale.x) * Math.min(1, delta * 4);

        mesh.position.set(node.position[0] + sway, node.position[1] + drift, node.position[2]);
        mesh.scale.setScalar(nextScale);

        label.position.set(node.position[0] + sway, node.position[1] + node.labelOffset + drift * 0.85, node.position[2]);
    });

    return (
        <>
            <group ref={meshRef}>
                <mesh castShadow receiveShadow>
                    <sphereGeometry args={[node.size, 48, 48]} />
                    <meshStandardMaterial
                        color={nodeColor(node, highlighted)}
                        roughness={0.22}
                        metalness={0.14}
                        emissive={highlighted ? "#7a4210" : "#f2e7d8"}
                        emissiveIntensity={highlighted ? 1.15 : 0.14}
                    />
                </mesh>
            </group>

            <Billboard ref={labelRef} follow lockX={false} lockY={false} lockZ={false}>
                <Text
                    fontSize={node.group === "core" ? 0.28 : node.group === "pillar" ? 0.19 : 0.15}
                    color={labelColor(node, highlighted)}
                    anchorX="center"
                    anchorY="middle"
                    lineHeight={1.08}
                    outlineWidth={0.01}
                    outlineColor="rgba(10, 9, 8, 0.95)"
                    maxWidth={node.group === "pillar" ? 1.6 : 1.2}
                >
                    {node.label}
                </Text>
            </Billboard>
        </>
    );
}

function GraphScene({ activeNodes }: { activeNodes: Set<string> }) {
    const nodeMap = useMemo(() => new Map(nodes.map((node) => [node.id, node])), []);

    return (
        <>
            <color attach="background" args={["#110d09"]} />
            <fog attach="fog" args={["#110d09", 6, 12]} />
            <ambientLight intensity={0.58} />
            <pointLight position={[0, 2.5, 3.5]} intensity={26} color="#ffc463" />
            <pointLight position={[-4, -2, 2]} intensity={10} color="#8a5f2d" />
            <directionalLight position={[3.5, 4.4, 3.8]} intensity={1.8} color="#fff1d2" castShadow />

            <group scale={0.78}>
                {links.map((link) => {
                    const source = nodeMap.get(link.source);
                    const target = nodeMap.get(link.target);

                    if (!source || !target) {
                        return null;
                    }

                    const highlighted = activeNodes.has(link.source) && activeNodes.has(link.target);

                    return (
                        <Line
                            key={`${link.source}-${link.target}`}
                            points={[source.position, target.position]}
                            color={highlighted ? "#f0a229" : "#f0ebe4"}
                            lineWidth={highlighted ? 1.6 : 0.8}
                            transparent
                            opacity={highlighted ? 0.95 : 0.3}
                        />
                    );
                })}

                {nodes.map((node) => (
                    <FloatingNode
                        key={node.id}
                        node={node}
                        highlighted={activeNodes.has(node.id)}
                    />
                ))}
            </group>
        </>
    );
}

interface BitcoinTechMapProps {
    pillars: TechPillar[];
}

export function BitcoinTechMap({ pillars }: BitcoinTechMapProps) {
    const [activeId, setActiveId] = useState<TechPillar["id"]>("distributed");
    const activeNodes = useMemo(() => new Set(focusMap[activeId]), [activeId]);

    return (
        <div className={styles.mapLayout}>
            <div className={styles.pillarList}>
                {pillars.map((pillar) => {
                    const isActive = pillar.id === activeId;

                    return (
                        <button
                            key={pillar.id}
                            type="button"
                            className={`${styles.pillarButton} ${isActive ? styles.pillarButtonActive : ""}`}
                            onMouseEnter={() => setActiveId(pillar.id)}
                            onFocus={() => setActiveId(pillar.id)}
                            onClick={() => setActiveId(pillar.id)}
                        >
                            <div className={styles.pillarKicker}>{pillar.kicker}</div>
                            <div className={styles.pillarLabel}>{pillar.label}</div>
                            <p className={styles.pillarDetail}>{pillar.detail}</p>
                        </button>
                    );
                })}
            </div>

            <div className={styles.mapCanvas}>
                <Canvas
                    dpr={[1, 1.8]}
                    camera={{ position: [0, 0.12, 8.2], fov: 38 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <GraphScene activeNodes={activeNodes} />
                </Canvas>
            </div>
        </div>
    );
}
