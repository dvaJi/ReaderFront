import React from 'react';
import I18n from 'redux-i18n';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import RecommendedWork from './RecommendedWork';
import { translations } from '../../../translations';
import store from '../../../store';

it('renders while loading without crashing', () => {
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <MemoryRouter>
            <RecommendedWork title={'Test 1'} work={{}} description={''} isLoading={true} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('renders without crashing', () => {
  const work = generateWork();
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <MemoryRouter>
          <RecommendedWork title={'Test 2'} work={work} description={'Desc'} isLoading={false} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

function generateWork() {
  return {
    id: 1,
    name: 'Aka Akatoshitachi no Monogatari',
    stub: 'aka_akatoshitachi_no_monogatari'
  };
}
