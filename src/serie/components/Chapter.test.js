import React from "react";
import I18n from "redux-i18n";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import { MemoryRouter } from "react-router-dom";
import Chapter from "./Chapter";
import { translations } from "../../translations";
import store from "../../store";

const serie = {
  stub: "infection"
};

const chapter = {
  language: "es",
  volume: 1,
  chapter: 30,
  subchapter: 0,
  name: "dis way",
  download_href: "/download/infection"
};

it("renders without crashing", () => {
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <MemoryRouter>
          <Chapter key={1} serie={serie} chapter={chapter} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );
  expect(wrapper).toBeTruthy();
});

it("renders with subchapter without crashing", () => {
  const chapter = {
    language: "es",
    volume: 1,
    chapter: 30,
    subchapter: "0",
    name: "dis way",
    download_href: "/download/infection"
  };
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <MemoryRouter>
          <Chapter key={1} serie={serie} chapter={chapter} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );
  expect(wrapper).toBeTruthy();
});

it("renders without name without crashing", () => {
  const chapter = {
    language: "es",
    volume: 1,
    chapter: 30,
    subchapter: "0",
    name: "",
    download_href: "/download/infection"
  };
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <MemoryRouter>
          <Chapter key={1} serie={serie} chapter={chapter} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );
  expect(wrapper).toBeTruthy();
});

it("should create an valid href", () => {
  const onButtonClick = sinon.spy();
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <MemoryRouter>
          <Chapter
            key={1}
            serie={serie}
            onclick={onButtonClick}
            chapter={chapter}
          />
        </MemoryRouter>
      </I18n>
    </Provider>
  );
  const link = wrapper
    .find(".Chapter")
    .first()
    .children();
  expect(link.props().href).toBe("/read/infection/es/1/30.0");
});
