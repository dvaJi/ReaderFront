import React from 'react';
import thunk from 'redux-thunk';
import { shallowWithIntl } from 'enzyme-react-intl';
import configureMockStore from 'redux-mock-store';
import AuthContainer from './AuthContainer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

it('renders without crashing', () => {
  const store = mockStore({
    user: {},
    router: {
      location: {
        pathname: 'LUL'
      }
    },
    layout: {
      language: 'es'
    }
  });
  const wrapper = shallowWithIntl(<AuthContainer route={{ pathname: 'LUL' }} />);

  expect(wrapper).toBeTruthy();
});
