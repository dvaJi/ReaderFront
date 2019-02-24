import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';

// App imports
import EditChapter from './EditChapter';
import { UPDATE_CHAPTER } from '../mutations';
import { FETCH_CHAPTER } from '../query';

const releases = global.rfMocks.releases.getReleases;
const mocks = [
  {
    request: {
      query: FETCH_CHAPTER,
      variables: { chapterId: 1 }
    },
    result: {
      data: {
        chapterById: releases[0]
      }
    }
  },
  {
    request: {
      query: UPDATE_CHAPTER,
      variables: { ...releases[0] }
    },
    result: {
      data: {
        chapterUpdate: { id: 1 }
      }
    }
  }
];

it('should render without throwing an error', async () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <EditChapter />
      </MemoryRouter>
    </MockedProvider>
  );

  await global.wait(0);
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
