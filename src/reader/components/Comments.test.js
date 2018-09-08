import React from 'react';
import { shallow } from 'enzyme';
import Comments from './Comments';

it('should render without throwing an error', () => {
  const wrapper = shallow(
    <Comments id={'chapter-id-rf'} title={'Title'} path={'/root'} />
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
