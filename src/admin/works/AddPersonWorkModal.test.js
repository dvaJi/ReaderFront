import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';

import AddPersonWorkModal from './AddPersonWorkModal';

it('renders without crashing', () => {
  const wrapper = mountWithIntl(
    <AddPersonWorkModal isOpen={true} toggleModal={jest.fn} />
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
