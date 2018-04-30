import React from "react";
import I18n from "redux-i18n";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import FilterCard from "./FilterCard";
import { translations } from "../../translations";
import store from "../../store";

let handleFilterTextChange = filterText => {
  const text = filterText;
};

it("renders without crashing", () => {
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <FilterCard filter={""} onFilterTextChange={handleFilterTextChange} />
      </I18n>
    </Provider>
  );

  const input = wrapper.find(FilterCard).find("input");
  input.instance().value = "a";
  input.simulate("change");
  wrapper.update();
});
