import React from "react";
import I18n from "redux-i18n";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { mount } from "enzyme";
import Info from "./Info";
import { translations } from "../../translations";
import store from "../../store";

const serie = {
  description: "",
  author: "",
  artist: ""
};

const description = {
  description: "..."
};

it("renders without crashing", () => {
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <Info serie={serie} description={description} />
      </I18n>
    </Provider>
  );
  expect(wrapper.find(Info).prop("serie")).toBe(serie);
});

it("renders without a description", () => {
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <Info serie={serie} />
      </I18n>
    </Provider>
  );
  expect(wrapper.find(Info).prop("serie")).toBe(serie);
});
