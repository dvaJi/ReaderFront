import React from 'react';
import { shallow } from 'enzyme';
import Serie from './';

it('should render without throwing an error', () => {
  jest.spyOn(console, 'error');
  global.console.error.mockImplementation(() => {});
  const wrapper = shallow(<Serie />);

  expect(wrapper).toBeTruthy();
  global.console.error.mockRestore();
});
