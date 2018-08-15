import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import Reader from "./";
import store, { history } from "../store";

it("should render without throwing an error", () => {
  jest.spyOn(console, "error");
  global.console.error.mockImplementation(() => {});
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Reader />
      </ConnectedRouter>
    </Provider>
  );
  global.console.error.mockRestore();
  wrapper.unmount();
});
