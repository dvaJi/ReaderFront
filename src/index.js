import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// import './i18n';
import "./index.css";

import { hydrate, render } from "react-dom";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(
    <Router>
      <App />
    </Router>,
    rootElement
  );
} else {
  render(
    <Router>
      <App />
    </Router>,
    rootElement
  );
}
registerServiceWorker();
