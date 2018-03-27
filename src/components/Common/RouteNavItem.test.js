import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import RouteNavItem from "./RouteNavItem";
import { Nav } from "reactstrap";

it("should render without throwing an error", () => {
  const wrapper = mount(
    <MemoryRouter>
      <RouteNavItem href="/">Releases</RouteNavItem>
    </MemoryRouter>
  );
});

it("should render without throwing an error", () => {
  const wrapper = mount(
    <MemoryRouter>
      <Nav className="ml-auto" navbar>
        <RouteNavItem href="/">Releases</RouteNavItem>
        <RouteNavItem href="/series">Series</RouteNavItem>
      </Nav>
    </MemoryRouter>
  );
  wrapper.find("a").first().simulate("click");
  expect(wrapper.find("a").first().find(".active")).toBeTruthy();
});
