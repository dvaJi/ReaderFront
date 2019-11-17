/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Alert, Spinner } from 'reactstrap';

import { getQueryParams } from '../../utils/helpers';
import { activate } from '../actions/doUser';
import AuthCheck from '../../auth/AuthCheck';
import AuthContainer from '../components/AuthContainer';

function ActivateAccount({ activate, searchLocation, history }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const params = getQueryParams(location.search);
    const userActivate = {
      email: params.email,
      activatedToken: params.token
    };
    activate(userActivate)
      .then(response => {
        setIsLoading(false);

        if (response.data.errors && response.data.errors.length > 0) {
          setError(response.data.errors[0].message);
        } else {
          setSuccess('Account activated.');
          history.push('/auth/login');
        }
      })
      .catch(error => {
        console.error(error);
        setError('There was some error. Please try again.');
        setIsLoading(false);
      });
  }, [activate, searchLocation]);

  return (
    <AuthContainer route={location}>
      {error && (
        <Alert id="activate-account_error_alert" color="danger">
          {error}
        </Alert>
      )}
      {success && <Alert color="success">{success}</Alert>}
      {isLoading && <Spinner />}
      <AuthCheck />
    </AuthContainer>
  );
}

export default connect(
  null,
  { activate }
)(ActivateAccount);
