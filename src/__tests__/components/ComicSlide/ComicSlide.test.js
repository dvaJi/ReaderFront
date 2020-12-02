import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import ComicSlide from '@components/ComicSlide/ComicSlide';
import * as nextRouter from 'next/router';

const releases = global.rfMocks.releases.getReleases;

it('renders while loading without crashing', async () => {
  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({
    route: '/read/infection/en/1/1.0',
    query: { slug: 'infection', lang: 'en', volume: '1', chapter: '1.0' },
    pathname: '/read/infection/en/1/1.0',
    prefetch: async () => undefined
  }));
  const wrapper = mountWithIntl(<ComicSlide chapters={[]} isLoading={true} />);

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('renders without crashing', async () => {
  const wrapper = mountWithIntl(
    <ComicSlide
      chapters={[
        ...releases,
        ...releases,
        ...releases,
        ...releases,
        ...releases
      ]}
      isLoading={false}
    />
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
