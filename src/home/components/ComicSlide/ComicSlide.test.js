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

const releases = getReleases();

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
  const blocks = createBlocks(releases);
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
