import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import { MockedProvider } from '@apollo/react-testing';

import { ReleasesContainer, FETCH_RELEASES } from '@pages/releases';

const releases = global.rfMocks.releases.getReleases;

const mocks = [
  {
    request: {
      query: FETCH_RELEASES,
      variables: { language: 2, orderBy: 'DESC', first: 20, offset: 0 }
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

  await actions(wrapper, async () => {
    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});

it('should render an error if cannot fetch data', async () => {
  const errorMock = {
    request: {
      query: FETCH_RELEASES,
      variables: { language: 1, orderBy: 'DESC', first: 20, offset: 0 }
    },
    error: new Error('Nope')
  };
  const wrapper = mountWithIntl(
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <ReleasesContainer />
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);
    expect(wrapper.text()).toContain('Error :(');

    wrapper.unmount();
  });
});
