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

  const wrapper = mount(
    <MemoryRouter>
      <SerieList loading={true} series={[]} filterText={filterText} />
    </MemoryRouter>
  );
  expect(wrapper.find(SerieItemEmpty)).toBeTruthy();
});

it("should displays SerieItem", () => {
  let filterText = "";
  let series = generateSeries();

  const wrapper = mount(
    <MemoryRouter>
      <SerieList loading={false} series={series} filterText={filterText} />
    </MemoryRouter>
  );
  expect(wrapper.find(SerieItem)).toBeTruthy();
});

it("should filter series", () => {
  let filterText = "aka";
  let series = generateSeries();

  const wrapper = mount(
    <MemoryRouter>
      <SerieList loading={false} series={series} filterText={filterText} />
    </MemoryRouter>
  );
  wrapper.setProps({ filterText: "aka" });
  expect(wrapper.find(SerieItem)).toBeTruthy();
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
  series.push({ id: 4, name: "Infection", stub: "infection", description: "zombies and tits" });
  series.push({
    id: 5,
    name: "Re:Zero kara Hajimeru Isekai Seikatsu - Daisanshou - Truth of Zero",
    stub: "rezero_kara_hajimeru_isekai_seikatsu__daisanshou__truth_of_zero",
    description:
      "Secuela de Re:Zero Kara Hajimeru Isekai Seikatsu - Dainishou - Yashiki no Isshuukan-Hen De repente, Subaru Natsuki un estudiante de secundaria fué convocado a otro mundo cuando regresaba de compras en una tienda. No hay señales de quien lo convocó pero las cosas empeoran cuando es atacado. Pero cuando es salvado por una misteriosa chica de cabello plateado con un gato hada, Subaru coopera con la chica para devolver el favor. Cuando por fin logran obtener una pista Subaru junto con la chica son atacados y asesinados por alguien. Subaru entonces despierta en el lugar que fue convocado y se da cuenta que gano una nueva habilidad 'Regresar de la Muerte' un chico indefenso que sólo tiene la capacidad de rebobinar el tiempo con la muerte."
  });

  return series;
}
