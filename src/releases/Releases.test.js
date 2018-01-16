import React from "react";
import { render } from "enzyme";
import Releases from "./Releases";

it("renders without crashing", () => {
  render(<Releases />);
});
