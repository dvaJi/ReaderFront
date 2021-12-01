import React from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { getDefaultLanguage } from '@readerfront/shared/build/lang/get-language';
import setupApolloClient from './setupApollo';
import { LANGUAGES } from './config';
import { useGlobalState, setUser, setLanguage } from './state';

import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const history = createBrowserHistory();

// Language
setLanguage(getDefaultLanguage(LANGUAGES));

// User Authentication
const token = window.localStorage.getItem('token');
if (token && token !== 'undefined' && token !== '') {
  const user = JSON.parse(window.localStorage.getItem('user'));
  if (user) {
    setUser(user, token);
  }
}

function Root() {
  const [lToken] = useGlobalState('token');
  const apolloClient = setupApolloClient(token || lToken);
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default Root;
