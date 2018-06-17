import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import HomeContainer from "./HomeContainer";
import App from "../App";
import store from "../store";
import { setLanguage } from "redux-i18n";
import { releasesFetchDataSuccess } from "../releases/actions/doReleases";

it("should render without throwing an error", async () => {
  const wrapper = mount(
    <App>
      <Provider store={store}>
        <HomeContainer />
      </Provider>
    </App>
  );
  expect(wrapper).toBeTruthy();
  await wrapper.unmount();
});

it("should render without throwing an error when it receive a new language props", async () => {
  const wrapper = mount(
    <App>
      <Provider store={store}>
        <HomeContainer />
      </Provider>
    </App>
  );
  store.dispatch(releasesFetchDataSuccess(generateReleases()));
  store.dispatch(setLanguage("es"));
  wrapper.update();
  store.dispatch(releasesFetchDataSuccess(generateReleases()));
  store.dispatch(setLanguage("en"));
  wrapper.update();
  wrapper.unmount();
});

function generateReleases() {
  let releases = [];
  for (let index = 30; index < 40; index++) {
    let comic = { stub: "" };
    let chapter = {
      language: "",
      volume: 0,
      chapter: 0,
      thumbnail: "thumb.png",
      subchapter: index % 2 === 0 ? 0 : 1
    };
    releases.push({ id: index, comic: comic, chapter: chapter });
  }
  return releases;
}
