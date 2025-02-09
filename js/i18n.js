class I18n {
  constructor() {
    this.translations = {};
    this.currentLang = this.getInitialLanguage();
  }

  // Detecta o idioma inicial baseado na preferência do usuário ou navegador
  getInitialLanguage() {
    // Tenta obter do localStorage primeiro
    const cached = localStorage.getItem('preferred-language');
    if (cached) {
      return cached;
    }

    // Se não houver cache, detecta do navegador
    const browserLang = navigator.language || navigator.userLanguage;
    const isPortuguese = /^pt\b/.test(browserLang);
    
    // Define o idioma padrão baseado na detecção
    const defaultLang = isPortuguese ? 'pt' : 'en';
    
    // Salva a preferência
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
      document.documentElement.lang = lang;
      
      // Salva a preferência do usuário
      localStorage.setItem('preferred-language', lang);
      
      this.translatePage();
    } catch (error) {
      console.error('Erro ao definir idioma:', error);
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