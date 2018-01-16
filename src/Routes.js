import React from "react";
import { Route, Switch } from "react-router-dom";
import withTracker from './common/WithTracker';
import Releases from "./releases/Releases";
import Series from "./series/Series";
import Serie from "./serie/Serie.js";
import Reader from "./reader/Reader.js";

export default () => (
  <Switch>
    <Route path="/" exact component={withTracker(Releases)} />
    <Route path="/series" exact component={withTracker(Series)} />
    <Route path="/serie/:stub" exact component={withTracker(Serie)} />
    <Route path="/read/:stub/:lang/:volume/:chapter.:subchapter" exact component={withTracker(Reader)} />
  </Switch>
);
