# Chivalry Portfolio

一个基于 Next.js App Router 的个人作品集网站，首页采用沉浸式卡片轮播，详情页用于展示单个项目的扩展内容。这个版本在不改变现有视觉风格和内容的前提下，重构了项目数据入口、首页组件结构和详情页布局，方便后续持续新增项目。

## 技术栈

- Next.js 16
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
│  └─ project/[id]/page.tsx
├─ components
│  ├─ home
│  │  ├─ ProjectCard.tsx
│  │  ├─ ProjectChrome.tsx
│  │  ├─ ProjectProgress.tsx
│  │  └─ ProjectStack.tsx
│  ├─ project
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

核心只需要维护一个数据源：[src/data/projects.ts](/C:/Users/bb287/WebstormProjects/chivalry/src/data/projects.ts)。

每个项目遵循 `ProjectData` 结构：

```ts
{
  id: 5,
  title: "New Project",
  year: "2026",
  category: "UX Design",
  color: "#3e1c1c",
  imagePlaceholder: "NP",
  src: "/images/5.png",
  description: "Short intro",
  content: "Optional long text",
  detailImages: [
    "/images/projects/5/5-1.png",
    "/images/projects/5/5-2.png"
  ]
}
```

新增步骤：

1. 把项目封面图放到 `public/images/`。
2. 如果有详情图，把它们放到 `public/images/projects/<id>/`。
3. 在 [src/data/projects.ts](/C:/Users/bb287/WebstormProjects/chivalry/src/data/projects.ts) 追加一条新项目数据。
4. 确保 `id` 唯一，图片路径可访问。

## 当前重构点

- 首页轮播逻辑抽离到 `useProjectCarousel`，页面本身只负责组装。
- 首页固定 UI、进度条、项目卡片拆成独立组件，后续更好维护。
- 项目数据类型单独定义，并通过 `src/lib/projects.ts` 提供统一访问方法。
- 详情页拆成图片区和信息区组件，移除了大段内联样式。

## 可用命令

```bash
npm run dev
npm run build
npm run lint
```
