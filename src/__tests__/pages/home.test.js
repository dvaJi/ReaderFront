import React from 'react';
import { actions } from 'utils/enzyme-actions';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MockedProvider } from '@apollo/client/testing';
import * as nextRouter from 'next/router';

import {
  HomeContainer,
  FETCH_RELEASES,
  FETCH_LATEST_WORKS,
  FETCH_RANDOM_WORK
} from '@pages/home';

const chapters = global.rfMocks.releases.getReleases;
const works = global.rfMocks.work.works;

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
  },
  {
    request: {
      query: FETCH_LATEST_WORKS,
      variables: { languages: [] }
    },
    result: {
      data: {
        works
      }
    }
  },
  {
    request: {
      query: FETCH_RANDOM_WORK,
      variables: { languages: [] }
    },
    result: {
      data: {
        workRandom: works[0]
      }
    }
  }
];

it('should render without throwing an error', async () => {
  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({
    route: '/',
    query: {},
    pathname: '/',
    prefetch: async () => undefined
  }));
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
