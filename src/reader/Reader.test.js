import React from "react";
import { render } from "enzyme";
import Reader from "./Reader";

it("renders without crashing", () => {
  render(<Reader />);
});
