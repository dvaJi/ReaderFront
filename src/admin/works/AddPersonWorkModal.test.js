import React from 'react';
import { mount } from 'enzyme';

import AddPersonWorkModal from './AddPersonWorkModal';

it('renders without crashing', () => {
  const wrapper = mount(
    <AddPersonWorkModal isOpen={true} toggleModal={jest.fn} />
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
