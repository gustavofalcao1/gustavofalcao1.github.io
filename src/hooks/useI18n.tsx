import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

// Types
type Language = 'en' | 'pt' | 'mar';
type TranslationDict = Record<string, string | Record<string, string>>;

interface I18nContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  refreshTranslations: () => void;
}

// Default context
const defaultContext: I18nContextProps = {
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
  refreshTranslations: () => {}
};

// Create context
const I18nContext = createContext<I18nContextProps>(defaultContext);

// Storage key constant
const LANGUAGE_STORAGE_KEY = 'preferred-language';

// Custom hook for accessing translations
export const useI18n = () => useContext(I18nContext);

// Get initial language from storage or browser settings
const getInitialLanguage = (): Language => {
  // Try to get language from local storage first
  const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  
  if (savedLang && ['en', 'pt', 'mar'].includes(savedLang)) {
    return savedLang as Language;
  }
  
  // If not in storage, detect from browser
  const browserLang = navigator.language.toLowerCase();
  const isPt = browserLang.startsWith('pt');
  
  // Default to English if not Portuguese
  const detectedLang = isPt ? 'pt' : 'en';
  
  // Save the detected language to localStorage for next visit
  localStorage.setItem(LANGUAGE_STORAGE_KEY, detectedLang);
  
  return detectedLang as Language;
};

// Provider component
export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(getInitialLanguage());
  const [translations, setTranslations] = useState<Record<Language, TranslationDict>>({
    en: {},
    pt: {},
    mar: {}
  });
  const [refreshCounter, setRefreshCounter] = useState(0);
  const shouldUpdateElementsRef = useRef(false);

  // Translation function
  const t = useCallback((key: string): string => {
    const currentTranslations = translations[lang];
    if (!currentTranslations || Object.keys(currentTranslations).length === 0) {
      return key;
    }

    // Handle nested keys like 'header.title'
    const parts = key.split('.');
    let value: any = currentTranslations;
    
    for (const part of parts) {
      value = value?.[part];
      if (value === undefined) return key;
    }
    
    return typeof value === 'string' ? value : key;
  }, [lang, translations]);

  // Update HTML elements with translations
  const updateHtmlElements = useCallback(() => {
    // Wait for DOM to be fully updated
    setTimeout(() => {
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
    }, 0);
  }, [t]);

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // Skip if we already loaded this language
        if (Object.keys(translations[lang]).length > 0) {
          // If we already have translations, just update the elements
          shouldUpdateElementsRef.current = true;
          return;
        }

        const response = await fetch(`/locale/${lang}.json`);
        if (!response.ok) throw new Error(`Failed to load ${lang} translations`);
        const data = await response.json();
        
        setTranslations(prev => ({
          ...prev,
          [lang]: data
        }));
        
        shouldUpdateElementsRef.current = true;
        console.log(`Loaded translations for ${lang}`);
      } catch (error) {
        console.error('Translation loading error:', error);
      }
    };

    loadTranslations();
  }, [lang, refreshCounter, translations]); // Removed the circular dependency

  // Effect to update HTML elements after translations are loaded
  useEffect(() => {
    if (shouldUpdateElementsRef.current) {
      updateHtmlElements();
      shouldUpdateElementsRef.current = false;
    }
  }, [translations, updateHtmlElements]);

  // Update document attributes when language changes
  useEffect(() => {
    // Skip if translations for this language aren't loaded yet
    if (Object.keys(translations[lang]).length === 0) return;
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Save to localStorage
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    
    // Special styling for Martian
    if (lang === 'mar') {
      document.body.classList.add('martian-mode');
    } else {
      document.body.classList.remove('martian-mode');
    }
    
    // Update elements with data-i18n attributes
    updateHtmlElements();
  }, [lang, translations, updateHtmlElements]);

  // Re-apply translations when route changes
  useEffect(() => {
    // Skip if translations aren't loaded yet
    if (Object.keys(translations[lang]).length === 0) return;
    
    // Apply translations to new elements after route change
    updateHtmlElements();
  }, [refreshCounter, updateHtmlElements, translations, lang]);

  // Function to manually refresh translations
  const refreshTranslations = useCallback(() => {
    updateHtmlElements();
    setRefreshCounter(prev => prev + 1);
  }, [updateHtmlElements]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t, refreshTranslations }}>
      {children}
    </I18nContext.Provider>
  );
};

// Translation component
export const T: React.FC<{ id: string }> = ({ id }) => {
  const { t } = useI18n();
  return <>{t(id)}</>;
};