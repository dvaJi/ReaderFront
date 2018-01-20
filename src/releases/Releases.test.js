import React from "react";
import { mount, shallow } from "enzyme";
import { spy } from "sinon";
import { MemoryRouter } from "react-router-dom";
import Releases from "./Releases";
import ReleaseCardEmpty from "./ReleaseCardEmpty";

it("renders without crashing", () => {
  mount(<Releases />);
});

it("calls componentDidMount", async () => {
  spy(Releases.prototype, "componentDidMount");
  const wrapper = shallow(<Releases />);
  expect(Releases.prototype.componentDidMount.calledOnce).toEqual(true);
});

it("should render 15 releases while is loading", async () => {
  const wrapper = mount(<Releases />);
  expect(wrapper.find(ReleaseCardEmpty).length).toBe(15);
});

it("should render 15 releases while is loading", async () => {
  const wrapper = mount(
    <MemoryRouter>
      <Releases />
    </MemoryRouter>
  );
  wrapper.setState({ isLoading: false });
  wrapper.setState({ isFetchingData: false });
  wrapper.setState({ isInitialLoading: false });
  wrapper.setState({ releases: generateReleases() });
  await wrapper.update();
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
