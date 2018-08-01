import React from 'react';
import I18n from 'redux-i18n';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from "react-router-redux";
import Dashboard from './Dashboard';
import store, { history } from '../store';
import { translations } from '../translations';

it('should render without throwing an error', () => {
  const props = {};
  const wrapper = mount(
    <Provider store={store} {...props}>
      <ConnectedRouter history={history}>
        <I18n translations={translations}>
          <Dashboard />
        </I18n>
      </ConnectedRouter>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
