import React from "react";
import { render } from "enzyme";
import ReaderEmpty from "./ReaderEmpty";

it("renders without crashing", () => {
  render(<ReaderEmpty />);
});
