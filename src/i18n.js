import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: process.env.NODE_ENV === 'production'
        ? 'https://daniello94.github.io/company_wep/locales/{{lng}}.json'
        : '/company_wep/locales/{{lng}}.json'
    },
    lng: 'en',
    fallbackLng: 'en',
    preload: ['en', 'pl', 'nl', 'de', 'fr'],
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false
    }
  })

export default i18n;