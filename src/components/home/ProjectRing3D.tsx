'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Image as DreiImage } from '@react-three/drei/core/Image.js';
import { useGLTF } from '@react-three/drei/core/Gltf.js';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import * as easing from 'maath/easing';
import * as THREE from 'three';
import type { ProjectData } from '@/types/project';

const CAMERA_Z = 16.5;
const STAR_MODEL_URL = '/models/Poly-2.glb';
const CARD_WIDTH = 1.64;
const CARD_HEIGHT = 0.92;
const ACTIVE_CARD_SCALE: [number, number, number] = [1.16, 1.16, 1];
const HOVERED_CARD_SCALE: [number, number, number] = [1.06, 1.06, 1];
const RESTING_CARD_SCALE: [number, number, number] = [1, 1, 1];
const CARD_TINT = '#f5f3ec';

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

interface StarMeshGeometry {
  geometry: THREE.BufferGeometry;
}

import {
  createBentPlaneGeometry,
  getRingRadius,
  createStarGradientTexture,
  paintStarGradientTexture,
} from '@/lib/threeUtils';

function RingCard({ activeIndex, index, onProjectFocus, onProjectOpen, project, radius, total }: RingCardProps) {
  const cardRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const theta = (index / total) * Math.PI * 2;
  const geometry = useMemo(() => createBentPlaneGeometry(0.1, CARD_WIDTH, CARD_HEIGHT), []);
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

    const targetScale = isActive ? ACTIVE_CARD_SCALE : hovered ? HOVERED_CARD_SCALE : RESTING_CARD_SCALE;
    easing.damp3(cardRef.current.scale, targetScale, 0.2, delta);
    easing.damp(material, 'radius', isActive || hovered ? 0.12 : 0.08, 0.22, delta);
    easing.damp(material, 'zoom', 1, 0.25, delta);
    easing.damp(material, 'grayscale', isActive ? 0 : 0.12, 0.25, delta);
  });

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = '';
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
      <primitive object={geometry} attach="geometry" />
    </DreiImage>
  );
}

function StarModel() {
  const modelRef = useRef<THREE.Group>(null);
  const texturePaintFrame = useRef(0);
  const { scene } = useGLTF(STAR_MODEL_URL);
  const gradientTexture = useMemo(() => createStarGradientTexture(), []);
  const motion = useMemo(
    () => ({
      phase: 2.37,
      spinX: 0.026,
      spinY: 0.082,
      spinZ: 0.017,
    }),
    []
  );
  const starMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      emissive: '#2b0d08',
      emissiveIntensity: 0.26,
      map: gradientTexture.texture,
      metalness: 0.18,
      roughness: 0.24,
      clearcoat: 0.72,
      clearcoatRoughness: 0.2,
      reflectivity: 0.62,
      sheen: 0.35,
      sheenColor: new THREE.Color('#ffcf67'),
      sheenRoughness: 0.42,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
  }, [gradientTexture.texture]);
  const starGeometries = useMemo(() => {
    const geometries: StarMeshGeometry[] = [];

    scene.traverse((child) => {
      if (!('isMesh' in child) || !child.isMesh) {
        return;
      }

      const sourceMesh = child as THREE.Mesh<THREE.BufferGeometry>;
      const geometry = sourceMesh.geometry.clone();
      const position = geometry.attributes.position;
      const bounds = new THREE.Box3().setFromBufferAttribute(position as THREE.BufferAttribute);
      const center = bounds.getCenter(new THREE.Vector3());
      const size = bounds.getSize(new THREE.Vector3());
      const sizeX = Math.max(size.x, 0.0001);
      const sizeZ = Math.max(size.z, 0.0001);
      const uv = new Float32Array(position.count * 2);

      for (let i = 0; i < position.count; i += 1) {
        uv[i * 2] = (position.getX(i) - center.x) / sizeX + 0.5;
        uv[i * 2 + 1] = (position.getZ(i) - center.z) / sizeZ + 0.5;
      }

      geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
      geometry.computeVertexNormals();
      geometries.push({ geometry });
    });

    return geometries;
  }, [scene]);
  const modelScale = useMemo(() => {
    const bounds = new THREE.Box3();

    starGeometries.forEach(({ geometry }) => {
      geometry.computeBoundingBox();

      if (geometry.boundingBox) {
        bounds.union(geometry.boundingBox);
      }
    });

    const size = bounds.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);

    return maxDimension > 0 ? 2 / maxDimension : 1;
  }, [starGeometries]);

  useEffect(() => {
    paintStarGradientTexture(gradientTexture.canvas, gradientTexture.texture, 0);

    return () => {
      gradientTexture.texture.dispose();
    };
  }, [gradientTexture]);

  useFrame((state, delta) => {
    if (!modelRef.current) {
      return;
    }

    const time = state.clock.elapsedTime;
    const breath = Math.sin(time * 0.82 + motion.phase);

    if (time - texturePaintFrame.current > 1 / 12) {
      paintStarGradientTexture(gradientTexture.canvas, gradientTexture.texture, time);
      texturePaintFrame.current = time;
    }

    modelRef.current.position.y = 0.08 + breath * 0.11;
    modelRef.current.scale.setScalar(modelScale * (1 + breath * 0.025));
    modelRef.current.rotation.x += delta * motion.spinX * (0.65 + Math.sin(time * 0.23 + motion.phase) * 0.35);
    modelRef.current.rotation.y += delta * motion.spinY * (0.72 + Math.sin(time * 0.19 + motion.phase * 0.7) * 0.28);
    modelRef.current.rotation.z += delta * motion.spinZ * (0.7 + Math.sin(time * 0.17 + motion.phase * 1.3) * 0.3);
  });

  return (
    <group ref={modelRef} position={[0, 0.08, 0]} rotation={[0.16, -0.4, -0.08]} scale={modelScale}>
      {starGeometries.map(({ geometry }, index) => (
        <mesh key={index} castShadow receiveShadow geometry={geometry} material={starMaterial} />
      ))}
    </group>
  );
}

