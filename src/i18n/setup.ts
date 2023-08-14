import i18n from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import * as enUS from './locales/en-US';
import * as esMX from './locales/es-MX';
import * as ptBR from './locales/pt-BR';

export const resources = {
  'en-US': enUS,
  'es-MX': esMX,
  'pt-BR': ptBR,
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    initImmediate: false,
    detection: {
      caches: ['localStorage'],
      order: ['localStorage', 'navigator'],
    },
    resources,
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  });

export default i18n;
