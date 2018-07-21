import React from 'react';
import I18n from 'redux-i18n';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import ComicSlide from './ComicSlide';
import NextButton from './NextButton';
import HomeContainer from '../../containers/HomeContainer';
import { translations } from '../../../translations';
import store from '../../../store';
import { getReleases } from '../../../utils/mocks/getReleasesMock';

it('renders while loading without crashing', async () => {
  const wrapper = await mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <MemoryRouter>
          <ComicSlide blocks={[]} isLoading={true} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
  await wrapper.unmount();
});

it('renders without crashing', async () => {
  const blocks = createBlocks(getReleases());
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <MemoryRouter>
          <ComicSlide blocks={blocks} isLoading={false} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );
  expect(wrapper).toBeTruthy();
  await wrapper.unmount();
});

it('should update state when NextButton is clicked', async () => {
  const blocks = createBlocks(getReleases(20));
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

function generateRandomBlock(previousBlock) {
  var num = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
  return num === 4 || num === previousBlock ? generateRandomBlock() : num;
}

function createBlocks(chapters) {
  const blocks = [];
  let blockNumber = generateRandomBlock();

  chapters.forEach((chapter, index) => {
    if (blocks.length === 0) {
      blocks.push({ chapters: [chapter], block: blockNumber });
    } else if (
      blocks[blocks.length - 1].chapters.length <
      blocks[blocks.length - 1].block
    ) {
      blocks[blocks.length - 1].chapters.push(chapter);
    } else {
      do {
        blockNumber = generateRandomBlock(blockNumber);
      } while (blockNumber > chapters.length - index);
      blocks.push({ chapters: [chapter], block: blockNumber });
    }
  });

  return blocks;
}
