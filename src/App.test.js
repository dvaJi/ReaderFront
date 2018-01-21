import React from "react";
import { shallow, render } from "enzyme";
import { CookiesProvider } from "react-cookie";
import App from "./App";

it("renders without crashing", () => {
  shallow(
    <CookiesProvider>
      <App />
    </CookiesProvider>
  );
});