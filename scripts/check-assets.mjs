// 校验:data/components 引用的资产都存在,public 中无孤儿文件
import fs from 'node:fs';
import path from 'node:path';

const refs = new Set();
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      walk(p);
    } else if (/\.tsx?$/.test(p)) {
      const t = fs.readFileSync(p, 'utf8');
      for (const m of t.matchAll(
        /['"`](\/(?:images|models|fonts)\/[^'"`]+?)['"`]/g
      )) {
        refs.add(m[1]);
      }
    }
  }
}
walk('src/data');
walk('src/components');

let missing = 0;
for (const r of refs) {
  if (!fs.existsSync(path.join('public', r))) {
    console.log('MISSING:', r);
    missing += 1;
  }
}
console.log(`${refs.size} refs checked, ${missing} missing`);

const used = new Set([...refs].map((r) => r.slice(1)));
const orphans = [];
function walkPub(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      walkPub(p);
    } else {
      orphans.push(p.split(path.sep).join('/'));
    }
  }
}
walkPub('public');
const unused = orphans.filter((f) => !used.has(f.slice('public/'.length)));
console.log('unreferenced files:', unused.length ? unused : 'none');
