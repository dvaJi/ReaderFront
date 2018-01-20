import React from "react";
import { mount } from "enzyme";
import Info from "./Info";

let serie = {
  description: "",
  author: "",
  artist: ""
};
it("renders without crashing", () => {
  const wrapper = mount(<Info serie={serie} />);
  expect(wrapper.prop("serie")).toBe(serie);
});
