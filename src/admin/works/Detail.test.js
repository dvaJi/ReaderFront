import React from 'react';
import I18n from 'redux-i18n';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import {
  PaginationItem,
  PaginationLink,
  Button,
  ButtonGroup
} from 'reactstrap';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { getReleases } from '../../utils/mocks/getReleasesMock';
import Detail from './Detail';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const chapters = getReleases(2);
const params = {
  params: {
    workId: 0,
    stub: ''
  }
};

it('should render without throwing an error', () => {
  const store = mockStore({
    reader: {
      chapters: chapters,
      readerIsLoading: false
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
          <Detail store={store} match={params} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should render when is loading without throwing an error', () => {
  const store = mockStore({
    reader: {
      chapters: [],
      readerIsLoading: true
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
          <Detail store={store} match={params} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should show a message when works list is empty without throwing an error', () => {
  const store = mockStore({
    reader: {
      chapters: [],
      readerIsLoading: false
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
          <Detail store={store} match={params} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should call remove when Remove button is clicked without throwing an error', () => {
  const store = mockStore({
    reader: {
      chapters: chapters,
      readerIsLoading: false
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
          <Detail store={store} match={params} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );

  global.confirm = () => true;
  const buttons = wrapper.find(ButtonGroup);
  const actionButtons = buttons.first().find(Button);
  actionButtons.last().simulate('click');
  wrapper.unmount();
});
