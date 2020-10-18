import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import { MemoryRouter, Route } from 'react-router-dom';

import { FETCH_CHAPTERS, FETCH_WORK } from './query';
import Detail from './Detail';

const chapters = global.rfMocks.releases.getReleases;
const work = global.rfMocks.work.work;

const mocks = [
  {
    request: {
      query: FETCH_CHAPTERS,
      variables: { workId: 1 }
    },
    result: {
      data: {
        chaptersByWorkId: chapters
      }
    }
  },
  {
    request: {
      query: FETCH_WORK,
      variables: { workId: 1 }
    },
    result: {
      data: {
        workById: work
      }
    }
  }
];

it('should render without throwing an error', async () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/work/1/infection']}>
        <Route path="/work/:workId/:stub">
          <Detail />
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);

    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});

it('should show a message when works list is empty without throwing an error', async () => {
  const emptyMocks = [
    {
      request: {
        query: FETCH_CHAPTERS,
        variables: { workId: 1 }
      },
      result: {
        data: {
          chaptersByWorkId: []
        }
      }
    },
    {
      request: {
        query: FETCH_WORK,
        variables: { workId: 1 }
      },
      result: {
        data: {
          workById: { ...work, hidden: true }
        }
      }
    }
  ];
  const wrapper = mountWithIntl(
    <MockedProvider mocks={emptyMocks} addTypename={false}>
      <MemoryRouter initialEntries={['/work/1/infection']}>
        <Route path="/work/:workId/:stub">
          <Detail />
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);

    expect(wrapper.find('#chapters_empty')).toBeDefined();

    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});
