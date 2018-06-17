import React from "react";
import I18n from "redux-i18n";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import LatestSeries from "./LatestSeries";
import { translations } from "../../translations";
import store from "../../store";

it("renders while loading without crashing", () => {
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <MemoryRouter>
          <LatestSeries title={"Test 1"} series={[]} isLoading={true} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it("renders without crashing", () => {
  const series = generateSeries();
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <MemoryRouter>
          <LatestSeries title={"Test 2"} series={series} isLoading={false} />
        </MemoryRouter>
      </I18n>
    </Provider>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
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
  series.push({
    id: 4,
    name: "Infection",
    stub: "infection",
    description: "zombies and tits"
  });
  series.push({
    id: 5,
    name: "Re:Zero kara Hajimeru Isekai Seikatsu - Daisanshou - Truth of Zero",
    stub: "rezero_kara_hajimeru_isekai_seikatsu__daisanshou__truth_of_zero",
    description:
      "Secuela de Re:Zero Kara Hajimeru Isekai Seikatsu - Dainishou - Yashiki no Isshuukan-Hen De repente, Subaru Natsuki un estudiante de secundaria fué convocado a otro mundo cuando regresaba de compras en una tienda. No hay señales de quien lo convocó pero las cosas empeoran cuando es atacado. Pero cuando es salvado por una misteriosa chica de cabello plateado con un gato hada, Subaru coopera con la chica para devolver el favor. Cuando por fin logran obtener una pista Subaru junto con la chica son atacados y asesinados por alguien. Subaru entonces despierta en el lugar que fue convocado y se da cuenta que gano una nueva habilidad 'Regresar de la Muerte' un chico indefenso que sólo tiene la capacidad de rebobinar el tiempo con la muerte."
  });

  return series;
}
