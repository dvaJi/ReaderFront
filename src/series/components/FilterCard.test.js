import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import FilterCard from "./FilterCard";

let handleFilterTextChange = filterText => {
  const text = filterText;
};

it("renders without crashing", () => {
  const wrapper = mount(
    <FilterCard filter={""} onFilterTextChange={handleFilterTextChange} />
  );

  const input = wrapper.find("input");
  input.instance().value = "a";
  input.simulate("change");
  wrapper.update();
});
