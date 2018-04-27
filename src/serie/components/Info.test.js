import React from "react";
import { mount } from "enzyme";
import Info from "./Info";

const serie = {
  description: "",
  author: "",
  artist: ""
};

const description = {
  description: "..."
};

it("renders without crashing", () => {
  const wrapper = mount(<Info serie={serie} description={description} />);
  expect(wrapper.prop("serie")).toBe(serie);
});

it("renders without a description", () => {
  const wrapper = mount(<Info serie={serie} />);
  expect(wrapper.prop("serie")).toBe(serie);
});

