import { useState, useEffect } from 'react';

// Define types for better type safety
export interface Project {
  id: string;
  image: string;
  color: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

export const techIcons: Record<string, string> = {
  'React': '<i class="devicon-react-original colored"></i>',
  'ReactNavigation': '<i class="devicon-reactnavigation-original colored"></i>',
  'Node.js': '<i class="devicon-nodejs-plain colored"></i>',
  'MongoDB': '<i class="devicon-mongodb-plain colored"></i>',
  'Vue.js': '<i class="devicon-vuejs-plain colored"></i>',
  'Express': '<i class="devicon-express-original"></i>',
  'PostgreSQL': '<i class="devicon-postgresql-plain colored"></i>',
  'Android': '<i class="devicon-android-plain colored"></i>',
  'Apple': '<i class="devicon-apple-plain theme-light:colored"></i>',
  'Bootstrap': '<i class="devicon-bootstrap-plain colored"></i>',
  'CSS3': '<i class="devicon-css3-plain colored"></i>',
  'Django': '<i class="devicon-django-plain colored"></i>',
  'Electron': '<i class="devicon-electron-original colored"></i>',
  'Firebase': '<i class="devicon-firebase-plain colored"></i>',
  'Flask': '<i class="devicon-flask-original colored"></i>',
  'Git': '<i class="devicon-git-plain colored"></i>',
  'GitHub': '<i class="devicon-github-original colored"></i>',
  'GraphQL': '<i class="devicon-graphql-plain colored"></i>',
  'Heroku': '<i class="devicon-heroku-original colored"></i>',
  'HTML5': '<i class="devicon-html5-plain colored"></i>',
  'Java': '<i class="devicon-java-plain colored"></i>',
  'JavaScript': '<i class="devicon-javascript-plain colored"></i>',
  'Jest': '<i class="devicon-jest-plain colored"></i>',
  'jQuery': '<i class="devicon-jquery-plain colored"></i>',
  'Kotlin': '<i class="devicon-kotlin-plain colored"></i>',
  'Linux': '<i class="devicon-linux-plain theme-light:colored"></i>',
  'MySQL': '<i class="devicon-mysql-plain colored"></i>',
  'Next.js': '<i class="devicon-nextjs-original-wordmark theme-light:colored"></i>',
  'Nginx': '<i class="devicon-nginx-original colored"></i>',
  'npm': '<i class="devicon-npm-original-wordmark colored"></i>',
  'Pandas': '<i class="devicon-pandas-original colored"></i>',
  'Python': '<i class="devicon-python-plain colored"></i>',
  'R': '<i class="devicon-r-original colored"></i>',
  'Redis': '<i class="devicon-redis-plain colored"></i>',
  'Redux': '<i class="devicon-redux-original colored"></i>',
  'Sass': '<i class="devicon-sass-original colored"></i>',
  'Sketch': '<i class="devicon-sketch-line colored"></i>',
  'SQLite': '<i class="devicon-sqlite-plain colored"></i>',
  'TensorFlow': '<i class="devicon-tensorflow-original colored"></i>',
  'TypeScript': '<i class="devicon-typescript-plain colored"></i>',
  'Unity': '<i class="devicon-unity-original colored"></i>',
  'Webpack': '<i class="devicon-webpack-plain colored"></i>',
  'Windows': '<i class="devicon-windows8-original colored"></i>',
  'Wordpress': '<i class="devicon-wordpress-plain colored"></i>',
  'Yarn': '<i class="devicon-yarn-plain colored"></i>',
  'Zeit': '<i class="devicon-zeit-plain colored"></i>',
  'Docker': '<i class="devicon-docker-plain colored"></i>',
  'Kubernetes': '<i class="devicon-kubernetes-plain colored"></i>',
  'AWS': '<i class="devicon-amazonwebservices-original colored"></i>',
  'Azure': '<i class="devicon-azure-plain colored"></i>',
  'GoogleCloud': '<i class="devicon-googlecloud-plain colored"></i>',
  'DigitalOcean': '<i class="devicon-digitalocean-plain colored"></i>',
  'Netlify': '<i class="devicon-netlify-original colored"></i>',
  'Vercel': '<i class="devicon-vercel-plain colored"></i>',
  'GitHubActions': '<i class="devicon-github-original colored"></i>',
  'TravisCI': '<i class="devicon-travisci-plain colored"></i>',
  'CircleCI': '<i class="devicon-circleci-plain colored"></i>',
  'Jenkins': '<i class="devicon-jenkins-line colored"></i>',
  'GitLab': '<i class="devicon-gitlab-plain colored"></i>',
  'Bitbucket': '<i class="devicon-bitbucket-original colored"></i>',
  'Csharp': '<i class="devicon-csharp-plain colored"></i>',
  'Bash': '<i class="devicon-bash-plain theme-light:colored"></i>',
  'PowerShell': '<i class="devicon-powershell-plain theme-light:colored"></i>',
};

/**
 * Custom hook to load and manage projects data
 */
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Load projects from JSON file
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/works.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data.projects);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError(err instanceof Error ? err : new Error('Failed to load projects'));
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    techIcons
  };
};