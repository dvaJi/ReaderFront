import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import LangNavItem from "./LangNavItem";
import { Nav } from "reactstrap";

let cookieLang = "es";

function changeLanguage(lang) {
  cookieLang = lang;
}

it("should render without throwing an error", () => {
  const wrapper = mount(
    <MemoryRouter>
      <LangNavItem
        cookielang={cookieLang}
        language="es"
        onClick={e => changeLanguage("es")}
      >
        ES
      </LangNavItem>
    </MemoryRouter>
  );
  wrapper.unmount();
});

it("should render without throwing an error", () => {
  const wrapper = mount(
    <MemoryRouter>
      <Nav className="ml-auto" navbar>
        <LangNavItem
          cookielang={cookieLang}
          language="es"
          onClick={e => changeLanguage("es")}
        >
          ES
        </LangNavItem>
        <LangNavItem
          cookielang={cookieLang}
          language="en"
          onClick={e => changeLanguage("en")}
        >
          EN
        </LangNavItem>
      </Nav>
    </MemoryRouter>
  );
  wrapper.find("a").first().simulate("click");
  expect(wrapper.find("a").first().find(".active")).toBeTruthy();
  wrapper.unmount();
});
