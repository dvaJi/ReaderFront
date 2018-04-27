import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import BlogContainer from "./BlogContainer";
import App from "../../App";
import thunk from "redux-thunk";
import rootReducer from "../../rootReducer";
import store from "../../store";
import { blogIsLoading, blogPage, fetchPosts } from "../actions/doBlog"
import { doChangeLanguage } from "../../layout/actions/doChangeLanguage";

it("should render without throwing an error", () => {
  const props = {};
  const wrapper = mount(
    <Provider store={store} {...props}>
      <BlogContainer />
    </Provider>
  );
});

it("should render without throwing an error when it receive a new language props", () => {
  const wrapper = mount(
    <App>
      <Provider store={store}>
        <BlogContainer />
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
        <BlogContainer />
      </Provider>
    </App>
  );

  store.dispatch(blogIsLoading(false));
  wrapper.update();

  document.body.scrollTop = 40;
  window.dispatchEvent(new window.UIEvent("scroll", { detail: 0 }));
  wrapper.update();
});

it("should change page without throwing", () => {
  expect(() => {
    store.dispatch(blogPage(10));
  }).not.toThrow();
});


it("should throw if it receive a null page or lang props", () => {
  expect(() => {
    store.dispatch(fetchPosts(null, 1));
  }).toThrow();

  expect(() => {
    store.dispatch(fetchPosts("es", null));
  }).toThrow();
});

