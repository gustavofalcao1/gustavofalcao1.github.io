// src/types/project.ts
export interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    topics: string[];
    created_at: string;
    updated_at: string;
    stargazers_count: number;
    forks_count: number;
    private: boolean;
    fork: boolean;
  }
  
  export interface ProjectConfig {
    id: string;
    name?: string;
    description?: string;
    score: number;
    image: string;
    color: string;
    technologies: string[];
    github?: string;
    demo?: string;
    featured?: boolean;
    category?: 'mobile' | 'web' | 'desktop' | 'cli' | 'ai' | 'devtools';
  }
  
  export interface Project extends ProjectConfig {
    stars?: number;
    forks?: number;
    language?: string;
    topics?: string[];
    lastUpdate?: string;
    isFromGitHub?: boolean;
  }
  