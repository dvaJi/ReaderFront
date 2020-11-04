import React from 'react';
import { NavItem } from 'reactstrap';

import { LangNavLink } from './styles';

const LangNavItem = props => (
  <NavItem>
    <LangNavLink
      active={props.cookielang === props.language ? true : false}
      style={{ cursor: 'pointer' }}
      {...props}
    >
      {props.children}
    </LangNavLink>
  </NavItem>
);

export default LangNavItem;
