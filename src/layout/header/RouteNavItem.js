import React from "react";
import { Route } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";

export default props => (
  <Route
    path={props.href}
    exact
    children={({ match, history }) => (
      <NavItem>
        <NavLink
          onClick={e => history.push(e.currentTarget.getAttribute("href"))}
          {...props}
          active={match ? true : false}
        >
          {props.children}
        </NavLink>
      </NavItem>
    )}
  />
);
