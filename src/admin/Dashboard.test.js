import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Dashboard from './Dashboard';
import store, { history } from '../store';
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
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Dashboard />
      </ConnectedRouter>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
