import React from "react";
import { Route, Switch } from "react-router-dom";
import withTracker from "./components/Common/WithTracker";
import Releases from "./containers/Releases/Releases";
import Series from "./containers/Series/Series";
import Serie from "./containers/Serie/Serie.js";
import Reader from "./containers/Reader/Reader.js";
import Blog from "./containers/Blog/Blog";
import Post from "./containers/Blog/Post";

export default () => (
  <Switch>
    <Route path="/" exact component={withTracker(Releases)} />
    <Route path="/series" exact component={withTracker(Series)} />
    <Route path="/serie/:stub" exact component={withTracker(Serie)} />
    <Route path="/blog" exact component={withTracker(Blog)} />
    <Route
      path="/blog/post/:id/:year/:month/:stub"
      exact
      component={withTracker(Post)}
    />
    <Route
      path="/read/:stub/:lang/:volume/:chapter.:subchapter"
      exact
      component={withTracker(Reader)}
    />
  </Switch>
);
