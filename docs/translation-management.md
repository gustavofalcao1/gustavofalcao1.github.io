# Translation Management Guide

This document explains how to manage texts and languages in the portfolio application.

## 📝 Translation System Overview

The application uses a custom i18n (internationalization) system based on JSON translation files and the `useI18n` hook. The system supports:

- Multiple languages (currently English, Portuguese, and Martian)
- Dynamic language switching
- Automatic translation of elements with `data-i18n` attributes

## 🗂️ File Structure

```
public/
└── locale/
    ├── en.json     # English translations
    ├── pt.json     # Portuguese translations 
    └── mar.json    # Martian translations
src/
└── hooks/
    └── useI18n.tsx # Translation system implementation (hook and provider)
```

## 🔄 How Translations Work

1. The i18n system loads the appropriate JSON file based on the selected language from the `public/locale/` directory
2. Elements with `data-i18n` attributes are automatically translated
3. The `useI18n` hook provides access to translation functions in components

## ✏️ Modifying Texts

To modify existing texts:

1. Locate the appropriate translation key in the JSON files under `public/locale/`
2. Update the text value for each language you want to modify

Example from `en.json`:
```json
{
  "header": {
    "home": "Home",
    "about": "About",
    "works": "Works",
    "play": "Play"
  }
}
```

To change "Home" to "Homepage":
```json
{
  "header": {
    "home": "Homepage",
    "about": "About",
    "works": "Works",
    "play": "Play"
  }
}
```

## ➕ Adding New Text

To add new translatable text:

1. Choose an appropriate nested structure and key name
2. Add the key and text to all language files (`en.json`, `pt.json`, `mar.json`)
3. Use the key in your component with a `data-i18n` attribute or the `t()` function from the `useI18n` hook

### Using in JSX:

```tsx
// Using data-i18n attribute (auto-translates)
<h1 data-i18n="yourSection.yourKey">Default text</h1>

// Using t() function (for dynamic content)
const { t } = useI18n();
<h1>{t('yourSection.yourKey')}</h1>
```

## 🌐 Adding a New Language

To add a new language:

1. Create a new JSON file in the `public/locale/` directory (e.g., `fr.json` for French)
2. Copy the structure from an existing language file like `en.json`
3. Translate all text values to the new language
4. Update the language type in `src/hooks/useI18n.tsx`:

```tsx
// Find and update this line:
type Language = 'en' | 'pt' | 'mar' | 'fr';

// And update the initial translations structure:
const [translations, setTranslations] = useState<Record<Language, TranslationDict>>({
  en: {},
  pt: {},
  mar: {},
  fr: {}
});

// Update the language validation in getInitialLanguage function:
if (savedLang && ['en', 'pt', 'mar', 'fr'].includes(savedLang)) {
  return savedLang as Language;
}
```

5. Add the language option to the language switcher in the Header component

## ❌ Removing a Language

To remove an existing language:

1. Remove or archive the corresponding JSON file from `public/locale/`
2. Update the language type in `src/hooks/useI18n.tsx` to remove the language option
3. Remove the language option from the Header component

## 🧪 Testing Translations

After modifying translations:

1. Switch between languages using the language selector in the application
2. Verify that all modified texts appear correctly in each language
3. Check for any untranslated texts (which will appear as the key name)

## 🔍 Troubleshooting

- **Missing translations**: Check if the key exists in all language files
- **Nested key issues**: Ensure the nested structure is identical across all language files
- **Refresh issues**: Try refreshing translations with `refreshTranslations()` from the `useI18n` hook
- **Load failures**: Check the browser console for fetch errors that might indicate JSON parsing problems
