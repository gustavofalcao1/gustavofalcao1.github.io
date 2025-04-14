import React from 'react';
import { useI18n } from '../hooks/useI18n';

// Helper function to render expertise items
const renderExpertiseList = (category: string, t: (key: string) => any) => {
  const items = t(`about.sections.expertise.categories.${category}.items`);

  if (!Array.isArray(items)) return null;

  return items.map((skill: string, index: number) => (
    <li key={`${category}-${index}`} className="flex items-center gap-2 text-light group-hover:text-white transition-colors">
      <svg className="w-4 h-4 text-primary group-hover:text-secondary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"/>
      </svg>
      <span>{skill}</span>
    </li>
  ));
};

// Categories for expertise section
const expertiseCategories = ['systems', 'development', 'architecture'] as const;

const About: React.FC = () => {
  const { t, isLoading } = useI18n();

  if (isLoading) return null;

  return (
    <main className="min-h-screen w-full md:pt-24">
      <section className="hero relative flex flex-col md:flex-row items-start justify-center px-4 md:px-6 gap-8 mt-4 lg:mt-12 max-w-7xl mx-auto">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl filter blur-3xl opacity-30" />
        
        {/* Content container */}
        <div className="relative w-full flex flex-col items-start justify-start text-left z-10">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('about.title')}
          </h1>
          
          {/* Bio Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mb-12">
            {[1, 2].map((num) => (
              <div key={`bio-${num}`} className="p-6 rounded-2xl bg-dark/30 backdrop-blur-md border border-primary/10 hover:border-primary/30 transition-all duration-300 group">
                <p className="text-light text-lg group-hover:text-white transition-colors">
                  {t(`about.bio${num}`)}
                </p>
              </div>
            ))}
          </div>

          {/* Expertise Section */}
          <div className="w-full mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-light flex items-center gap-3">
              <span className="h-px flex-grow bg-gradient-to-r from-primary/50 to-transparent" />
              {t('about.sections.expertise.title')}
              <span className="h-px flex-grow bg-gradient-to-l from-primary/50 to-transparent" />
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertiseCategories.map((category) => (
                <div key={category} className="group p-6 rounded-2xl bg-dark/30 backdrop-blur-md border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-medium mb-4 text-primary group-hover:text-secondary transition-colors">
                    {t(`about.sections.expertise.categories.${category}.title`)}
                  </h3>
                  <ul className="space-y-3">
                    {renderExpertiseList(category, t)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Evolution Section */}
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-light flex items-center gap-3">
              <span className="h-px flex-grow bg-gradient-to-r from-primary/50 to-transparent" />
              {t('about.sections.evolution.title')}
              <span className="h-px flex-grow bg-gradient-to-l from-primary/50 to-transparent" />
            </h2>
            
            {[0, 1, 2].map((index) => (
              <div key={`evolution-${index}`} className={`relative ${index > 0 ? 'mt-6' : ''} pl-8 border-l-2 border-primary/30`}>
                <div className="absolute w-4 h-4 -left-[9px] bottom-[65%] animate-pulse">
                  <div className="w-full h-full bg-gradient-to-r from-primary to-secondary" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
                </div>
                <h3 className="text-xl font-medium text-primary">
                  {t(`about.sections.evolution.${index}.position`)}
                </h3>
                <p className="text-light/80">
                  {t(`about.sections.evolution.${index}.period`)}
                </p>
                <p className="text-light/80">
                  {t(`about.sections.evolution.${index}.where`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;