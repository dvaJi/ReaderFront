import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import ReaderContainer from './ReaderContainer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { FETCH_CHAPTER } from './queries';

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

it('should render without throwing an error', async () => {
  // Append a div to test our UncontrolledTooltip
  const commentsTooltip = document.createElement('div');
  commentsTooltip.setAttribute('id', 'show-comments');
  document.body.appendChild(commentsTooltip);

  const commentsDownload = document.createElement('div');
  commentsDownload.setAttribute('id', 'download-chapter');
  document.body.appendChild(commentsDownload);

  const commentsSettings = document.createElement('div');
  commentsSettings.setAttribute('id', 'settings-button');
  document.body.appendChild(commentsSettings);

  const store = mockStore({
    layout: {
      language: 'es'
    }
  });
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Provider store={store}>
        <MemoryRouter>
          <ReaderContainer
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

  await global.wait(0);
  await global.wait(1);
  expect(wrapper).toBeTruthy();
});
