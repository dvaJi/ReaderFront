import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { IntlProvider } from 'react-intl-redux';
import store, { history } from './store';
import { addLocaleData } from 'react-intl';
import { updateIntl } from 'react-intl-redux';
import ReactGA from 'react-ga';

import * as config from './config';
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
import translations from './i18n/locales';

addLocaleData([...en, ...es]);

// Language
const langNav = navigator.language || navigator.userLanguage;
const language = langNav
  ? langNav.split('-')[0]
  : window.localStorage.getItem('rf_language') || 'en';
store.dispatch(
  updateIntl({
    locale: language,
    messages: translations[language]
  })
);

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
    ReactGA.initialize(config.GA_ID, {
      debug: process.env.NODE_ENV === 'development'
    });
    ReactGA.pageview(window.location.pathname + window.location.search);

    return (
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
    );
  }
}

export default App;
