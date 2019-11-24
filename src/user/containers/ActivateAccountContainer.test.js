import React from 'react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import { MemoryRouter, Route, Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';

import ActivateAccountContainer from './ActivateAccountContainer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

beforeEach(function() {
  moxios.install();
});

afterEach(function() {
  moxios.uninstall();
});

it('should render without throwing an error', () => {
  const history = createMemoryHistory();
  const store = mockStore({
    user: { isLoading: false, error: null },
    router: {
      location: {
        pathname: 'LUL'
      }
    },
    layout: {
      language: 'es'
    }
  });

  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <Router history={history}>
          <ActivateAccountContainer
            location={{ search: '?email=test@aa.com&token=t0k3n' }}
            router={{ location: { pathname: 'AS' } }}
          />
        </Router>
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
});

it('should show a success message if account is activated', async () => {
  const store = mockStore({
    user: { isLoading: false, error: null },
    router: {
      location: {
        pathname: 'LUL'
      }
    },
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[
          '/auth/activate_account?email=test@aa.com&token=t0k3n'
        ]}
      >
        <Route path="/auth/activate_account">
          <ActivateAccountContainer
            router={{ location: { pathname: 'AS' } }}
            location={{ search: '?email=test@aa.com&token=t0k3n' }}
          />
        </Route>
      </MemoryRouter>
    </Provider>
  );

  await actions(wrapper, async () => {
    wrapper.update();

    let request = moxios.requests.mostRecent();
    await request.respondWith({
      status: 200,
      statusText: 'OK',
      response: {
        data: {
          userActivate: {
            email: 'test@aa.com'
          }
        }
      }
    });

    wrapper.unmount();
  });
});

it('should show an error message if account can not be activated', async () => {
  const store = mockStore({
    user: { isLoading: false, error: null },
    router: {
      location: {
        pathname: 'LUL'
      }
    },
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[
          '/auth/activate_account?email=test@aa.com&token=t0k3n'
        ]}
      >
        <ActivateAccountContainer
          router={{ location: { pathname: 'AS' } }}
          location={{ search: '?email=test@aa.com&token=t0k3n' }}
        />
      </MemoryRouter>
    </Provider>
  );

  await actions(wrapper, async () => {
    wrapper.update();

    await global.wait(0);

    let request = moxios.requests.mostRecent();
    await request.respondWith({
      status: 500,
      statusText: 'ERROR',
      response: {
        data: {
          error: ':<'
        }
      }
    });

    expect(wrapper.find('#activate-account_error_alert')).toBeDefined();

    wrapper.unmount();
  });
});
