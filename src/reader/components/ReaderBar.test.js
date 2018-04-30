import React from "react";
import I18n from "redux-i18n";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import ReaderBar from "./ReaderBar";
import { translations } from "../../translations";
import store from "../../store";

it("renders without crashing", () => {
  let chapter = {
    chapter: 20,
    volume: 2,
    subchapter: 0,
    language: "es"
  };

  let chapters = [chapter, chapter, chapter];

  let serie = {
    stub: "infection"
  };

  mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <MemoryRouter>
          <ReaderBar
            chapter={chapter}
            chapters={chapters}
            serie={serie}
            prevChapter={1}
            nextChapter={-1}
          />
        </MemoryRouter>
      </I18n>
    </Provider>
  );
});

it("renders without any serie or chapter", () => {
  mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <MemoryRouter>
          <ReaderBar
            chapter={{}}
            chapters={{}}
            serie={{}}
            prevChapter={-1}
            nextChapter={-1}
          />
        </MemoryRouter>
      </I18n>
    </Provider>
  );
});
