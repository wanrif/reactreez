import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { selectLocale } from '@app/selectors';
import store, { persistor } from '@store/stores';

import en from './en.json';
import id from './id.json';

const resources = {
  en: {
    translation: en,
  },
  id: {
    translation: id,
  },
};

persistor.subscribe(() => {
  const isRehydrated = persistor.getState().bootstrapped;
  if (isRehydrated) {
    const locale = selectLocale(store.getState());

    i18n
      .use(initReactI18next) // passes i18n down to react-i18next
      .init({
        resources,
        lng: locale,
        fallbackLng: ['en', 'id'],
        interpolation: {
          escapeValue: false, // react already safes from xss
        },
      });
  }
});

export default i18n;
