import React from 'react';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';
import { Provider } from 'react-redux';
import { mountWithIntl } from 'enzyme-react-intl';
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
      works: works,
      aggregates: {
        count: 15
      },
      worksIsLoading: false
    },
    layout: {
      language: 'es'
    }
  });
  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'noDescWarn-1');
  document.body.appendChild(div);
  const div2 = document.createElement('div');
  div2.setAttribute('id', 'noDescWarn-2');
  document.body.appendChild(div2);

  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <List store={store} />
      </MemoryRouter>
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
    layout: {
      language: 'es'
    }
  });
  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'noDescWarn');
  document.body.appendChild(div);

  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <List store={store} />
      </MemoryRouter>
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
    layout: {
      language: 'es'
    }
  });
  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'noDescWarn');
  document.body.appendChild(div);

  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <List store={store} />
      </MemoryRouter>
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
        count: 25
      },
      worksIsLoading: false
    },
    layout: {
      language: 'es'
    }
  });
  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'noDescWarn-1');
  document.body.appendChild(div);
  const div2 = document.createElement('div');
  div2.setAttribute('id', 'noDescWarn-2');
  document.body.appendChild(div2);

  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <List store={store} />
      </MemoryRouter>
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
    layout: {
      language: 'es'
    }
  });
  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'noDescWarn-1');
  document.body.appendChild(div);
  const div2 = document.createElement('div');
  div2.setAttribute('id', 'noDescWarn-2');
  document.body.appendChild(div2);

  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <List store={store} />
      </MemoryRouter>
    </Provider>
  );

  global.confirm = () => true;
  const buttons = wrapper.find(ButtonGroup);
  const actionButtons = buttons.first().find(Button);
  actionButtons.last().simulate('click');
  wrapper.unmount();
});
