import React from 'react';
import App from './App';
import { mount } from 'enzyme';

it('renders without crashing', async () => {
  const wrapper = mount(<App />);
  await wrapper.unmount();
});
