import React from 'react';
import { shallowWithIntl, mountWithIntl } from 'enzyme-react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import WorkContainer from './WorkContainer';
import App from '../../App';
import { doChangeLanguage } from '../../layout/actions/doChangeLanguage';
import ErrorBoundary from '../../utils/ErrorBoundary';
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
    work: {
      work: null,
      workIsLoading: false,
      workHasErrored: false
    },
    params: { match: { params: {} } },
    layout: {
      language: 'es'
    }
  });
  const wrapper = shallowWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <ErrorBoundary>
          <WorkContainer match={'infection'} />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
});

it('should render without throwing an error when it receive a new language props', () => {
  const store = mockStore({
    work: {
      work: null,
      workIsLoading: false,
      workHasErrored: false
    },
    params: { match: { params: {} } },
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <ErrorBoundary>
          <WorkContainer />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
  );

  store.dispatch(doChangeLanguage('en'));
  wrapper.update();
  wrapper.unmount();
});
