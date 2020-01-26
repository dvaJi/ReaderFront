import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useMutation } from '@apollo/react-hooks';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import gql from 'graphql-tag';

import AuthCheck from '../../auth/AuthCheck';
import AuthContainer from '../components/AuthContainer';
import { setUser } from 'state';

export const LOGIN = gql`
  mutation UserLogin($email: String, $password: String) {
    userLogin(email: $email, password: $password) {
      user {
        id
        name
        email
        role
      }
      token
    }
  }
`;

function Login() {
  const [localUser, setLocalUser] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [login] = useMutation(LOGIN);
  const location = useLocation();
  const history = useHistory();
  const { formatMessage: f } = useIntl();

  const onChange = event => {
    let user = { ...localUser };
    user[event.target.name] = event.target.value;

    setLocalUser(user);
  };

  const onSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await login({ variables: localUser });
      if (data.errors && data.errors.length > 0) {
        setError(data.errors[0].message);
      } else if (data.userLogin.token !== '') {
        setError(null);
        const { user, token } = data.userLogin;

        setUser(user, token);

        history.push('/');
      }
    } catch (err) {
      setError('Incorrect credentials');
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
          <Label for="email">
            {f({ id: 'email', defaultMessage: 'Email' })}
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder={f({
              id: 'email',
              defaultMessage: 'Email'
            })}
            required="required"
            value={localUser.email}
            onChange={onChange}
          />
        </FormGroup>
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
            value={localUser.password}
            onChange={onChange}
          />
        </FormGroup>
        <Button type="submit" size="lg" block disabled={isLoading}>
          {f({ id: 'login', defaultMessage: 'Login' })}
        </Button>
      </Form>
      <AuthCheck />
    </AuthContainer>
  );
}

export default Login;
