import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import store, { persistor } from '@store/stores';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@i18n/index.ts';

import App from './App.tsx';

import '@assets/main.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
} else {
  console.error('Root element not found');
}
