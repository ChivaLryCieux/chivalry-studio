/**
 * 项目领域模型
 *
 * 分层设计:
 *   - `ProjectCardData`  — 首页轮播视图模型,客户端 bundle 唯一依赖的形状
 *   - `CaseStudy`        — 瑞士案例页内容,仅服务端加载
 *   - `ProjectDetail`    — 判别联合:`template` 决定 caseStudy 是否必填
 *   - `Project`          — 卡片 + 详情的完整形状
 */

export type ProjectId = number;
export type CoverPosition = 'center' | 'top';
export type DisplayTemplate = 'gallery' | 'swiss-case';

/** 首页轮播卡片所需的最小数据 */
export interface ProjectCardData {
  readonly id: ProjectId;
  readonly title: string;
  readonly year: string;
  readonly category: string;
  /** 详情页/OG 大图(≤2048w WebP 或 SVG) */
  readonly src: string;
  /** 3D 环形与 2D 堆叠卡用图(≤1024w WebP;SVG 封面复用 src) */
  readonly cardSrc: string;
  readonly cardTitleLines?: readonly string[];
  readonly award?: string;
  readonly coverPosition?: CoverPosition;
}

export interface CaseStudyMetric {
  readonly label: string;
  readonly value: string;
}

export interface CaseStudySection {
  readonly kicker: string;
  readonly title: string;
  readonly body: string;
}

export interface CaseStudy {
  readonly eyebrow: string;
  readonly headline: string;
  readonly deck: string;
  readonly accent: string;
  readonly repoPath: string;
  readonly metrics: readonly CaseStudyMetric[];
  readonly sections: readonly CaseStudySection[];
  readonly highlights: readonly string[];
  readonly stack: readonly string[];
  readonly keywords?: readonly string[];
  readonly imageFit?: 'cover' | 'contain';
  readonly isBilingual?: boolean;
  readonly useLightFrame?: boolean;
}

interface ProjectDetailBase {
  readonly description?: string;
  readonly content?: string;
  readonly detailImages?: readonly string[];
  readonly isBilingual?: boolean;
  readonly useLightFrame?: boolean;
}

/** 详情字段判别联合 —— swiss-case 模板保证 caseStudy 存在 */
export type ProjectDetail =
  | (ProjectDetailBase & {
      readonly template?: 'gallery';
      readonly caseStudy?: never;
    })
  | (ProjectDetailBase & {
      readonly template: 'swiss-case';
      readonly caseStudy: CaseStudy;
    });

export type Project = ProjectCardData & ProjectDetail;
export type SwissProject = ProjectCardData &
  Extract<ProjectDetail, { template: 'swiss-case' }>;
export type GalleryProject = ProjectCardData &
  Extract<ProjectDetail, { template?: 'gallery' }>;
