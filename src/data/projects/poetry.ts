import { poetryCard } from '@/data/cards';
import type { Project } from '@/types/project';

export const project = {
  ...poetryCard,
  description:
    '2018年夏近体格律诗创作实践。在严苛的平仄黏对、押韵声律与对仗工巧的格律框架下，探索抒情与言志的美学张力。A classical Chinese metrical poetry practice exploring regulated verse, tonal phonology, and lyric aesthetics in Summer 2018.',
  template: 'swiss-case',
  useLightFrame: true,
  isBilingual: true,
  caseStudy: {
    eyebrow: 'Classical Poetry / 近体诗与声律实践',
    headline:
      'Chant as Lament: Classical Metrical Poetry Practice\n长歌当哭：格律诗创作实践与声律探索',
    deck: 'A dedicated practice in classical Chinese metrical verse (Regulated Verse and Quatrains) exploring tonal phonology, semantic tension, and lyric expression within rigid poetic forms.\n2018年夏近体格律诗创作实践。在严苛的平仄黏对、押韵声律与对仗工巧的格律框架下，探索言志与抒情的张力，以古典形式承载现代哲思与深沉情感。',
    accent: '#c3182d',
    repoPath: 'Chivalry Studio / Poetry Manuscripts 2018',
    imageFit: 'contain',
    isBilingual: true,
    useLightFrame: true,
    metrics: [
      { label: 'Form\n诗体形式', value: 'Regulated Verse / 律绝' },
      { label: 'Phonology\n音韵依据', value: 'Pingshui Rhyme / 平水韵' },
      { label: 'Timeframe\n创作时期', value: 'Summer 2018 / 2018夏' },
      { label: 'Theme\n核心母题', value: 'Elegiac & Lyric / 抒怀与言志' },
    ],
    sections: [
      {
        kicker: '01 / Metric Discipline 律制与格调',
        title:
          'Strict tonal constraints create aesthetic compression.\n严苛格律约束下的意象压缩与美学凝练。',
        body: 'Adhering to canonical tonal alternation (Ping Ze), rhyme conventions, and parallel couplets. The rigid structural constraints do not limit expression, but rather compress emotion into potent aesthetic rhythm.\n严格遵循近体诗平仄相对、相黏与音韵规范。五言七言的格式约束非但不是束缚，反而使语言在高度自律的声律张力中提纯，形成精谨典雅的音节节律与形式美。',
      },
      {
        kicker: '02 / Couplet Dynamics 对仗与意象',
        title:
          'Syntactic and conceptual parallelism.\n虚实相生、声色互动的偶句对仗艺术。',
        body: 'Exploring semantic contrast and harmony in the middle couplets (Han Lian and Jing Lian). Balancing concrete sensory landscapes with abstract metaphysical reflections.\n颔联与颈联的对仗构型注重词性、词义与声调的对仗工稳。在景与情、虚与实、动与静的互文对照中，拓展诗意空间的纵深与哲理回味。',
      },
      {
        kicker: '03 / Emotional Resonance 咏怀与言志',
        title:
          'Classical lyricism engaging contemporary spirit.\n以古典风骨熔铸现代心绪与时代咏怀。',
        body: 'Drawing upon classical lyric traditions from Qu Yuan and Du Fu while addressing contemporary existential sensibility, transforming personal melancholia into enduring resonance.\n承续屈杜以来的忧患意识与风骨传统，将个体的生命体悟、离索幽思与时代关怀熔铸于篇章之中，达成“长歌当哭、慷慨任气”的情感广度。',
      },
    ],
    highlights: [
      'Authored complete sequences of five-character and seven-character regulated verse. / 完成五言、七言律绝等多首完整近体诗创作组篇。',
      'Rigorous adherence to Pingshui rhyme categories and tonal cadence. / 严循平水韵部与平仄正变格，保证声调和谐与朗诵韵律。',
      'Deep exploration of poetic parallelism across phonetics, syntax, and semantics. / 深入探索字声、词性与意象层面的深层对仗与互文交织。',
      'Harmonized classical aesthetic restraint with acute individual self-expression. / 融合古典含蓄典雅的形式自律与现代个体的深挚情感表达。',
    ],
    stack: [
      '近体诗 (Regulated Verse)',
      '平水韵 (Pingshui Rhyme)',
      '平仄声律 (Tonal Meter)',
      '对仗工巧 (Parallelism)',
      '古典诗学 (Poetics)',
      '格律辞赋 (Rhyme Prose)',
    ],
    keywords: [
      '长歌当哭',
      '格律诗',
      '平仄',
      '近体诗',
      '七律',
      '古典文学',
      '声律美学',
    ],
  },
} satisfies Project;
