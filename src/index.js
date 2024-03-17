import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import store from './redux/store';
import './index.css';
import App from './App';
import i18n from './i18n';

const root = document.getElementById('root');
if (root !== null) {
 createRoot(root).render(
    <React.StrictMode>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <App />
            </Suspense>
          </Router>
        </I18nextProvider>
      </Provider>
    </React.StrictMode>
  );
}

