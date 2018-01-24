import React from "react";
import { mount } from "enzyme";
import Post from "./Post";

it("renders without crashing", () => {
  let props = {
    params: {
      id: "111",
      year: "2017",
      month: "2",
      stub: "aaa"
    }
  };
  mount(<Post match={props} />);
});

it("renders without crashing", async () => {
  let props = {
    params: {
      id: "111",
      year: "2017",
      month: "2",
      stub: "aaa"
    }
  };
  const wrapper = mount(<Post match={props} />);
  await wrapper.setState({
    post: {
      title: {
        rendered: "FAKE"
      },
      content: {
        rendered: "FAKE CONTENT"
      }
    }
  });
  await wrapper.setState({ isLoading: false });
  wrapper.update();
});
