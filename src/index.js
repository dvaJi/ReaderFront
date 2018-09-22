import React from 'react';
import { render, hydrate } from 'react-dom';
import Loadable from 'react-loadable';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const application = <App />;
const root = document.querySelector('#root');

if (process.env.NODE_ENV === 'production') {
  Loadable.preloadReady().then(() => {
    hydrate(application, root);
  });
} else {
  render(application, root);
}

registerServiceWorker();
