import React from "react";
import { render, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
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
  let series = generateSeries();

  const wrapper = mount(
    <SerieList loading={true} series={series} filterText={filterText} />
  );
  expect(wrapper.contains(SerieItemEmpty)).toBeTruthy();
});

it("should displays SerieItem", () => {
  let filterText = "";
  let series = generateSeries();

  const wrapper = mount(
    <MemoryRouter>
      <SerieList loading={false} series={series} filterText={filterText} />
    </MemoryRouter>
  );
  expect(wrapper.contains(SerieItem)).toBeTruthy();
});

it("should filter series", () => {
  let filterText = "";
  let series = generateSeries();

  const wrapper = mount(
    <MemoryRouter>
      <SerieList loading={false} series={series} filterText={filterText} />
    </MemoryRouter>
  );
  wrapper.setProps({ filterText: "aka" });
  expect(wrapper.contains(SerieItem)).toBeTruthy();
});

function generateSeries() {
  let series = [];
  series.push({
    id: 1,
    name: "Aka Akatoshitachi no Monogatari",
    stub: "aka_akatoshitachi_no_monogatari"
  });
  series.push({ id: 2, name: "Deathtopia", stub: "deathtopia" });
  series.push({ id: 3, name: "Gion no Tsugai", stub: "gion_no_tsugai" });
  series.push({ id: 4, name: "Infection", stub: "infection" });

  return series;
}
