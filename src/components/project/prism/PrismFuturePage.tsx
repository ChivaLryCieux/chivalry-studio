"use client";

import Link from "next/link";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, invalidate, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Center, Instances, Instance, MeshTransmissionMaterial, shaderMaterial, Text3D, useTexture } from "@react-three/drei";
import { Bloom, EffectComposer, LUT } from "@react-three/postprocessing";
import { LUTCubeLoader } from "postprocessing";
import { GLTFLoader } from "three-stdlib";
import * as THREE from "three";
import styles from "./prism-future.module.css";

const PRISM_MODEL = "/prism/gltf/prism.glb";
const LUT_URL = "/prism/lut/F-6800-STD.cube";
const FLARE_STREAK = "/prism/textures/lensflare/lensflare2.png";
const FLARE_DOT = "/prism/textures/lensflare/lensflare3.png";
const FLARE_GLOW = "/prism/textures/lensflare/lensflare0_bw.png";
const BEAM_GLOW = "/prism/textures/lensflare/lensflare0_bw.jpg";
const PRISM_TITLE_FONT = "/prism/fonts/helvetiker_bold.typeface.json";

type RayApi = {
    end: THREE.Vector3;
    hits: Map<string, { intersect: RayIntersect; key: string; stopped: boolean }>;
    number: number;
    objects: THREE.Object3D[];
    positions: Float32Array;
    raycaster: THREE.Raycaster;
    setRay: (start?: [number, number, number], end?: [number, number, number]) => void;
    start: THREE.Vector3;
    update: () => number;
};

type RayIntersect = THREE.Intersection & {
    direction?: THREE.Vector3;
    reflect?: THREE.Vector3;
};

type RayEvent = {
    api: RayApi;
    direction?: THREE.Vector3;
    intersect: RayIntersect;
    intersects: RayIntersect[];
    normal?: THREE.Vector3;
    object: THREE.Object3D;
    position: THREE.Vector3;
    reflect?: THREE.Vector3;
    stopPropagation: () => void;
};

type RayObject = THREE.Object3D & {
    onRayMove?: (event: RayEvent) => void;
    onRayOut?: (event: RayEvent) => void;
    onRayOver?: (event: RayEvent) => void;
};

function lerp(object: Record<string, number>, prop: string, goal: number, speed = 0.1) {
    object[prop] = THREE.MathUtils.lerp(object[prop], goal, speed);
}

const color = new THREE.Color();

function lerpC(value: THREE.Color, goal: THREE.ColorRepresentation, speed = 0.1) {
    value.lerp(color.set(goal), speed);
}

const vector = new THREE.Vector3();

function lerpV3(value: THREE.Vector3, goal: [number, number, number], speed = 0.1) {
    value.lerp(vector.set(...goal), speed);
}

function calculateRefractionAngle(incidentAngle: number, glassIor = 2.5, airIor = 1.000293) {
    return Math.asin((airIor * Math.sin(incidentAngle)) / glassIor) || 0;
}

function isRayMesh(object: THREE.Object3D): object is RayObject {
    const rayObject = object as RayObject;
    return Boolean((object as THREE.Mesh).isMesh && (rayObject.onRayOver || rayObject.onRayOut || rayObject.onRayMove));
}

function createRayEvent(
    api: RayApi,
    hit: { stopped: boolean },
    intersect: RayIntersect,
    intersects: RayIntersect[],
): RayEvent {
    return {
        api,
        object: intersect.object,
        position: intersect.point,
        direction: intersect.direction,
        reflect: intersect.reflect,
        normal: intersect.face?.normal,
        intersect,
        intersects,
        stopPropagation: () => {
            hit.stopped = true;
        },
    };
}

interface ReflectProps {
    bounce?: number;
    children: React.ReactNode;
    end?: [number, number, number];
    far?: number;
    start?: [number, number, number];
}

