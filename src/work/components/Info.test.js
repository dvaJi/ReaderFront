import React from 'react';
import { mount } from 'enzyme';
import Info from './Info';

const description = {
  description: '...'
};

const work = global.rfMocks.work.workNormalized;

it('renders without crashing', () => {
  const wrapper = mount(<Info work={work} description={description} />);
  expect(wrapper.find(Info).prop('work')).toBe(work);
  wrapper.unmount();
});

it('renders without a description', () => {
  const wrapper = mount(<Info work={work} />);
  expect(wrapper.find(Info).prop('work')).toBe(work);
  wrapper.unmount();
});
