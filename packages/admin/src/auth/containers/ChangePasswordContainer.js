import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useMutation } from '@apollo/client';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import gql from 'graphql-tag';

import AuthCheck from '../AuthCheck';
import AuthContainer from '../components/AuthContainer';

export const LOGIN = gql`
  mutation UserChangePassword($token: String, $newPassword: String) {
    userChangePassword(token: $token, newPassword: $newPassword) {
      message
    }
  }
`;

function ChangePasswordContainer() {
  const [localPassword, setLocalPassword] = useState({
    rePassword: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [login] = useMutation(LOGIN);
  const location = useLocation();
  const history = useHistory();
  const { formatMessage: f } = useIntl();

  const params = new URLSearchParams(location.search);

  const onChange = event => {
    let pwd = { ...localPassword };
    pwd[event.target.name] = event.target.value;

    setLocalPassword(pwd);
  };

  const onSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);

    if (localPassword.password !== localPassword.rePassword) {
      setError(
        f({
          id: 'error_passwords_not_identical',
          defaultMessage: 'Passwords are not identical'
        })
      );
    } else {
      try {
        const { data } = await login({
          variables: {
            token: params.get('token'),
            newPassword: localPassword.password
          }
        });
        if (data.errors && data.errors.length > 0) {
          setError(data.errors[0].message);
        } else if (data.userChangePassword.message !== '') {
          setError(null);
          history.push('/auth/login');
        }
      } catch (err) {
        setError('Incorrect credentials');
      }
    }

    setIsLoading(false);
  };

  return (
    <AuthContainer route={location}>
      {error && (
        <Alert id="error_alert" color="danger">
          {error}
        </Alert>
      )}
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label for="password">
            {f({ id: 'password', defaultMessage: 'Password' })}
          </Label>
          <Input
            id="password"
            type="password"
            placeholder={f({
              id: 'password',
              defaultMessage: 'Password'
            })}
            required="required"
            name="password"
            value={localPassword.password}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">
            {f({ id: 'confirm_password', defaultMessage: 'Confirm password' })}
          </Label>
          <Input
            id="rePassword"
            type="password"
            placeholder={f({
              id: 'confirm_password',
              defaultMessage: 'Confirm password'
            })}
            required="required"
            name="rePassword"
            value={localPassword.rePassword}
            onChange={onChange}
          />
        </FormGroup>
        <Button type="submit" size="lg" block disabled={isLoading}>
          {f({ id: 'change_password', defaultMessage: 'Change Password' })}
        </Button>
      </Form>
      <AuthCheck />
    </AuthContainer>
  );
}

export default ChangePasswordContainer;
