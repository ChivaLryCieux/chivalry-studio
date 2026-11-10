import type { Project, ProjectId } from '@/types/project';
import { PROJECT_CARDS } from '@/data/cards';
import { project as glorylink } from '@/data/projects/glorylink';
import { project as poetry } from '@/data/projects/poetry';
import { project as textClassification } from '@/data/projects/text-classification';
import { project as quest } from '@/data/projects/quest';
import { project as atrium } from '@/data/projects/atrium';
import { project as solana } from '@/data/projects/solana';
import { project as soa } from '@/data/projects/soa';
import { project as aftermath } from '@/data/projects/aftermath';
import { project as signverse } from '@/data/projects/signverse';
import { project as avoidant } from '@/data/projects/avoidant';
import { project as parametric } from '@/data/projects/parametric';

/**
 * 全量项目数据集 —— 仅服务端组件可导入。
 * 客户端请使用 `@/data/cards` 中的 PROJECT_CARDS。
 */
export const PROJECTS: readonly Project[] = [
  glorylink,
  poetry,
  textClassification,
  quest,
  atrium,
  solana,
  soa,
  aftermath,
  signverse,
  avoidant,
  parametric,
];

export const PROJECT_BY_ID: ReadonlyMap<ProjectId, Project> = new Map(
  PROJECTS.map((project) => [project.id, project])
);

// 数据不变式:详情集必须与卡片集同序同 id
if (
  PROJECTS.length !== PROJECT_CARDS.length ||
  PROJECTS.some((project, index) => project.id !== PROJECT_CARDS[index]?.id)
) {
  throw new Error(
    'PROJECTS 与 PROJECT_CARDS 顺序/id 不一致,请检查 data/projects 与 data/cards。'
  );
}

export function getProjectById(id: ProjectId): Project | undefined {
  return PROJECT_BY_ID.get(id);
}