const Reflect = forwardRef<RayApi, ReflectProps>(function Reflect(
    { bounce = 10, children, end = [0, 0, 0], far = 100, start = [0, 0, 0] },
    ref,
) {
    const sceneRef = useRef<THREE.Group>(null);
    const bounceLimit = (bounce || 1) + 1;
    const startVector = useMemo(() => new THREE.Vector3(), []);
    const endVector = useMemo(() => new THREE.Vector3(), []);
    const directionVector = useMemo(() => new THREE.Vector3(), []);
    const positionVector = useMemo(() => new THREE.Vector3(), []);

    const api = useMemo<RayApi>(() => {
        const rayApi: RayApi = {
            number: 0,
            objects: [],
            hits: new Map(),
            start: new THREE.Vector3(),
            end: new THREE.Vector3(),
            raycaster: new THREE.Raycaster(),
            positions: new Float32Array(Array.from({ length: (bounceLimit + 10) * 3 }, () => 0)),
            setRay: (nextStart = [0, 0, 0], nextEnd = [0, 0, 0]) => {
                rayApi.start.set(...nextStart);
                rayApi.end.set(...nextEnd);
            },
            update: () => 2,
        };

        rayApi.update = () => {
            rayApi.number = 0;
            const intersects: RayIntersect[] = [];
            startVector.copy(rayApi.start);
            endVector.copy(rayApi.end);
            directionVector.subVectors(endVector, startVector).normalize();
            startVector.toArray(rayApi.positions, rayApi.number++ * 3);

            while (true) {
                rayApi.raycaster.set(startVector, directionVector);
                const intersect = rayApi.raycaster.intersectObjects(rayApi.objects, false)[0] as RayIntersect | undefined;

                if (rayApi.number < bounceLimit && intersect?.face) {
                    intersects.push(intersect);
                    intersect.direction = directionVector.clone();
                    intersect.point.toArray(rayApi.positions, rayApi.number++ * 3);
                    directionVector.reflect(intersect.object.localToWorld(intersect.face.normal).sub(intersect.object.getWorldPosition(positionVector)).normalize());
                    intersect.reflect = directionVector.clone();
                    startVector.copy(intersect.point);
                } else {
                    endVector.addVectors(startVector, directionVector.multiplyScalar(far)).toArray(rayApi.positions, rayApi.number++ * 3);
                    break;
                }
            }

            rayApi.number = 1;
            rayApi.hits.forEach((hit) => {
                if (!intersects.find((intersect) => intersect.object.uuid === hit.key)) {
                    rayApi.hits.delete(hit.key);
                    const object = hit.intersect.object as RayObject;
                    if (object.onRayOut) {
                        invalidate();
                        object.onRayOut(createRayEvent(rayApi, hit, hit.intersect, intersects));
                    }
                }
            });

            for (const intersect of intersects) {
                rayApi.number += 1;
                const object = intersect.object as RayObject;

                if (!rayApi.hits.has(intersect.object.uuid)) {
                    const hit = { key: intersect.object.uuid, intersect, stopped: false };
                    rayApi.hits.set(intersect.object.uuid, hit);
                    if (object.onRayOver) {
                        invalidate();
                        object.onRayOver(createRayEvent(rayApi, hit, intersect, intersects));
                    }
                }

                const hit = rayApi.hits.get(intersect.object.uuid);

                if (hit && object.onRayMove) {
                    invalidate();
                    object.onRayMove(createRayEvent(rayApi, hit, intersect, intersects));
                }

                if (hit?.stopped) {
                    break;
                }

                if (intersect === intersects[intersects.length - 1]) {
                    rayApi.number += 1;
                }
            }

            return Math.max(2, rayApi.number);
        };

        return rayApi;
    }, [bounceLimit, directionVector, endVector, far, positionVector, startVector]);

    useLayoutEffect(() => api.setRay(start, end), [api, end, start]);
    useImperativeHandle(ref, () => api, [api]);

    useLayoutEffect(() => {
        if (!sceneRef.current) {
            return;
        }

        const rayObjects: THREE.Object3D[] = [];
        sceneRef.current.traverse((object) => {
            if (isRayMesh(object)) {
                rayObjects.push(object);
            }
        });
        api.objects.splice(0, api.objects.length, ...rayObjects);
        sceneRef.current.updateWorldMatrix(true, true);
    });

    return <group ref={sceneRef}>{children}</group>;
});

interface BeamProps {
    bounce?: number;
    children: React.ReactNode;
    far?: number;
    position?: [number, number, number];
    stride?: number;
    width?: number;
}

