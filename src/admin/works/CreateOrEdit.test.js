import React from 'react';
import I18n from 'redux-i18n';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { getWork } from "../../utils/mocks/getWorksMock";
import CreateOrEdit from './CreateOrEdit';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const work = getWork();

it('should render without throwing an error', () => {
  const store = mockStore({
    work: {
        work: work
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
          <CreateOrEdit store={store} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
});