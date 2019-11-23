import React from 'react';
import { mount } from 'enzyme';
import FilterCard from './FilterCard';

let handleFilterTextChange = jest.fn();

it('renders without crashing', () => {
  const wrapper = mount(
    <FilterCard filter={''} onFilterTextChange={handleFilterTextChange} />
  );

  const input = wrapper.find(FilterCard).find('input');
  input.instance().value = 'a';
  input.simulate('change');
  wrapper.update();
  wrapper.unmount();
});
