import React from "react";
import I18n from "redux-i18n";
import { mount, shallow } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import SerieContainer from "./SerieContainer";
import App from "../../App";
import store, { history } from "../../store";
import { doChangeLanguage } from "../../layout/actions/doChangeLanguage";
import { fetchSerie } from "../actions/doSerie";
import { translations } from "../../translations";
import ErrorBoundary from "../../utils/ErrorBoundary";

it("should render without throwing an error", () => {
  const wrapper = shallow(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ErrorBoundary><SerieContainer match={"infection"} /></ErrorBoundary>
      </ConnectedRouter>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
});

it("should render without throwing an error when it receive a new language props", () => {
  const wrapper = mount(
    <App>
      <Provider store={store}>
        <I18n translations={translations} initialLang={"es"}>
          <ConnectedRouter history={history}>
          <ErrorBoundary><SerieContainer /></ErrorBoundary>
          </ConnectedRouter>
        </I18n>
      </Provider>
    </App>
  );

  store.dispatch(doChangeLanguage("en"));
  wrapper.update();
});
