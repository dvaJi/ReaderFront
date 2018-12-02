import React from 'react';
import Loadable from 'react-loadable';
import { Route, Switch, Redirect } from 'react-router';
import withTracker from './common/WithTracker';
import RoutePrivate from './auth/RoutePrivate';

const Homepage = Loadable({
  loader: () => import(/* webpackChunkName: "homepage" */ './home'),
  loading: () => null,
  modules: ['homepage']
});
// FIXME: RECUPERAR EL ARCHIVO COMPLETO°

export default (
  <Switch>
    <Route path="/" exact component={withTracker(Homepage)} />
  </Switch>
);
