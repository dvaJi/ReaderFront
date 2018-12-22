import React from 'react';
import { Provider } from 'react-redux';
import { shallowWithIntl, mountWithIntl } from 'enzyme-react-intl';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';
import SignupContainer from './SignupContainer';
import { Form } from 'reactstrap';
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
    user: {}
  });
  const wrapper = shallowWithIntl(
    <Provider store={store}>
      <SignupContainer />
    </Provider>
  );

  expect(wrapper).toBeTruthy();
});

it('should render without throwing an error', async () => {
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
        <SignupContainer router={{ location: { pathname: 'AS' } }} />
      </MemoryRouter>
    </Provider>
  );

  const form = wrapper.find(Form);
  const inputUsername = form.find('input[name="name"]');
  inputUsername.simulate('change', { target: { value: 'user01' } });

  const inputEmail = form.find('input[name="email"]');
  inputEmail.simulate('change', { target: { value: 'test@example.com' } });

  const inputPasword = form.find('input[name="password"]');
  inputPasword.simulate('change', { target: { value: '123456' } });

  await form.simulate('submit');

  let request = moxios.requests.mostRecent();
  await request.respondWith({
    status: 200,
    statusText: 'OK',
    response: {
      data: {
        userSignup: {
          token: 'f4k3T0k3N',
          user: {
            name: 'user01',
            email: 'test@example.com',
            role: 'user'
          }
        }
      }
    }
  });

  wrapper.unmount();
});

it('should render an error', async () => {
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
        <SignupContainer router={{ location: { pathname: 'AS' } }} />
      </MemoryRouter>
    </Provider>
  );

  const form = wrapper.find(Form);
  const inputUsername = form.find('input[name="name"]');
  inputUsername.simulate('change', { target: { value: 'user01' } });

  const inputEmail = form.find('input[name="email"]');
  inputEmail.simulate('change', { target: { value: 'test@example.com' } });

  const inputPasword = form.find('input[name="password"]');
  inputPasword.simulate('change', { target: { value: '123456' } });

  await form.simulate('submit');

  let request = moxios.requests.mostRecent();
  await request.respondWith({
    status: 400,
    statusText: 'ERROR',
    response: {
      data: {
        error: 'Error :('
      }
    }
  });

  expect(wrapper.find('#signup_error_alert')).toBeDefined();

  wrapper.unmount();
});
