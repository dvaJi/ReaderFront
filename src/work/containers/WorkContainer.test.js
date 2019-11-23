import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';

import { FETCH_WORK } from './query';
import WorkContainer from './WorkContainer';

const chapters = global.rfMocks.releases.getReleases;
const work = global.rfMocks.work.work;

const mocks = [
  {
    request: {
      query: FETCH_WORK,
      variables: { language: 2, stub: 'infection' }
    },
    result: {
      data: {
        work: { ...work, chapters: chapters }
      }
    }
  }
];

it('should render without throwing an error', async () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/work/infection']}>
        <Route path="/work/:stub">
          <WorkContainer />
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
