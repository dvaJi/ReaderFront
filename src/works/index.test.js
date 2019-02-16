import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { Provider } from 'react-redux';
import { MockedProvider } from 'react-apollo/test-utils';

import Series from './';
import { FETCH_WORKS } from './containers/query';
import store from '../store';

const works = global.rfMocks.work.works;

const mocks = [
  {
    request: {
      query: FETCH_WORKS,
      variables: { language: 1 }
    },
    result: {
      data: {
        chapters: works
      }
    }
  }
];

it('should render without throwing an error', () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Provider store={store}>
        <Series />
      </Provider>
    </MockedProvider>
  );
  wrapper.unmount();
});
