// src/hooks/useProjects.tsx
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Project, GitHubRepo } from '../types/project';
import { manualProjects, projectOverrides, ignoredRepos, technologyMapper } from '../data/projectsConfig';
import { techIcons } from '../lib/icons';

const GITHUB_API = 'https://api.github.com';
const GITHUB_USERNAME = 'gustavofalcao1';

export const useProjects = () => {
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadProjects = useCallback(async () => {
    const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
      try {
        const response = await fetch(
          `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              ...(process.env.REACT_APP_GITHUB_TOKEN ? {
                'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`
              } : {})
            }
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.statusText}`);
        }

        const repos = await response.json();
        
        // Filtrar repositórios
        const filteredRepos = repos.filter((repo: GitHubRepo) => {
          return !repo.private && 
                 !repo.fork && 
                 !ignoredRepos.includes(repo.name) &&
                 (repo.description || projectOverrides[repo.name]?.description);
        });

        // Armazenar em cache
        localStorage.setItem('github_repos_cache', JSON.stringify(filteredRepos));
        localStorage.setItem('github_repos_cache_time', Date.now().toString());
        
        return filteredRepos;
      } catch (err) {
        console.error('Error fetching GitHub repos:', err);
        
        // Tentar usar cache em caso de erro
        const cached = localStorage.getItem('github_repos_cache');
        if (cached) {
          console.warn('Using cached GitHub data due to API error');
          return JSON.parse(cached);
        }
        
        throw err;
      }
    };

    try {
      setLoading(true);
      setError(null);
      
      const repos = await fetchGitHubRepos();
      setGithubRepos(repos);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load projects'));
    } finally {
      setLoading(false);
    }
  }, []);

  // Combinar dados do GitHub com configuração manual
  const projects = useMemo((): Project[] => {
    // Processar repositórios do GitHub
    const githubProjects: Project[] = githubRepos.map(repo => {
      const override = projectOverrides[repo.name] || {};
      
      // Detectar tecnologias automaticamente
      let autoTechnologies: string[] = [];
      if (repo.language && technologyMapper[repo.language]) {
        autoTechnologies = technologyMapper[repo.language];
      }
      
      // Adicionar tecnologias baseadas nos topics
      repo.topics.forEach((topic: string) => {
        const topicMap: Record<string, string> = {
          'react': 'React',
          'react-native': 'React Native',
          'nextjs': 'Next.js',
          'nodejs': 'Node.js',
          'firebase': 'Firebase',
          'mongodb': 'MongoDB',
          'expo': 'Expo',
          'typescript': 'TypeScript'
        };
        
        if (topicMap[topic.toLowerCase()]) {
          autoTechnologies.push(topicMap[topic.toLowerCase()]);
        }
      });

      return {
        id: repo.name,
        name: override.name || repo.name,
        description: override.description || repo.description || '',
        score: override.score || 70, // Score padrão para repos sem override
        image: override.image || '/img/works/default.webp',
        color: override.color || '#6b7280',
        technologies: override.technologies || Array.from(new Set(autoTechnologies)),
        github: repo.html_url,
        demo: override.demo || repo.homepage || repo.html_url,
        category: override.category || 'web',
        featured: override.featured || false,
        // Dados extras do GitHub
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || undefined,
        topics: repo.topics,
        lastUpdate: repo.updated_at,
        isFromGitHub: true
      };
    });

    // Combinar projetos manuais + GitHub
    const allProjects = [...manualProjects, ...githubProjects];

    // Ordenar por score (descendente) e depois por featured
    return allProjects.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.score - a.score;
    });
  }, [githubRepos]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return {
    projects,
    loading,
    error,
    refresh: loadProjects,
    techIcons
  };
};
