import { avoidantCard } from '@/data/cards';
import type { Project } from '@/types/project';

export const project = {
  ...avoidantCard,
  description:
    'A narrative exploration & atmospheric game built with Unity. In development.',
  content:
    'Avoidant Syndrome is an upcoming narrative and spatial exploration game focusing on embodied metaphors and psychological architecture. Detailed design documents and visual teasers will be unveiled soon.',
} satisfies Project;
