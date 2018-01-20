import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import ReaderBar from "./ReaderBar";

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
    <MemoryRouter>
      <ReaderBar
        chapter={chapter}
        chapters={chapters}
        serie={serie}
        prevChapter={1}
        nextChapter={2}
      />
    </MemoryRouter>
  );
});

it("renders without any serie or chapter", () => {
  mount(
    <MemoryRouter>
      <ReaderBar
        chapter={{}}
        chapters={{}}
        serie={{}}
        prevChapter={-1}
        nextChapter={-1}
      />
    </MemoryRouter>
  );
});
