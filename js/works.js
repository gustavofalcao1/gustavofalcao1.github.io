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

const techIcons = {
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

function createProjectModal(project) {
  return `
    <div id="modal-${project.id}" class="fixed inset-0 z-50 hidden overflow-y-auto overflow-x-hidden p-4 flex items-center justify-center">
      <!-- Backdrop with click handler -->
      <div class="absolute inset-0 bg-darker/80 backdrop-blur-sm" onclick="closeProjectModal('${project.id}')"></div>
      
      <!-- Modal -->
      <div class="relative w-full max-w-4xl mx-auto max-h-[94vh] bg-dark/95 rounded-2xl border border-primary/20 shadow-xl backdrop-blur-md">
        <!-- Close button -->
        <button class="absolute top-2 right-2 text-light/60 hover:text-primary transition-colors z-10"  onclick="closeProjectModal('${project.id}')">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <!-- Scrollable content -->
        <div id="modal-content-${project.id}" class="overflow-y-auto p-6 max-h-[90vh] modal-content">
          <!-- Image -->
          <div class="aspect-video rounded-lg overflow-hidden bg-[${project.color}] mt-5">
            <img src="${project.image}" 
                 alt="${project.id}" 
                 class="w-full h-full object-cover">
          </div>

          <!-- Info -->
          <div class="mt-6">
            <h2 class="text-2xl md:text-3xl font-bold text-primary mb-4" 
                data-i18n="projects.${project.id}.title"></h2>
            
            <p class="text-light text-base md:text-lg mb-6" 
               data-i18n="projects.${project.id}.description"></p>
            
            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-3 mb-6">
              ${project.technologies.map(tech => `
                <div class="tooltip text-xl md:text-2xl" title="${tech}">
                  ${techIcons[tech] || tech}
                </div>
              `).join('')}
            </div>

            <!-- Links -->
            <div class="flex flex-wrap gap-4">
              ${project.github ? `
                <a href="${project.github}" 
                   class="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                   target="_blank" rel="noopener">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Github
                </a>
              ` : ''}
              ${project.demo ? `
                <a href="${project.demo}" 
                   class="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                   target="_blank" rel="noopener">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                  <span data-i18n="projects.btn"></span>
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function createProjectCard(project) {
  const techStack = project.technologies
    .map(tech => `
      <div class="tooltip" title="${tech}">
        ${techIcons[tech] || tech}
      </div>
    `).join('');

  return `
    <div class="group relative bg-dark/30 rounded-2xl p-6 border border-primary/10 backdrop-blur-md hover:border-primary/30 transition-all duration-300 cursor-pointer"
         onclick="showProjectDetails('${project.id}')">
      <div class="cursor-pointer" onclick="openProjectModal('${project.id}')">
        <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div class="relative">
          <div class="aspect-video rounded-lg overflow-hidden mb-4 bg-[${project.color}]">
            <img src="${project.image}" alt="${project.id}" class="w-full h-full object-cover transform scale-[1] group-hover:scale-[1.05] transition-transform duration-300">
          </div>
          
          <h3 class="text-xl font-medium mb-2 text-gray-100" data-i18n="projects.${project.id}.title"></h3>
          <div class="flex gap-2 mb-2 text-l">
            ${techStack}
          </div>
          <p class="text-light mb-4" data-i18n="projects.${project.id}.description"></p>
        </div>
      </div>

      <div class="flex gap-3 relative z-10">
        ${project.github ? `
          <a href="${project.github}" 
             class="text-sm text-light hover:text-primary transition-colors" 
             target="_blank" 
             rel="noopener"
             onclick="event.stopPropagation()">
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Github
            </span>
          </a>
        ` : ''}
        ${project.demo ? `
          <a href="${project.demo}" 
             class="text-sm text-light hover:text-primary transition-colors" 
             target="_blank" 
             rel="noopener"
             onclick="event.stopPropagation()">
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
  `;
}

function showProjectDetails(projectId) {
  console.log('Clicked project:', projectId);
  const project = document.querySelector(`[data-project="${projectId}"]`);
  if (project) {
    project.classList.add('fixed', 'inset-0', 'z-50', 'p-4', 'bg-darker/90');
  }
}

function hideProjectDetails(projectId) {
  const project = document.querySelector(`[data-project="${projectId}"]`);
  if (project) {
    project.classList.remove('fixed', 'inset-0', 'z-50', 'p-4', 'bg-darker/90');
  }
}

function openProjectModal(projectId) {
  console.log('Opening modal:', projectId);
  const modal = document.getElementById(`modal-${projectId}`);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeProjectModal(projectId) {
  console.log('Closing modal:', projectId);
  const modal = document.getElementById(`modal-${projectId}`);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

async function renderProjects() {
  const projectsContainer = document.querySelector('.projects .grid');
  const projects = await loadProjects();
  
  if (projectsContainer && projects.length > 0) {
    // Render cards
    projectsContainer.innerHTML = projects.map(project => createProjectCard(project)).join('');
    
    // Render modals
    const modalsContainer = document.createElement('div');
    modalsContainer.innerHTML = projects.map(project => createProjectModal(project)).join('');
    document.body.appendChild(modalsContainer);
    
    if (window.i18n) {
      window.i18n.translatePage();
    }
    
    const projectCards = document.querySelectorAll('.projects .group');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.6s ease-out';
      observer.observe(card);
    });
  }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('fixed')) {
    e.target.classList.add('hidden');
    document.body.style.overflow = '';
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModal = document.querySelector('.fixed:not(.hidden)');
    if (openModal) {
      openModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }
});

window.renderProjects = renderProjects;