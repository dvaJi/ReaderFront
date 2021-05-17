import React from 'react';
import { mount } from 'enzyme';
import Cover from '@components/Work/Cover';

const work = global.rfMocks.work.work;

it('renders without crashing', () => {
  const wrapper = mount(<Cover key={1} work={work} name="infection" />);
  wrapper.unmount();
});
