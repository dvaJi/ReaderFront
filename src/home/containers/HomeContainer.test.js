import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mountWithIntl } from 'utils/enzyme-intl';
import { Provider } from 'react-redux';
import { MockedProvider } from 'react-apollo/test-utils';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';

import { FETCH_RELEASES } from './queries';
import HomeContainer from './HomeContainer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const releases = global.rfMocks.releases.getReleases;

beforeEach(function() {
  moxios.install();
});

afterEach(function() {
  moxios.uninstall();
});

const mocks = [
  {
    request: {
      query: FETCH_RELEASES,
      variables: { language: 1, orderBy: 'DESC', first: 20, offset: 0 }
    },
    result: {
      data: {
        chapters: releases
      }
    }
  }
];

it('should render without throwing an error', async () => {
  const store = mockStore({
    layout: {
      language: 'es'
    }
  });

  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Provider store={store}>
        <MemoryRouter>
          <HomeContainer />
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  );

  await global.wait(0);
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
