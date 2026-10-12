# Chivalry Studio Portfolio (v3.0.0)

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.1-blue?style=flat-square&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.182-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

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
├─ src
│  ├─ app
│  │  ├─ layout.tsx                  # 全局骨架与字体注入
│  │  ├─ page.tsx                    # 首页根入口
│  │  ├─ page.module.css             # 首页与展厅 UI 定位样式
│  │  └─ detailPage/[id]/page.tsx    # 动态静态路由生成与模板分发
│  ├─ components
│  │  ├─ common
│  │  │  ├─ AwardLaurel.tsx          # 可定制月桂勋章组件
│  │  │  └─ ProjectAwardBadge.tsx    # 标题挂载月桂获奖条组件
│  │  ├─ home
│  │  │  ├─ DisplayPage.tsx          # 展厅主逻辑与预加载
│  │  │  ├─ ProjectChrome.tsx        # 四角 UI、标题与获奖徽章
│  │  │  ├─ ProjectProgress.tsx      # 进度指示器
│  │  │  ├─ ProjectRing3D.tsx        # 3D 环形曲面悬浮展厅核心实现
│  │  │  └─ ProjectStack.tsx         # 2D/3D 双模适配容器
│  │  └─ project
│  │     ├─ ProjectGallery.tsx       # 默认详情画廊
│  │     ├─ ProjectSidebar.tsx       # 默认侧边栏（集成奖项）
│  │     └─ swiss
│  │        ├─ SwissProjectPage.tsx  # 瑞士案例研读模板组件
│  │        └─ swiss-project.module.css
│  ├─ data
│  │  └─ projects.ts                 # 全局项目数据唯一真理源 (Single Source of Truth)
│  ├─ hooks
│  │  └─ useProjectCarousel.ts       # 轮播索引控制、快捷键与手势
│  ├─ lib
│  │  └─ projects.ts                 # 数据查询与辅助函数
│  └─ types
│     └─ project.ts                  # ProjectData 类型系统
├─ package.json
└─ tsconfig.json
```

---

## 💻 本地开发与运行

### 1. 安装依赖
```bash
npm install
```

### 2. 启动本地开发服务
```bash
npm run dev
```
启动后在浏览器访问 [http://localhost:3003](http://localhost:3003)。

### 3. 构建生产版本
```bash
npm run build
npm run start
```

### 4. 代码检查与格式化
```bash
npm run lint
npm run format
```

---

## 📝 如何维护与新增项目

所有项目数据统一由 `src/data/projects.ts` 集中管理。

### 1. 标准项目配置模版
```ts
{
  id: 12,
  title: "New Project Title",
  year: "2026",
  category: "Game Design / 独立研发",
  color: "#1a1a2e",
  imagePlaceholder: "NP",
  src: "/images/projects/new-project/cover.jpg",
  cardTitleLines: ["New", "Project", "新项目中文名"],
  award: "2026某某大赛金奖",               // 可选：自动激活月桂获奖徽章
  description: "项目核心简述...",
  detailImages: [
    "/images/projects/new-project/cover.jpg"
  ]
}
```

### 2. 瑞士案例研读模版 (`template: "swiss-case"`)
若需要展示深入的技术报告、学术论文或系统架构分析，可开启瑞士模版：
```ts
{
  template: "swiss-case",
  useLightFrame: true,       // 适用于米白或浅色底色封面
  isBilingual: true,         // 开启中英双语对照
  caseStudy: {
    eyebrow: "Field / Subtitle",
    headline: "Main Title\n中文主标题",
    deck: "Overview in English.\n中文概述段落。",
    accent: "#c3182d",       // 瑞士主题色高亮
    repoPath: "DOI / GitHub / Lab Path",
    imageFit: "contain",
    metrics: [
      { label: "Metric 1\n指标名", value: "85.2%" },
      { label: "Metric 2\n指标名", value: "30 steps" }
    ],
    sections: [
      {
        kicker: "01 / Architecture 架构",
        title: "Section Title.\n章节标题。",
        body: "Detailed section content.\n深入剖析正文。"
      }
    ],
    highlights: ["核心亮点 1", "核心亮点 2"],
    stack: ["Tech 1", "Tech 2"],
    keywords: ["关键词 1", "关键词 2"]
  }
}
```

---

## 📜 导航路由与状态保持

- **来源记忆**：进入详情页时 URL 携带来源参数 `/detailPage/<id>?fromProject=<id>`，点击左上角 `WORKS` 返回时平滑定位至原项目卡片，保持浏览上下文不丢失。
- **SEO 与 Metadata**：各动态详情页基于项目数据动态生成 OpenGraph 标签与页面元数据。

---

## 📄 License

Private personal portfolio repository. All rights reserved.
