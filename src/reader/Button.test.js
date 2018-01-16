import React from "react";
import { shallow } from "enzyme";
import Button from "./Button";

it("should render without throwing an error", () => {
  const wrapper = shallow(<Button text="Botón" url="/read/infection" />);
  expect(wrapper.contains("Botón")).toBeTruthy();
});