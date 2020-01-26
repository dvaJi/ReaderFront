import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import ErrorGeneral from './ErrorGeneral';

it('should render without throwing an error', () => {
  const wrapper = mountWithIntl(<ErrorGeneral />);
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
