import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router-dom';

import Blog from './';

const routeProps = {
  match: { params: {} },
  location: {},
  history: {}
};

it('should render without throwing an error', () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={[]} addTypename={false}>
      <MemoryRouter>
        <Blog {...routeProps} />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
