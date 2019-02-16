import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { Provider } from 'react-redux';
import { MockedProvider } from 'react-apollo/test-utils';
import { MemoryRouter } from 'react-router-dom';

import Blog from './';
import store from '../store';

const routeProps = {
  match: { params: {} },
  location: {},
  history: {}
};

it('should render without throwing an error', () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={[]} addTypename={false}>
      <Provider store={store}>
        <MemoryRouter>
          <Blog {...routeProps} />
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
