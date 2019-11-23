import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Component
const RoutePrivate = props =>
  props.user.isAuthenticated &&
  props.user.details.role &&
  props.user.details.role === 'ADMIN' ? (
    <Route {...props} component={props.component} />
  ) : (
    <Redirect to={'/auth/login'} />
  );

RoutePrivate.propTypes = {
  user: PropTypes.object.isRequired
};

function routePrivateState(state) {
  return {
    user: state.user
  };
}

export default connect(routePrivateState, {})(RoutePrivate);
