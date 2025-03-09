import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '../hooks/useI18n';
import { ContactContext } from '../App';

// Mobile header component
const MobileHeader: React.FC = () => {
  const { t, setLang, isLoading } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { setShowChat } = useContext(ContactContext);

  if (isLoading) return null;

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (langOpen) setLangOpen(false);
  };

  // Toggle language menu visibility
  const toggleLang = () => {
    setLangOpen(!langOpen);
    if (menuOpen) setMenuOpen(false);
  };

  // Handle contact click
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowChat(true);
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <header id="mobile-header" className="fixed bottom-6 left-6 right-6 py-3 rounded-full bg-dark/30 backdrop-blur-md border-t border-primary/10 transition-all duration-300 shadow-lg z-50 md:hidden">
      <nav className="grid grid-cols-3 items-center max-w-lg mx-auto px-6">
        {/* Home - Left aligned */}
        <div className="flex justify-start">
          <NavLink to="/" className="text-light">
            <img src="/img/logo.webp" width="32" height="32" alt="Logo" className="rounded-full" />
          </NavLink>
        </div>

        {/* Menu Button - Center aligned */}
        <div className="flex justify-center">
          <button 
            type="button"
            onClick={toggleMenu}
            className="text-light hover:text-primary transition-colors" 
            aria-label="Toggle menu"
          >
            {/* Menu Icon (visible when closed) */}
            <svg className={`h-6 w-6 ${menuOpen ? 'hidden' : 'block'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            {/* Close Icon (hidden by default) */}
            <svg className={`h-6 w-6 ${menuOpen ? 'block' : 'hidden'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Language Button - Right aligned */}
        <div className="flex justify-end">
          <button 
            type="button"
            onClick={toggleLang}
            className="text-light hover:text-primary transition-colors"
            aria-label="Change language"
          >
            {/* Language Icon (visible when closed) */}
            <svg className={`h-6 w-6 ${langOpen ? 'hidden' : 'block'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 48.023 0 01-3.827-5.802" />
            </svg>
            {/* Close Icon (hidden by default) */}
            <svg className={`h-6 w-6 ${langOpen ? 'block' : 'hidden'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`fixed bottom-16 left-1 right-1 rounded-3xl bg-dark/95 backdrop-blur-md border-t border-primary/10 transform transition-all duration-300 shadow-lg z-50 ${menuOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-4'}`}
      >
        <nav className="flex flex-col gap-6 p-6 max-w-lg mx-auto">
          <NavLink 
            to="/" 
            className="flex items-center gap-3 px-4 py-2 page-home:text-primary text-light hover:text-primary hover:bg-darker/50 hover:rounded-lg group transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <span className="font-medium text-xl">
              {t('menu.home')}
            </span>
            <div className="inline-flex items-center justify-center md:ml-1.5 border border-light page-home:border-primary group-hover:border-primary rounded-md w-5 h-5 text-xs leading-none">
              /
            </div>
          </NavLink>
          <NavLink 
            to="/about" 
            className="flex items-center gap-3 px-4 py-2 page-about:text-primary text-light hover:text-primary hover:bg-darker/50 hover:rounded-lg transition-colors font-medium text-xl"
            onClick={() => setMenuOpen(false)}
          >
            {t('menu.about')}
          </NavLink>
          <NavLink 
            to="/play" 
            className="flex items-center gap-3 px-4 py-2 page-play:text-primary text-light hover:text-primary hover:bg-darker/50 hover:rounded-lg transition-colors font-medium text-xl"
            onClick={() => setMenuOpen(false)}
          >
            {t('menu.play')}
          </NavLink>
          <button 
            onClick={handleContactClick}
            className="flex items-center gap-3 px-4 py-2 text-light hover:text-primary hover:bg-darker/50 hover:rounded-lg transition-colors font-medium text-xl text-left"
          >
            {t('menu.contact')}
          </button>
        </nav>
      </div>

      {/* Language Dropdown */}
      <div 
        className={`fixed bottom-16 right-1 w-40 rounded-3xl bg-dark/95 backdrop-blur-md border-t border-primary/10 transform transition-all duration-300 shadow-lg z-50 ${langOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-4'}`}
      >
        <div className="flex flex-col gap-4 p-4">
          <button 
            onClick={() => {
              setLang('pt');
              setLangOpen(false);
            }} 
            className="flex items-center gap-3 px-4 py-2 text-sm lang-pt:text-primary text-light hover:text-primary hover:bg-darker/50 hover:rounded-lg w-full"
          >
            <span className="fi fi-pt"></span>
            Português
          </button>
          <button 
            onClick={() => {
              setLang('en');
              setLangOpen(false);
            }} 
            className="flex items-center gap-3 px-4 py-2 text-sm lang-en:text-primary text-light hover:text-primary hover:bg-darker/50 hover:rounded-lg w-full"
          >
            <span className="fi fi-gb"></span>
            English
          </button>
          <button 
            onClick={() => {
              setLang('mar');
              setLangOpen(false);
            }} 
            className="flex items-center gap-3 px-4 py-2 text-sm lang-mar:text-primary text-light hover:text-primary hover:bg-darker/50 hover:rounded-lg w-full"
          >
            <span className="text-green-500" style={{ fontSize: '1.2em', marginRight: '-2.5px', marginLeft: '-1px' }}>👽</span>
            Martian
          </button>
        </div>
      </div>
    </header>
  );
};

