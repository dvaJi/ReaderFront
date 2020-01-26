import React from 'react';
import Loadable from 'react-loadable';
import { Route, Switch, Redirect } from 'react-router';
import withTracker from './common/WithTracker';
import RoutePrivate from './auth/RoutePrivate';

import { setUser } from 'state';

const Login = Loadable({
  loader: () =>
    import(/* webpackChunkName: "login" */ './user/containers/LoginContainer'),
  loading: () => null,
  modules: ['login']
});

const Signup = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "signup" */ './user/containers/SignupContainer'
    ),
  loading: () => null,
  modules: ['signup']
});

const Activate = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "activate" */ './user/containers/ActivateAccountContainer'
    ),
  loading: () => null,
  modules: ['activate']
});

const ACPDashboard = Loadable({
  loader: () =>
    import(/* webpackChunkName: "dashboard" */ './dashboard/Dashboard'),
  loading: () => null,
  modules: ['dashboard']
});

const ACPWorkEdit = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ACPWorkEdit" */ './works/CreateOrEdit/EditWork'
    ),
  loading: () => null,
  modules: ['ACPWorkEdit']
});

const ACPWorkCreate = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ACPWorkCreate" */ './works/CreateOrEdit/CreateWork'
    ),
  loading: () => null,
  modules: ['ACPWorkCreate']
});

const ACPWorkManage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ACPWorkManage" */ './works/AWorksList'),
  loading: () => null,
  modules: ['ACPWorkManage']
});

const ACPWorkDetail = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ACPWorkDetail" */ './works/Detail'),
  loading: () => null,
  modules: ['ACPWorkDetail']
});

const ACPChapterCreate = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ACPChapterCreate" */ './chapters/CreateOrEdit/CreateChapter'
    ),
  loading: () => null,
  modules: ['ACPChapterCreate']
});

const ACPChapterEdit = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ACPChapterEdit" */ './chapters/CreateOrEdit/EditChapter'
    ),
  loading: () => null,
  modules: ['ACPChapterEdit']
});

const ACPChapterDetail = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ACPChapterDetail" */ './chapters/Detail'),
  loading: () => null,
  modules: ['ACPChapterDetail']
});

const ACPBlogCreatePost = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ACPBlogCreatePost" */ './blog/CreateOrEdit/CreatePost'
    ),
  loading: () => null,
  modules: ['ACPBlogCreatePost']
});

const ACPBlogEdit = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ACPBlogEdit" */ './blog/CreateOrEdit/EditPost'
    ),
  loading: () => null,
  modules: ['ACPBlogEdit']
});

const ACPBlogManage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ACPBlogManage" */ './blog/List/List'),
  loading: () => null,
  modules: ['ACPBlogManage']
});

const NotFound = Loadable({
  loader: () =>
    import(/* webpackChunkName: "notFound" */ './common/ErrorNotFound'),
  loading: () => null,
  modules: ['notFound']
});

const Unauthorized = Loadable({
  loader: () =>
    import(/* webpackChunkName: "unauthorized" */ './common/ErrorUnauthorized'),
  loading: () => null,
  modules: ['unauthorized']
});

export default (
  <Switch>
    <RoutePrivate path="/" exact component={withTracker(ACPDashboard)} />
    <Route path="/auth/login" exact component={withTracker(Login)} />
    <Route path="/auth/signup" exact component={withTracker(Signup)} />
    <Route
      path="/auth/logout"
      exact
      render={() => {
        setUser(null);
        return <Redirect push to="/" />;
      }}
    />
    <Route
      path="/auth/activate_account"
      exact
      component={withTracker(Activate)}
    />
    <Route
      path="/auth/request_password"
      exact
      component={withTracker(Activate)}
    />
    <Redirect exact from="/work" to="/work/manage" />
    <RoutePrivate
      path="/work/manage"
      exact
      component={withTracker(ACPWorkManage)}
    />
    <RoutePrivate
      path="/work/add"
      exact
      component={withTracker(ACPWorkCreate)}
    />
    <RoutePrivate
      path="/work/edit/:stub"
      exact
      component={withTracker(ACPWorkEdit)}
    />
    <RoutePrivate
      path="/work/:workId/:stub"
      exact
      component={withTracker(ACPWorkDetail)}
    />
    <RoutePrivate
      path="/work/:workId/:stub/chapter/add"
      exact
      component={withTracker(ACPChapterCreate)}
    />
    <RoutePrivate
      path="/work/:workId/:stub/chapter/edit/:chapterId"
      exact
      component={withTracker(ACPChapterEdit)}
    />
    <RoutePrivate
      path="/work/:workId/:stub/chapter/:chapterId"
      exact
      component={withTracker(ACPChapterDetail)}
    />
    <Redirect exact from="/blog" to="/blog/manage" />
    <RoutePrivate
      path="/blog/manage"
      exact
      component={withTracker(ACPBlogManage)}
    />
    <RoutePrivate
      path="/blog/add_post"
      exact
      component={withTracker(ACPBlogCreatePost)}
    />
    <RoutePrivate
      path="/blog/edit_post/:stub"
      exact
      component={withTracker(ACPBlogEdit)}
    />
    <Route path="/401" component={withTracker(Unauthorized)} />
    <Route component={NotFound} />
  </Switch>
);
