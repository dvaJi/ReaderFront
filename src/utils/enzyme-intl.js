import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { mount, shallow } from 'enzyme';

// You can pass your messages to the IntlProvider. Optional: remove if unneeded.
const messages = require('../i18n/locales/en'); // en.json
const defaultLocale = 'en';
const locale = defaultLocale;

export function mountWithIntl(node) {
  return mount(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale,
      messages
    }
  });
}

export function shallowWithIntl(node) {
  return shallow(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale,
      messages
    }
  });
}

export function mountWithRouter(
  node,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  return mount(node, {
    wrappingComponent: Wrapper,
    wrappingComponentProps: {
      history
    }
  });
}
