import React from 'react';
import styled from 'styled-components';
import { NavItem } from 'reactstrap';

import ActiveLink from '../ActiveLink';
import { theme as rfTheme } from '@readerfront/ui';
const { cardColor, primaryColor } = rfTheme;

const Item = styled(NavItem)`
  position: relative;
  margin-left: 1rem;
`;

const Linka = styled.a`
  transition: all 0.2s ease;
  padding: 0.5rem !important;
  color: ${cardColor} !important;
  cursor: pointer;
  text-decoration: none !important;
  display: block;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;

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

const RouteNavItem = ({ target, children, ...props }) => (
  <Item>
    {target ? (
      <Linka {...props} target={target}>
        {children}
      </Linka>
    ) : (
      <ActiveLink {...props} activeClassName="active">
        <Linka>{children}</Linka>
      </ActiveLink>
    )}
  </Item>
);

export default RouteNavItem;
