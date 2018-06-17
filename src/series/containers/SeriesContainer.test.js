import React from "react";
import I18n from "redux-i18n";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import SeriesContainer from "./SeriesContainer";
import App from "../../App";
import store from "../../store";
import { translations } from "../../translations";
import { doChangeLanguage } from "../../layout/actions/doChangeLanguage";
import { seriesFetchDataSuccess } from "../actions/doSeries";
import ErrorBoundary from "../../utils/ErrorBoundary";

it("should render without throwing an error", () => {
  const wrapper = mount(
    <App>
      <Provider store={store}>
        <SeriesContainer />
      </Provider>
    </App>
  );

  expect(wrapper).toBeTruthy();
});

it("should filter series", () => {
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <ErrorBoundary>
          <SeriesContainer />
        </ErrorBoundary>
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
  store.dispatch(doChangeLanguage("es"));
  wrapper.update();
});
