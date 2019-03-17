import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { MemoryRouter } from 'react-router-dom';
import WorkCover, { Cover } from './WorkCover';
import { workStatusIdToName, getStatusTagStyle } from '../../utils/common';

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
  const wrapper = mountWithIntl(
    <MemoryRouter>
      <WorkCover
        name={work.name}
        size={'normal'}
        status={statusTag.name}
        statusTag={statusTag.style}
      />
    </MemoryRouter>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('renders a "small" cover without crashing', () => {
  const wrapper = mountWithIntl(
    <MemoryRouter>
      <WorkCover
        cover={work.thumbnail}
        name={work.name}
        size={'small'}
        status={statusTag.name}
        statusTag={statusTag.style}
      />
    </MemoryRouter>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should not add the background-image style rule if the thumbnail is null or undefined', () => {
  const wrapper = mountWithIntl(
    <MemoryRouter>
      <WorkCover
        cover={null}
        name={work.name}
        size={'small'}
        status={statusTag.name}
        statusTag={statusTag.style}
      />
    </MemoryRouter>
  );

  expect(wrapper).toBeTruthy();
  const cover = wrapper.find(Cover);
  expect(cover).not.toHaveStyleRule(
    'background-image',
    'url(/static/images/default-cover.png)'
  );
  wrapper.unmount();
});
