import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';

// App imports
import ReleasesContainer from './ReleasesContainer';
import { FETCH_RELEASES } from './query';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const releases = global.rfMocks.releases.getReleases;

beforeEach(function() {
  moxios.install();
  global.window.resizeTo(1024);
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
        <ReleasesContainer />
      </Provider>
    </MockedProvider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should render an error if cannot fetch data', async () => {
  const store = mockStore({
    layout: {
      language: 'es'
    }
  });
  const errorMock = {
    request: {
      query: FETCH_RELEASES,
      variables: { language: 1, orderBy: 'DESC', first: 20, offset: 0 }
    },
    error: new Error('Nope')
  };
  const wrapper = await mountWithIntl(
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <Provider store={store}>
        <MemoryRouter>
          <ReleasesContainer />
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  );

  await global.wait(0);
  expect(wrapper.text()).toContain('Error :(');

  wrapper.unmount();
});
