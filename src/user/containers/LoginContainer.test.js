import React from 'react';
import { Form } from 'reactstrap';
import { Provider } from 'react-redux';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';

import LoginContainer from './LoginContainer';

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
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <LoginContainer />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
});

it('should render without throwing an error', async () => {
  const store = mockStore({
    user: { isLoading: false, error: null },
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/auth/login']}>
        <Route path="/auth/login">
          <LoginContainer
            router={{ location: { pathname: 'AS' } }}
            user={{ isLoading: false, error: null }}
          />
        </Route>
      </MemoryRouter>
    </Provider>
  );

  await actions(wrapper, async () => {
    const form = wrapper.find(Form);
    const inputEmail = form.find('input[name="email"]');
    inputEmail.simulate('change', { target: { value: 'test@example.com' } });
    const inputPasword = form.find('input[name="password"]');
    inputPasword.simulate('change', { target: { value: '123456' } });

    form.simulate('submit');

    await global.wait(0);

    let request = moxios.requests.mostRecent();
    await request.respondWith({
      status: 200,
      statusText: 'OK',
      response: {
        data: {
          userLogin: {
            token: 'f4k3T0k3N',
            user: {
              name: 'Admin',
              email: 'my@email.com',
              role: 'admin'
            }
          }
        }
      }
    });

    wrapper.unmount();
  });
});

it('should render an error if login not match', async () => {
  const state = {
    user: { isLoading: false, error: null },
    router: {
      location: {
        pathname: 'LUL'
      }
    },
    layout: {
      language: 'es'
    }
  };
  const store = mockStore(state);
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <LoginContainer
          router={{ location: { pathname: 'AS' } }}
          user={{ isLoading: false, error: null }}
        />
      </MemoryRouter>
    </Provider>
  );

  await actions(wrapper, async () => {
    const form = wrapper.find(Form);
    const inputEmail = form.find('input[name="email"]');
    inputEmail.simulate('change', { target: { value: 'iam@god.com' } });
    const inputPasword = form.find('input[name="password"]');
    inputPasword.simulate('change', { target: { value: 'h4ck3rm4n' } });

    form.simulate('submit');

    await global.wait(0);

    let request = moxios.requests.mostRecent();
    await request.respondWith({
      status: 200,
      statusText: 'OK',
      response: {
        errors: [
          {
            message: 'You dont rule here :('
          }
        ]
      }
    });

    wrapper.unmount();
  });
});
