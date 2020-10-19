import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import { MockedProvider } from '@apollo/client/testing';

import {
  ReaderControls,
  FETCH_CHAPTERS
} from '@components/Read/ReaderControls';

const releases = global.rfMocks.releases.getReleases;

const mocks = [
  {
    request: {
      query: FETCH_CHAPTERS,
      variables: {
        workStub: 'bob1',
        languages: [1]
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
      <ReaderControls
        work={releases[0].work}
        language={1}
        chapter={releases[0]}
        toggleComments={toggleCommentsMock}
        showNav={true}
      />
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);
    expect(wrapper).toBeTruthy();
  });

  wrapper.unmount();
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
      <ReaderControls
        work={releases[0].work}
        language={1}
        chapter={releases[0]}
        toggleComments={toggleCommentsMock}
        showNav={false}
      />
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);
    expect(wrapper).toBeTruthy();
  });

  wrapper.unmount();
});
