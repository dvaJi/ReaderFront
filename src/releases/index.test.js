import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MockedProvider } from 'react-apollo/test-utils';
import { Provider } from 'react-redux';

import Releases from './';

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
    <MockedProvider mocks={[]} addTypename={false}>
      <Provider store={store}>
        <Releases />
      </Provider>
    </MockedProvider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
