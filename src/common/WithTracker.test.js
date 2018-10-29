import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Releases from '../releases';
import Works from '../works';
import withTracker from './WithTracker';

it('should render without throwing an error', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/', '/work/all']} initialIndex={1}>
      <Route path="/" exact component={withTracker(Releases)} />
      <Route path="/work/all" exact component={withTracker(Works)} />
    </MemoryRouter>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should be update when receive new props', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/', '/work/all']} initialIndex={1}>
      <Route path="/" exact component={withTracker(Releases)} />
      <Route path="/work/all" exact component={withTracker(Works)} />
    </MemoryRouter>
  );
  const newProp = wrapper.props().history;
  newProp.location.pathname = '/';
  newProp.location.key = '08ggxc';
  wrapper.setProps({ history: newProp });
  wrapper.update();
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
