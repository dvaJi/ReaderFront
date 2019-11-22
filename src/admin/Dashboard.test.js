import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

it('should render without throwing an error', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