const Beam = forwardRef<RayApi, BeamProps>(function Beam({ bounce, children, far, position, stride = 4, width = 8 }, ref) {
    const streaksRef = useRef<THREE.InstancedMesh>(null);
    const glowRef = useRef<THREE.InstancedMesh>(null);
    const reflectRef = useRef<RayApi>(null);
    const [streakTexture, glowTexture] = useTexture([FLARE_STREAK, BEAM_GLOW]);
    const object = useMemo(() => new THREE.Object3D(), []);
    const from = useMemo(() => new THREE.Vector3(), []);
    const to = useMemo(() => new THREE.Vector3(), []);
    const normal = useMemo(() => new THREE.Vector3(), []);

    useLayoutEffect(() => {
        streaksRef.current?.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        glowRef.current?.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    }, []);

    useFrame(() => {
        const reflect = reflectRef.current;
        const streaks = streaksRef.current;
        const glow = glowRef.current;

        if (!reflect || !streaks || !glow) {
            return;
        }

        const range = reflect.update() - 1;

        for (let i = 0; i < range; i += 1) {
            from.fromArray(reflect.positions, i * 3);
            to.fromArray(reflect.positions, i * 3 + 3);
            normal.subVectors(to, from).normalize();
            object.position.addVectors(from, to).divideScalar(2);
            object.scale.set(to.distanceTo(from) * stride, width, 1);
            object.rotation.set(0, 0, Math.atan2(normal.y, normal.x));
            object.updateMatrix();
            streaks.setMatrixAt(i, object.matrix);
        }

        streaks.count = range;
        streaks.instanceMatrix.needsUpdate = true;

        object.scale.setScalar(0);
        object.updateMatrix();
        glow.setMatrixAt(0, object.matrix);

        for (let i = 1; i < range; i += 1) {
            object.position.fromArray(reflect.positions, i * 3);
            object.scale.setScalar(0.75);
            object.rotation.set(0, 0, 0);
            object.updateMatrix();
            glow.setMatrixAt(i, object.matrix);
        }

        glow.count = range;
        glow.instanceMatrix.needsUpdate = true;
    });

    useImperativeHandle(ref, () => reflectRef.current as RayApi, []);

    const materialConfig = {
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
    } as const;

    return (
        <group position={position}>
            <Reflect ref={reflectRef} bounce={bounce} far={far}>
                {children}
            </Reflect>
            <instancedMesh ref={streaksRef} args={[undefined, undefined, 100]}>
                <planeGeometry />
                <meshBasicMaterial map={streakTexture} opacity={1.5} {...materialConfig} transparent={false} />
            </instancedMesh>
            <instancedMesh ref={glowRef} args={[undefined, undefined, 100]}>
                <planeGeometry />
                <meshBasicMaterial map={glowTexture} {...materialConfig} />
            </instancedMesh>
        </group>
    );
});

type PrismNodeMap = {
    Cone: THREE.Mesh;
};

interface PrismProps {
    onRayMove: (event: RayEvent) => void;
    onRayOut: (event: RayEvent) => void;
    onRayOver: (event: RayEvent) => void;
    position?: [number, number, number];
}

function Prism({ onRayMove, onRayOut, onRayOver, position }: PrismProps) {
    const hitMeshRef = useRef<THREE.Mesh>(null);
    const gltf = useLoader(GLTFLoader, PRISM_MODEL) as unknown as { nodes: PrismNodeMap };

    useLayoutEffect(() => {
        if (!hitMeshRef.current) {
            return;
        }

        const rayMesh = hitMeshRef.current as RayObject;
        rayMesh.onRayMove = onRayMove;
        rayMesh.onRayOut = onRayOut;
        rayMesh.onRayOver = onRayOver;

        return () => {
            delete rayMesh.onRayMove;
            delete rayMesh.onRayOut;
            delete rayMesh.onRayOver;
        };
    }, [onRayMove, onRayOut, onRayOver]);

    return (
        <group position={position}>
            <mesh ref={hitMeshRef} visible={false} scale={1.9} rotation={[Math.PI / 2, Math.PI, 0]}>
                <cylinderGeometry args={[1, 1, 1, 3, 1]} />
            </mesh>
            <mesh position={[0, 0, 0.6]} renderOrder={10} scale={2} geometry={gltf.nodes.Cone.geometry}>
                <MeshTransmissionMaterial
                    clearcoat={1}
                    transmission={1}
                    thickness={0.9}
                    roughness={0}
                    anisotropy={0.1}
                    chromaticAberration={1}
                    toneMapped={false}
                />
            </mesh>
        </group>
    );
}

