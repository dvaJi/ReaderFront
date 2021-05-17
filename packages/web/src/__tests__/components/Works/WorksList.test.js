import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import WorksList from '@components/Works/WorksList';
import WorkItem from '@components/Works/WorkItem';
import WorkItemEmpty from '@components/Works/WorkItemEmpty';

const works = global.rfMocks.work.works;

it('renders without crashing', () => {
  let filterText = '';
  const wrapper = mountWithIntl(
    <WorksList loading="false" works={works} filterText={filterText} />
  );

  expect(wrapper).toBeTruthy();
});

it('should displays WorkItemEmpty', () => {
  let filterText = '';

  const wrapper = mountWithIntl(
    <WorksList loading={true} works={[]} filterText={filterText} />
  );
  expect(wrapper.find(WorkItemEmpty)).toBeTruthy();
  wrapper.unmount();
});

it('should displays WorkItem', () => {
  let filterText = '';
  const wrapper = mountWithIntl(
    <WorksList loading={false} works={works} filterText={filterText} />
  );
  expect(wrapper.find(WorkItem)).toBeTruthy();
  wrapper.unmount();
});

it('should filter works', () => {
  let filterText = 'aka';
  const wrapper = mountWithIntl(
    <WorksList loading={false} works={works} filterText={filterText} />
  );
  wrapper.setProps({ filterText: 'aka' });
  expect(wrapper.find(WorkItem)).toBeTruthy();
  wrapper.unmount();
});
