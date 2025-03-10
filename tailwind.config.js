/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2e9a40',    // Emerald green
        secondary: '#8957e5',  // Violet purple
        dark: '#0F172A',       // Dark slate blue
        darker: '#020617',     // Darker slate blue
        light: '#94A3B8'       // Slate gray
      }
    },
  },
  plugins: [
    function({ addVariant }) {
      // Language variants - applied when html has lang attribute
      addVariant('lang-pt', 'html[lang="pt"] &');
      addVariant('lang-en', 'html[lang="en"] &');
      addVariant('lang-mar', 'html[lang="mar"] &');
      
      // Page variants - applied when body has data-page attribute
      addVariant('page-home', 'body[data-page="home"] &');
      addVariant('page-about', 'body[data-page="about"] &');
      addVariant('page-play', 'body[data-page="play"] &');
      addVariant('page-contact', 'body[data-page="contact"] &');
    }
  ],
}