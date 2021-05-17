import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import FilterCard from '@components/Works/FilterCard';

let handleFilterTextChange = jest.fn();

it('renders without crashing', () => {
  const wrapper = mountWithIntl(
    <FilterCard filter={''} onFilterTextChange={handleFilterTextChange} />
  );

  const input = wrapper.find(FilterCard).find('input');
  input.instance().value = 'a';
  input.simulate('change');
  wrapper.unmount();
});
