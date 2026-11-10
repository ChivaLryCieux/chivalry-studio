import { parametricCard } from '@/data/cards';
import type { Project } from '@/types/project';

export const project = {
  ...parametricCard,
  description:
    '探索计算几何、规则生成与拓扑优化的参数化设计实践。An exploratory computational and parametric design practice focusing on generative forms and algorithmic architecture.',
  template: 'swiss-case',
  useLightFrame: true,
  isBilingual: true,
  caseStudy: {
    eyebrow: 'Computational Design / 参数化实践',
    headline:
      'Parametric Design Practice: Algorithmic Form & Computational Geometry\n参数化设计实践：算法形式与计算几何探索',
    deck: 'A research and design practice investigating rule-based morphogenesis, computational geometry, and algorithmic generative design.\n聚焦规则生成、拓扑关系与参数驱动形式的计算设计实践，探索算法逻辑与空间几何在数字建造维度的融合表达。',
    accent: '#0284c7',
    repoPath: 'Chivalry Studio / Parametric Design Lab',
    imageFit: 'contain',
    isBilingual: true,
    metrics: [
      { label: 'Design Method\n设计方法', value: 'Algorithmic / 参数驱动' },
      { label: 'Core Toolchain\n核心工具链', value: 'Rhino / GH / Python' },
      { label: 'Geometry Logic\n几何逻辑', value: 'NURBS & Mesh' },
      { label: 'Status\n阶段', value: 'In Progress / 实践中' },
    ],
    sections: [
      {
        kicker: '01 / Generative Logic 规则生成',
        title:
          'From static drafting to algorithmic logic.\n从静态图面到算法驱动的动态生成系统。',
        body: 'The practice explores parametric modeling driven by mathematical functions, field forces, and cellular automata, translating conceptual constraints into dynamic topological structures.\n实践围绕数学函数、力场引导与生长规则展开，将概念约束转化为自适应拓扑形体，建立输入参数与复杂几何的直接反馈回路。',
      },
      {
        kicker: '02 / Computational Geometry 计算几何',
        title:
          'Precise control of curvature, subdivision, and rationalization.\n曲率连续性、网格细分与构建合理化控制。',
        body: 'Employing mesh relaxation, developable surface analysis, and panel rationalization to bridge computational abstraction with material fabrication constraints.\n引入网格松弛、可展开曲面剖析与嵌板有理化算法，使复杂的流体曲面与离散单元在满足力学与制作规范的前提下达到形式与结构的平衡。',
      },
      {
        kicker: '03 / Digital Iteration 数字化迭代',
        title:
          'Performance-oriented multi-objective optimization.\n面向性能与环境的多元目标优化迭代。',
        body: 'Integrating structural analysis and environmental simulation into parametric loops to automate performance feedback and structural material distribution.\n将环境采光、受力分析等模拟引擎嵌入参数化工作流闭环中，通过多目标遗传算法实现基于性能反馈的设计演化。',
      },
    ],
    highlights: [
      'Constructed algorithmic pipelines connecting mathematical rules to spatial geometries. / 构建连接数学规则与三维空间拓扑的生成管线。',
      'Explored multi-parameter dynamic form-finding and topological relaxation. / 探索多参数动态形态寻优与拓扑松弛算法。',
      'Rationalized freeform surfaces for panelization and digital fabrication. / 针对离散嵌板制造对复杂曲面进行有理化拆解与优化。',
      'Integrated performance-based simulation feedback into design generation. / 将性能仿真与环境约束深度集成至参数化迭代闭环。',
    ],
    stack: [
      'Grasshopper',
      'Rhino 8',
      'Python',
      'Kangaroo',
      'Computational Geometry',
      'Topology Optimization',
      'Parametric Modeling',
    ],
    keywords: [
      '参数化设计',
      '计算几何',
      '算法生成',
      '拓扑优化',
      'Grasshopper',
      '形态寻优',
      '数字建造',
    ],
  },
} satisfies Project;
