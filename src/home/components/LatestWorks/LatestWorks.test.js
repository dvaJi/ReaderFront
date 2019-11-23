import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { getWorks } from '../../../utils/mocks/getWorksMock';
import LatestWorks from './LatestWorks';

it('renders while loading without crashing', () => {
  const wrapper = mount(
    <MemoryRouter>
      <LatestWorks title={'Test 1'} works={[]} isLoading={true} />
    </MemoryRouter>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('renders without crashing', () => {
  const works = getWorks;
  const wrapper = mount(
    <MemoryRouter>
      <LatestWorks title={'Test 2'} works={works} isLoading={false} />
    </MemoryRouter>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
