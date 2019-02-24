import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { IntlProvider } from 'react-intl-redux';
import { addLocaleData } from 'react-intl';
import { ApolloProvider } from 'react-apollo';
import ReactGA from 'react-ga';

// App imports
import { getDefaultLanguage } from './utils/common';
import { doChangeLanguage } from './layout/actions/doChangeLanguage';
import apolloClient from './setupApollo';
import store, { history } from './store';
import { GA_ID } from './config';
import Routes from './Routes';
import Header from './layout/header';
import {
  setUser,
  loginSetUserLocalStorageAndCookie
} from './user/actions/doUser';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

addLocaleData([...en, ...es]);

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

class App extends Component {
  render() {
    ReactGA.initialize(GA_ID, {
      debug: process.env.NODE_ENV === 'development'
    });
    ReactGA.pageview(window.location.pathname + window.location.search);

    return (
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <IntlProvider>
            <ConnectedRouter history={history}>
              <div className="App">
                <Header />
                {Routes}
              </div>
            </ConnectedRouter>
          </IntlProvider>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
