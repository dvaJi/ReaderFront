import React from 'react';
import { mount } from 'enzyme';
import WorkCover from '@components/Works/WorkCover';
import { workStatusIdToName, getStatusTagStyle } from 'utils/common';

const work = {
  thumb2: 'portada.jpg',
  name: 'Infection',
  status: 1
};

const statusTag = {
  style: getStatusTagStyle(1),
  name: workStatusIdToName(1)
};

it('renders a "normal" cover without crashing', () => {
  const wrapper = mount(
    <WorkCover
      name={work.name}
      size={'normal'}
      status={statusTag.name}
      statusTag={statusTag.style}
    />
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('renders a "small" cover without crashing', () => {
  const wrapper = mount(
    <WorkCover
      cover={work.thumbnail}
      name={work.name}
      size={'small'}
      status={statusTag.name}
      statusTag={statusTag.style}
    />
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
