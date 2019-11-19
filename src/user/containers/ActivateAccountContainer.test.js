import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';
import ActivateAccountContainer from './ActivateAccountContainer';
import { MemoryRouter } from 'react-router-dom';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

beforeEach(function() {
  moxios.install();
});

afterEach(function() {
  moxios.uninstall();
});

it('should render without throwing an error', () => {
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
  const wrapper = shallow(
    <Provider store={store}>
      <ActivateAccountContainer
        location={{ search: '?email=test@aa.com&token=t0k3n' }}
        router={{ location: { pathname: 'AS' } }}
      />
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
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <ActivateAccountContainer
          router={{ location: { pathname: 'AS' } }}
          location={{ search: '?email=test@aa.com&token=t0k3n' }}
        />
      </MemoryRouter>
    </Provider>
  );

  await wrapper.update();

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
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <ActivateAccountContainer
          router={{ location: { pathname: 'AS' } }}
          location={{ search: '?email=test@aa.com&token=t0k3n' }}
        />
      </MemoryRouter>
    </Provider>
  );

  await wrapper.update();

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
