/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Alert, Spinner } from 'reactstrap';
import gql from 'graphql-tag';

import { getQueryParams } from '../../utils/helpers';
import AuthCheck from '../../auth/AuthCheck';
import AuthContainer from '../components/AuthContainer';
import { useMutation } from '@apollo/react-hooks';

export const ACTIVATE = gql`
  mutation UserActivate($email: String, $activatedToken: String) {
    userActivate(email: $email, activatedToken: $activatedToken) {
      email
      activatedToken
    }
  }
`;

function ActivateAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activate] = useMutation(ACTIVATE);
  const location = useLocation();
  const history = useHistory();

  useEffect(async () => {
    setIsLoading(true);
    const params = getQueryParams(location.search);
    const userActivate = {
      email: params.email,
      activatedToken: params.token
    };

    try {
      const response = await activate({ variables: userActivate });
      setIsLoading(false);
      if (response.data.errors && response.data.errors.length > 0) {
        setError(response.data.errors[0].message);
      } else {
        setSuccess('Account activated.');
        history.push('/auth/login');
      }
    } catch (err) {
      console.error(error);
      setError('There was some error. Please try again.');
      setIsLoading(false);
    }
  }, [activate]);

  return (
    <AuthContainer route={location}>
      {error && (
        <Alert id="activate-account_error_alert" color="danger">
          {error}
        </Alert>
      )}
      {success && (
        <Alert id="activate-account_success" color="success">
          {success}
        </Alert>
      )}
      {isLoading && <Spinner />}
      <AuthCheck />
    </AuthContainer>
  );
}

export default ActivateAccount;
