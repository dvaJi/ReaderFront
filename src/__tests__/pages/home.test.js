import React from 'react';
import { actions } from 'utils/enzyme-actions';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MockedProvider } from '@apollo/react-testing';

import { HomeContainer, FETCH_RELEASES } from '@pages/home';

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
      <HomeContainer />
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);
    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});
