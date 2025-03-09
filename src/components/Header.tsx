import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '../hooks/useI18n';

const Header: React.FC = () => {
  const { setLang, refreshTranslations } = useI18n();

  useEffect(() => {
    refreshTranslations();
  }, [refreshTranslations]);

  return (
    <header id="desktop-header" className="fixed top-6 py-3 px-6 lg:px-8 rounded-full bg-dark/30 backdrop-blur-md border border-primary/10 transition-all duration-300 shadow-lg z-50 hidden md:block mx-auto left-0 right-0 w-max">
      <nav className="flex items-center gap-4 lg:gap-6">
        <NavLink to="/" className="flex-shrink-0">
          <img src="/img/logo.webp" width="32px" alt="Logo" className="rounded-full" />
        </NavLink>
        <div className="hidden md:flex items-center gap-4 lg:gap-6" id="main-menu">
          <div className="w-px h-4 bg-light/10 hidden md:block"></div>
          <div className="flex md:flex-row items-center gap-4 lg:gap-6">
            <NavLink to="/" className="flex items-center gap-1 page-home:text-primary text-light hover:text-primary group transition-colors">
              <span className="font-medium text-lg lg:text-xl" data-i18n="menu.home">Works</span>
              <span className="font-medium ml-1 border page-home:border-primary border-light group-hover:border-primary rounded-md px-2 text-sm translate-y-0.5">/</span>
            </NavLink>
            <NavLink to="/about" className="text-light page-about:text-primary hover:text-primary transition-colors font-medium text-lg lg:text-xl">About</NavLink>
            <NavLink to="/play" className="text-light page-play:text-primary hover:text-primary transition-colors font-medium text-lg lg:text-xl" data-i18n="menu.play">Play</NavLink>
            <NavLink to="/contact" className="text-light page-contact:text-primary hover:text-primary transition-colors font-medium text-lg lg:text-xl" data-i18n="menu.contact">Contact</NavLink>
          </div>
          <div className="w-px h-4 bg-light/10 hidden md:block"></div>
          <div className="relative group ml-auto">
            <button type="button" className="flex items-center gap-2 text-light hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 48.023 0 01-3.827-5.802" />
              </svg>
              <span className="text-sm font-medium" data-i18n="config.langCode"></span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div className="absolute right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="py-2 w-48 bg-dark/95 backdrop-blur-md rounded-lg shadow-xl border border-primary/10">
                <button onClick={() => setLang('pt')} className="flex items-center gap-3 px-4 py-2 text-sm lang-pt:text-primary text-light hover:text-primary hover:bg-darker/50 hover:rounded-lg w-full">
                  <span className="fi fi-pt"></span>
                  Português
                </button>
                <button onClick={() => setLang('en')} className="flex items-center gap-3 px-4 py-2 text-sm lang-en:text-primary text-light hover:text-primary hover:bg-darker/50 hover:rounded-lg w-full">
                  <span className="fi fi-gb"></span>
                  English
                </button>
                <button onClick={() => setLang('mar')} className="flex items-center gap-3 px-4 py-2 text-sm lang-mar:text-primary text-light hover:text-primary hover:bg-darker/50 hover:rounded-lg w-full">
                  <span className="text-green-500" style={{ fontSize: '1.2em', marginRight: '-2.5px', marginLeft: '-1px' }}>👽</span>
                  Martian
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;