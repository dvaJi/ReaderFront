import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useGlobalState } from 'state';

// Component
const RoutePrivate = props => {
  const [user] = useGlobalState('user');
  return user && user.role && user.role === 'ADMIN' ? (
    <Route {...props} component={props.component} />
  ) : (
    <Redirect to={'/auth/login'} />
  );
};

export default RoutePrivate;
