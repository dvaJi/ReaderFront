import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';

import ReaderContainer from './ReaderContainer';
import { FETCH_CHAPTER } from './queries';

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

  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
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
    </MockedProvider>
  );

  await global.wait(0);
  await global.wait(1);
  expect(wrapper).toBeTruthy();
});
