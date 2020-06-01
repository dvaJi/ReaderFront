import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import WorkCover from '@components/Works/WorkCover';

const work = {
  thumb2: 'portada.jpg',
  name: 'Infection',
  status: 1
};

const status = {
  id: 1,
  name: 'on_going',
  background: '#000',
  color: '#fff'
};

it('renders a "normal" cover without crashing', () => {
  const wrapper = mountWithIntl(
    <WorkCover work={work} size={'normal'} status={status} />
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('renders a "small" cover without crashing', () => {
  const wrapper = mountWithIntl(
    <WorkCover
      cover={work.thumbnail}
      work={work}
      size={'small'}
      status={status}
    />
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
