function loadExpertiseData() {
  const currentLang = document.documentElement.lang;
  
  fetch(`/locale/${currentLang}.json`)
    .then(response => response.json())
    .then(data => {
      // Access the correct JSON structure
      const categories = data.about.sections.expertise.categories;
      
      // Iterate over each category
      Object.keys(categories).forEach(category => {
        const listElement = document.getElementById(`${category}-list`);
        
        if (listElement) {
          // Get the items for the current category
          const items = categories[category].items;
          
          // Update the list with the new items
          listElement.innerHTML = items
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', loadExpertiseData);

// Update when language changes
document.addEventListener('languageChanged', loadExpertiseData);