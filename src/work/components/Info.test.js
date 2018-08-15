import React from 'react';
import I18n from 'redux-i18n';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Info from './Info';
import { translations } from '../../translations';
import store from '../../store';
import { getWork } from '../../utils/mocks/getWorksMock';
import { normalizeWork } from '../../utils/normalizeWork';

const description = {
  description: '...'
};

const work = normalizeWork(getWork);

it('renders without crashing', () => {
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <Info work={work} description={description} />
      </I18n>
    </Provider>
  );
  expect(wrapper.find(Info).prop('work')).toBe(work);
  wrapper.unmount();
});

it('renders without a description', () => {
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <Info work={work} />
      </I18n>
    </Provider>
  );
  expect(wrapper.find(Info).prop('work')).toBe(work);
  wrapper.unmount();
});
