import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import { MockedProvider } from '@apollo/client/testing';
import * as nextRouter from 'next/router';

import {
  ReaderContainer,
  FETCH_CHAPTER
} from '@pages/read/[slug]/[lang]/[volume]/[chapter]';
import { FETCH_CHAPTERS } from '@components/Read/ReaderControls';

const releases = global.rfMocks.releases.getReleases;
const pages = global.rfMocks.releases.getPages;

const mocks = [
  {
    request: {
      query: FETCH_CHAPTER,
      variables: {
        workStub: 'infection',
        language: 2,
        volume: 1,
        chapter: 1,
        subchapter: 0
      }
    },
    result: {
      data: {
        chapterByWorkAndChapter: { ...releases[0], pages }
      }
    }
  },
  {
    request: {
      query: FETCH_CHAPTERS,
      variables: {
        workStub: 'bob1',
        languages: [2]
      }
    },
    result: {
      data: {
        chaptersByWork: releases
      }
    }
  },
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
  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({
    route: '/read/infection/en/1/1.0',
    query: { slug: 'infection', lang: 'en', volume: '1', chapter: '1.0' },
    pathname: '/read/infection/en/1/1.0',
    prefetch: async () => undefined
  }));

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
      <ReaderContainer />
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);
    expect(wrapper).toBeTruthy();
  });

  wrapper.unmount();
});

it('should render an error page', async () => {
  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({
    route: '/read/infection/en/1/1.0',
    query: { slug: 'infection', lang: 'en', volume: '1', chapter: '1.0' },
    pathname: '/read/infection/en/1/1.0',
    prefetch: async () => undefined
  }));
  const errormocks = [
    {
      request: {
        query: FETCH_CHAPTER,
        variables: {
          workStub: 'infection',
          language: 2,
          volume: 1,
          chapter: 1,
          subchapter: 0
        }
      },
      error: new Error('Nope')
    }
  ];

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
    <MockedProvider mocks={errormocks} addTypename={false}>
      <ReaderContainer />
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);
    expect(wrapper).toBeTruthy();

    expect(wrapper.find('#error_general')).toBeTruthy();
  });

  wrapper.unmount();
});

it('should render an license notice info page', async () => {
  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({
    route: '/read/infection/en/1/1.0',
    query: { slug: 'infection', lang: 'en', volume: '1', chapter: '1.0' },
    pathname: '/read/infection/en/1/1.0',
    prefetch: async () => undefined
  }));
  const errormocks = [
    {
      request: {
        query: FETCH_CHAPTER,
        variables: {
          workStub: 'infection',
          language: 2,
          volume: 1,
          chapter: 1,
          subchapter: 0
        }
      },
      result: {
        data: {
          chapterByWorkAndChapter: {
            ...releases[0],
            pages,
            work: { ...releases[0].work, licensed: true }
          }
        }
      }
    },
    {
      request: {
        query: FETCH_CHAPTERS,
        variables: {
          workStub: 'bob1',
          languages: [2]
        }
      },
      result: {
        data: {
          chaptersByWork: releases
        }
      }
    }
  ];

  const wrapper = mountWithIntl(
    <MockedProvider mocks={errormocks} addTypename={false}>
      <ReaderContainer />
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);
    expect(wrapper).toBeTruthy();

    expect(wrapper.find('#license')).toBeTruthy();
  });

  wrapper.unmount();
});
