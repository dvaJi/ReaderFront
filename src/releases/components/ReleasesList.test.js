import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import ReleasesList from './ReleasesList';

const releases = global.rfMocks.releases.getReleases;

it('renders without crashing', () => {
  const wrapper = mount(
    <BrowserRouter>
      <ReleasesList releases={[]} />
    </BrowserRouter>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should render releases without crashing', () => {
  const wrapper = mount(
    <BrowserRouter>
      <ReleasesList releases={releases} />
    </BrowserRouter>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
