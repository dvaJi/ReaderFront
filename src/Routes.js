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

const Releases = Loadable({
  loader: () => import(/* webpackChunkName: "releases" */ './releases'),
  loading: () => null,
  modules: ['releases']
});

const Works = Loadable({
  loader: () => import(/* webpackChunkName: "works" */ './works'),
  loading: () => null,
  modules: ['works']
});

const Work = Loadable({
  loader: () => import(/* webpackChunkName: "work" */ './work'),
  loading: () => null,
  modules: ['work']
});

const Reader = Loadable({
  loader: () => import(/* webpackChunkName: "reader" */ './reader'),
  loading: () => null,
  modules: ['reader']
});

const Blog = Loadable({
  loader: () => import(/* webpackChunkName: "blog" */ './blog'),
  loading: () => null,
  modules: ['blog']
});

const Login = Loadable({
  loader: () =>
    import(/* webpackChunkName: "login" */ './user/containers/LoginContainer'),
  loading: () => null,
  modules: ['login']
});

const Signup = Loadable({
  loader: () =>
    import(/* webpackChunkName: "signup" */ './user/containers/SignupContainer'),
  loading: () => null,
  modules: ['signup']
});

const Activate = Loadable({
  loader: () =>
    import(/* webpackChunkName: "activate" */ './user/containers/ActivateAccountContainer'),
  loading: () => null,
  modules: ['activate']
});

const ACPDashboard = Loadable({
  loader: () => import(/* webpackChunkName: "dashboard" */ './admin/Dashboard'),
  loading: () => null,
  modules: ['dashboard']
});

const ACPWorkCreate = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ACPWorkCreate" */ './admin/works/CreateOrEdit'),
  loading: () => null,
  modules: ['ACPWorkCreate']
});

const ACPWorkManage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ACPWorkManage" */ './admin/works/List'),
  loading: () => null,
  modules: ['ACPWorkManage']
});

const ACPWorkDetail = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ACPWorkDetail" */ './admin/works/Detail'),
  loading: () => null,
  modules: ['ACPWorkDetail']
});

const ACPChapterCreate = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ACPChapterCreate" */ './admin/chapters/CreateOrEdit'),
  loading: () => null,
  modules: ['ACPChapterCreate']
});

const ACPChapterDetail = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ACPChapterDetail" */ './admin/chapters/Detail'),
  loading: () => null,
  modules: ['ACPChapterDetail']
});

const ACPBlogCreate = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ACPBlogCreate" */ './admin/blog/CreateOrEdit'),
  loading: () => null,
  modules: ['ACPBlogCreate']
});

const ACPBlogManage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ACPBlogManage" */ './admin/blog/List'),
  loading: () => null,
  modules: ['ACPBlogManage']
});

export default (
  <Switch>
    <Route path="/" exact component={withTracker(Homepage)} />
    <Route path="/releases" exact component={withTracker(Releases)} />
    <Route path="/work/all" exact component={withTracker(Works)} />
    <Route path="/work/:stub" exact component={withTracker(Work)} />
    <Route path="/blog" exact component={withTracker(Blog)} />
    <Route path="/blog/:stub" exact component={withTracker(Blog)} />
    <Route
      path="/read/:stub/:lang/:volume/:chapter.:subchapter"
      exact
      component={withTracker(Reader)}
    />
    <Route path="/auth/login" exact component={withTracker(Login)} />
    <Route path="/auth/signup" exact component={withTracker(Signup)} />
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
    <RoutePrivate
      path="/admincp/dashboard"
      exact
      component={withTracker(ACPDashboard)}
    />
    <Redirect exact from="/admincp/work" to="/admincp/work/manage" />
    <RoutePrivate
      path="/admincp/work/manage"
      exact
      component={withTracker(ACPWorkManage)}
    />
    <RoutePrivate
      path="/admincp/work/add"
      exact
      component={withTracker(ACPWorkCreate)}
    />
    <RoutePrivate
      path="/admincp/work/edit/:stub"
      exact
      component={withTracker(ACPWorkCreate)}
    />
    <RoutePrivate
      path="/admincp/work/:workId/:stub"
      exact
      component={withTracker(ACPWorkDetail)}
    />
    <RoutePrivate
      path="/admincp/work/:workId/:stub/chapter/add"
      exact
      component={withTracker(ACPChapterCreate)}
    />
    <RoutePrivate
      path="/admincp/work/:workId/:stub/chapter/edit/:chapterId"
      exact
      component={withTracker(ACPChapterCreate)}
    />
    <RoutePrivate
      path="/admincp/work/:workId/:stub/chapter/:chapterId"
      exact
      component={withTracker(ACPChapterDetail)}
    />
    <Redirect exact from="/admincp/blog" to="/admincp/blog/manage" />
    <RoutePrivate
      path="/admincp/blog/manage"
      exact
      component={withTracker(ACPBlogManage)}
    />
    <RoutePrivate
      path="/admincp/blog/add_post"
      exact
      component={withTracker(ACPBlogCreate)}
    />
    <RoutePrivate
      path="/admincp/blog/edit_post/:stub"
      exact
      component={withTracker(ACPBlogCreate)}
    />
  </Switch>
);
