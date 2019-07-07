import React from 'react';
import { mount } from 'enzyme';
import ErrorNotFound from './ErrorNotFound';

it('should render without throwing an error', () => {
  const wrapper = mount(<ErrorNotFound />);
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
