import React from 'react';
import { mount } from 'enzyme';
import ComicSlide from '@components/ComicSlide/ComicSlide';

const releases = global.rfMocks.releases.getReleases;

it('renders while loading without crashing', async () => {
  const wrapper = mount(<ComicSlide chapters={[]} isLoading={true} />);

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('renders without crashing', async () => {
  const wrapper = mount(
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
