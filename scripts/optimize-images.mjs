/**
 * 图片资产管线
 *
 * 扫描 src/data/ 中引用的 `/images/**​.webp` 路径,反推同名源位图
 * (png/jpg/jpeg)并生成 WebP:
 *   - `foo.webp`       — 详情/画廊大图,最长边 ≤ 2048,q82
 *   - `foo-card.webp`  — 3D 环形/堆叠卡用图,最长边 ≤ 1024,q78
 *
 * 已成功转换的源位图会被删除(git 历史仍可追溯);缺失源图时跳过,
 * 因此脚本可重复执行:新增项目放入 png/jpg 后在 data 中引用 .webp
 * 路径,再跑 `pnpm images` 即可。
 */
import { existsSync, statSync } from 'node:fs';
import { readdir, readFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const RASTER_EXTS = ['.png', '.jpg', '.jpeg'];
const CARD_SUFFIX = '-card';

const DETAIL_MAX_WIDTH = 2048;
const CARD_MAX_WIDTH = 1024;
const DETAIL_QUALITY = 82;
const CARD_QUALITY = 78;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

/** 收集 data 文件中引用的 /images/... 静态路径 */
async function collectImageRefs() {
  const refs = new Set();
  for await (const file of walk(DATA_DIR)) {
    if (!/\.tsx?$/.test(file)) {
      continue;
    }
    const text = await readFile(file, 'utf8');
    for (const match of text.matchAll(/['"`](\/images\/[^'"`]+?)['"`]/g)) {
      refs.add(match[1]);
    }
  }
  return refs;
}

function findSourceRaster(basePathNoExt) {
  for (const ext of RASTER_EXTS) {
    const candidate = `${basePathNoExt}${ext}`;
    if (existsSync(path.join(PUBLIC_DIR, candidate))) {
      return candidate;
    }
  }
  return null;
}

async function convert(sourceRel, outRel, maxWidth, quality) {
  const sourceAbs = path.join(PUBLIC_DIR, sourceRel);
  const outAbs = path.join(PUBLIC_DIR, outRel);
  const before = statSync(sourceAbs).size;

  const image = sharp(sourceAbs);
  const { width = 0 } = await image.metadata();
  if (width > maxWidth) {
    image.resize({ width: maxWidth, withoutEnlargement: true });
  }
  await image.webp({ quality }).toFile(outAbs);

  const after = statSync(outAbs).size;
  return { sourceRel, outRel, before, after };
}

async function main() {
  const refs = await collectImageRefs();
  const jobs = new Map();
  const consumedSources = new Set();
  let skippedSvg = 0;

  for (const ref of refs) {
    if (ref.endsWith('.svg')) {
      skippedSvg += 1;
      continue;
    }
    if (!ref.endsWith('.webp')) {
      continue;
    }

    const isCard = ref.endsWith(`${CARD_SUFFIX}.webp`);
    const baseNoExt = ref.slice(1, -'.webp'.length).replace(/-card$/, '');
    const source = findSourceRaster(baseNoExt);
    if (!source) {
      continue; // 已生成过,源图已删除
    }

    consumedSources.add(source);
    jobs.set(ref, {
      source,
      out: ref.slice(1),
      maxWidth: isCard ? CARD_MAX_WIDTH : DETAIL_MAX_WIDTH,
      quality: isCard ? CARD_QUALITY : DETAIL_QUALITY,
    });
  }

  if (jobs.size === 0) {
    console.log('没有待转换的图片引用(或已全部生成)。');
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  for (const { source, out, maxWidth, quality } of jobs.values()) {
    const { before, after } = await convert(source, out, maxWidth, quality);
    totalBefore += before;
    totalAfter += after;
    console.log(
      `  ${out}  ${(before / 1048576).toFixed(2)}MB -> ${(after / 1024).toFixed(0)}KB`
    );
  }

  for (const source of consumedSources) {
    await unlink(path.join(PUBLIC_DIR, source));
  }

  console.log(
    `\n完成 ${jobs.size} 个文件,合计 ${(totalBefore / 1048576).toFixed(1)}MB -> ${(totalAfter / 1048576).toFixed(1)}MB;` +
      `删除 ${consumedSources.size} 个源位图,跳过 ${skippedSvg} 个 SVG 引用。`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
