import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { Provider } from 'react-redux';
import Series from './';
import store from '../store';

it('should render without throwing an error', () => {
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <Series />
    </Provider>
  );
  wrapper.unmount();
});
