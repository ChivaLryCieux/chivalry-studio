import { aftermathCard } from '@/data/cards';
import type { Project } from '@/types/project';

export const project = {
  ...aftermathCard,
  description: 'A Game Built with Unity.',
  detailImages: [
    '/images/projects/aftermath/aftermath-2.webp',
    '/images/projects/aftermath/aftermath-3.webp',
    '/images/projects/aftermath/aftermath-4.webp',
    '/images/projects/aftermath/aftermath-5.webp',
    '/images/projects/aftermath/aftermath-6.webp',
    '/images/projects/aftermath/aftermath-7.webp',
    '/images/projects/aftermath/aftermath-8.webp',
    '/images/projects/aftermath/aftermath-9.webp',
  ],
} satisfies Project;
