import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { Provider } from 'react-redux';

import HomeContainer from './';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

it('should render without throwing an error', () => {
  const store = mockStore({
    layout: {
      language: 'es'
    }
  });
  const wrapper = mount(
    <MockedProvider mocks={[]} addTypename={false}>
      <Provider store={store}>
        <HomeContainer />
      </Provider>
    </MockedProvider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
