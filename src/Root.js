import React from 'react';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

// App imports
import App from './App';
import { getDefaultLanguage } from './utils/common';
import apolloClient from './setupApollo';
import { GA_ID } from './config';
import { setUser, setLanguage } from 'state';
import { GlobalStateProvider } from './state';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const history = createBrowserHistory();

if (GA_ID && GA_ID !== '') {
  ReactGA.initialize(GA_ID, {
    debug: process.env.NODE_ENV === 'development'
  });
  ReactGA.pageview(window.location.pathname + window.location.search);
}
// Language
setLanguage(getDefaultLanguage());

// User Authentication
const token = window.localStorage.getItem('token');
if (token && token !== 'undefined' && token !== '') {
  const user = JSON.parse(window.localStorage.getItem('user'));
  if (user) {
    setUser(user, token);
  }
}

function Root() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter history={history}>
        <GlobalStateProvider>
          <App />
        </GlobalStateProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default Root;
