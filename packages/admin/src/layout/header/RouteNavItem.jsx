import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { NavLink as RRNavLink } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';

import { theme as rfTheme } from '@readerfront/ui';

const { cardColor, primaryColor } = rfTheme;

const Item = styled(NavItem)`
  position: relative;
  margin-left: 1rem;
`;

const Link = styled(NavLink)`
  transition: all 0.2s ease;
  padding: 0.5rem !important;
  color: ${cardColor} !important;

  svg {
    margin-right: 5px;
  }

  &:hover,
  &.active {
    color: ${primaryColor} !important;
  }

  &:hover::after,
  &.active::after {
    width: 100%;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    left: 50%;
    transform: translate(-50%);
    height: 2px;
    background: ${primaryColor};
    bottom: 0;
    transition: all 0.17s ease;
  }
`;

const RouteNavItem = props => (
  <Route
    path={props.to}
    exact
    children={({ match, history }) => (
      <Item>
        <Link {...props} activeClassName="active" tag={RRNavLink}>
          {props.children}
        </Link>
      </Item>
    )}
  />
);

export default RouteNavItem;
