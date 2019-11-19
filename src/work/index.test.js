import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MockedProvider } from 'react-apollo/test-utils';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { FETCH_WORK } from './containers/query';
import Serie from './';

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

it('should render without throwing an error', () => {
  const store = mockStore({
    layout: {
      language: 'es'
    }
  });

  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Provider store={store}>
        <Serie
          match={{
            params: {
              stub: 'infection'
            }
          }}
        />
      </Provider>
    </MockedProvider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
