import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Reader from './';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

it('should render without throwing an error', () => {
  const store = mockStore({
    reader: {},
    match: {
      params: {
        stub: 'mango'
      }
    },
    layout: {
      language: 'es'
    }
  });

  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <Reader />
      </MemoryRouter>
    </Provider>
  );
  wrapper.unmount();
});
