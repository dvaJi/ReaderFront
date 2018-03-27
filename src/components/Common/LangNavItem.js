import React from "react";
import { NavItem, NavLink } from "reactstrap";

export default props => (
  <NavItem>
    <NavLink
      active={props.cookielang === props.language ? true : false}
      style={{ cursor: "pointer" }}
      {...props}
    >
      {props.children}
    </NavLink>
  </NavItem>
);
