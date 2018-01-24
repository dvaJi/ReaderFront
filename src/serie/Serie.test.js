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

it("renders without crashing", async () => {
  let props = {
    params: {
      stub: "infection"
    }
  };
  const wrapper = mount(<Serie match={props} />);
  await wrapper.setState({ isLoading: false });
  wrapper.update();
});
