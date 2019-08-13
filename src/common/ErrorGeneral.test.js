import React from 'react';
import { mount } from 'enzyme';
import ErrorGeneral from './ErrorGeneral';

it('should render without throwing an error', () => {
  const wrapper = mount(<ErrorGeneral />);
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
