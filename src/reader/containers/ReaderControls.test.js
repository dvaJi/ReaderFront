import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';

import ReaderControls from './ReaderControls';
import { FETCH_CHAPTERS } from './queries';

const releases = global.rfMocks.releases.getReleases;

const mocks = [
  {
    request: {
      query: FETCH_CHAPTERS,
      variables: {
        workStub: 'bob1',
        language: 1
      }
    },
    result: {
      data: {
        chaptersByWork: releases
      }
    }
  }
];

it('should render without throwing an error', async () => {
  const toggleCommentsMock = jest.fn();
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
        <ReaderControls
          work={releases[0].work}
          language={1}
          chapter={releases[0]}
          toggleComments={toggleCommentsMock}
          showNav={true}
        />
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);
    expect(wrapper).toBeTruthy();
  });
});

it('should render without throwing an error', async () => {
  const toggleCommentsMock = jest.fn();
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
        <ReaderControls
          work={releases[0].work}
          language={1}
          chapter={releases[0]}
          toggleComments={toggleCommentsMock}
          showNav={false}
        />
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);
    expect(wrapper).toBeTruthy();
  });
});
