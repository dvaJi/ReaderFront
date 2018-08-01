import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import I18n from 'redux-i18n';
import ReactGA from 'react-ga';
import * as config from './config';
import Routes from './Routes';
import Header from './layout/header';
import { translations } from './translations';
import {
  setUser,
  loginSetUserLocalStorageAndCookie
} from './user/actions/doUser';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

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
  defaultLanguage = () => {
    return localStorage.getItem('rf_language') || 'en';
  };

  render() {
    ReactGA.initialize(config.GA_ID, {
      debug: process.env.NODE_ENV === 'development'
    });
    ReactGA.pageview(window.location.pathname + window.location.search);

    return (
      <Provider store={store}>
        <I18n translations={translations} initialLang={this.defaultLanguage()}>
          <ConnectedRouter history={history}>
            <div className="App">
              <Header />
              {Routes}
            </div>
          </ConnectedRouter>
        </I18n>
      </Provider>
    );
  }
}

export default App;
