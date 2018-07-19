import React from 'react';
import { render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import WorkItem from './WorkItem';
import { getStatusTagStyle, getWorkThumb } from '../../utils/common';

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
  return getStatusTagStyle(statusId);
};

const thumbUrl = work => {
  const dir = work.stub + '_' + work.uniqid;
  return getWorkThumb(dir, work.covers);
};

it('renders without crashing', () => {
  render(
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
});
