import React from "react";
import { render, shallow } from "enzyme";
import Serie from "./Serie";

it("renders without crashing", () => {
  render(<Serie />);
});
