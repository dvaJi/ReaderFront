import React from "react";
import { shallow } from "enzyme";
import Button from "./Button";

it("should render without throwing an error", () => {
  const wrapper = shallow(
    <Button text="Botón" chapter={1} url="/read/infection" />
  );
  expect(wrapper.contains("Botón")).toBeTruthy();
});

it("should render a disabled button", () => {
  const wrapper = shallow(
    <Button text="Botón" chapter={-1} url="/read/infection" />
  );
  expect(wrapper.find("disabled")).toBeTruthy();
});