const boxShape = new THREE.Shape();
const boxRadius = 0.1;
boxShape.moveTo(-0.5, -0.5 + boxRadius);
boxShape.lineTo(-0.5, 0.5 - boxRadius);
boxShape.absarc(-0.5 + boxRadius, 0.5 - boxRadius, boxRadius, Math.PI, 0.5 * Math.PI, true);
boxShape.lineTo(0.5 - boxRadius, 0.5);
boxShape.absarc(0.5 - boxRadius, 0.5 - boxRadius, boxRadius, 0.5 * Math.PI, 0, true);
boxShape.lineTo(0.5, -0.5 + boxRadius);
boxShape.absarc(0.5 - boxRadius, -0.5 + boxRadius, boxRadius, 2 * Math.PI, 1.5 * Math.PI, true);
boxShape.lineTo(-0.5 + boxRadius, -0.5);
boxShape.absarc(-0.5 + boxRadius, -0.5 + boxRadius, boxRadius, 1.5 * Math.PI, Math.PI, true);

const boxGeometry = new THREE.BoxGeometry();
const roundedBoxGeometry = new THREE.ExtrudeGeometry(boxShape, { depth: 1, bevelEnabled: false });
roundedBoxGeometry.translate(0, 0, -0.5);
roundedBoxGeometry.computeVertexNormals();

interface BoxProps {
    position: [number, number, number];
    rotation: [number, number, number];
}

function Box(props: BoxProps) {
    const hitMeshRef = useRef<THREE.Mesh>(null);
    const innerRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useLayoutEffect(() => {
        if (!hitMeshRef.current) {
            return;
        }

        const rayMesh = hitMeshRef.current as RayObject;
        rayMesh.onRayOver = () => setHovered(true);
        rayMesh.onRayOut = () => setHovered(false);

        return () => {
            delete rayMesh.onRayOver;
            delete rayMesh.onRayOut;
        };
    }, []);

    useFrame(() => {
        const material = innerRef.current?.material as THREE.MeshStandardMaterial | undefined;
        if (material) {
            lerpC(material.emissive, hovered ? "white" : "#454545", 0.1);
        }
    });

    return (
        <group scale={0.5} {...props}>
            <mesh ref={hitMeshRef} visible={false} geometry={boxGeometry} />
            <mesh ref={innerRef} geometry={roundedBoxGeometry}>
                <meshStandardMaterial color="#333333" toneMapped={false} emissiveIntensity={2} />
            </mesh>
        </group>
    );
}

