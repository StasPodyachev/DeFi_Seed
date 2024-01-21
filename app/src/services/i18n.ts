import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import lang from '../../lang';

i18n
  .use(initReactI18next)
  .init({
    resources: lang,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
