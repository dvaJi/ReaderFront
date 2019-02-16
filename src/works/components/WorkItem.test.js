import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { MemoryRouter } from 'react-router-dom';
import { forceCheck } from 'react-lazyload';
import WorkItem from './WorkItem';
import {
  workStatusIdToName,
  getStatusTagStyle,
  getWorkThumb
} from '../../utils/common';

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

const thumbUrl = work => {
  const dir = work.stub + '_' + work.uniqid;
  return getWorkThumb(dir, work.covers);
};

it('renders without crashing', () => {
  const wrapper = mountWithIntl(
    <MemoryRouter>
      <WorkItem
        redirectTo={redirectTo}
        truncate={truncate}
        work={work}
        thumbUrl={thumbUrl}
        statusTag={statusTag}
      />
    </MemoryRouter>
  );

  forceCheck();
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
