import React from "react";
import { mount } from "enzyme";
import Cover from "./Cover";

it("renders without crashing", () => {
  const wrapper = mount(<Cover key={1} cover="portada.jps" name="infection" />);
  wrapper.unmount();
});
