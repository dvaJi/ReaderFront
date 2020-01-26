import React from 'react';
import { shallow } from 'enzyme';

import App from '../pages/index';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);

  expect(wrapper).toBeTruthy();
});
