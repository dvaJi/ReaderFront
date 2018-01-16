import React from "react";
import { render, shallow } from "enzyme";
import SerieList from "./SerieList";
import SerieItem from "./SerieItem";
import SerieItemEmpty from "./SerieItemEmpty";

it("renders without crashing", () => {
  let series = [];
  let filterText = "";
  render(<SerieList loading="false" series={series} filterText={filterText} />);
});

it("should displays SerieItemEmpty", () => {
  let filterText = "";
  let series = [];
  for (let index = 0; index < 10; index++) {
    series.push({ id: index });
  }

  const wrapper = shallow(
    <SerieList loading="true" series={series} filterText={filterText} />
  );
  expect(wrapper.find(SerieItemEmpty)).toBeTruthy();
});

it("should displays SerieItem", () => {
  let filterText = "";
  let series = [];
  for (let index = 0; index < 10; index++) {
    series.push({ id: index });
  }

  const wrapper = shallow(
    <SerieList loading="false" series={series} filterText={filterText} />
  );
  expect(wrapper.find(SerieItem)).toHaveLength(0);
});
