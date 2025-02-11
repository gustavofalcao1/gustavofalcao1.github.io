class I18n {
  constructor() {
    this.translations = {};
    this.currentLang = this.getInitialLanguage();
  }

  // Detects the initial language based on the preference of the user or browser
  getInitialLanguage() {
    // Try to get from LocaStorage first
    const cached = localStorage.getItem('preferred-language');
    if (cached) {
      return cached;
    }

    // Special case: Check for Martian browsers (just for fun)
    const isMartianBrowser = navigator.userAgent.includes('Mars');
    if (isMartianBrowser) return 'mar';

    // Regular language detection
    const browserLang = navigator.language || navigator.userLanguage;
    const defaultLang = /^pt\b/.test(browserLang) ? 'pt' : 'en';
    
    localStorage.setItem('preferred-language', defaultLang);
    return defaultLang;
  }

  async loadTranslations(lang) {
    try {
      const response = await fetch(`/locale/${lang}.json`);
      this.translations[lang] = await response.json();
    } catch (error) {
      console.error('Erro ao carregar traduções:', error);
    }
  }

  async setLanguage(lang) {
    try {
      if (!this.translations[lang]) {
        await this.loadTranslations(lang);
      }
      
      this.currentLang = lang;
      this.applyLanguageStyles(lang);
      localStorage.setItem('preferred-language', lang);
      this.translatePage();
      
      // Dispatch event for other components
      document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    } catch (error) {
      console.error('Erro ao definir idioma:', error);
    }
  }

  // Add Martian font style for mar language
  applyLanguageStyles(lang) {
    document.documentElement.lang = lang;
    if (lang === 'mar') {
      document.body.classList.add('martian-font');
    } else {
      document.body.classList.remove('martian-font');
    }
  }

  translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getNestedValue(this.translations[this.currentLang], key);
      
      if (translation) {
        if (element.tagName.toLowerCase() === 'title') {
          document.title = translation;
        } else if (element.hasAttribute('content')) {
          element.setAttribute('content', translation);
        } else {
          element.textContent = translation;
        }
      }
    });
  }

  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => 
      current && current[key] !== undefined ? current[key] : null, obj
    );
  }
}

window.I18n = I18n;