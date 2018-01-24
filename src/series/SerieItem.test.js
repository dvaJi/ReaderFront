import React from "react";
import { render } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import SerieItem from "./SerieItem";

let redirectTo = () => {
  return `serie/infection`;
};

let truncate = () => {
  return "infec";
};

let serie = {
  thumb2: "portada.jpg",
  name: "Infection"
};

it("renders without crashing", () => {
  render(
    <MemoryRouter>
      <SerieItem redirectTo={redirectTo} truncate={truncate} serie={serie} />
    </MemoryRouter>
  );
});