function CarouselScene({ activeIndex, onProjectFocus, onProjectOpen, projects, radius }: CarouselSceneProps) {
  const rigRef = useRef<THREE.Group>(null);
  const angle = projects.length > 0 ? (Math.PI * 2) / projects.length : 0;

  useFrame((state, delta) => {
    if (!rigRef.current) {
      return;
    }

    easing.dampAngle(rigRef.current.rotation, 'y', -activeIndex * angle, 0.42, delta);
    easing.damp3(state.camera.position, [-state.pointer.x * 2.25, 1.46 + state.pointer.y * 0.72, CAMERA_Z], 0.32, delta);
    state.camera.lookAt(0, 0, 0);
    state.events.update?.();
  });

  return (
    <>
      <ambientLight intensity={1.25} />
      <directionalLight position={[4, 5, 6]} intensity={1.4} />
      <pointLight position={[-4, 2, 4]} intensity={3.5} color="#ffebe0" />
      <pointLight position={[0, 1.2, 2.2]} intensity={1.8} color="#fff6df" />
      <StarModel />
      <group ref={rigRef} rotation={[0, 0, 0.11]}>
        {projects.map((project, index) => (
          <Suspense key={project.id} fallback={null}>
            <RingCard
              activeIndex={activeIndex}
              index={index}
              onProjectFocus={onProjectFocus}
              onProjectOpen={onProjectOpen}
              project={project}
              radius={radius}
              total={projects.length}
            />
          </Suspense>
        ))}
      </group>
    </>
  );
}

useGLTF.preload(STAR_MODEL_URL);

export function ProjectRing3D({ activeIndex, onProjectFocus, onProjectOpen, projects }: ProjectRing3DProps) {
  const radius = getRingRadius(projects.length);

  return (
    <Canvas flat camera={{ position: [0, 1.46, CAMERA_Z], fov: 15 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      <Suspense fallback={null}>
        <fog attach="fog" args={['#12080a', 14, 23]} />
        <CarouselScene
          activeIndex={activeIndex}
          onProjectFocus={onProjectFocus}
          onProjectOpen={onProjectOpen}
          projects={projects}
          radius={radius}
        />
      </Suspense>
    </Canvas>
  );
}
