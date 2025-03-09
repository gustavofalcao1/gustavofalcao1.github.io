import React, { useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';

const Play: React.FC = () => {
  const { refreshTranslations } = useI18n();
    
  useEffect(() => {
    refreshTranslations();
  }, [refreshTranslations]);

  return (
    <main className="flex-grow flex items-center justify-center px-4 relative md:pt-24">
      <div className="text-center z-10">
        <h1 className="text-5xl font-bold py-2 my-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" data-i18n="404.title">You found the limit of this matrix!</h1>
        <div className="relative">
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" style={{animation: "glitch 3s infinite"}} data-i18n="404.heading">404</h1>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-30">
            <span className="text-9xl md:text-[12rem] font-bold text-primary" style={{filter: "blur(10px)"}} data-i18n="404.heading">404</span>
          </div>
        </div>
        
        <div className="my-8" style={{animation: "bounce 2s ease-in-out infinite"}}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-primary/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <div className="space-y-3 backdrop-blur-sm bg-dark/30 p-8 rounded-2xl border border-primary/10">
          <p className="text-2xl md:text-3xl text-light font-medium" data-i18n="404.error">
          </p>
          
          <p className="text-light/80 text-lg" data-i18n="404.description">
          </p>
          
          <a href="/" className="group inline-block mt-8 px-8 py-4 rounded-full relative overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-50 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-2 text-white font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span data-i18n="404.button"></span>
            </span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default Play;