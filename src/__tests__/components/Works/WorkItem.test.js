import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { forceCheck } from 'react-lazyload';
import WorkItem from '@components/Works/WorkItem';
import { workStatusIdToName, getStatusTagStyle } from 'utils/common';

const redirectTo = () => {
  return `work/infection`;
};

const truncate = () => {
  return 'infec';
};

const work = {
  thumb2: 'portada.jpg',
  name: 'Infection',
  status: 1
};

const statusTag = statusId => {
  return {
    style: getStatusTagStyle(statusId),
    name: workStatusIdToName(statusId)
  };
};

it('renders without crashing', () => {
  const wrapper = mountWithIntl(
    <WorkItem
      redirectTo={redirectTo}
      truncate={truncate}
      work={work}
      statusTag={statusTag}
    />
  );

  forceCheck();
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
