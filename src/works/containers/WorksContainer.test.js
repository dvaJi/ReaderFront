import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import WorksContainer from './WorksContainer';
import App from '../../App';
import { doChangeLanguage } from '../../layout/actions/doChangeLanguage';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

beforeEach(function() {
  moxios.install();
});

afterEach(function() {
  moxios.uninstall();
});

// TODO: Improve this test with moxios

it('should render without throwing an error', () => {
  const store = mockStore({
    works: {
      works: [],
      worksFilterText: '',
      worksIsLoading: false,
      workHasErrored: false
    },
    layout: {
      language: 'es'
    }
  });
  const wrapper = mount(
    <App>
      <Provider store={store}>
        <WorksContainer />
      </Provider>
    </App>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should filter works', () => {
  const store = mockStore({
    works: {
      works: [],
      worksFilterText: '',
      worksIsLoading: false,
      workHasErrored: false
    },
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <WorksContainer />
    </Provider>
  );

  const input = wrapper.find('input[name="q"]');
  input.instance().value = 'a';
  input.simulate('change');
});

it('should render without throwing an error when it receive a new language props', () => {
  const store = mockStore({
    works: {
      works: [],
      worksFilterText: '',
      worksIsLoading: false,
      workHasErrored: false
    },
    layout: {
      language: 'es'
    }
  });
  const wrapper = mount(
    <App>
      <Provider store={store}>
        <WorksContainer />
      </Provider>
    </App>
  );

  store.dispatch(doChangeLanguage('en'));
  wrapper.update();
  store.dispatch(doChangeLanguage('es'));
  wrapper.update();
  wrapper.unmount();
});
