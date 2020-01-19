import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MemoryRouter, Route } from 'react-router-dom';

import Header from './index';
import { GlobalStateProvider } from 'state';

it('should render Public Nav without throwing an error', () => {
  const wrapper = mountWithIntl(
    <GlobalStateProvider>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </GlobalStateProvider>
  );

  expect(wrapper.find('nav')).toBeTruthy();
  expect(wrapper.find('nav').prop('style').display).toBe('flex');
  wrapper.unmount();
});

it('should render Admin Nav without throwing an error', () => {
  const wrapper = mountWithIntl(
    <GlobalStateProvider>
      <MemoryRouter initialEntries={['/admincp/dashboard']}>
        <Route path="/admincp/dashboard">
          <Header />
        </Route>
      </MemoryRouter>
    </GlobalStateProvider>
  );

  expect(wrapper.find('nav')).toBeTruthy();
  wrapper.unmount();
});

it('should hidden if the path is /read without throwing an error', () => {
  const wrapper = mountWithIntl(
    <GlobalStateProvider>
      <MemoryRouter initialEntries={['/read/grateful_dead/es/1/3.0']}>
        <Route path="/read/:stub/:lang/:volume/:chapter.:subchapter">
          <Header />
        </Route>
      </MemoryRouter>
    </GlobalStateProvider>
  );

  expect(wrapper.find('nav')).toBeTruthy();
  expect(wrapper.find('nav').prop('style').display).toBe('none');
  wrapper.unmount();
});
