import React from 'react';
import { Route, Switch } from 'react-router';
import withTracker from './common/WithTracker';

import Home from './home';
import Releases from './releases';
import Works from './works';
import Work from './work';
import Reader from './reader';
import Blog from './blog';

export default (
  <Switch>
    <Route path="/" exact component={withTracker(Home)} />
    <Route path="/releases" exact component={withTracker(Releases)} />
    <Route path="/work/all" exact component={withTracker(Works)} />
    <Route path="/work/:stub" exact component={withTracker(Work)} />
    <Route path="/blog" exact component={withTracker(Blog)} />
    <Route
      path="/read/:stub/:lang/:volume/:chapter.:subchapter"
      exact
      component={withTracker(Reader)}
    />
  </Switch>
);
