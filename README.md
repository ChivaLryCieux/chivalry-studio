# Chivalry Studio Portfolio (v3.0.0)

[![Next.js](https://img.shields.io/badge/Next.js-16.4.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.1-blue?style=flat-square&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.187-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.x%20tsgo-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-11.7.0-F69220?style=flat-square&logo=pnpm)](https://pnpm.io/)

一个基于 **Next.js 16 (App Router)**、**React 19** 与 **React Three Fiber (Three.js)** 构建的高性能个人跨学科设计与研发作品集系统。

---

## 🌟 核心特性 (v3.0.0)

### 1. 3D 环形曲面与 2D 堆叠双模展厅
- **3D 环形曲面空间 (`ProjectRing3D`)**：利用 React Three Fiber + 自定义弯曲网格几何体（Bent Plane Geometry）构建空间 3D 环形画廊，支持惯性阻尼转动与多光源光影材质联动。
- **3D 聚焦缩放系统**：普通状态下贴图 UV 保持 1:1 完整映射，不裁切任何边框与文字细节；聚焦与悬停时卡片网格进行整体三维平滑等比放大（Scale Up 16%），视觉冲击力与信息完整度兼具。
- **2D 经典堆叠 (`ProjectStack`)**：移动端自适应平滑堆叠滑块，支持触控滑动切换与进度条联动。
- **一键双模平滑切换**：点击 Logo 即可在 3D 环形和 2D 堆叠陈列之间自由切换。

### 2. 瑞士国际主义风格详情页 (`SwissProjectPage`)
- **严谨网格排版**：遵循瑞士平面设计风格（International Typographic Style），采用非对称版面、大字号排版层级与高密度工程化参数指标栏。
- **中英双语对照系统 (`isBilingual`)**：支持中英文逐段对照展现理论研究、工程架构与仿真数据。
- **浅色画框自适应 (`useLightFrame`)**：完美适配米白底色矢量封面与高清渲染图，提供如画册般的典雅阅读质感。

### 3. 月桂获奖徽章体系 (`ProjectAwardBadge`)
- **经典对称月桂叶矢量子系统**：纯矢量贝塞尔曲线绘制的国际大奖月桂（Laurel Wreath）图标。
- **全局自动化双端渲染**：
  - **首页顶栏**：轮播切换至获奖项目时，居中主标题下方自动展开香槟金月桂勋章。
  - **详情页面**：在项目主标题下方自动居中呈现带有月桂叶环抱的权威奖项。

---

## 📂 项目矩阵与时间线 (Project Matrix)

当前版本共收录并完整组织了 11 个跨学科代表性作品：

| 序号 | 项目名称 | 年份 | 门类领域 | 详情模板 | 特色标签 / 奖项 |
| :---: | :--- | :---: | :--- | :---: | :--- |
| **#01** | **GloryLink: Minecraft UGC Studio** | 2015秋 | Minecraft UGC / 游戏工作室 | 瑞士风格 | 🏆 **UGC 社区超1200万下载量** |
| **#02** | **长歌当哭：格律诗创作实践** | 2018夏 | Classical Poetry / 格律诗创作 | 瑞士风格 | 声律美学 · 米白瑞士底图 |
| **#03** | **文本分类实验：从词频统计到预训练模型** | 2024秋 | NLP / 自然语言处理实验 | 瑞士风格 | TF-IDF → CNN/LSTM → BERT |
| **#04** | **Quest** | 2025夏 | Quant Trading Framework | 瑞士风格 | 币安合约 · TUI · Redis 报告系统 |
| **#05** | **Atrium** | 2025冬 | DAG Multi-agent Orchestration | 瑞士风格 | **DSH（DeepSeek Harness）内核 Agent** |
| **#06** | **Solana Private Fork Economics** | 2026春 | Blockchain R&D | 瑞士风格 | 私有硬分叉 · 通胀重设计 · 本地验证网 |
| **#07** | **Consortium Blockchain for SOA Governance** | 2026春 | Paper / 学术论文研究 | 瑞士风格 | 联盟链治理 · 进化博弈 · Mesa 仿真 |
| **#08** | **Aftermath: 具身隐喻与空间诗学** | 2025冬 | Game Design (Unity) | 画廊标准 | 叙事探索 · 空间诗学 |
| **#09** | **Signverse：联觉多模态叙事游戏** | 2026春 | Game Design (Unity) | 画廊标准 | 🏆 **2026腾讯光子游戏大赛铜奖** |
| **#10** | **Avoidant Syndrome: 回避症候** | 2026夏 | Game Design (Unity) | 画廊标准 | 🏆 **2026网易MG挑战赛最佳人气奖** |
| **#11** | **Parametric Design Practice** | 2026 | Computational Design / 参数化设计 | 瑞士风格 | 计算几何 · 拓扑优化 · Grasshopper |

---

## 🛠️ 项目结构

```text
chivalry-studio
├─ public
│  ├─ icons
│  │  ├─ laurel-wreath.svg          # 纯净通用月桂矢量图标
│  │  └─ laurel-award-badge.svg      # 完整电影节/设计奖金勋章版
│  ├─ images
│  │  └─ projects
│  │     ├─ avoidant                 # 回避症候封面与物料
│  │     ├─ glorylink                # 耀临工作室米白瑞士封面
│  │     ├─ hyacinth                 # Atrium 封面与图集
│  │     ├─ parametric               # 参数化设计封面与高清主图
│  │     ├─ poetry                   # 长歌当哭米白瑞士声律封面
│  │     ├─ quidem                   # Quest 量化交易封面与回测图
│  │     ├─ signverse                # 标示界游戏画廊图片
│  │     ├─ soa                      # 国有资产交易联盟链论文主图
│  │     ├─ solana                   # Solana 硬分叉图解
│  │     └─ text-classification      # NLP 文本分类演进封面
│  └─ models
│     └─ Poly-2.glb                  # 展厅中央 3D 浮空多面体模型
├─ scripts
│  ├─ optimize-images.mjs            # 图片管线:源位图 → 双档 WebP(card≤1024w/detail≤2048w)
│  └─ check-assets.mjs               # 资产引用校验(孤儿/缺失检测)
├─ src
│  ├─ app
│  │  ├─ layout.tsx                  # 全局骨架、字体与元数据模板
│  │  ├─ page.tsx                    # 首页(force-static + Suspense)
│  │  ├─ page.module.css             # 首页合成层背景动画
│  │  ├─ project/[id]/page.tsx       # 详情页 canonical(SSG,dynamicParams=false)
│  │  ├─ detailPage/[id]/page.tsx    # 旧路由 → 308 至 /project/[id]
│  │  └─ displayPage/page.tsx        # 旧路由 → 308 至 /
│  ├─ components
│  │  ├─ common
│  │  │  └─ ProjectAwardBadge.tsx    # 标题挂载月桂获奖条组件
│  │  ├─ home
│  │  │  ├─ DisplayPage.tsx          # 展厅主逻辑、URL 同步与资产预载清单
│  │  │  ├─ ProjectChrome.tsx        # 四角 UI、标题与获奖徽章
│  │  │  ├─ ProjectProgress.tsx      # 进度指示器(渐变刻度)
│  │  │  ├─ ProjectRing3D.tsx        # 3D 环形曲面悬浮展厅核心实现
│  │  │  └─ ProjectStack.tsx         # 2D/3D 按设备条件挂载容器
│  │  └─ project
│  │     ├─ WorksBackLink.tsx        # 客户端 fromProject 回退链接
│  │     ├─ ProjectGallery.tsx       # 默认详情画廊
│  │     ├─ ProjectSidebar.tsx       # 默认侧边栏（集成奖项）
│  │     └─ swiss
│  │        ├─ SwissProjectPage.tsx  # 瑞士案例研读模板组件
│  │        └─ swiss-project.module.css
│  ├─ data
│  │  ├─ cards.ts                    # 卡片视图模型(客户端唯一安全入口)
│  │  ├─ index.ts                    # PROJECTS 全集 + ReadonlyMap 查询(仅服务端)
│  │  └─ projects/                   # 每项目一个详情文件(卡片字段复用 cards.ts)
│  ├─ hooks
│  │  ├─ useProjectCarousel.ts       # 轮播索引控制、快捷键与手势
│  │  └─ useMediaQuery.ts            # SSR 安全媒体查询(useSyncExternalStore)
│  ├─ lib
│  │  ├─ carousel.ts                 # 轮播纯函数(循环索引/进度映射)
│  │  ├─ format.ts                   # 序号格式化
│  │  └─ threeUtils.ts               # 几何共享/GLB 预处理缓存/渐变纹理
│  └─ types
│     └─ project.ts                  # 判别联合类型系统(card/detail 分层)
├─ package.json
├─ pnpm-lock.yaml              # 依赖锁定（唯一锁文件）
├─ pnpm-workspace.yaml         # pnpm 设置（allowBuilds 等）
└─ tsconfig.json
```

---

## 💻 本地开发与运行

> 环境要求：Node.js >= 20.9，pnpm 11（仓库已通过 `packageManager` 字段锁定版本，corepack 会自动安装）。
> 依赖统一由 pnpm 管理，请勿再使用 `npm install`。

### 1. 安装依赖
```bash
pnpm install
```

### 2. 启动本地开发服务
```bash
pnpm dev
```
启动后在浏览器访问 [http://localhost:3003](http://localhost:3003)。

### 3. 构建生产版本
```bash
pnpm build
pnpm start
```

### 4. 代码检查与格式化
```bash
pnpm lint          # ESLint（eslint-config-next）
pnpm typecheck     # tsgo 原生类型检查（TypeScript 7，约 3x 提速）
pnpm typecheck:ts6 # 经典 TypeScript 6 检查（与 ESLint 共用同一套类型 API）
pnpm format        # Prettier 写入格式化
pnpm format:check  # 仅检查是否合规
```

> **TypeScript 7 (tsgo) 并行方案**：TS 7 暂未提供 JS 编译器 API，而 `typescript-eslint` 仍依赖该 API。
> 按 TypeScript 官方指引，本项目通过 npm alias 并行安装两个编译器：
> `typescript` → `@typescript/typescript6`（提供 TS 6 API，供 ESLint 与 IDE 使用），
> `@typescript/native` → `typescript@7`（提供原生 `tsc`，即 tsgo）。
> 因此 `tsc` 是 TS 7，`tsc6` 是 TS 6，两者互不冲突。

---

## 📝 如何维护与新增项目

数据按 **卡片/详情两层** 组织:卡片字段进 `src/data/cards.ts`(下发客户端),详情字段进 `src/data/projects/<name>.ts`(仅服务端)。新增项目需三步:

### 1. 在 `src/data/cards.ts` 追加卡片
```ts
export const newProjectCard = {
  id: 12,
  title: "New Project Title",
  year: "2026",
  category: "Game Design / 独立研发",
  src: "/images/projects/new-project/cover.webp",       // ≤2048w
  cardSrc: "/images/projects/new-project/cover-card.webp", // ≤1024w;SVG 封面则与 src 相同
  cardTitleLines: ["New", "Project", "新项目中文名"],
  award: "2026某某大赛金奖",               // 可选:自动激活月桂获奖徽章
  coverPosition: "top",                    // 可选:卡片封面取顶部
} satisfies ProjectCardData;
// 并加入 PROJECT_CARDS 数组(顺序即轮播顺序)
```

### 2. 新建 `src/data/projects/new-project.ts`
```ts
import { newProjectCard } from '@/data/cards';
import type { Project } from '@/types/project';

export const project = {
  ...newProjectCard,
  description: "项目核心简述...",
  detailImages: ["/images/projects/new-project/shot-1.webp"],
  // 画廊模板:省略 template 即可;瑞士模板则必须提供 caseStudy(判别联合约束)
  template: "swiss-case",
  useLightFrame: true,
  isBilingual: true,
  caseStudy: {
    eyebrow: "Field / Subtitle",
    headline: "Main Title\n中文主标题",
    deck: "Overview in English.\n中文概述段落。",
    accent: "#c3182d",
    repoPath: "DOI / GitHub / Lab Path",
    imageFit: "contain",
    metrics: [{ label: "Metric\n指标", value: "85.2%" }],
    sections: [{ kicker: "01 / Architecture 架构", title: "Section.\n标题。", body: "Detail.\n正文。" }],
    highlights: ["核心亮点 1"],
    stack: ["Tech 1"],
    keywords: ["关键词"],
  },
} satisfies Project;
// 并在 src/data/index.ts 的 PROJECTS 中登记(与 cards 同序,否则启动即抛错)
```

### 3. 生成图片资产
把原始 png/jpg 放入 `public/images/projects/<name>/`,在 data 中按 `.webp` / `-card.webp` 引用,然后:
```bash
pnpm images          # 生成双档 WebP 并删除源位图
node scripts/check-assets.mjs   # 校验引用完整、无孤儿文件
```

---

## 📜 导航路由与状态保持

- **来源记忆**：进入详情页时 URL 携带来源参数 `/project/<id>?fromProject=<id>`，点击左上角 `WORKS` 返回时平滑定位至原项目卡片，保持浏览上下文不丢失。
- **旧链接兼容**：`/detailPage/<id>` 与 `/displayPage` 均以 308 永久重定向至 canonical 路由。
- **全静态生成**：首页 `force-static`，详情页 `generateStaticParams` + `dynamicParams = false` 全量 SSG，`fromProject` 由客户端 `useSearchParams` 读取。
- **SEO 与 Metadata**：各动态详情页基于项目数据动态生成 OpenGraph 标签与页面元数据。

---

## ☁️ 部署 (Vercel)

- **包管理器自动识别**：仓库根目录存在 `pnpm-lock.yaml` 且 `package.json` 声明了 `packageManager`，Vercel 会自动改用 pnpm 安装依赖并遵循 `pnpm-lock.yaml` 的锁定版本，无需在项目设置里手动指定。
- **Node 版本**：`engines.node` 要求 `>=20.9.0`（Next.js 16 的最低要求），Vercel 会据此选择满足条件的运行时版本。
- **构建命令**：保持默认 `pnpm build` 即可；`postinstall` 等钩子命令若存在，Vercel 同样以 pnpm 执行。
- **产物**：`next build` 产出静态与动态混合路由，`next start` 用于本地预览生产构建。

---

## 📄 License

Private personal portfolio repository. All rights reserved.
