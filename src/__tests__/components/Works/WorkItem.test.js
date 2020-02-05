import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { forceCheck } from 'react-lazyload';
import WorkItem from '@components/Works/WorkItem';

const work = {
  thumb2: 'portada.jpg',
  name: 'Infection',
  status: 1
};

it('renders without crashing', () => {
  const wrapper = mountWithIntl(<WorkItem work={work} />);

  forceCheck();
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
