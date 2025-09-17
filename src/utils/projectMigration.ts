// src/utils/projectMigration.ts
import { Project } from '../types/project';

/**
 * Utilitário para converter projeto atual (JSON) para nova estrutura
 * Use isso temporariamente durante a migração
 */
export const convertLegacyProject = (legacyProject: any): Project => {
  return {
    id: legacyProject.id,
    score: legacyProject.score,
    image: legacyProject.image,
    color: legacyProject.color,
    technologies: legacyProject.technologies,
    github: legacyProject.github,
    demo: legacyProject.demo,
    category: detectCategory(legacyProject.technologies),
    featured: legacyProject.score >= 90
  };
};

const detectCategory = (technologies: string[]) => {
  if (technologies.includes('React Native') || technologies.includes('Android') || technologies.includes('Apple')) {
    return 'mobile';
  }
  if (technologies.includes('Python') && technologies.some(t => ['TensorFlow', 'OpenAI'].includes(t))) {
    return 'ai';
  }
  if (technologies.includes('Bash') || technologies.includes('PowerShell')) {
    return 'cli';
  }
  if (technologies.includes('Electron') || technologies.includes('Windows')) {
    return 'desktop';
  }
  return 'web';
};
