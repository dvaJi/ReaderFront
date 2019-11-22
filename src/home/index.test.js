import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MockedProvider } from '@apollo/react-testing';

import HomeContainer from './';

it('should render without throwing an error', () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={[]} addTypename={false}>
      <HomeContainer />
    </MockedProvider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
