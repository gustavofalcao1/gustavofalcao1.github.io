const i18n = new I18n();

// Mobile menu state and elements
let activeDropdown = null;
let activeButton = null;
let mobileMenuButton;
let mobileLangButton;
let menuDropdown;
let langDropdown;

// Initialize mobile menu elements
function initMobileMenu() {
  mobileMenuButton = document.getElementById('mobile-menu-button');
  mobileLangButton = document.getElementById('mobile-lang-button');
  menuDropdown = document.getElementById('mobile-menu-dropdown');
  langDropdown = document.getElementById('mobile-lang-dropdown');
}

// Handle dropdown states
function openDropdown(dropdown, button) {
  dropdown.classList.remove('invisible', 'opacity-0', 'translate-y-4');
  button.classList.add('text-primary');
  
  // Toggle icons
  const menuIcon = button.querySelector('.menu-icon, .lang-icon');
  const closeIcon = button.querySelector('.close-icon');
  if (menuIcon && closeIcon) {
    menuIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  }
  
  activeDropdown = dropdown;
  activeButton = button;
}

function closeDropdown(dropdown, button) {
  dropdown.classList.add('invisible', 'opacity-0', 'translate-y-4');
  button.classList.remove('text-primary');
  
  // Toggle icons
  const menuIcon = button.querySelector('.menu-icon, .lang-icon');
  const closeIcon = button.querySelector('.close-icon');
  if (menuIcon && closeIcon) {
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }

  if (activeDropdown === dropdown) {
    activeDropdown = null;
    activeButton = null;
  }
}

function closeAllDropdowns() {
  if (activeDropdown) {
    closeDropdown(activeDropdown, activeButton);
  }
}

// Toggle dropdown handler
function handleDropdownToggle(dropdown, button, event) {
  event?.stopPropagation();
  
  if (activeDropdown && activeDropdown !== dropdown) {
    closeDropdown(activeDropdown, activeButton);
  }

  const isOpen = !dropdown.classList.contains('invisible');
  if (isOpen) {
    // When closing
    closeDropdown(dropdown, button);
    button.classList.remove('text-primary');
    const menuIcon = button.querySelector('.menu-icon, .lang-icon');
    const closeIcon = button.querySelector('.close-icon');
    if (menuIcon && closeIcon) {
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  } else {
    // When opening
    openDropdown(dropdown, button);
  }
}

// Setup mobile menu event listeners
function setupMobileMenuListeners() {
  mobileMenuButton?.addEventListener('click', (e) => 
    handleDropdownToggle(menuDropdown, mobileMenuButton, e)
  );
  
  mobileLangButton?.addEventListener('click', (e) => 
    handleDropdownToggle(langDropdown, mobileLangButton, e)
  );

  // Close on outside click
  document.addEventListener('click', closeAllDropdowns);

  // Prevent closing when clicking inside dropdowns
  [menuDropdown, langDropdown].forEach(dropdown => {
    dropdown?.addEventListener('click', (e) => e.stopPropagation());
  });
}

// Initialize projects
async function initProjects() {
  const projectsContainer = document.querySelector('.projects .grid');
  if (projectsContainer) {
    await renderProjects();
    i18n.translatePage();
  }
}

// Main initialization
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Inicializa com o idioma detectado/salvo
    await i18n.setLanguage(i18n.currentLang);
    
    // Initialize components
    initMobileMenu();
    setupMobileMenuListeners();
    await initProjects();
    
  } catch (error) {
    console.error('Error initializing:', error);
  }
});