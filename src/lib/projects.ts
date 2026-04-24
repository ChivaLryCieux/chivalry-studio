import { projects } from '@/data/projects';

export function getProjects() {
  return projects;
}

export function getProjectById(id: number) {
  return projects.find((project) => project.id === id);
}

export function getProjectProgress(activeIndex: number, totalProjects: number) {
  if (totalProjects <= 1) {
    return 5;
  }

  return (activeIndex / (totalProjects - 1)) * 90 + 5;
}

export function splitProjectTitle(title: string) {
  return title.trim() ? title.split(' ') : ['UNTITLED'];
}
