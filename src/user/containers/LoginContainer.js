import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { login } from '../actions/doUser';
import AuthCheck from '../../auth/AuthCheck';
import AuthContainer from '../components/AuthContainer';

const USER = {
  email: '',
  password: ''
};

function Login({ user, login }) {
  const [localUser, setLocalUser] = useState(USER);
  const [localError, setLocalError] = useState(null);
  const location = useLocation();
  const { formatMessage: f } = useIntl();

  const onChange = event => {
    let user = { ...localUser };
    user[event.target.name] = event.target.value;

    setLocalUser(user);
  };

  const onSubmit = event => {
    event.preventDefault();

    login(localUser)
      .then(response => {
        if (user.error && user.error.length > 0) {
          setLocalError(user.error);
        } else {
          setLocalError(null);
        }
      })
      .catch(error => {
        setLocalError(user.error);
      });
  };

  const { isLoading, error } = user;

  return (
    <AuthContainer route={location}>
      {localError && <Alert color="danger">{error}</Alert>}
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

function loginState(state) {
  return {
    user: state.user
  };
}

export default connect(loginState, { login })(Login);
