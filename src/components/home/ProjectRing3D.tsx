"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Environment, Image as DreiImage } from "@react-three/drei";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import * as easing from "maath/easing";
import * as THREE from "three";
import type { ProjectData } from "@/types/project";

const CAMERA_Z = 16.5;
const CARD_WIDTH = 1.64;
const CARD_HEIGHT = 0.92;
const ACTIVE_CARD_SCALE: [number, number, number] = [1.14, 1.14, 1];
const RESTING_CARD_SCALE: [number, number, number] = [1, 1, 1];
const CARD_GAP = 0.21;
const RING_RADIUS_COMPRESSION = 0.84;
const MIN_RING_RADIUS = 2.55;
const CARD_TINT = "#d8d1c6";

interface ProjectRing3DProps {
    activeIndex: number;
    onProjectFocus: (projectId: number) => void;
    onProjectOpen: (projectId: number) => void;
    projects: ProjectData[];
}

interface CarouselSceneProps extends ProjectRing3DProps {
    radius: number;
}

interface RingCardProps {
    activeIndex: number;
    index: number;
    onProjectFocus: (projectId: number) => void;
    onProjectOpen: (projectId: number) => void;
    project: ProjectData;
    radius: number;
    total: number;
}

function createBentPlaneGeometry(radius: number, width = 1, height = 1) {
    const geometry = new THREE.PlaneGeometry(width, height, 32, 16);
    const halfWidth = width * 0.5;
    const left = new THREE.Vector2(-halfWidth, 0);
    const apex = new THREE.Vector2(0, radius);
    const right = new THREE.Vector2(halfWidth, 0);
    const leftToApex = new THREE.Vector2().subVectors(left, apex);
    const apexToRight = new THREE.Vector2().subVectors(apex, right);
    const leftToRight = new THREE.Vector2().subVectors(left, right);
    const circleRadius = (leftToApex.length() * apexToRight.length() * leftToRight.length()) / (2 * Math.abs(leftToApex.cross(leftToRight)));
    const center = new THREE.Vector2(0, radius - circleRadius);
    const baseVector = new THREE.Vector2().subVectors(left, center);
    const baseAngle = baseVector.angle() - Math.PI * 0.5;
    const arc = baseAngle * 2;
    const uv = geometry.attributes.uv;
    const position = geometry.attributes.position;
    const vertex = new THREE.Vector2();

    for (let i = 0; i < uv.count; i += 1) {
        const uvRatio = 1 - uv.getX(i);
        const y = position.getY(i);
        vertex.copy(right).rotateAround(center, arc * uvRatio);
        position.setXYZ(i, vertex.x, y, vertex.y);
    }

    position.needsUpdate = true;
    geometry.computeVertexNormals();

    return geometry;
}

const SHARED_CARD_GEOMETRY = createBentPlaneGeometry(0.1, CARD_WIDTH, CARD_HEIGHT);

function getRingRadius(cardCount: number) {
    if (cardCount < 2) {
        return 3.2;
    }

    const activeCardWidth = CARD_WIDTH * ACTIVE_CARD_SCALE[0];
    const minimumRadius = (activeCardWidth + CARD_GAP) / (2 * Math.sin(Math.PI / cardCount));

    return Math.max(MIN_RING_RADIUS, minimumRadius * RING_RADIUS_COMPRESSION);
}

function RingCard({ activeIndex, index, onProjectFocus, onProjectOpen, project, radius, total }: RingCardProps) {
    const cardRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const theta = (index / total) * Math.PI * 2;
    const isActive = index === activeIndex;

    useFrame((_, delta) => {
        if (!cardRef.current) {
            return;
        }

        const material = cardRef.current.material as THREE.Material & {
            grayscale?: number;
            radius?: number;
            transparent?: boolean;
            zoom?: number;
        };

        easing.damp3(cardRef.current.scale, hovered || isActive ? ACTIVE_CARD_SCALE : RESTING_CARD_SCALE, 0.18, delta);
        easing.damp(material, "radius", hovered || isActive ? 0.22 : 0.1, 0.22, delta);
        easing.damp(material, "zoom", hovered || isActive ? 1 : 1.32, 0.28, delta);
        easing.damp(material, "grayscale", isActive ? 0 : 0.16, 0.25, delta);
    });

    const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
    };

    const handlePointerOut = () => {
        setHovered(false);
        document.body.style.cursor = "";
    };

    const handleClick = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();

        if (isActive) {
            onProjectOpen(project.id);
            return;
        }

        onProjectFocus(project.id);
    };

    return (
        <DreiImage
            ref={cardRef}
            color={CARD_TINT}
            transparent
            toneMapped={false}
            side={THREE.DoubleSide}
            url={project.src}
            position={[Math.sin(theta) * radius, 0, Math.cos(theta) * radius]}
            rotation={[0, theta, 0]}
            onClick={handleClick}
            onPointerOut={handlePointerOut}
            onPointerOver={handlePointerOver}
        >
            <primitive object={SHARED_CARD_GEOMETRY} attach="geometry" />
        </DreiImage>
    );
}

function CarouselScene({ activeIndex, onProjectFocus, onProjectOpen, projects, radius }: CarouselSceneProps) {
    const rigRef = useRef<THREE.Group>(null);
    const angle = projects.length > 0 ? (Math.PI * 2) / projects.length : 0;

    useFrame((state, delta) => {
        if (!rigRef.current) {
            return;
        }

        easing.dampAngle(rigRef.current.rotation, "y", -activeIndex * angle, 0.42, delta);
        easing.damp3(state.camera.position, [-state.pointer.x * 2.25, 1.46 + state.pointer.y * 0.72, CAMERA_Z], 0.32, delta);
        state.camera.lookAt(0, 0, 0);
        state.events.update?.();
    });

    return (
        <>
            <ambientLight intensity={1.25} />
            <directionalLight position={[4, 5, 6]} intensity={1.4} />
            <pointLight position={[-4, 2, 4]} intensity={3.5} color="#ffebe0" />
            <group ref={rigRef} rotation={[0, 0, 0.11]}>
                <mesh position={[0, -0.78, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[radius, 0.01, 8, 160]} />
                    <meshBasicMaterial color="#f1d8c8" transparent opacity={0.18} />
                </mesh>
                {projects.map((project, index) => (
                    <RingCard
                        key={project.id}
                        activeIndex={activeIndex}
                        index={index}
                        onProjectFocus={onProjectFocus}
                        onProjectOpen={onProjectOpen}
                        project={project}
                        radius={radius}
                        total={projects.length}
                    />
                ))}
            </group>
        </>
    );
}

export function ProjectRing3D({ activeIndex, onProjectFocus, onProjectOpen, projects }: ProjectRing3DProps) {
    const radius = useMemo(() => getRingRadius(projects.length), [projects.length]);

    return (
        <Canvas
            flat
            camera={{ position: [0, 1.46, CAMERA_Z], fov: 15 }}
            dpr={[1, 2]}
            gl={{ alpha: true, antialias: true }}
        >
            <fog attach="fog" args={["#12080a", 14, 23]} />
            <CarouselScene
                activeIndex={activeIndex}
                onProjectFocus={onProjectFocus}
                onProjectOpen={onProjectOpen}
                projects={projects}
                radius={radius}
            />
            <Suspense fallback={null}>
                <Environment preset="dawn" background={false} blur={0.45} />
            </Suspense>
        </Canvas>
    );
}
