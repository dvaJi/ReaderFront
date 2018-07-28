import React from 'react';
import I18n from 'redux-i18n';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import PropTypes from 'prop-types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginContainer from './LoginContainer';
import { Button, Form } from 'reactstrap';
import { MemoryRouter } from 'react-router-dom';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

it('should render without throwing an error', () => {
  const store = mockStore({
    user: {}
  });
  const wrapper = shallow(<LoginContainer store={store} />);

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
          <LoginContainer
            store={store}
            router={{ location: { pathname: 'AS' } }}
            user={{ isLoading: false, error: null }}
          />
        </MemoryRouter>
      </I18n>
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
});
