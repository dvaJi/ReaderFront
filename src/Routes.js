import React from "react";
import { Route, Switch } from "react-router";
import withTracker from "./common/WithTracker";

import Home from "./pages/HomePage";
import Releases from "./releases";
import Series from "./series";
import Serie from "./serie";
import Reader from "./reader";
import Blog from "./blog";

export default (
  <Switch>
    <Route path="/" exact component={withTracker(Home)} />
    <Route path="/releases" exact component={withTracker(Releases)} />
    <Route path="/series" exact component={withTracker(Series)} />
    <Route path="/serie/:stub" exact component={withTracker(Serie)} />
    <Route path="/blog" exact component={withTracker(Blog)} />
    <Route
      path="/read/:stub/:lang/:volume/:chapter.:subchapter"
      exact
      component={withTracker(Reader)}
    />
  </Switch>
);
