import React, { useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';

const About: React.FC = () => {
  const { refreshTranslations } = useI18n();
  
  useEffect(() => {
    refreshTranslations();
  }, [refreshTranslations]);
  
  return (
    <main className="min-h-screen w-full lg:pt-24 mb-20">
      <section className="hero relative flex flex-col md:flex-row items-start justify-center px-4 md:px-6 gap-8 mt-4 lg:mt-12 max-w-7xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl filter blur-3xl opacity-30"></div>
        
        <div className="relative w-full flex flex-col items-start justify-start text-left z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 animate-gradient bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%] bg-clip-text text-transparent" data-i18n="about.title">Who am I?</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mb-12">
            <div className="p-6 rounded-2xl bg-dark/30 backdrop-blur-md border border-primary/10 hover:border-primary/30 transition-all duration-300 group">
              <p data-i18n="about.bio1" className="text-light text-lg group-hover:text-white transition-colors"></p>
            </div>
            <div className="p-6 rounded-2xl bg-dark/30 backdrop-blur-md border border-primary/10 hover:border-primary/30 transition-all duration-300 group">
              <p data-i18n="about.bio2" className="text-light text-lg group-hover:text-white transition-colors"></p>
            </div>
          </div>

          <div className="w-full mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-light flex items-center gap-3">
              <span className="h-px flex-grow bg-gradient-to-r from-primary/50 to-transparent"></span>
              <span data-i18n="about.sections.expertise.title"></span>
              <span className="h-px flex-grow bg-gradient-to-l from-primary/50 to-transparent"></span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group p-6 rounded-2xl bg-dark/30 backdrop-blur-md border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-medium mb-4 text-primary group-hover:text-secondary transition-colors" data-i18n="about.sections.expertise.categories.systems.title">Systems & DevOps</h3>
                <ul className="space-y-3" id="systems-list">
                </ul>
              </div>

              <div className="group p-6 rounded-2xl bg-dark/30 backdrop-blur-md border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-medium mb-4 text-primary group-hover:text-secondary transition-colors" data-i18n="about.sections.expertise.categories.development.title">Development</h3>
                <ul className="space-y-3" id="development-list">
                </ul>
              </div>

              <div className="group p-6 rounded-2xl bg-dark/30 backdrop-blur-md border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-medium mb-4 text-primary group-hover:text-secondary transition-colors" data-i18n="about.sections.expertise.categories.architecture.title">Architecture</h3>
                <ul className="space-y-3" id="architecture-list">
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-light flex items-center gap-3">
              <span className="h-px flex-grow bg-gradient-to-r from-primary/50 to-transparent"></span>
              <span data-i18n="about.sections.evolution.title"></span>
              <span className="h-px flex-grow bg-gradient-to-l from-primary/50 to-transparent"></span>
            </h2>
            <div className="relative pl-8 border-l-2 border-primary/30">
              <div className="absolute w-4 h-4 -left-[9px] bottom-[65%] animate-pulse">
                <div className="w-full h-full bg-gradient-to-r from-primary to-secondary" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"}}>
                </div>
              </div>
              <h3 className="text-xl font-medium text-primary" data-i18n="about.sections.evolution.0.position">Solutions Architect & Software Engineer</h3>
              <p className="text-light/80" data-i18n="about.sections.evolution.0.period"></p>
              <p className="text-light/80" data-i18n="about.sections.evolution.0.where"></p>
            </div>
            <div className="relative mt-6 pl-8 border-l-2 border-primary/30">
              <div className="absolute w-4 h-4 -left-[9px] bottom-[50%] animate-pulse">
                <div className="w-full h-full bg-gradient-to-r from-primary to-secondary" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"}}>
                </div>
              </div>
              <h3 className="text-xl font-medium text-primary" data-i18n="about.sections.evolution.1.position">Full Stack Developer & SysAdmin</h3>
              <p className="text-light/80" data-i18n="about.sections.evolution.1.period"></p>
              <p className="text-light/80" data-i18n="about.sections.evolution.1.where"></p>
            </div>
            <div className="relative mt-6 pl-8 border-l-2 border-primary/30">
              <div className="absolute w-4 h-4 -left-[9px] bottom-[20%] animate-pulse">
                <div className="w-full h-full bg-gradient-to-r from-primary to-secondary" style={{clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"}}>
                </div>
              </div>
              <h3 className="text-xl font-medium text-primary" data-i18n="about.sections.evolution.2.position">Electronics Technician & Programme</h3>
              <p className="text-light/80" data-i18n="about.sections.evolution.2.period"></p>
              <p className="text-light/80" data-i18n="about.sections.evolution.2.where"></p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;