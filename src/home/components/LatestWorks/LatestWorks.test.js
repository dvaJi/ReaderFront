import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { MemoryRouter } from 'react-router-dom';
import { getWorks } from '../../../utils/mocks/getWorksMock';
import LatestWorks from './LatestWorks';

it('renders while loading without crashing', () => {
  const wrapper = mountWithIntl(
    <MemoryRouter>
      <LatestWorks title={'Test 1'} works={[]} isLoading={true} />
    </MemoryRouter>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('renders without crashing', () => {
  const works = getWorks;
  const wrapper = mountWithIntl(
    <MemoryRouter>
      <LatestWorks title={'Test 2'} works={works} isLoading={false} />
    </MemoryRouter>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
