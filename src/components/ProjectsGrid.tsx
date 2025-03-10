import React, { useState, useRef, useEffect } from 'react';
import { useProjects, Project } from '../hooks/useProjects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const ProjectsGrid: React.FC = () => {
  const { projects, loading, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Animation with Intersection Observer
  useEffect(() => {
    if (loading || !projectsRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.remove('opacity-0', 'translate-y-5');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }, index * 100); // Staggered animation
        }
      });
    }, { threshold: 0.1 });

    const projectCards = projectsRef.current.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.classList.add('opacity-0', 'translate-y-5', 'transition-all', 'duration-600', 'ease-out');
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [loading, projects]);

  // Refresh translations when projects load
  useEffect(() => {
    if (!loading && projects.length > 0) {
  
    }
  }, [loading, projects]);

  const handleOpenModal = (projectId: string) => {
    const project = projects.find(p => p.id === projectId) || null;
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Delay for animation
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Failed to load projects. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <div 
        ref={projectsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <ProjectCard 
              project={project} 
              onClick={handleOpenModal} 
            />
          </div>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProjectsGrid;