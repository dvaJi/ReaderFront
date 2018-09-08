import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';

import { getWork } from '../../utils/mocks/getWorksMock';
import { normalizeWork } from '../../utils/normalizeWork';
import Info from './Info';

const description = {
  description: '...'
};

const work = normalizeWork(getWork);

it('renders without crashing', () => {
  const wrapper = mountWithIntl(<Info work={work} description={description} />);
  expect(wrapper.find(Info).prop('work')).toBe(work);
  wrapper.unmount();
});

it('renders without a description', () => {
  const wrapper = mountWithIntl(<Info work={work} />);
  expect(wrapper.find(Info).prop('work')).toBe(work);
  wrapper.unmount();
});
