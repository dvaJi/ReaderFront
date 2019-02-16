import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { FETCH_WORK } from './query';
import WorkContainer from './WorkContainer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const chapters = global.rfMocks.releases.getReleases;
const work = global.rfMocks.work.work;

const mocks = [
  {
    request: {
      query: FETCH_WORK,
      variables: { language: 1, stub: 'infection' }
    },
    result: {
      data: {
        work: { ...work, chapters: chapters }
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
          <WorkContainer
            match={{
              params: {
                stub: 'infection'
              }
            }}
          />
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  );

  await global.wait(0);
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should render without throwing an error', () => {
  const store = mockStore({
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Provider store={store}>
        <MemoryRouter>
          <WorkContainer
            match={{
              params: {
                stub: 'infection'
              }
            }}
          />
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
