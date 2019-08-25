import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';

import Staff from './Staff';

const work = global.rfMocks.work.work;

it('renders without crashing', () => {
  const wrapper = mountWithIntl(
    <Staff staff={work.people_works} onRemove={jest.fn} />
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
