import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MemoryRouter, Route } from 'react-router-dom';

import Header from './index';

it('should render Admin Nav without throwing an error', () => {
  const wrapper = mountWithIntl(
    <MemoryRouter initialEntries={['/']}>
      <Route path="/">
        <Header />
      </Route>
    </MemoryRouter>
  );

  expect(wrapper.find('nav')).toBeTruthy();
  wrapper.unmount();
});

it('should hidden if the path is /auth without throwing an error', () => {
  const wrapper = mountWithIntl(
    <MemoryRouter initialEntries={['/auth/signup']}>
      <Route path="/auth/signup">
        <Header />
      </Route>
    </MemoryRouter>
  );

  expect(wrapper.find('nav').exists()).toBeFalsy();
  wrapper.unmount();
});
