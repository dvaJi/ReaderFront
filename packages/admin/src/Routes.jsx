import React from 'react';
import loadable from '@loadable/component';
import { Route, Switch, Redirect } from 'react-router';
import withTracker from './common/WithTracker';
import RoutePrivate from './auth/RoutePrivate';

import { setUser } from './state';

const Login = loadable(() => import('./auth/containers/LoginContainer'));

const Signup = loadable(() => import('./auth/containers/SignupContainer'));

const Activate = loadable(() =>
  import('./auth/containers/ActivateAccountContainer')
);

const RecoverPassword = loadable(() =>
  import('./auth/containers/RecoverPasswordContainer')
);

const ChangePassword = loadable(() =>
  import('./auth/containers/ChangePasswordContainer')
);

const ACPDashboard = loadable(() => import('./dashboard/Dashboard'));

const ACPWorkEdit = loadable(() => import('./works/CreateOrEdit/EditWork'));

const ACPWorkCreate = loadable(() => import('./works/CreateOrEdit/CreateWork'));

const ACPWorkManage = loadable(() => import('./works/AWorksList'));

const ACPWorkDetail = loadable(() => import('./works/Detail'));

const ACPChapterCreate = loadable(() =>
  import('./chapters/CreateOrEdit/CreateChapter')
);

const ACPChapterEdit = loadable(() =>
  import('./chapters/CreateOrEdit/EditChapter')
);

const ACPChapterDetail = loadable(() => import('./chapters/Detail'));

const ACPBlogCreatePost = loadable(() =>
  import('./blog/CreateOrEdit/CreatePost')
);

const ACPBlogEdit = loadable(() => import('./blog/CreateOrEdit/EditPost'));

const ACPBlogManage = loadable(() => import('./blog/List/List'));

const NotFound = loadable(() => import('./common/ErrorNotFound'));

const Unauthorized = loadable(() => import('./common/ErrorUnauthorized'));

const UsersList = loadable(() => import('./user/UsersList'));

const EditProfile = loadable(() => import('./user/EditProfile'));

const RegistryList = loadable(() => import('./registry/RegistryList'));

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
    <Route
      path="/auth/reset_password"
      exact
      component={withTracker(RecoverPassword)}
    />
    <Route
      path="/auth/change_password"
      exact
      component={withTracker(ChangePassword)}
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
      path="/work/edit/:workId"
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
    <Redirect exact from="/users" to="/users/manage" />
    <RoutePrivate
      path="/users/manage"
      exact
      component={withTracker(UsersList)}
    />
    <RoutePrivate path="/me/edit" exact component={withTracker(EditProfile)} />
    <RoutePrivate path="/registry" exact component={RegistryList} />
    <Route path="/401" component={withTracker(Unauthorized)} />
    <Route component={NotFound} />
  </Switch>
);
