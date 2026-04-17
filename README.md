# Chivalry Portfolio

一个基于 Next.js App Router 的个人作品集网站，首页采用沉浸式卡片轮播，详情页用于展示单个项目的扩展内容。项目数据集中维护在 `src/data/projects.ts`，静态图片统一放在 `public/images` 下，方便持续新增作品、替换陈列图和维护详情页素材。

## 技术栈

- Next.js 16.2.4
- React 19
- TypeScript
- CSS Modules
- React Three Fiber / Drei

## 项目结构

```text
src
├─ app
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ displayPage/page.tsx
│  ├─ detailPage/[id]/page.tsx
│  └─ project/[id]/page.tsx
├─ components
│  ├─ home
│  │  ├─ ProjectCard.tsx
│  │  ├─ ProjectChrome.tsx
│  │  ├─ ProjectProgress.tsx
│  │  └─ ProjectStack.tsx
│  ├─ project
│  │  ├─ bitcoin
│  │  ├─ monolith
│  │  ├─ swiss
│  │  ├─ ProjectGallery.tsx
│  │  └─ ProjectSidebar.tsx
│  ├─ CrosshairCursor.tsx
│  ├─ Model3D.tsx
│  └─ ModelViewer.tsx
├─ data
│  └─ projects.ts
├─ hooks
│  └─ useProjectCarousel.ts
├─ lib
│  └─ projects.ts
└─ types
   └─ project.ts
```

## 本地开发

```bash
npm install
npm run dev
```

默认启动在 [http://localhost:3003](http://localhost:3003)。

## 如何新增项目

核心只需要维护一个数据源：`src/data/projects.ts`。

每个项目遵循 `ProjectData` 结构：

```ts
{
  id: 5,
  title: "New Project",
  year: "2026",
  category: "UX Design",
  color: "#3e1c1c",
  imagePlaceholder: "NP",
  src: "/images/projects/new-project/cover.png",
  description: "Short intro",
  content: "Optional long text",
  detailImages: [
    "/images/projects/new-project/intro.png",
    "/images/projects/new-project/detail.png"
  ]
}
```

新增步骤：

1. 在 `public/images/projects/<project-slug>/` 下创建项目图片目录。
2. 把项目封面图、介绍图和详情图都放到该目录，不要放在项目根目录。
3. 在 `src/data/projects.ts` 追加一条新项目数据。
4. 确保 `id` 唯一，图片路径可访问。
5. 如需使用 Swiss 风格详情页，设置 `template: "swiss-case"` 并补全 `caseStudy` 字段。

## 导航行为

- 陈列页地址会携带当前项目：`/displayPage?project=<id>`。
- 从陈列卡片进入详情页时，会携带来源项目：`/detailPage/<id>?fromProject=<id>`。
- 详情页左上角 `WORKS` 会返回来源项目对应的陈列位置，而不是总是回到第一个项目。
- `/project/[id]` 仍保留为兼容入口，会重定向到 `/detailPage/[id]`。

## 当前维护点

- 首页轮播逻辑集中在 `src/hooks/useProjectCarousel.ts`。
- 首页固定 UI、进度条、项目卡片拆成 `src/components/home` 下的独立组件。
- 项目数据类型定义在 `src/types/project.ts`，并通过 `src/lib/projects.ts` 提供统一访问方法。
- 通用详情页使用 `ProjectGallery` 和 `ProjectSidebar`，研究/叙事类项目可使用专门模板组件。
- `public/images/projects/hyacinth/Hyacinth-intro.png` 用作 Hyacinth 详情介绍图。
- `public/images/projects/soa/SOA-display.png` 用作联盟链论文项目的陈列与详情主图。

## 可用命令

```bash
npm run dev
npm run build
npm run lint
```
