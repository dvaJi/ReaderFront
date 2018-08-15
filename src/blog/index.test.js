import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import Blog from "./";
import store from "../store";

it("should render without throwing an error", () => {
  const wrapper = mount(
    <Provider store={store}>
      <Blog />
    </Provider>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
