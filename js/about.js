function loadExpertiseData() {
  const currentLang = document.documentElement.lang;
  console.log('Loading expertise data for:', currentLang);
  
  fetch(`/locale/${currentLang}.json`)
    .then(response => response.json())
    .then(data => {
      const expertiseData = data.about.expertise;
      
      Object.keys(expertiseData).forEach(section => {
        const sectionData = expertiseData[section];
        const listElement = document.getElementById(`${section}-list`);
        
        if (listElement) {
          listElement.innerHTML = sectionData.skills
            .map(skill => `
              <li class="flex items-center gap-2 text-light group-hover:text-white transition-colors">
                <svg class="w-4 h-4 text-primary group-hover:text-secondary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/>
                </svg>
                <span>${skill}</span>
              </li>
            `).join('');
        }
      });
    })
    .catch(error => console.error('Error loading expertise data:', error));
}

// Observa mudanças no atributo lang do HTML
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'lang') {
      loadExpertiseData();
    }
  });
});

// Inicia a observação
observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['lang']
});

// Carrega os dados iniciais
loadExpertiseData();