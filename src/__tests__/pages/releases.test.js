import React from 'react';
import { actions } from 'utils/enzyme-actions';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MockedProvider } from '@apollo/client/testing';

import { ReleasesContainer, FETCH_RELEASES } from '@pages/releases';

const chapters = global.rfMocks.releases.getReleases;

const mocks = [
  {
    request: {
      query: FETCH_RELEASES,
      variables: { languages: [], orderBy: 'DESC', first: 20, offset: 0 }
    },
    result: {
      data: {
        chapters
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
    await global.wait(0);

    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});

it('should render an error if cannot fetch data', async () => {
  const errorMock = {
    request: {
      query: FETCH_RELEASES,
      variables: { languages: [], orderBy: 'DESC', first: 20, offset: 0 }
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
    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});
