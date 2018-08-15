import React from 'react';
import I18n from 'redux-i18n';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { Form, ButtonDropdown } from 'reactstrap';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { getWork } from '../../utils/mocks/getWorksMock';
import CreateOrEdit from './CreateOrEdit';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const work = getWork;

it('should render without throwing an error', () => {
  const store = mockStore({
    work: {
      work: work
    },
    i18nState: {
      lang: 'es',
      translations: {},
      forceRefresh: false
    }
  });
  const wrapper = mount(
    <Provider store={store}>
      <I18n store={store} translations={{}}>
        <MemoryRouter>
          <CreateOrEdit store={store} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
});

it('should fill the form without throwing an error', () => {
  const store = mockStore({
    work: {
      work: work
    },
    i18nState: {
      lang: 'es',
      translations: {},
      forceRefresh: false
    }
  });
  const wrapper = mount(
    <Provider store={store}>
      <I18n store={store} translations={{}}>
        <MemoryRouter>
          <CreateOrEdit store={store} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );

  const inputName = wrapper.find(Form).find('input[name="name"]');
  inputName.simulate('change', {
    target: { value: 'Awesome manga', name: 'name' }
  });
  const selectStatus = wrapper.find(Form).find('select[name="status"]');
  selectStatus.simulate('change', { target: { value: 2, name: 'status' } });
  const selectDemographic = wrapper
    .find(Form)
    .find('select[name="demographicId"]');
  selectDemographic.simulate('change', {
    target: { value: 3, name: 'demographicId' }
  });
  const selectType = wrapper.find(Form).find('select[name="type"]');
  selectType.simulate('change', { target: { value: 'Manga', name: 'type' } });

  wrapper.find('Button[type="submit"]').simulate('click');
  wrapper.unmount();
});

it('should render without throwing an error', async () => {
  const store = mockStore({
    work: {
      work: work
    },
    i18nState: {
      lang: 'es',
      translations: {},
      forceRefresh: false
    }
  });
  const wrapper = mount(
    <Provider store={store}>
      <I18n store={store} translations={{}}>
        <MemoryRouter>
          <CreateOrEdit store={store} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );

  const form = wrapper.find(Form);
  const inputName = form.find('input[name="name"]');
  inputName.simulate('change', {
    target: { value: 'Awesome manga', name: 'name' }
  });
  const selectStatus = form.find('select[name="status"]');
  selectStatus.simulate('change', { target: { value: 2, name: 'status' } });
  const selectDemographic = wrapper
    .find(Form)
    .find('select[name="demographicId"]');
  selectDemographic.simulate('change', {
    target: { value: 3, name: 'demographicId' }
  });
  const selectType = form.find('select[name="type"]');
  selectType.simulate('change', { target: { value: 'Manga', name: 'type' } });

  await form.simulate('submit');
  wrapper.unmount();
});

it('should render without throwing an error', async () => {
  const store = mockStore({
    work: {
      work: work
    },
    i18nState: {
      lang: 'es',
      translations: {},
      forceRefresh: false
    }
  });
  const wrapper = mount(
    <Provider store={store}>
      <I18n store={store} translations={{}}>
        <MemoryRouter>
          <CreateOrEdit store={store} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );

  const form = wrapper.find(Form);
  const addLanguageButtons = form.find(ButtonDropdown).find('button');
  await addLanguageButtons.last().simulate('click');

  wrapper.unmount();
});
