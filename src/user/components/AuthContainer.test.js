import React from 'react';
import I18n from 'redux-i18n';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
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
    i18nState: {
      lang: 'es',
      translations: {},
      forceRefresh: false
    }
  });
  shallow(
    <I18n store={store} translations={{}}>
      <AuthContainer route={{ pathname: 'LUL' }} />
    </I18n>
  );
});
