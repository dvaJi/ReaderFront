import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Component
const AuthCheck = props =>
  props.user.isAuthenticated ? (
    props.user.details.role === 'ADMIN' ? (
      <Redirect to={'/admincp/dashboard'} />
    ) : (
      <Redirect to={'/'} />
    )
  ) : (
    ''
  );

AuthCheck.propTypes = {
  user: PropTypes.object.isRequired
};

function authCheckState(state) {
  return {
    user: state.user
  };
}

export default connect(
  authCheckState,
  {}
)(AuthCheck);
