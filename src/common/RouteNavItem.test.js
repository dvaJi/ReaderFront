import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import RouteNavItem from "./RouteNavItem";

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
      <RouteNavItem href="/">Releases</RouteNavItem>
    </MemoryRouter>
  );
  wrapper.find("a").simulate("click");
  expect(wrapper.find(".active")).toBeTruthy();
});
