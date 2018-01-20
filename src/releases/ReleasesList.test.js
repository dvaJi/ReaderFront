import React from "react";
import { render, mount } from "enzyme";
import ReleasesList from "./ReleasesList";
import ReleaseCard from "./ReleaseCard";
import ReleaseCardEmpty from "./ReleaseCardEmpty";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  render(<ReleasesList loading={true} />);
});

it("should render releases without crashing", () => {
  const releases = generateReleases();
  mount(
    <BrowserRouter>
      <ReleasesList loading={false} releases={releases} />
    </BrowserRouter>
  );
});

it("renders RealeadeCard without crashing", () => {
  const releases = generateReleases();
  const listReleaseCard = generateReleaseCard(releases);
  const wrapper = mount(
    <BrowserRouter>
      <ReleasesList loading={false} releases={releases} />
    </BrowserRouter>
  );
  expect(
    wrapper.children().containsMatchingElement(listReleaseCard)
  ).toBeTruthy();
});

it("renders RealeadeCard and fetching data without crashing", () => {
  const releases = generateReleases();
  const listReleaseCard = generateReleaseCard(releases);
  const wrapper = mount(
    <BrowserRouter>
      <ReleasesList loading={false} releases={releases} isFetchingData={true} />
    </BrowserRouter>
  );
  expect(
    wrapper.children().containsMatchingElement(listReleaseCard)
  ).toBeTruthy();
});

it("renders RealeadeCardEmpty without crashing", () => {
  const listReleaseCardEmpty = generateReleaseCardEmpty();
  const wrapper = mount(
    <BrowserRouter>
      <ReleasesList loading={true} />
    </BrowserRouter>
  );
  expect(wrapper.children().contains(listReleaseCardEmpty)).toBeTruthy();
});

/**
 * Genera mock de releases
 *
 * @returns lista de releases
 */
function generateReleases() {
  let releases = [];
  for (let index = 0; index < 10; index++) {
    let comic = { stub: "" };
    let chapter = {
      language: "",
      volume: 0,
      chapter: 0,
      subchapter: index % 2 === 0 ? 0 : 1
    };
    releases.push({ id: index, comic: comic, chapter: chapter });
  }
  return releases;
}

/**
 * Genera una lista de ReleaseCardEmpty
 *
 * @returns lista de ReleaseCardEmpty
 */
function generateReleaseCardEmpty() {
  let listReleaseCardEmpty = [];
  for (let index = 0; index < 15; index++) {
    listReleaseCardEmpty.push(
      <ReleaseCardEmpty key={index} release={{ id: index }} />
    );
  }

  return listReleaseCardEmpty;
}

/**
 * Genera mock de ReleaseCard
 *
 * @param {any} releases
 * @returns lista de ReleaseCard
 */
function generateReleaseCard(releases) {
  let listReleaseCard = [];
  releases.map(release => {
    listReleaseCard.push(
      <ReleaseCard key={release.id} release={release} chapterUrl={""} />
    );
  });

  return listReleaseCard;
}
