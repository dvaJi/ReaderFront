import React from "react";
import { render, shallow } from "enzyme";
import ReleasesList from "./ReleasesList";
import ReleaseCardEmpty from "./ReleaseCardEmpty";

it("renders without crashing", () => {
  render(<ReleasesList loading={true} />);
});

it("should render loaded releases without crashing", () => {
  let releases = [];
  for (let index = 0; index < 10; index++) {
    let comic = { stub: "" };
    let chapter = { language: "", volume: 0, chapter: 0, subchapter: 0 };
    releases.push({ id: index, comic: comic, chapter: chapter });
  }
  shallow(<ReleasesList loading={false} releases={releases} />);
});
