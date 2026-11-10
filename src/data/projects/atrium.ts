import { atriumCard } from '@/data/cards';
import type { Project } from '@/types/project';

export const project = {
  ...atriumCard,
  description:
    '基于 DSH（DeepSeek Harness）内核的 Agent 项目，结合 DAG 工作流实现跨平台多智能体协同编排与运行调度。',
  detailImages: [
    '/images/projects/hyacinth/Hyacinth-intro.webp',
    '/images/projects/hyacinth/hyacinth-cover.svg',
  ],
  template: 'swiss-case',
  caseStudy: {
    eyebrow: 'DSH Agent / Multi-agent DAG',
    headline:
      'An AI Agent project powered by the DSH (DeepSeek Harness) core, orchestrating multi-agent systems via DAG workflows.',
    deck: 'Atrium is an AI Agent project built on the DSH (DeepSeek Harness) core. Instead of treating agents as simple chat participants, it leverages DAG-based orchestration to model agent tasks as directed workflow nodes with explicit dependencies, execution order, and reusable patterns across platforms.',
    accent: '#146c5f',
    repoPath: 'https://github.com/ChivaLryCieux',
    imageFit: 'contain',
    metrics: [
      { label: 'Core', value: 'DSH (DeepSeek Harness)' },
      { label: 'Workflow', value: 'DAG' },
      { label: 'Role', value: 'Agent Orchestrator' },
      { label: 'Target', value: 'Cross-platform' },
    ],
    sections: [
      {
        kicker: '01 / DSH Core',
        title:
          'Built on the DSH (DeepSeek Harness) core for reliable agent execution.',
        body: 'Atrium adopts the DeepSeek Harness (DSH) kernel to power its underlying agent reasoning, lifecycle control, and runtime execution, ensuring a robust and extensible harness layer for autonomous task execution.',
      },
      {
        kicker: '02 / DAG orchestration',
        title:
          'Agent work is represented as a directed graph with clear dependencies.',
        body: 'Atrium uses DAG structure to make multi-agent coordination explicit. Each node can represent an agent task, transformation, or decision step, while graph edges define how context and outputs flow through the workflow.',
      },
      {
        kicker: '03 / Cross-platform runtime',
        title:
          'The orchestration surface is designed to travel across desktop and mobile environments.',
        body: 'Packaged as a lightweight cross-platform application, Atrium provides a unified control interface for agent workflows, keeping orchestration logic consistent across supported devices.',
      },
    ],
    highlights: [
      'Built on the DSH (DeepSeek Harness) core for agent runtime execution and lifecycle management.',
      'Uses DAG structure to model agent dependencies, execution order, and data flow.',
      'Coordinates multiple AI agents as a structured workflow instead of a loose group chat.',
      'Supports reusable orchestration patterns for complex AI-assisted tasks.',
      'Targets cross-platform use so the same orchestration logic can run across device contexts.',
    ],
    stack: [
      'DSH (DeepSeek Harness)',
      'Agent Harness',
      'Tauri 2',
      'DAG',
      'Multi-agent orchestration',
      'Cross-platform app',
      'Workflow graph',
      'Task coordination',
    ],
    keywords: [
      'DSH',
      'DeepSeek Harness',
      'Agent项目',
      'AI Harness',
      'DAG',
      '多智能体编排',
      '跨平台应用',
      '工作流图',
    ],
  },
} satisfies Project;
