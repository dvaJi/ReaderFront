import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MultiSelect } from '@components/ui';

const options = [
  { label: 'Grapes 🍇', value: 'grapes' },
  { label: 'Mango 🥭', value: 'mango' },
  { label: 'Strawberry 🍓', value: 'strawberry' }
];

it('should render without throwing an error', () => {
  let selected = options[0];
  const wrapper = mountWithIntl(
    <MultiSelect
      options={options}
      value={[selected]}
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
  let selected = options[0];
  const wrapper = mountWithIntl(
    <MultiSelect
      options={options}
      value={[selected]}
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
