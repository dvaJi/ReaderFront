import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { NavLink as RRNavLink } from 'react-router-dom';
import { NavItem, NavLink } from "reactstrap";

const Item = styled(NavItem)`
  position: relative;
  margin-left: 1rem;
`;

const Link = styled(NavLink)`
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  padding: .5rem !important;

  &:hover, &.active {
    color: #5b3cc4 !important;
  }

  &:hover::after,
  &.active::after {
    width: 100%;
  }

  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 0;
    left: 50%;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
    height: 2px;
    background: #5b3cc4;
    bottom: 0;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
`;

export default props => (
  <Route
    path={props.to}
    exact
    children={({ match, history }) => (
      <Item>
        <Link
          {...props}
          activeClassName="active"
          tag={RRNavLink}
        >
          {props.children}
        </Link>
      </Item>
    )}
  />
);
