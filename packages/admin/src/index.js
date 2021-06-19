import React from 'react';
import { render, hydrate } from 'react-dom';
import Loadable from 'react-loadable';
import Root from './Root';
import { unregister } from './registerServiceWorker';

const application = <Root />;
const root = document.querySelector('#root');

if (process.env.NODE_ENV === 'production') {
  Loadable.preloadReady().then(() => {
    hydrate(application, root);
  });
} else {
  render(application, root);
}

unregister();
