import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MockedProvider } from '@apollo/react-testing';

import Series from './';
import { FETCH_WORKS } from './containers/query';

const mocks = [
  {
    request: {
      query: FETCH_WORKS,
      variables: { language: 1 }
    },
    result: {
      data: {
        chapters: global.rfMocks.work.works
      }
    }
  }
];

it('should render without throwing an error', () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Series />
    </MockedProvider>
  );
  wrapper.unmount();
});
