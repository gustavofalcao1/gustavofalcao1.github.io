import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

// Types
type Language = 'en' | 'pt' | 'mar';
type TranslationDict = Record<string, any>;

interface I18nContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => any; // Changed from string to any
  isLoading: boolean;
}

// Default context
const defaultContext: I18nContextProps = {
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
  isLoading: true
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
  const [translations, setTranslations] = useState<TranslationDict>({});
  const [isLoading, setIsLoading] = useState(true);
  const shouldUpdateElementsRef = useRef(false);

  // Translation function
  const t = useCallback((key: string): any => {
    if (!translations || Object.keys(translations).length === 0) return '';

    const parts = key.split('.');
    let value: any = translations;
    
    for (const part of parts) {
      value = value?.[part];
      if (value === undefined) return '';
    }
    
    return value; // Return the value as is, whether string or array
  }, [translations]);

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

  // Load translations - Modified to be more reliable
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        // Always fetch fresh translations when language changes
        const response = await fetch(`/locale/${lang}.json`);
        if (!response.ok) throw new Error(`Failed to load ${lang} translations`);
        const data = await response.json();
        
        setTranslations(data);
        document.documentElement.lang = lang;
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
        
      } catch (error) {
        setIsLoading(false);
        return '';
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [lang]); // Only depend on language changes

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
    if (Object.keys(translations).length === 0) return;
    
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
    if (Object.keys(translations).length === 0) return;
    
    // Apply translations to new elements after route change
    updateHtmlElements();
  }, [updateHtmlElements, translations, lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t, isLoading }}>
      {children}
    </I18nContext.Provider>
  );
};

// Translation component
export const T: React.FC<{ id: string }> = ({ id }) => {
  const { t } = useI18n();
  return <>{t(id)}</>;
};