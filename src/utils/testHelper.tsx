import React, { type PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store, { persistedReducer, persistor } from '@store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@i18n/en';
import id from '@i18n/id';
import { selectLocale } from '@app/selectors';
import { configureStore } from '@reduxjs/toolkit';

const locale = selectLocale(store.getState());

i18n.use(initReactI18next).init({
  lng: locale,
  fallbackLng: ['en', 'id'],

  // have a common namespace used around the full app
  ns: ['translation'],
  defaultNS: 'translation',

  debug: false,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  resources: {
    en: {
      translation: en,
    },
    id: {
      translation: id,
    },
  },
});

export function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
  });
}

export function renderWithProviders(ui: React.ReactElement, { preloadedState = {}, ...renderOptions } = {}) {
  function Wrapper({ children }: PropsWithChildren<{}>): React.ReactElement {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </PersistGate>
      </Provider>
    );
  }

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
