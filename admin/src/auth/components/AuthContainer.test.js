import React from 'react';
import { shallow } from 'enzyme';
import AuthContainer from './AuthContainer';

it('renders without crashing', () => {
  const wrapper = shallow(<AuthContainer route={{ pathname: 'LUL' }} />);

  expect(wrapper).toBeTruthy();
});
