import React from 'react';
import { mount } from 'enzyme';
import Image from './lazy-component';

it('should render without throwing an error', () => {
  const wrapper = mount(
    <Image src={'/public/images/default-cover.png'} height={100} width={100} />
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should render a default image without throwing an error', () => {
  const wrapper = mount(<Image src={null} height={100} width={100} />);
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
