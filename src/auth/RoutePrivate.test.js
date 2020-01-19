import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mountWithIntl } from 'utils/enzyme-intl';

import RoutePrivate from './RoutePrivate';
import { GlobalStateProvider } from 'state';

const userStorage = {
  email: 'admin@weeabo.com',
  id: 1,
  name: 'The Admin',
  role: 'ADMIN'
};

afterEach(() => {
  localStorage.clear();
});

it('should render without throwing an error', () => {
  const wrapper = mountWithIntl(
    <GlobalStateProvider>
      <MemoryRouter>
        <RoutePrivate />
      </MemoryRouter>
    </GlobalStateProvider>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should render without throwing an error', () => {
  localStorage.setItem('user', JSON.stringify(userStorage));
  const wrapper = mountWithIntl(
    <GlobalStateProvider>
      <MemoryRouter>
        <RoutePrivate />
      </MemoryRouter>
    </GlobalStateProvider>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
