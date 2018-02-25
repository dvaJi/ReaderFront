import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { CookiesProvider } from "react-cookie";
import 'bootstrap/dist/css/bootstrap.css';
import "./index.css";

import { hydrate, render } from "react-dom";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(
    <CookiesProvider>
      <Router>
        <App />
      </Router>
    </CookiesProvider>,
    rootElement
  );
} else {
  render(
    <CookiesProvider>
      <Router>
        <App />
      </Router>
    </CookiesProvider>,
    rootElement
  );
}
registerServiceWorker();
