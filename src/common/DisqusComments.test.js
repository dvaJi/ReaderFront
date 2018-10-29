import React from 'react';
import { mount } from 'enzyme';
import DisqusComments from './DisqusComments';

it('should render without throwing an error', () => {
  const wrapper = mount(
    <DisqusComments
      id="01901-2302"
      title="Infection - Capítulo 40"
      path="/read/infection/es/6/40.0"
    />
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should be updated when receive new props', () => {
  const wrapper = mount(
    <DisqusComments
      id="01901-2302"
      title="Infection - Capítulo 40"
      path="/read/infection/es/6/40.0"
    />
  );

  wrapper.setProps({ id: '020202-01011' });
  wrapper.setProps({ title: 'Infection - Capítulo 41' });
  wrapper.setProps({ path: '/read/infection/es/6/41.0' });

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should reset (set to undefined) window.DISQUS if it is not undefined', () => {
  window.DISQUS = {
    id: 1,
    reset: a => {
      window.DISQUS = undefined;
    }
  };
  const wrapper = mount(
    <DisqusComments
      id="01901-2302"
      title="Infection - Capítulo 40"
      path="/read/infection/es/6/40.0"
    />
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
