import type { ProjectCardData, ProjectId } from '@/types/project';

/**
 * 首页轮播视图模型 —— 客户端唯一可安全导入的数据模块。
 * 仅包含卡片展示所需字段,详情文案(caseStudy 等)不进入客户端 bundle。
 *
 * cardSrc 规则:
 *   - 位图封面 → `*-card.webp`(由 `pnpm images` 生成,≤1024w)
 *   - SVG 封面 → 与 src 相同(矢量无需降采样)
 */

export const glorylinkCard = {
  id: 1,
  title: 'GloryLink: Minecraft UGC Studio',
  year: '2015秋',
  category: 'Minecraft UGC / 游戏工作室',
  src: '/images/projects/glorylink/glorylink-cover.svg',
  cardSrc: '/images/projects/glorylink/glorylink-cover.svg',
  cardTitleLines: ['GloryLink', '耀临工作室', '系列作品'],
  award: 'UGC 社区超1200万下载量',
} satisfies ProjectCardData;

export const poetryCard = {
  id: 2,
  title: 'Chant as Lament: Metrical Poetry Practice',
  year: '2018夏',
  category: 'Classical Poetry / 格律诗创作',
  src: '/images/projects/poetry/poetry-cover.svg',
  cardSrc: '/images/projects/poetry/poetry-cover.svg',
  cardTitleLines: ['长歌当哭：', '格律诗创作实践'],
} satisfies ProjectCardData;

export const textClassificationCard = {
  id: 3,
  title: 'Text Classification: From TF-IDF to Pretrained Models',
  year: '2024秋',
  category: 'NLP / 自然语言处理',
  src: '/images/projects/text-classification/text-classification-cover.svg',
  cardSrc: '/images/projects/text-classification/text-classification-cover.svg',
  cardTitleLines: ['文本分类实验', '从词频统计到', '预训练模型'],
} satisfies ProjectCardData;

export const questCard = {
  id: 4,
  title: 'Quest',
  year: '2025夏',
  category: 'Quant Trading Framework',
  src: '/images/projects/quidem/quidem-cover.svg',
  cardSrc: '/images/projects/quidem/quidem-cover.svg',
  cardTitleLines: ['Quest', 'CTA系统', '量化分析与算法交易'],
} satisfies ProjectCardData;

export const atriumCard = {
  id: 5,
  title: 'Atrium',
  year: '2025冬',
  category: 'DAG Multi-agent Orchestration',
  src: '/images/projects/hyacinth/hyacinth-cover.svg',
  cardSrc: '/images/projects/hyacinth/hyacinth-cover.svg',
  cardTitleLines: ['Atrium', '智役中庭', 'Agent Harness'],
} satisfies ProjectCardData;

export const solanaCard = {
  id: 6,
  title: 'Solana Private Fork Economics',
  year: '2026春',
  category: 'Blockchain R&D',
  src: '/images/projects/solana/solana-cover.svg',
  cardSrc: '/images/projects/solana/solana-cover.svg',
  cardTitleLines: ['Solana', '区块链私有硬分叉实验'],
} satisfies ProjectCardData;

export const soaCard = {
  id: 7,
  title: 'Consortium Blockchain for SOA Governance',
  year: '2026春',
  category: 'Paper / 论文研究',
  src: '/images/projects/soa/SOA-display.webp',
  cardSrc: '/images/projects/soa/SOA-display-card.webp',
  cardTitleLines: ['联盟链', '国有资产治理'],
  coverPosition: 'top',
} satisfies ProjectCardData;

export const aftermathCard = {
  id: 8,
  title: 'Aftermath: 残响',
  year: '2025冬',
  category: 'Game Design',
  src: '/images/projects/aftermath/aftermath-cover.webp',
  cardSrc: '/images/projects/aftermath/aftermath-cover-card.webp',
} satisfies ProjectCardData;

export const signverseCard = {
  id: 9,
  title: 'Signverse：联觉理论下的多模态叙事游戏',
  year: '2026春',
  category: 'Game Design',
  src: '/images/projects/signverse/1.webp',
  cardSrc: '/images/projects/signverse/1-card.webp',
  cardTitleLines: ['Signverse:', '标示界'],
  award: '2026腾讯光子游戏大赛铜奖',
} satisfies ProjectCardData;

export const avoidantCard = {
  id: 10,
  title: 'Avoidant Syndrome',
  year: '2026夏',
  category: 'Game Design',
  src: '/images/projects/avoidant/AS_Cover.webp',
  cardSrc: '/images/projects/avoidant/AS_Cover-card.webp',
  cardTitleLines: ['Avoidant', 'Syndrome:', '回避症候'],
  award: '2026网易MG挑战赛最佳人气奖',
} satisfies ProjectCardData;

export const parametricCard = {
  id: 11,
  title: 'Parametric Design Practice',
  year: '2026春',
  category: 'Computational Design / 参数化设计',
  src: '/images/projects/parametric/PD_Cover.webp',
  cardSrc: '/images/projects/parametric/PD_Cover-card.webp',
  cardTitleLines: ['数据映射 &', '参数化设计实践'],
} satisfies ProjectCardData;

/** 轮播顺序即本数组顺序 —— 新增项目时保持与 data/projects/ 一致 */
export const PROJECT_CARDS: readonly ProjectCardData[] = [
  glorylinkCard,
  poetryCard,
  textClassificationCard,
  questCard,
  atriumCard,
  solanaCard,
  soaCard,
  aftermathCard,
  signverseCard,
  avoidantCard,
  parametricCard,
];

export const PROJECT_CARD_INDEX: ReadonlyMap<ProjectId, number> = new Map(
  PROJECT_CARDS.map((card, index) => [card.id, index])
);
