import * as THREE from 'three';

const CARD_WIDTH = 1.64;
const ACTIVE_CARD_SCALE_X = 1.16;
const CARD_GAP = 0.21;
const RING_RADIUS_COMPRESSION = 0.84;
const MIN_RING_RADIUS = 2.55;

export const STAR_GRADIENT_COLORS = {
  black: '#471a14',
  grey: '#a29477',
  red: '#a85835',
  yellow: '#feff65',
};

let sharedCardGeometry: THREE.PlaneGeometry | null = null;

/** 所有环形卡片共享同一弯曲几何实例(参数一致),避免逐卡创建 */
export function getSharedCardGeometry(width: number, height: number) {
  sharedCardGeometry ??= createBentPlaneGeometry(0.1, width, height);
  return sharedCardGeometry;
}

export function createBentPlaneGeometry(radius: number, width = 1, height = 1) {
  const geometry = new THREE.PlaneGeometry(width, height, 32, 16);
  const halfWidth = width * 0.5;
  const left = new THREE.Vector2(-halfWidth, 0);
  const apex = new THREE.Vector2(0, radius);
  const right = new THREE.Vector2(halfWidth, 0);
  const leftToApex = new THREE.Vector2().subVectors(left, apex);
  const apexToRight = new THREE.Vector2().subVectors(apex, right);
  const leftToRight = new THREE.Vector2().subVectors(left, right);
  const circleRadius =
    (leftToApex.length() * apexToRight.length() * leftToRight.length()) /
    (2 * Math.abs(leftToApex.cross(leftToRight)));
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

export function getRingRadius(cardCount: number) {
  if (cardCount < 2) {
    return 3.2;
  }

  const activeCardWidth = CARD_WIDTH * ACTIVE_CARD_SCALE_X;
  const minimumRadius =
    (activeCardWidth + CARD_GAP) / (2 * Math.sin(Math.PI / cardCount));

  return Math.max(MIN_RING_RADIUS, minimumRadius * RING_RADIUS_COMPRESSION);
}

const starGeometryCache = new WeakMap<
  THREE.Object3D,
  { geometries: THREE.BufferGeometry[]; scale: number }
>();

/**
 * GLB 星形模型预处理:克隆几何、按 XZ 平面重算 UV、统一法线,
 * 并求归一化缩放。结果按 scene 实例缓存 —— 同一 GLB 只处理一次。
 */
export function prepareStarModel(scene: THREE.Object3D) {
  const cached = starGeometryCache.get(scene);
  if (cached) {
    return cached;
  }

  const geometries: THREE.BufferGeometry[] = [];

  scene.traverse((child) => {
    if (!('isMesh' in child) || !child.isMesh) {
      return;
    }

    const sourceMesh = child as THREE.Mesh<THREE.BufferGeometry>;
    const geometry = sourceMesh.geometry.clone();
    const position = geometry.attributes.position;
    const bounds = new THREE.Box3().setFromBufferAttribute(
      position as THREE.BufferAttribute
    );
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
    geometries.push(geometry);
  });

  const bounds = new THREE.Box3();
  geometries.forEach((geometry) => {
    geometry.computeBoundingBox();
    if (geometry.boundingBox) {
      bounds.union(geometry.boundingBox);
    }
  });
  const size = bounds.getSize(new THREE.Vector3());
  const maxDimension = Math.max(size.x, size.y, size.z);
  const scale = maxDimension > 0 ? 2 / maxDimension : 1;

  const prepared = { geometries, scale };
  starGeometryCache.set(scene, prepared);
  return prepared;
}

export function createStarGradientTexture() {
  const canvas = document.createElement('canvas');
  const size = 256;
  canvas.width = size;
  canvas.height = size;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;

  return { canvas, texture };
}

export function paintStarGradientTexture(
  canvas: HTMLCanvasElement,
  texture: THREE.CanvasTexture,
  time: number
) {
  const context = canvas.getContext('2d');

  if (!context) {
    return;
  }

  const { height, width } = canvas;
  const drift = (time * 0.045) % 1;
  const gradient = context.createLinearGradient(
    -width * drift,
    0,
    width * (1.25 - drift),
    height
  );

  gradient.addColorStop(0, STAR_GRADIENT_COLORS.black);
  gradient.addColorStop(0.24, STAR_GRADIENT_COLORS.grey);
  gradient.addColorStop(0.52, STAR_GRADIENT_COLORS.red);
  gradient.addColorStop(0.78, STAR_GRADIENT_COLORS.yellow);
  gradient.addColorStop(1, STAR_GRADIENT_COLORS.black);

  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(
    width * 0.66,
    height * 0.36,
    12,
    width * 0.5,
    height * 0.5,
    width * 0.62
  );
  glow.addColorStop(0, 'rgba(254, 255, 101, 0.58)');
  glow.addColorStop(0.32, 'rgba(168, 88, 53, 0.28)');
  glow.addColorStop(1, 'rgba(71, 26, 20, 0)');
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
  texture.needsUpdate = true;
}
