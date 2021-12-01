import React from 'react';
import loadable from '@loadable/component';
import { Route, Switch, Redirect } from 'react-router';
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
    <RoutePrivate path="/" exact component={ACPDashboard} />
    <Route path="/auth/login" exact component={Login} />
    <Route path="/auth/signup" exact component={Signup} />
    <Route
      path="/auth/logout"
      exact
      render={() => {
        setUser(null);
        return <Redirect push to="/" />;
      }}
    />
    <Route path="/auth/activate_account" exact component={Activate} />
    <Route path="/auth/request_password" exact component={Activate} />
    <Route path="/auth/reset_password" exact component={RecoverPassword} />
    <Route path="/auth/change_password" exact component={ChangePassword} />
    <Redirect exact from="/work" to="/work/manage" />
    <RoutePrivate path="/work/manage" exact component={ACPWorkManage} />
    <RoutePrivate path="/work/add" exact component={ACPWorkCreate} />
    <RoutePrivate path="/work/edit/:workId" exact component={ACPWorkEdit} />
    <RoutePrivate path="/work/:workId/:stub" exact component={ACPWorkDetail} />
    <RoutePrivate
      path="/work/:workId/:stub/chapter/add"
      exact
      component={ACPChapterCreate}
    />
    <RoutePrivate
      path="/work/:workId/:stub/chapter/edit/:chapterId"
      exact
      component={ACPChapterEdit}
    />
    <RoutePrivate
      path="/work/:workId/:stub/chapter/:chapterId"
      exact
      component={ACPChapterDetail}
    />
    <Redirect exact from="/blog" to="/blog/manage" />
    <RoutePrivate path="/blog/manage" exact component={ACPBlogManage} />
    <RoutePrivate path="/blog/add_post" exact component={ACPBlogCreatePost} />
    <RoutePrivate path="/blog/edit_post/:stub" exact component={ACPBlogEdit} />
    <Redirect exact from="/users" to="/users/manage" />
    <RoutePrivate path="/users/manage" exact component={UsersList} />
    <RoutePrivate path="/me/edit" exact component={EditProfile} />
    <RoutePrivate path="/registry" exact component={RegistryList} />
    <Route path="/401" component={Unauthorized} />
    <Route component={NotFound} />
  </Switch>
);
