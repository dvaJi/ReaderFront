import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { FETCH_CHAPTERS, FETCH_WORK } from './query';
import Detail from './Detail';

const chapters = global.rfMocks.releases.getReleases;
const work = global.rfMocks.work.work;
const params = {
  params: {
    workId: 1,
    stub: 'infection'
  }
};

const mocks = [
  {
    request: {
      query: FETCH_CHAPTERS,
      variables: { language: -1, workStub: params.params.stub }
    },
    result: {
      data: {
        chaptersByWork: chapters
      }
    }
  },
  {
    request: {
      query: FETCH_WORK,
      variables: { language: -1, stub: params.params.stub }
    },
    result: {
      data: {
        work: work
      }
    }
  }
];

it('should render without throwing an error', async () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Detail match={params} />
      </MemoryRouter>
    </MockedProvider>
  );

  await global.wait(0);

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should show a message when works list is empty without throwing an error', async () => {
  const emptyMocks = [
    {
      request: {
        query: FETCH_CHAPTERS,
        variables: { language: -1, workStub: params.params.stub }
      },
      result: {
        data: {
          chaptersByWork: []
        }
      }
    },
    {
      request: {
        query: FETCH_WORK,
        variables: { language: -1, stub: params.params.stub }
      },
      result: {
        data: {
          work: { ...work, hidden: true }
        }
      }
    }
  ];
  const wrapper = mount(
    <MockedProvider mocks={emptyMocks} addTypename={false}>
      <MemoryRouter>
        <Detail match={params} />
      </MemoryRouter>
    </MockedProvider>
  );

  await global.wait(0);

  expect(wrapper.find('#chapters_empty')).toBeDefined();

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
