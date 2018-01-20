import React from "react";
import { shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import Releases from "../releases/Releases";
import Series from "../series/Series";
import withTracker from "./WithTracker";

it("should render without throwing an error", () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={["/", "/series"]} initialIndex={1}>
      <Route path="/" exact component={withTracker(Releases)} />
      <Route path="/series" exact component={withTracker(Series)} />
    </MemoryRouter>
  );
});

it("should be update when receive new props", () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={["/", "/series"]} initialIndex={1}>
      <Route path="/" exact component={withTracker(Releases)} />
      <Route path="/series" exact component={withTracker(Series)} />
    </MemoryRouter>
  );
  const newProp = wrapper.props().history;
  newProp.location.pathname = "/";
  newProp.location.key = "08ggxc";
  wrapper.setProps({ history: newProp });
});
