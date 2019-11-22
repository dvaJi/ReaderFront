import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MockedProvider } from '@apollo/react-testing';

import { FETCH_RELEASES } from './queries';
import HomeContainer from './HomeContainer';

const releases = global.rfMocks.releases.getReleases;

const mocks = [
  {
    request: {
      query: FETCH_RELEASES,
      variables: { language: 1, orderBy: 'DESC', first: 20, offset: 0 }
    },
    result: {
      data: {
        chapters: releases
      }
    }
  }
];

it('should render without throwing an error', async () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <HomeContainer />
      </MemoryRouter>
    </MockedProvider>
  );

  await global.wait(0);
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
