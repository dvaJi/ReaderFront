import React from "react";
import I18n from "redux-i18n";
import PropTypes from "prop-types";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import SeriesContainer from "./SeriesContainer";
import App from "../../App";
import thunk from "redux-thunk";
import rootReducer from "../../rootReducer";
import store from "../../store";
import { translations } from "../../translations";
import { doChangeLanguage } from "../../layout/actions/doChangeLanguage";

it("should render without throwing an error", () => {
  const wrapper = mount(
    <App>
      <Provider store={store}>
        <SeriesContainer />
      </Provider>
    </App>
  );
});

it("should filter series", () => {
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <SeriesContainer />
      </I18n>
    </Provider>
  );

  const input = wrapper.find("input");
  input.instance().value = "a";
  input.simulate("change");
});

it("should render without throwing an error when it receive a new language props", () => {
  const wrapper = mount(
    <App>
      <Provider store={store}>
        <SeriesContainer />
      </Provider>
    </App>
  );

  store.dispatch(doChangeLanguage("en"));
  wrapper.update();
});

it("should throw if it receive a null language props", () => {
  expect(() => {
    store.dispatch(doChangeLanguage(null));
  }).toThrow();
});
