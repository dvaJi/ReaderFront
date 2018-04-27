import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import ReleasesContainer from "./ReleasesContainer";
import App from "../../App";
import thunk from "redux-thunk";
import rootReducer from "../../rootReducer";
import store from "../../store";
import { doChangeLanguage } from "../../layout/actions/doChangeLanguage";
import { releasesIsLoading, fetchReleases } from "../actions/doReleases";

it("should render without throwing an error", () => {
  const props = {};
  const wrapper = mount(
    <Provider store={store} {...props}>
      <ReleasesContainer />
    </Provider>
  );
});

it("should render without throwing an error when it receive a new language props", () => {
  const wrapper = mount(
    <App>
      <Provider store={store}>
        <ReleasesContainer />
      </Provider>
    </App>
  );

  store.dispatch(doChangeLanguage("en"));
  wrapper.update();
});

it("should render without throwing an error when it receive a new language props", () => {
  const wrapper = mount(
    <App>
      <Provider store={store}>
        <ReleasesContainer />
      </Provider>
    </App>
  );

  store.dispatch(releasesIsLoading(false));
  wrapper.update();

  document.body.scrollTop = 40;
  window.dispatchEvent(new window.UIEvent("scroll", { detail: 0 }));
  wrapper.update();
});

it("should throw if it receive a null lang or page props", () => {
  expect(() => {
    store.dispatch(fetchReleases("es", null));
  }).toThrow();

  expect(() => {
    store.dispatch(fetchReleases(null, 1));
  }).toThrow();
});