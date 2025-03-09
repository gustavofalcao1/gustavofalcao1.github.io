import { createContext, useContext, useState, useEffect } from 'react';

// Types
type Language = 'en' | 'pt' | 'mar';
type TranslationDict = Record<string, string | Record<string, string>>;

interface I18nContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

// Default context
const defaultContext: I18nContextProps = {
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key
};

// Create context
const I18nContext = createContext<I18nContextProps>(defaultContext);

// Custom hook for accessing translations
export const useI18n = () => useContext(I18nContext);

// Get initial language from storage or browser settings
const getInitialLanguage = (): Language => {
  const savedLang = localStorage.getItem('lang');
  
  if (savedLang && ['en', 'pt', 'mar'].includes(savedLang)) {
    return savedLang as Language;
  }
  
  const browserLang = navigator.language.substring(0, 2);
  return browserLang === 'pt' ? 'pt' : 'en';
};

// Provider component
export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(getInitialLanguage());
  const [translations, setTranslations] = useState<Record<Language, TranslationDict>>({
    en: {},
    pt: {},
    mar: {}
  });

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locale/${lang}.json`);
        if (!response.ok) throw new Error(`Failed to load ${lang} translations`);
        const data = await response.json();
        
        setTranslations(prev => ({
          ...prev,
          [lang]: data
        }));
      } catch (error) {
        console.error('Translation loading error:', error);
      }
    };

    loadTranslations();
  }, [lang]);

  // Update document attributes when language changes
  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Save to localStorage
    localStorage.setItem('lang', lang);
    
    // Special styling for Martian
    if (lang === 'mar') {
      document.body.classList.add('martian-mode');
    } else {
      document.body.classList.remove('martian-mode');
    }
    
    // Update elements with data-i18n attributes
    updateHtmlElements();
  }, [lang, translations]);

  // Update HTML elements with translations
  const updateHtmlElements = () => {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (!key) return;
      
      const translation = t(key);
      
      // Apply translation based on element type
      if (element.tagName === 'META') {
        element.setAttribute('content', translation);
      } else if (element.tagName === 'TITLE') {
        document.title = translation;
      } else {
        element.textContent = translation;
      }
    });
  };

  // Translation function
  const t = (key: string): string => {
    const currentTranslations = translations[lang];
    if (!currentTranslations) return key;

    // Handle nested keys like 'header.title'
    const parts = key.split('.');
    let value: any = currentTranslations;
    
    for (const part of parts) {
      value = value?.[part];
      if (value === undefined) return key;
    }
    
    return typeof value === 'string' ? value : key;
  };

  // Language change handler
  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
  };

  const value = {
    lang,
    setLang: handleSetLang,
    t
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

// Translation component
export const T: React.FC<{ id: string }> = ({ id }) => {
  const { t } = useI18n();
  return <>{t(id)}</>;
};