import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';

import Detail from './index';
import { FETCH_CHAPTER } from '../query';

const releases = global.rfMocks.releases.getReleases;
const pages = global.rfMocks.releases.getPages;

const mocks = [
  {
    request: {
      query: FETCH_CHAPTER,
      variables: {
        chapterId: 1
      }
    },
    result: {
      data: {
        chapterById: { ...releases[0], pages: pages }
      }
    }
  }
];

it('should render without throwing an error', async () => {
  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'select-default-1298337316');
  document.body.appendChild(div);

  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/work/1/infection/chapter/1']}>
        <Route path="/work/:workId/:stub/chapter/:chapterId">
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
