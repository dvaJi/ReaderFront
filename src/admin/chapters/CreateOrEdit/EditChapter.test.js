import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';

import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';

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
        chapterById: { ...releases[0], pages: [] }
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
      <MemoryRouter
        initialEntries={['/admincp/work/1/infection/chapter/edit/1']}
      >
        <Route path="/admincp/work/:workId/:stub/chapter/edit/:chapterId">
          <EditChapter />
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
