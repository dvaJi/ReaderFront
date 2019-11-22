import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';

import ReleasesContainer from './ReleasesContainer';
import { FETCH_RELEASES } from './query';

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
      <ReleasesContainer />
    </MockedProvider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should render an error if cannot fetch data', async () => {
  const errorMock = {
    request: {
      query: FETCH_RELEASES,
      variables: { language: 1, orderBy: 'DESC', first: 20, offset: 0 }
    },
    error: new Error('Nope')
  };
  const wrapper = await mountWithIntl(
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <MemoryRouter>
        <ReleasesContainer />
      </MemoryRouter>
    </MockedProvider>
  );

  await global.wait(0);
  expect(wrapper.text()).toContain('Error :(');

  wrapper.unmount();
});
