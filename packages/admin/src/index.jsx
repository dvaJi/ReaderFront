import React from 'react';
import { render, hydrate } from 'react-dom';
import Root from './Root';
import { unregister } from './registerServiceWorker';

const application = <Root />;
const root = document.getElementById('root');

render(application, root);

unregister();
