import React from "react";
import { mount, shallow } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { ConnectedRouter } from "react-router-redux";
import ReaderContainer from "./ReaderContainer";
import App from "../../App";
import thunk from "redux-thunk";
import rootReducer from "../../rootReducer";
import store, { history } from "../../store";
import { readerSelectChapter, fetchChapters } from "../actions/doReader";
import { doChangeLanguage } from "../../layout/actions/doChangeLanguage";

it("should render without throwing an error", () => {
  const wrapper = shallow(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ReaderContainer match={"infection"} />
      </ConnectedRouter>
    </Provider>
  );
});

it("should render without throwing an error when it receive a new language props", () => {
  const wrapper = mount(
    <App>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ReaderContainer />
        </ConnectedRouter>
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
        <ConnectedRouter history={history}>
          <ReaderContainer />
        </ConnectedRouter>
      </Provider>
    </App>
  );

  store.dispatch(readerSelectChapter(null));
  wrapper.update();
});

it("should throw if it receive a null stub or lang props", () => {
  expect(() => {
    store.dispatch(fetchChapters(null, 1));
  }).toThrow();

  expect(() => {
    store.dispatch(fetchChapters("es", null));
  }).toThrow();
});
