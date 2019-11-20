import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import ComicSlide from './ComicSlide';

const releases = global.rfMocks.releases.getReleases;

it('renders while loading without crashing', async () => {
  const wrapper = await mount(
    <MemoryRouter>
      <ComicSlide blocks={[]} isLoading={true} />
    </MemoryRouter>
  );

  expect(wrapper).toBeTruthy();
  await wrapper.unmount();
});

it('renders without crashing', async () => {
  const blocks = createBlocks(releases);
  const wrapper = mount(
    <MemoryRouter>
      <ComicSlide blocks={blocks} isLoading={false} />
    </MemoryRouter>
  );
  expect(wrapper).toBeTruthy();
  await wrapper.unmount();
});

function createBlocks(chapters) {
  const blocks = [];

  blocks.push({ chapters: chapters, block: 1 });
  blocks.push({ chapters: chapters, block: 2 });
  blocks.push({ chapters: chapters, block: 3 });
  blocks.push({ chapters: chapters, block: 5 });

  return blocks;
}
