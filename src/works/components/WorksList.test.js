import React from "react";
import { render, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import WorksList from "./WorksList";
import WorkItem from "./WorkItem";
import WorkItemEmpty from "./WorkItemEmpty";

it("renders without crashing", () => {
  let works = [];
  let filterText = "";
  render(<WorksList loading="false" works={works} filterText={filterText} />);
});

it("should displays WorkItemEmpty", () => {
  let filterText = "";

  const wrapper = mount(
    <MemoryRouter>
      <WorksList loading={true} works={[]} filterText={filterText} />
    </MemoryRouter>
  );
  expect(wrapper.find(WorkItemEmpty)).toBeTruthy();
});

it("should displays WorkItem", () => {
  let filterText = "";
  let works = generateWorks();

  const wrapper = mount(
    <MemoryRouter>
      <WorksList loading={false} works={works} filterText={filterText} />
    </MemoryRouter>
  );
  expect(wrapper.find(WorkItem)).toBeTruthy();
});

it("should filter works", () => {
  let filterText = "aka";
  let works = generateWorks();

  const wrapper = mount(
    <MemoryRouter>
      <WorksList loading={false} works={works} filterText={filterText} />
    </MemoryRouter>
  );
  wrapper.setProps({ filterText: "aka" });
  expect(wrapper.find(WorkItem)).toBeTruthy();
});

function generateWorks() {
  let works = [];
  works.push({
    id: 1,
    name: "Aka Akatoshitachi no Monogatari",
    stub: "aka_akatoshitachi_no_monogatari"
  });
  works.push({ id: 2, name: "Deathtopia", stub: "deathtopia" });
  works.push({ id: 3, name: "Gion no Tsugai", stub: "gion_no_tsugai" });
  works.push({ id: 4, name: "Infection", stub: "infection", description: "zombies and tits" });
  works.push({
    id: 5,
    name: "Re:Zero kara Hajimeru Isekai Seikatsu - Daisanshou - Truth of Zero",
    stub: "rezero_kara_hajimeru_isekai_seikatsu__daisanshou__truth_of_zero",
    description:
      "Secuela de Re:Zero Kara Hajimeru Isekai Seikatsu - Dainishou - Yashiki no Isshuukan-Hen De repente, Subaru Natsuki un estudiante de secundaria fué convocado a otro mundo cuando regresaba de compras en una tienda. No hay señales de quien lo convocó pero las cosas empeoran cuando es atacado. Pero cuando es salvado por una misteriosa chica de cabello plateado con un gato hada, Subaru coopera con la chica para devolver el favor. Cuando por fin logran obtener una pista Subaru junto con la chica son atacados y asesinados por alguien. Subaru entonces despierta en el lugar que fue convocado y se da cuenta que gano una nueva habilidad 'Regresar de la Muerte' un chico indefenso que sólo tiene la capacidad de rebobinar el tiempo con la muerte."
  });

  return works;
}