const RainbowMaterial = shaderMaterial(
    {
        time: 0,
        speed: 1,
        fade: 0.5,
        startRadius: 1,
        endRadius: 0,
        emissiveIntensity: 2.5,
        ratio: 1,
    },
    `varying vec2 vUv;
    void main() {
        vUv = uv;
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * viewMatrix * modelPosition;
    }`,
    `varying vec2 vUv;
    uniform float fade;
    uniform float speed;
    uniform float startRadius;
    uniform float endRadius;
    uniform float emissiveIntensity;
    uniform float time;
    uniform float ratio;

    vec2 mp;
    // ratio: 1/3 = neon, 1/4 = refracted, 1/5+ = approximate white
    vec3 physhue2rgb(float hue, float ratioValue) {
        return smoothstep(vec3(0.0), vec3(1.0), abs(mod(hue + vec3(0.0, 1.0, 2.0) * ratioValue, 1.0) * 2.0 - 1.0));
    }

    vec3 iridescence (float angle, float thickness) {
        float NxV = cos(angle);
        float lum = 0.05064;
        float luma = 0.01070;
        vec3 tint = vec3(0.49639, 0.78252, 0.8723);
        float interf0 = 2.4;
        float phase0 = 1.0 / 2.8;
        float interf1 = interf0 * 4.0 / 3.0;
        float phase1 = phase0;
        float f = (1.0 - NxV) * (1.0 - NxV);
        float interf = mix(interf0, interf1, f);
        float phase = mix(phase0, phase1, f);
        float dp = (NxV - 1.0) * 0.5;
        vec3 hue = mix(physhue2rgb(thickness * interf0 + dp, thickness * phase0), physhue2rgb(thickness * interf1 + 0.1 + dp, thickness * phase1), f);
        vec3 film = hue * lum + vec3(0.9639, 0.78252, 0.18723) * luma;
        return vec3((film * 3.0 + pow(f, 12.0))) * tint;
    }

    float _saturate (float x) {
        return min(1.0, max(0.0, x));
    }

    vec3 _saturate (vec3 x) {
        return min(vec3(1.0, 1.0, 1.0), max(vec3(0.0, 0.0, 0.0), x));
    }

    vec3 bump3y(vec3 x, vec3 yoffset) {
        vec3 y = vec3(1.0, 1.0, 1.0) - x * x;
        y = _saturate(y - yoffset);
        return y;
    }

    vec3 spectral_zucconi6(float w, float t) {
        float x = _saturate((w - 400.0) / 300.0);
        const vec3 c1 = vec3(3.54585104, 2.93225262, 2.41593945);
        const vec3 x1 = vec3(0.69549072, 0.49228336, 0.27699880);
        const vec3 y1 = vec3(0.02312639, 0.15225084, 0.52607955);
        const vec3 c2 = vec3(3.90307140, 3.21182957, 3.96587128);
        const vec3 x2 = vec3(0.11748627, 0.86755042, 0.66077860);
        const vec3 y2 = vec3(0.84897130, 0.88445281, 0.73949448);
        return bump3y(c1 * (x - x1), y1) + bump3y(c2 * (x - x2), y2);
    }

    void main() {
        const vec2 vstart = vec2(0.5, 0.5);
        const vec2 vend = vec2(1.0, 0.5);
        vec2 dir = vstart - vend;
        float len = length(dir);
        float cosR = dir.y / len;
        float sinR = dir.x / len;
        vec2 uv = (mat2(cosR, -sinR, sinR, cosR) * (vUv * vec2(ratio, 1.0) - vec2(0.0, 1.0) - vstart * vec2(1.0, -1.0)) / len);
        float a = atan(uv.x, uv.y) * 10.0;
        float s = uv.y * (endRadius - startRadius) + startRadius;
        float w = (uv.x / s + 0.5) * 300.0 + 400.0 + a;
        vec3 c = spectral_zucconi6(w, time);
        float l = 1.0 - smoothstep(fade, 1.0, uv.y);
        float area = uv.y < 0.0 ? 0.0 : 1.0;
        float brightness = smoothstep(0.0, 0.5, c.x + c.y + c.z);
        vec3 co = c / iridescence(uv.x * 0.5 * 3.14159, 1.0 - uv.y + time / 10.0) / 20.0;
        gl_FragColor = vec4(area * co * l * brightness * emissiveIntensity, 1.0);
        if (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b < 0.01) discard;
        #include <colorspace_fragment>
    }`,
);

interface RainbowMaterialImpl extends THREE.ShaderMaterial {
    emissiveIntensity: number;
    speed: number;
    time: number;
}

interface RainbowProps {
    endRadius?: number;
    fade?: number;
    startRadius?: number;
}

const Rainbow = forwardRef<THREE.Mesh, RainbowProps>(function Rainbow({ endRadius = 0.5, fade = 0.25, startRadius = 0 }, ref) {
    const materialRef = useRef<RainbowMaterialImpl>(null);
    const { height, width } = useThree((state) => state.viewport);
    const length = Math.hypot(width, height) + 1.5;
    const material = useMemo(
        () => {
            const nextMaterial = new RainbowMaterial({ toneMapped: false }) as RainbowMaterialImpl & {
                endRadius: number;
                fade: number;
                ratio: number;
                startRadius: number;
            };

            nextMaterial.fade = fade;
            nextMaterial.startRadius = startRadius;
            nextMaterial.endRadius = endRadius;
            nextMaterial.ratio = 1;

            return nextMaterial;
        },
        [endRadius, fade, startRadius],
    );

    useFrame((_, delta) => {
        if (materialRef.current) {
            materialRef.current.time += delta * materialRef.current.speed;
        }
    });

    return (
        <mesh ref={ref} scale={[length, length, 1]}>
            <planeGeometry />
            <primitive object={material} ref={materialRef} attach="material" />
        </mesh>
    );
});

