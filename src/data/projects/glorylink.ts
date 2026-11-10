import { glorylinkCard } from '@/data/cards';
import type { Project } from '@/types/project';

export const project = {
  ...glorylinkCard,
  description:
    '耀临工作室（GloryLink）是一家基于《我的世界》（Minecraft）游戏生态的 UGC 游戏工作室，创立于2015年秋，系列原创游戏作品社区累计下载量超 1200 万。A Minecraft-based UGC game studio with over 12 million cumulative community downloads across its original series.',
  template: 'swiss-case',
  useLightFrame: true,
  isBilingual: true,
  caseStudy: {
    eyebrow: 'Minecraft UGC / 12M+ Downloads',
    headline:
      'GloryLink Studio: Minecraft UGC Game Works\n耀临工作室：基于《我的世界》生态的UGC游戏创作',
    deck: 'GloryLink is a Minecraft UGC game studio founded in Autumn 2015. Creating original narrative maps, custom gameplay mechanics, and voxel worlds, its series works have achieved over 12 million community downloads.\n耀临工作室（GloryLink）创立于2015年秋，是一家深耕《我的世界》（Minecraft）生态的 UGC 游戏工作室。团队专注于原创叙事地图、独立玩法机制与体素世界构建，系列作品在各大游戏社区累计下载量突破 1200 万次，深受海量玩家喜爱。',
    accent: '#d97706',
    repoPath: 'GloryLink UGC Studio / Minecraft Ecosystem',
    imageFit: 'contain',
    isBilingual: true,
    useLightFrame: true,
    metrics: [
      { label: 'Downloads\n社区下载量', value: '12,000,000+\n超1200万' },
      { label: 'Ecosystem\n依托生态', value: 'Minecraft\n我的世界' },
      { label: 'Creation Mode\n创作范式', value: 'UGC Studio\n创作者工坊' },
      { label: 'Founded\n创立时间', value: 'Autumn 2015\n2015年秋' },
    ],
    sections: [
      {
        kicker: '01 / Studio Inception 工坊创立与生态深耕',
        title:
          'Pioneering UGC game creation inside Minecraft.\n深植沙盒生态，开启 UGC 游戏内容创作。',
        body: 'Founded in 2015, GloryLink Studio leveraged the voxel sandbox architecture of Minecraft to design self-contained interactive games, transitioning from casual building to systematic game production.\n耀临工作室创立于2015年秋，以《我的世界》无限自由度的沙盒体素架构为土壤，将玩家自发探索转化为系统化的游戏体验研发，打通从创意概念、红石/指令开发到场景搭建的完整工坊流水线。',
      },
      {
        kicker: '02 / Gameplay & Narrative 玩法研发与叙事体验',
        title:
          'Balancing sandbox mechanics with authored storytelling.\n兼顾沙盒自由机制与沉浸式关卡叙事。',
        body: 'Developing diverse gameplay archetypes ranging from narrative adventure, puzzle dungeons, to custom multiplayer mechanics, pushing the expressive limits of voxel game design.\n系列作品覆盖剧情冒险、解谜探险、多人对抗与合作生存等多元品类。在受限的体素网格中实现高度沉浸的环境叙事与细腻的机制设计，赋予沙盒世界独特的情感厚度与游玩乐趣。',
      },
      {
        kicker: '03 / Community Scale 社区影响与千万级传播',
        title:
          '12 million downloads building vibrant player resonance.\n1200万次社区下载汇聚庞大玩家社群。',
        body: "The studio's releases gained massive organic traction across gaming forums and creator platforms, accumulating over 12 million downloads and inspiring extensive secondary community creations.\n作品在各大主流游戏社区、论坛及创作者中心引发持续热潮，累计下载量突破 1200 万次。庞大的玩家基数与活跃的二次创作生态，使耀临系列作品成为沙盒 UGC 领域的代表性创作案例之一。",
      },
    ],
    highlights: [
      'Achieved over 12,000,000 cumulative community downloads across studio releases. / 系列作品在玩家社区累计下载量突破 1200 万次。',
      'Built diverse original game portfolios inside the Minecraft sandbox ecosystem. / 基于《我的世界》沙盒生态打造涵盖冒险、解谜与玩法的原创作品矩阵。',
      'Engineered cohesive voxel environments with custom mechanics and authored narratives. / 融合体素美术、机关逻辑与定制化剧本构建沉浸式游玩体验。',
      'Fostered an active creator community with enduring engagement since 2015. / 自2015年创立以来沉淀出极具黏性与创作活力的玩家社区生态。',
    ],
    stack: [
      'Minecraft UGC',
      'Game Design',
      'Level Design',
      'Voxel Art',
      'Command & Redstone',
      'Narrative Design',
      'Community Operations',
    ],
    keywords: [
      '耀临工作室',
      'GloryLink',
      '我的世界',
      'Minecraft UGC',
      '1200万下载',
      'UGC游戏工作室',
      '游戏设计',
      '沙盒创作',
    ],
  },
} satisfies Project;
