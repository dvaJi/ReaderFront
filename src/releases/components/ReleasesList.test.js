import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mountWithIntl } from 'utils/enzyme-intl';
import ReleasesList from './ReleasesList';

const releases = global.rfMocks.releases.getReleases;

it('renders without crashing', () => {
  const wrapper = mountWithIntl(
    <BrowserRouter>
      <ReleasesList releases={[]} />
    </BrowserRouter>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should render releases without crashing', () => {
  const wrapper = mountWithIntl(
    <BrowserRouter>
      <ReleasesList releases={releases} />
    </BrowserRouter>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
