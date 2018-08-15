import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import RouteNavItem from "./RouteNavItem";
import { Nav } from "reactstrap";

it("should render without throwing an error", () => {
  const wrapper = mount(
    <MemoryRouter>
      <RouteNavItem to="/">Releases</RouteNavItem>
    </MemoryRouter>
  );
  wrapper.unmount();
});

it("should render without throwing an error", () => {
  const wrapper = mount(
    <MemoryRouter>
      <Nav className="ml-auto" navbar>
        <RouteNavItem to="/" exact>Releases</RouteNavItem>
        <RouteNavItem to="/series">Series</RouteNavItem>
      </Nav>
    </MemoryRouter>
  );
  wrapper.find("a").first().simulate("click");
  expect(wrapper.find("a").first().find(".active")).toBeTruthy();
  wrapper.unmount();
});
