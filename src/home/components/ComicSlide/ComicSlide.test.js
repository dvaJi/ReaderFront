import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import ComicSlide from './ComicSlide';
import NextButton from './NextButton';
import { getReleases } from '../../../utils/mocks/getReleasesMock';

const releases = getReleases();

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

it('should update state when NextButton is clicked', async () => {
  const blocks = createBlocks(releases);
  const wrapper = mount(
    <MemoryRouter>
      <ComicSlide blocks={blocks} isLoading={false} />
    </MemoryRouter>
  );

  const oldState = wrapper.find(ComicSlide).instance().state._transform;
  wrapper
    .find(NextButton)
    .first()
    .simulate('click');
  wrapper.update();
  const newState = wrapper.find(ComicSlide).instance().state._transform;
  expect(oldState).toBeGreaterThan(newState);
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
