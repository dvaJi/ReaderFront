import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import ComicSlide from './ComicSlide';

const releases = global.rfMocks.releases.getReleases;

it('renders while loading without crashing', async () => {
  const wrapper = mount(
    <MemoryRouter>
      <ComicSlide chapters={[]} isLoading={true} />
    </MemoryRouter>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('renders without crashing', async () => {
  const wrapper = mount(
    <MemoryRouter>
      <ComicSlide chapters={releases} isLoading={false} />
    </MemoryRouter>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
