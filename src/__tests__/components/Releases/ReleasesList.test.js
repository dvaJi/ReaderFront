import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import ReleasesList from '@components/Releases/ReleasesList';

const releases = global.rfMocks.releases.getReleases;

it('renders without crashing', () => {
  const wrapper = mountWithIntl(<ReleasesList releases={[]} />);

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should render releases without crashing', () => {
  const wrapper = mountWithIntl(<ReleasesList releases={releases} />);
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
