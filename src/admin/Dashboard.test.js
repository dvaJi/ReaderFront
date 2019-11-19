import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

it('should render without throwing an error', () => {
  const store = mockStore({
    releases: {
      chapters: [],
      releasesPage: 0,
      releasesIsLoading: false,
      releasesHasErrored: false
    },
    layout: {
      language: 'es'
    }
  });
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
