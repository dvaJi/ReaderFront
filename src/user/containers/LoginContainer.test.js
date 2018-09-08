import React from 'react';
import { Provider } from 'react-redux';
import { shallowWithIntl, mountWithIntl } from 'enzyme-react-intl';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';
import LoginContainer from './LoginContainer';
import { Button, Form } from 'reactstrap';
import { MemoryRouter } from 'react-router-dom';

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
    user: {}
  });
  const wrapper = shallowWithIntl(<LoginContainer store={store} />);

  expect(wrapper).toBeTruthy();
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
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <LoginContainer
          store={store}
          router={{ location: { pathname: 'AS' } }}
          user={{ isLoading: false, error: null }}
        />
      </MemoryRouter>
    </Provider>
  );

  const inputEmail = wrapper.find(Form).find('input[name="email"]');
  inputEmail.simulate('change', { target: { value: 'test@example.com' } });
  const inputPasword = wrapper.find(Form).find('input[name="password"]');
  inputPasword.simulate('change', { target: { value: '123456' } });

  wrapper
    .find(Button)
    .first()
    .simulate('click');
  wrapper.unmount();
});
