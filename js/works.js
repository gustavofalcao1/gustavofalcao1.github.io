// Função para carregar os projetos do JSON
async function loadProjects() {
  try {
    const response = await fetch('data/works.json');
    const data = await response.json();
    return data.projects;
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

// Objeto com os ícones das tecnologias
const techIcons = {
  'React': '<i class="devicon-react-original colored cursor-default"></i>',
  'ReactNavigation': '<i class="devicon-reactnavigation-original colored cursor-default"></i>',
  'Node.js': '<i class="devicon-nodejs-plain colored cursor-default"></i>',
  'MongoDB': '<i class="devicon-mongodb-plain colored cursor-default"></i>',
  'Vue.js': '<i class="devicon-vuejs-plain colored cursor-default"></i>',
  'Express': '<i class="devicon-express-original"></i>',
  'PostgreSQL': '<i class="devicon-postgresql-plain colored cursor-default"></i>',
  'Android': '<i class="devicon-android-plain colored cursor-default"></i>',
  'Apple': '<i class="devicon-apple-plain theme-light:colored cursor-default"></i>',
  'Bootstrap': '<i class="devicon-bootstrap-plain colored cursor-default"></i>',
  'CSS3': '<i class="devicon-css3-plain colored cursor-default"></i>',
  'Django': '<i class="devicon-django-plain colored cursor-default"></i>',
  'Electron': '<i class="devicon-electron-original colored cursor-default"></i>',
  'Firebase': '<i class="devicon-firebase-plain colored cursor-default"></i>',
  'Flask': '<i class="devicon-flask-original colored cursor-default"></i>',
  'Git': '<i class="devicon-git-plain colored cursor-default"></i>',
  'GitHub': '<i class="devicon-github-original colored cursor-default"></i>',
  'GraphQL': '<i class="devicon-graphql-plain colored cursor-default"></i>',
  'Heroku': '<i class="devicon-heroku-original colored cursor-default"></i>',
  'HTML5': '<i class="devicon-html5-plain colored cursor-default"></i>',
  'Java': '<i class="devicon-java-plain colored cursor-default"></i>',
  'JavaScript': '<i class="devicon-javascript-plain colored cursor-default"></i>',
  'Jest': '<i class="devicon-jest-plain colored cursor-default"></i>',
  'jQuery': '<i class="devicon-jquery-plain colored cursor-default"></i>',
  'Kotlin': '<i class="devicon-kotlin-plain colored cursor-default"></i>',
  'Linux': '<i class="devicon-linux-plain theme-light:colored cursor-default"></i>',
  'MySQL': '<i class="devicon-mysql-plain colored cursor-default"></i>',
  'Next.js': '<i class="devicon-nextjs-original-wordmark theme-light:colored cursor-default"></i>',
  'Nginx': '<i class="devicon-nginx-original colored cursor-default"></i>',
  'npm': '<i class="devicon-npm-original-wordmark colored cursor-default"></i>',
  'Pandas': '<i class="devicon-pandas-original colored cursor-default"></i>',
  'Python': '<i class="devicon-python-plain colored cursor-default"></i>',
  'R': '<i class="devicon-r-original colored cursor-default"></i>',
  'Redis': '<i class="devicon-redis-plain colored cursor-default"></i>',
  'Redux': '<i class="devicon-redux-original colored cursor-default"></i>',
  'Sass': '<i class="devicon-sass-original colored cursor-default"></i>',
  'Sketch': '<i class="devicon-sketch-line colored cursor-default"></i>',
  'SQLite': '<i class="devicon-sqlite-plain colored cursor-default"></i>',
  'TensorFlow': '<i class="devicon-tensorflow-original colored cursor-default"></i>',
  'TypeScript': '<i class="devicon-typescript-plain colored cursor-default"></i>',
  'Unity': '<i class="devicon-unity-original colored cursor-default"></i>',
  'Webpack': '<i class="devicon-webpack-plain colored cursor-default"></i>',
  'Windows': '<i class="devicon-windows8-original colored cursor-default"></i>',
  'Wordpress': '<i class="devicon-wordpress-plain colored cursor-default"></i>',
  'Yarn': '<i class="devicon-yarn-plain colored cursor-default"></i>',
  'Zeit': '<i class="devicon-zeit-plain colored cursor-default"></i>',
  'Docker': '<i class="devicon-docker-plain colored cursor-default"></i>',
  'Kubernetes': '<i class="devicon-kubernetes-plain colored cursor-default"></i>',
  'AWS': '<i class="devicon-amazonwebservices-original colored cursor-default"></i>',
  'Azure': '<i class="devicon-azure-plain colored cursor-default"></i>',
  'GoogleCloud': '<i class="devicon-googlecloud-plain colored cursor-default"></i>',
  'DigitalOcean': '<i class="devicon-digitalocean-plain colored cursor-default"></i>',
  'Netlify': '<i class="devicon-netlify-original colored cursor-default"></i>',
  'Vercel': '<i class="devicon-vercel-plain colored cursor-default"></i>',
  'GitHubActions': '<i class="devicon-github-original colored cursor-default"></i>',
  'TravisCI': '<i class="devicon-travisci-plain colored cursor-default"></i>',
  'CircleCI': '<i class="devicon-circleci-plain colored cursor-default"></i>',
  'Jenkins': '<i class="devicon-jenkins-line colored cursor-default"></i>',
  'GitLab': '<i class="devicon-gitlab-plain colored cursor-default"></i>',
  'Bitbucket': '<i class="devicon-bitbucket-original colored cursor-default"></i>',
  'Csharp': '<i class="devicon-csharp-plain colored cursor-default"></i>',
  'Bash': '<i class="devicon-bash-plain theme-light:colored cursor-default"></i>',
  'PowerShell': '<i class="devicon-powershell-plain theme-light:colored cursor-default"></i>',
};

// Função para criar o card do projeto
function createProjectCard(project) {
  const techStack = project.technologies
    .map(tech => `
      <div class="tooltip cursor-default" title="${tech}">
        ${techIcons[tech] || tech}
      </div>
    `).join('');

  return `
    <div class="group relative bg-dark/30 rounded-2xl p-6 border border-primary/10 backdrop-blur-md hover:border-primary/30 transition-all duration-300">
      <div class="relative">
        <!-- Project Image -->
        <div class="aspect-video rounded-lg overflow-hidden mb-4 bg-[${project.color}]">
          <img 
            src="${project.image}" 
            alt="${project.id}" 
            class="w-full h-full object-cover transform scale-[1] group-hover:scale-[1.05] transition-transform duration-300"
          >
        </div>
        
        <!-- Project Info -->
        <h3 class="text-xl font-medium mb-2 text-gray-100" data-i18n="projects.${project.id}.title"></h3>
        <div class="flex gap-2 mb-2 text-l cursor-default flex-wrap">
          ${techStack}
        </div>
        <p class="text-light mb-4" data-i18n="projects.${project.id}.description"></p>
        
        <!-- Project Links -->
        <div class="flex gap-3">
          ${project.github ? `
            <a href="${project.github}" class="text-sm text-light hover:text-primary transition-colors" target="_blank" rel="noopener">
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Github
              </span>
            </a>
          ` : ''}
          ${project.demo ? `
            <a href="${project.demo}" class="text-sm text-light hover:text-primary transition-colors" target="_blank" rel="noopener">
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                <span data-i18n="projects.btn"></span>
              </span>
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

// Função principal para renderizar os projetos
async function renderProjects() {
  try {
    const projectsContainer = document.querySelector('.projects .grid');
    const projects = await loadProjects();

    if (projectsContainer && projects.length > 0) {
      // Ordenar projetos por score
      const sortedProjects = projects.sort((a, b) => b.score - a.score);
      
      // Renderizar os projetos
      projectsContainer.innerHTML = sortedProjects
        .map(project => createProjectCard(project))
        .join('');

      // Traduzir conteúdo
      if (window.i18n) {
        window.i18n.translatePage();
      }

      // Adicionar animação de entrada
      const projectCards = document.querySelectorAll('.projects .group');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, { threshold: 0.1 });

      projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
      });
    }
  } catch (error) {
    console.error('Error rendering projects:', error);
  }
}

// Exportar função para uso global
window.renderProjects = renderProjects;