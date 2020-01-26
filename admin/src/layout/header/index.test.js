import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MemoryRouter, Route } from 'react-router-dom';

import Header from './index';
import { GlobalStateProvider } from 'state';

it('should render Admin Nav without throwing an error', () => {
  const wrapper = mountWithIntl(
    <GlobalStateProvider>
      <MemoryRouter initialEntries={['/']}>
        <Route path="/">
          <Header />
        </Route>
      </MemoryRouter>
    </GlobalStateProvider>
  );

  expect(wrapper.find('nav')).toBeTruthy();
  wrapper.unmount();
});

it('should hidden if the path is /auth without throwing an error', () => {
  const wrapper = mountWithIntl(
    <GlobalStateProvider>
      <MemoryRouter initialEntries={['/auth/signup']}>
        <Route path="/auth/signup">
          <Header />
        </Route>
      </MemoryRouter>
    </GlobalStateProvider>
  );

  expect(wrapper.find('nav').exists()).toBeFalsy();
  wrapper.unmount();
});
