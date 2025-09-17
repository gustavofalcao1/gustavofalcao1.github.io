// src/data/projectsConfig.ts
import { ProjectConfig } from '../types/project';

// Projetos privados ou controle total
export const manualProjects: ProjectConfig[] = [
  {
    id: 'laick-kernel',
    name: 'LAICK - AI Communication Kernel',
    description: 'Kernel de comunicação IA com alfabeto simbólico compacto',
    score: 95,
    image: '/img/works/laick.webp',
    color: '#6366f1',
    technologies: ['Python', 'TensorFlow', 'Rust', 'Protocol Buffers'],
    category: 'ai',
    featured: true
  },
  {
    id: 'mobile-equipment-app', 
    name: 'Equipment Management Mobile',
    description: 'App móvel para gestão de equipamentos com navegação avançada',
    score: 88,
    image: '/img/works/equipment-app.webp',
    color: '#10b981',
    technologies: ['React Native', 'TypeScript', 'SQLite', 'Expo'],
    category: 'mobile',
    featured: true
  }
];

// Sobrescritas para projetos públicos do GitHub  
export const projectOverrides: Record<string, Partial<ProjectConfig>> = {
  'Cluey-App': {
    score: 92,
    image: '/img/works/project1.webp',
    color: '#00000000',
    technologies: ['React Native', 'Firebase', 'Expo', 'OpenAI'],
    demo: 'https://github.com/gustavofalcao1/Cluey-App',
    category: 'mobile',
    featured: true
  },
  'aircnc': {
    score: 85,
    image: '/img/works/aircnc.webp', 
    color: '#E91E63',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    category: 'web',
    featured: true
  },
  'GameSocial': {
    score: 80,
    image: '/img/works/gamesocial.webp',
    color: '#9C27B0', 
    technologies: ['React Native', 'Firebase', 'Redux'],
    category: 'mobile'
  },
  'geoip-script': {
    score: 75,
    image: '/img/works/geoip.webp',
    color: '#FF9800',
    technologies: ['Bash', 'Shell Script', 'Linux'],
    category: 'cli'
  },
  'MacOs-Workflow': {
    score: 70,
    image: '/img/works/macos-workflow.webp',
    color: '#607D8B',
    technologies: ['AppleScript', 'Automator', 'macOS'],
    category: 'devtools'
  },
  'SambaSetup-CLI': {
    score: 72,
    image: '/img/works/samba-cli.webp',
    color: '#4CAF50',
    technologies: ['Bash', 'Linux', 'Samba', 'Shell Script'],
    category: 'cli'
  },
  'gustavofalcao1.github.io': {
    score: 98,
    image: '/img/works/portfolio.webp',
    color: '#8b5cf6',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    category: 'web',
    featured: true
  }
};

// Repositórios que você quer ignorar
export const ignoredRepos: string[] = [
  'gustavofalcao1', // README repo
  '.github'
];

// Mapeamento de linguagens do GitHub para suas tecnologias
export const technologyMapper: Record<string, string[]> = {
  'JavaScript': ['JavaScript', 'Node.js'],
  'TypeScript': ['TypeScript'],
  'Python': ['Python'],
  'Java': ['Java'],
  'C#': ['Csharp'],
  'Shell': ['Bash', 'Shell Script'],
  'HTML': ['HTML', 'CSS']
};
