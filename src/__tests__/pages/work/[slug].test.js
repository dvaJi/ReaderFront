import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MockedProvider } from '@apollo/react-testing';
import { actions } from 'utils/enzyme-actions';
import * as nextRouter from 'next/router';

import { WorkContainer, FETCH_WORK } from '@pages/work/[lang]/[slug]';

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
  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({
    route: '/work/infection',
    query: { slug: 'infection' }
  }));
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <WorkContainer />
    </MockedProvider>
  );
  await actions(wrapper, async () => {
    await global.wait(0);
    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});
