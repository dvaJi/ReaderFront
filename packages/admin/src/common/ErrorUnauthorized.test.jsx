import React from 'react';
import { mount } from 'enzyme';
import ErrorUnauthorized from './ErrorUnauthorized';

it('should render without throwing an error', () => {
  const wrapper = mount(<ErrorUnauthorized />);
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
