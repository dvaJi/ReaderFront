import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import Comments from '@components/Read/Comments';

it('should render without throwing an error', () => {
  const wrapper = mountWithIntl(
    <Comments id={'chapter-id-rf'} title={'Title'} path={'/root'} />
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
