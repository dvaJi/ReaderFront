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
import { getWorks } from '../../utils/mocks/getWorksMock';
import List from './List';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const works = getWorks;

it('should render without throwing an error', () => {
  const store = mockStore({
    works: {
      works: works,
      aggregates: {
        count: 15
      },
      worksIsLoading: false
    },
    i18nState: {
      lang: 'es',
      translations: {},
      forceRefresh: false
    }
  });
  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'noDescWarn');
  document.body.appendChild(div);

  const wrapper = mount(
    <Provider store={store}>
      <I18n store={store} translations={{}}>
        <MemoryRouter>
          <List store={store} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should render when is loading without throwing an error', () => {
  const store = mockStore({
    works: {
      works: [],
      aggregates: {
        count: 15
      },
      worksIsLoading: true
    },
    i18nState: {
      lang: 'es',
      translations: {},
      forceRefresh: false
    }
  });
  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'noDescWarn');
  document.body.appendChild(div);

  const wrapper = mount(
    <Provider store={store}>
      <I18n store={store} translations={{}}>
        <MemoryRouter>
          <List store={store} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should show a message when works list is empty without throwing an error', () => {
  const store = mockStore({
    works: {
      works: [],
      aggregates: {
        count: 15
      },
      worksIsLoading: false
    },
    i18nState: {
      lang: 'es',
      translations: {},
      forceRefresh: false
    }
  });
  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'noDescWarn');
  document.body.appendChild(div);

  const wrapper = mount(
    <Provider store={store}>
      <I18n store={store} translations={{}}>
        <MemoryRouter>
          <List store={store} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should change pagination without throwing an error', () => {
  const store = mockStore({
    works: {
      works: works,
      aggregates: {
        count: 15
      },
      worksIsLoading: false
    },
    i18nState: {
      lang: 'es',
      translations: {},
      forceRefresh: false
    }
  });
  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'noDescWarn');
  document.body.appendChild(div);

  const wrapper = mount(
    <Provider store={store}>
      <I18n store={store} translations={{}}>
        <MemoryRouter>
          <List store={store} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
  const paginationItems = wrapper.find(PaginationItem);
  paginationItems
    .last()
    .find(PaginationLink)
    .simulate('click');
  wrapper.unmount();
});

it('should call removeWork when Remove button is clicked without throwing an error', () => {
  const store = mockStore({
    works: {
      works: works,
      aggregates: {
        count: 15
      },
      worksIsLoading: false
    },
    i18nState: {
      lang: 'es',
      translations: {},
      forceRefresh: false
    }
  });
  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'noDescWarn');
  document.body.appendChild(div);

  const wrapper = mount(
    <Provider store={store}>
      <I18n store={store} translations={{}}>
        <MemoryRouter>
          <List store={store} />
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
