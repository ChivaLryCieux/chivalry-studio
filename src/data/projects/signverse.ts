import { signverseCard } from '@/data/cards';
import type { Project } from '@/types/project';

export const project = {
  ...signverseCard,
  description: 'Signverse/标示界。使用 Uinty 制作',
  detailImages: [
    '/images/projects/signverse/2.webp',
    '/images/projects/signverse/3.webp',
    '/images/projects/signverse/4.webp',
    '/images/projects/signverse/5.webp',
    '/images/projects/signverse/6.webp',
    '/images/projects/signverse/7.webp',
    '/images/projects/signverse/8.webp',
    '/images/projects/signverse/9.webp',
  ],
} satisfies Project;
