import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mountWithIntl } from 'enzyme-react-intl';
import { Form, ButtonDropdown } from 'reactstrap';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import moxios from '@anilanar/moxios';
import { getWork } from '../../utils/mocks/getWorksMock';
import CreateOrEdit from './CreateOrEdit';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const work = getWork;

beforeEach(function() {
  moxios.install();
});

afterEach(function() {
  moxios.uninstall();
});

// TODO: Improve this test with moxios

it('should render without throwing an error', () => {
  const store = mockStore({
    work: {
      work: work
    },
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <CreateOrEdit store={store} />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
});

it('should fill the form without throwing an error', () => {
  const store = mockStore({
    work: {
      work: work
    },
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <CreateOrEdit store={store} />
      </MemoryRouter>
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
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <CreateOrEdit store={store} />
      </MemoryRouter>
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

it('should add a language without throwing an error', async () => {
  const store = mockStore({
    work: {
      work: work
    },
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <CreateOrEdit store={store} />
      </MemoryRouter>
    </Provider>
  );

  const form = wrapper.find(Form);
  const addLanguageButtons = form.find(ButtonDropdown).find('button');
  await addLanguageButtons.last().simulate('click');

  wrapper.unmount();
});
