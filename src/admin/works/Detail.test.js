import React from 'react';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';
import { Provider } from 'react-redux';
import { mountWithIntl } from 'enzyme-react-intl';
import { Button, ButtonGroup } from 'reactstrap';
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

beforeEach(function() {
  moxios.install();
});

afterEach(function() {
  moxios.uninstall();
});

// TODO: Improve this test with moxios

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

  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <Detail store={store} match={params} />
      </MemoryRouter>
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

  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <Detail store={store} match={params} />
      </MemoryRouter>
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

  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <Detail store={store} match={params} />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should call remove() when Remove button is clicked without throwing an error', () => {
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

  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <Detail store={store} match={params} />
      </MemoryRouter>
    </Provider>
  );

  global.confirm = () => true;
  const buttons = wrapper.find(ButtonGroup);
  const actionButtons = buttons.first().find(Button);
  actionButtons.last().simulate('click');
  wrapper.unmount();
});
