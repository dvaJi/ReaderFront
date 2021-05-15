import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import LatestWorks from '@components/LatestWorks/LatestWorks';

const works = global.rfMocks.work.works;

it('renders while loading without crashing', () => {
  const wrapper = mountWithIntl(
    <LatestWorks title={'Test 1'} works={[]} isLoading={true} />
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('renders without crashing', () => {
  const wrapper = mountWithIntl(
    <LatestWorks title={'Test 2'} works={works} isLoading={false} />
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