interface FlareProps {
    renderOrder?: number;
    scale?: number;
    streak?: [number, number, number];
    visible: boolean;
}

const Flare = forwardRef<THREE.Group, FlareProps>(function Flare({ streak = [8, 20, 1], visible, ...props }, ref) {
    const groupRef = useRef<THREE.Group>(null);
    const [streakTexture, dotTexture, glowTexture] = useTexture([FLARE_STREAK, FLARE_DOT, FLARE_GLOW]);
    const config = {
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
    } as const;

    useFrame((state) => {
        groupRef.current?.children.forEach((instance) => {
            instance.position.x = (Math[instance.scale.x > 1 ? "sin" : "cos"]((state.clock.elapsedTime * instance.scale.x) / 2) * instance.scale.x) / 8;
            instance.position.y = (Math[instance.scale.x > 1 ? "cos" : "atan"](state.clock.elapsedTime * instance.scale.x) * instance.scale.x) / 5;
        });
    });

    return (
        <group ref={ref} {...props} visible={visible} dispose={null}>
            <Instances frames={visible ? Infinity : 1}>
                <planeGeometry />
                <meshBasicMaterial map={dotTexture} {...config} />
                <group ref={groupRef}>
                    <Instance scale={0.5} />
                    <Instance scale={1.25} />
                    <Instance scale={0.75} />
                    <Instance scale={1.5} />
                    <Instance scale={2} position={[0, 0, -0.7]} />
                </group>
            </Instances>
            <mesh scale={1}>
                <planeGeometry />
                <meshBasicMaterial map={glowTexture} {...config} opacity={1} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]} scale={streak}>
                <planeGeometry />
                <meshBasicMaterial map={streakTexture} {...config} opacity={1} />
            </mesh>
        </group>
    );
});

