import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Header from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

it('should render Public Nav without throwing an error', () => {
  const store = mockStore({});
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper.find('nav')).toBeTruthy();
  expect(wrapper.find('nav').prop('style').display).toBe('flex');
  wrapper.unmount();
});

it('should render Admin Nav without throwing an error', () => {
  const store = mockStore({});
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/admincp/dashboard']}>
        <Route path="/admincp/dashboard">
          <Header />
        </Route>
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper.find('nav')).toBeTruthy();
  wrapper.unmount();
});

it('should hidden if the path is /read without throwing an error', () => {
  const store = mockStore({});
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/read/grateful_dead/es/1/3.0']}>
        <Route path="/read/:stub/:lang/:volume/:chapter.:subchapter">
          <Header />
        </Route>
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper.find('nav')).toBeTruthy();
  expect(wrapper.find('nav').prop('style').display).toBe('none');
  wrapper.unmount();
});
