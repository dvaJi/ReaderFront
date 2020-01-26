import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import RouteNavItem from '@components/layout/RouteNavItem';
import { Nav } from 'reactstrap';

jest.mock('@components/ActiveLink', () => ({ children }) => (
  <span>{children}</span>
));

it('should render without throwing an error', () => {
  const wrapper = mountWithIntl(<RouteNavItem to="/">Releases</RouteNavItem>);
  wrapper.unmount();
});

it('should render without throwing an error', () => {
  const wrapper = mountWithIntl(
    <Nav className="ml-auto" navbar>
      <RouteNavItem to="/" exact>
        Releases
      </RouteNavItem>
      <RouteNavItem to="/series">Series</RouteNavItem>
    </Nav>
  );
  wrapper
    .find('a')
    .first()
    .simulate('click');
  expect(
    wrapper
      .find('a')
      .first()
      .find('.active')
  ).toBeTruthy();
  wrapper.unmount();
});
