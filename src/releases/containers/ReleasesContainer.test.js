import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';

// App imports
import ReleasesContainer from './ReleasesContainer';
import { query } from './query';

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
      query: query(1, 'DESC', 20, 0),
      variables: {}
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
  const errorMock = {
    request: {
      query: query(1, 'DESC', 20, 0),
      variables: {}
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
