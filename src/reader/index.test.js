import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Reader from './';
import { FETCH_CHAPTER } from './containers/queries';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const releases = global.rfMocks.releases.getReleases;
const pages = global.rfMocks.releases.getPages;

const mocks = [
  {
    request: {
      query: FETCH_CHAPTER,
      variables: {
        workStub: 'Infection',
        language: 1,
        volume: 0,
        chapter: 1,
        subchapter: 0
      }
    },
    result: {
      data: {
        chapterByWorkAndChapter: { ...releases[0], pages }
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
        <MemoryRouter>
          <Reader
            match={{
              params: {
                stub: 'Infection',
                chapter: '1',
                subchapter: '0',
                volume: '0',
                lang: 'es'
              }
            }}
          />
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  );
  wrapper.unmount();
});
