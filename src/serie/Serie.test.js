import React from "react";
import { mount } from "enzyme";
import Serie from "./Serie";

it("renders without crashing", () => {
  let props = {
    params: {
      stub: "infection"
    }
  };
  mount(<Serie match={props} />);
});
