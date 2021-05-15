import React from 'react';
import { mount } from 'enzyme';
import { MultiSelect } from '../../MultiSelect';

const options = [
  { label: 'Grapes 🍇', value: 'grapes' },
  { label: 'Mango 🥭', value: 'mango' },
  { label: 'Strawberry 🍓', value: 'strawberry' }
];

it('should render without throwing an error', () => {
  let selected = [options[0]];
  const wrapper = mount(
    <MultiSelect
      options={options}
      value={selected}
      onChange={() => {
        selected = [options[1]];
      }}
      labelledBy={'Select'}
    />
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should render select-panel without throwing an error', () => {
  let selected = [options[0]];
  const wrapper = mount(
    <MultiSelect
      options={options}
      value={selected}
      onChange={() => {
        selected = [options[1]];
      }}
      labelledBy={'Select'}
    />
  );

  wrapper.find('.dropdown-heading').first().simulate('click');

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
