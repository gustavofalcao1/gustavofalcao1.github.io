import React from 'react';
import { useI18n } from '../hooks/useI18n';
import ProjectsGrid from '../components/ProjectsGrid';

const Home: React.FC = () => {
  const { t, isLoading } = useI18n();

  if (isLoading) return null;

  return (
    <main className="min-h-screen md:pt-24">
      <section className="hero flex flex-col-reverse md:flex-row items-center justify-center px-4 md:px-6 gap-8 md:gap-0 mt-4 md:mt-0 max-w-7xl mx-auto">
        <div className="hero-content flex flex-col items-start justify-start text-left w-full mt-[-12px] md:mt-12">
          <h3 className="name text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4 text-light">
            {t('hi')}
          </h3>
          <div className="flex items-start justify-start flex-wrap">
            <h2 className="name text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold mb-2 md:mb-4 text-light pr-2 md:pr-4">
              {t('im')}
            </h2>
            <h2 className="name text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-secondary">
              {t('name')}
            </h2>
          </div>
          <h1 className="title text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-primary pb-4">
            {t('title')}
          </h1>
          <p className="description text-sm sm:text-md md:text-lg lg:text-xl text-light max-w-xl lg:max-w-2xl">
            {t('description')}
          </p>
        </div>
        <div className="hero-banner relative w-full lg:w-1/2">
          <div className="absolute inset-0 bg-gradient-to-t from-darker to-transparent z-10"></div>
          <div className="w-full h-[300px] md:w-[400px] md:h-[400px] lg:w-[550px] relative overflow-hidden">
            <img 
              src="/img/me_banner.webp"
              alt={t('banner.alt')}
              className="w-full h-full object-cover scale-x-[-1] clip-banner"
            />
          </div>
        </div>
      </section>
      <section className="projects py-16 md:py-28 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <ProjectsGrid />
        </div>
      </section>
    </main>
  );
};

export default Home;