// Combined header component
const Header: React.FC = () => {
  const { t, setLang, isLoading } = useI18n();
  const { setShowChat } = useContext(ContactContext);

  if (isLoading) return null;

  // Handle contact click for desktop header
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowChat(true);
  };

  return (
    <>
      {/* Desktop Header */}
      <header id="desktop-header" className="fixed top-6 py-3 px-6 lg:px-8 rounded-full bg-dark/30 backdrop-blur-md border border-primary/10 transition-all duration-300 shadow-lg z-50 hidden md:block mx-auto left-0 right-0 w-max">
        <nav className="flex items-center gap-4 lg:gap-6">
          <NavLink to="/" className="flex-shrink-0">
            <img src="/img/logo.webp" width="32" height="32" alt="Logo" className="rounded-full" />
          </NavLink>
          <div className="hidden md:flex items-center gap-4 lg:gap-6" id="main-menu">
            <div className="w-px h-4 bg-light/10 hidden md:block"></div>
            <div className="flex md:flex-row items-center gap-4 lg:gap-6">
              <NavLink to="/" className="flex items-center page-home:text-primary text-light hover:text-primary group transition-colors">
                <span className="font-medium text-lg lg:text-xl">
                  {t('menu.home')}
                </span>
                <div className="inline-flex items-center justify-center ml-1.5 border border-light page-home:border-primary group-hover:border-primary rounded-md w-5 h-5 text-xs leading-none">
                  /
                </div>
              </NavLink>
              <NavLink to="/about" className="text-light page-about:text-primary hover:text-primary transition-colors font-medium text-lg lg:text-xl">
                {t('menu.about')}
              </NavLink>
              <NavLink to="/play" className="text-light page-play:text-primary hover:text-primary transition-colors font-medium text-lg lg:text-xl">
                {t('menu.play')}
              </NavLink>
              <button 
                onClick={handleContactClick}
                className="text-light hover:text-primary transition-colors font-medium text-lg lg:text-xl cursor-pointer"
              >
                {t('menu.contact')}
              </button>
            </div>
            <div className="w-px h-4 bg-light/10 hidden md:block"></div>
            <div className="relative group ml-auto">
              <button type="button" className="flex items-center gap-2 text-light hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 48.023 0 01-3.827-5.802" />
                </svg>
                <span className="text-sm font-medium">{t('config.langCode')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
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

      {/* Mobile Header */}
      <MobileHeader />
    </>
  );
};

export default Header;