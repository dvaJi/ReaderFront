import React from "react";
import I18n from "redux-i18n";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import Releases from "./";
import store from "../store";
import { translations } from "../translations";

it("should render without throwing an error", () => {
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <Releases />
      </I18n>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