function Scene() {
    const [isPrismHit, setIsPrismHit] = useState(false);
    const flareRef = useRef<THREE.Group>(null);
    const ambientRef = useRef<THREE.AmbientLight>(null);
    const spotRef = useRef<THREE.SpotLight>(null);
    const reflectRef = useRef<RayApi>(null);
    const rainbowRef = useRef<THREE.Mesh>(null);
    const vectorRef = useRef(new THREE.Vector3());
    const rayOutTimeoutRef = useRef<number | null>(null);

    const rayOut = useCallback(() => {
        if (rayOutTimeoutRef.current) {
            window.clearTimeout(rayOutTimeoutRef.current);
        }

        rayOutTimeoutRef.current = window.setTimeout(() => {
            setIsPrismHit(false);
            rayOutTimeoutRef.current = null;
        }, 120);
    }, []);
    const rayOver = useCallback((event: RayEvent) => {
        event.stopPropagation();
        if (rayOutTimeoutRef.current) {
            window.clearTimeout(rayOutTimeoutRef.current);
            rayOutTimeoutRef.current = null;
        }
        setIsPrismHit(true);

        const material = rainbowRef.current?.material as RainbowMaterialImpl | undefined;
        if (material) {
            material.speed = 1;
            material.emissiveIntensity = 20;
        }
    }, []);

    useEffect(() => {
        return () => {
            if (rayOutTimeoutRef.current) {
                window.clearTimeout(rayOutTimeoutRef.current);
            }
        };
    }, []);

    const rayMove = useCallback((event: RayEvent) => {
        const { api, direction, normal, position } = event;
        if (!normal || !direction) {
            return;
        }

        vectorRef.current.toArray(api.positions, api.number++ * 3);

        if (flareRef.current) {
            flareRef.current.position.set(position.x, position.y, -0.5);
            flareRef.current.rotation.set(0, 0, -Math.atan2(direction.x, direction.y));
        }

        let angleScreenCenter = Math.atan2(-position.y, -position.x);
        const normalAngle = Math.atan2(normal.y, normal.x);
        const incidentAngle = angleScreenCenter - normalAngle;
        const refractionAngle = calculateRefractionAngle(incidentAngle) * 6;
        angleScreenCenter += refractionAngle;

        if (rainbowRef.current) {
            rainbowRef.current.rotation.z = angleScreenCenter;
        }

        if (spotRef.current) {
            lerpV3(spotRef.current.target.position, [Math.cos(angleScreenCenter), Math.sin(angleScreenCenter), 0], 0.05);
            spotRef.current.target.updateMatrixWorld();
        }
    }, []);

    useFrame((state) => {
        reflectRef.current?.setRay([(state.pointer.x * state.viewport.width) / 2, (state.pointer.y * state.viewport.height) / 2, 0], [0, 0, 0]);

        const rainbowMaterial = rainbowRef.current?.material as RainbowMaterialImpl | undefined;
        if (rainbowMaterial) {
            lerp(rainbowMaterial as unknown as Record<string, number>, "emissiveIntensity", isPrismHit ? 2.5 : 0, 0.1);

            if (spotRef.current) {
                spotRef.current.intensity = rainbowMaterial.emissiveIntensity;
            }
        }

        if (ambientRef.current) {
            lerp(ambientRef.current as unknown as Record<string, number>, "intensity", 0, 0.025);
        }
    });

    return (
        <>
            <ambientLight ref={ambientRef} intensity={0} />
            <pointLight position={[10, -10, 0]} intensity={0.05 * Math.PI} decay={0} />
            <pointLight position={[0, 10, 0]} intensity={0.05 * Math.PI} decay={0} />
            <pointLight position={[-10, 0, 0]} intensity={0.05 * Math.PI} decay={0} />
            <spotLight ref={spotRef} intensity={Math.PI} decay={0} distance={7} angle={1} penumbra={1} position={[0, 0, 1]} />

            <Center top bottom position={[0, 2, 0]}>
                <Text3D size={0.7} letterSpacing={-0.05} height={0.05} font={PRISM_TITLE_FONT}>
                    Where is the future of bitcoin?
                    <meshStandardMaterial color="white" />
                </Text3D>
            </Center>

            <Beam ref={reflectRef} bounce={10} far={20}>
                <Prism position={[0, -0.5, 0]} onRayOver={rayOver} onRayOut={rayOut} onRayMove={rayMove} />
                <Box position={[2.25, -3.5, 0]} rotation={[0, 0, Math.PI / 3.5]} />
                <Box position={[-2.5, -2.5, 0]} rotation={[0, 0, Math.PI / 4]} />
                <Box position={[-3, 1, 0]} rotation={[0, 0, Math.PI / 4]} />
            </Beam>

            <Rainbow ref={rainbowRef} startRadius={0} endRadius={0.5} fade={0} />
            <Flare ref={flareRef} visible={isPrismHit} renderOrder={10} scale={1.25} streak={[12.5, 20, 1]} />
        </>
    );
}

function PrismFutureCanvas() {
    const texture = useLoader(LUTCubeLoader, LUT_URL);

    return (
        <Canvas orthographic gl={{ antialias: false }} camera={{ position: [0, 0, 100], zoom: 70 }}>
            <color attach="background" args={["black"]} />
            <Scene />
            <EffectComposer enableNormalPass={false}>
                <Bloom mipmapBlur levels={9} intensity={1.5} luminanceThreshold={1} luminanceSmoothing={1} />
                <LUT lut={texture} />
            </EffectComposer>
        </Canvas>
    );
}

export function PrismFuturePage() {
    useEffect(() => {
        const previousBodyOverflow = document.body.style.overflow;
        const previousHtmlOverflow = document.documentElement.style.overflow;
        const previousBodyBackground = document.body.style.backgroundColor;

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.body.style.backgroundColor = "#000000";

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
            document.body.style.backgroundColor = previousBodyBackground;
        };
    }, []);

    return (
        <main className={styles.page}>
            <nav className={styles.nav}>
                <Link href="/detailPage/10?fromProject=10">Back</Link>
                <span>Bitcoin / Prism</span>
            </nav>
            <div className={styles.canvas}>
                <PrismFutureCanvas />
            </div>
        </main>
    );
}
