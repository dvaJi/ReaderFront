import React from 'react';
import { mount } from 'enzyme';

import Staff from './Staff';

const work = global.rfMocks.work.work;

it('renders without crashing', () => {
  const wrapper = mount(<Staff staff={work.people_works} onRemove={jest.fn} />);
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
