import React, { useEffect } from 'react';
import { Project, techIcons } from '../hooks/useProjects';
import { useI18n } from '../hooks/useI18n';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const { refreshTranslations } = useI18n();
  
  // Apply translations when modal opens with project data
  useEffect(() => {
    if (isOpen && project) {
      // Short delay to ensure DOM is ready
      setTimeout(() => {
        refreshTranslations();
      }, 50);
    }
  }, [isOpen, project, refreshTranslations]);
  
  // Add Escape key event listener
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!project || !isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden p-4 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop with click handler */}
      <div className="absolute inset-0 bg-darker/80 backdrop-blur-sm"></div>
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-4xl mx-auto max-h-[94vh] bg-dark/95 rounded-2xl border border-primary/20 shadow-xl backdrop-blur-md"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 text-light/60 hover:text-primary transition-colors z-10"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 max-h-[90vh] modal-content">
          {/* Image */}
          <div 
            className="aspect-video rounded-lg overflow-hidden mt-5" 
            style={{ backgroundColor: project.color || '#1e293b' }}
          >
            <img 
              src={project.image} 
              alt={project.id} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="mt-6">
            <h2 
              className="text-2xl md:text-3xl font-bold text-primary mb-4" 
              data-i18n={`projects.${project.id}.title`}
            >
              {project.id}
            </h2>
            
            <p 
              className="text-light text-base md:text-lg mb-6" 
              data-i18n={`projects.${project.id}.description`}
            >
              Project description
            </p>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-3 mb-6">
              {project.technologies.map((tech, index) => (
                <div 
                  key={index}
                  className="tooltip text-xl md:text-2xl" 
                  title={tech}
                  dangerouslySetInnerHTML={{ __html: techIcons[tech] || tech }}
                />
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {project.github && (
                <a 
                  href={project.github} 
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Github
                </a>
              )}
              
              {project.demo && (
                <a 
                  href={project.demo}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span data-i18n="projects.btn">Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;