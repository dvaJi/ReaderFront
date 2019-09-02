import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { IntlProvider } from 'react-intl-redux';
import { addLocaleData } from 'react-intl';
import { ApolloProvider } from 'react-apollo';
import ReactGA from 'react-ga';

// App imports
import App from './App';
import { getDefaultLanguage } from './utils/common';
import { doChangeLanguage } from './layout/actions/doChangeLanguage';
import apolloClient from './setupApollo';
import store, { history } from './store';
import { GA_ID } from './config';
import {
  setUser,
  loginSetUserLocalStorageAndCookie
} from './user/actions/doUser';
import { GlobalStateProvider } from './state';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

addLocaleData([...en, ...es]);

if (GA_ID && GA_ID !== '') {
  ReactGA.initialize(GA_ID, {
    debug: process.env.NODE_ENV === 'development'
  });
  ReactGA.pageview(window.location.pathname + window.location.search);
}
// Language
store.dispatch(doChangeLanguage(getDefaultLanguage()));

// User Authentication
const token = window.localStorage.getItem('token');
if (token && token !== 'undefined' && token !== '') {
  const user = JSON.parse(window.localStorage.getItem('user'));
  if (user) {
    // Dispatch action
    store.dispatch(setUser(token, user));

    loginSetUserLocalStorageAndCookie(token, user);
  }
}

function Root() {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <IntlProvider>
          <ConnectedRouter history={history}>
            <GlobalStateProvider>
              <App />
            </GlobalStateProvider>
          </ConnectedRouter>
        </IntlProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default Root;
