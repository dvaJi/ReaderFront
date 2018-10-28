import React from "react";
import { shallowWithIntl } from "enzyme-react-intl";
import AuthContainer from "./AuthContainer";

it("renders without crashing", () => {
  const wrapper = shallowWithIntl(
    <AuthContainer route={{ pathname: "LUL" }} />
  );

  expect(wrapper).toBeTruthy();
});
