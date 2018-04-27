import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import { withRouter } from "react-router";
import { ConnectedRouter, push } from "react-router-redux";
import Serie from "./";
import SerieContainer from "./containers/SerieContainer";
import store, { history } from "../store";

it("should render without throwing an error", () => {
  store.dispatch(push("/read/infection/en/6/45.0"));
  jest.spyOn(console, "error");
  global.console.error.mockImplementation(() => {});
  const wrapper = shallow(<Serie />);
  global.console.error.mockRestore();
});
