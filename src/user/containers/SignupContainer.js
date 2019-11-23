import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import { useLocation, useHistory } from 'react-router-dom';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { register } from '../actions/doUser';
import AuthCheck from '../../auth/AuthCheck';
import AuthContainer from '../components/AuthContainer';

const USER = {
  name: '',
  email: '',
  password: ''
};

function Signup({ register }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(USER);
  const { formatMessage: f } = useIntl();
  const location = useLocation();
  const history = useHistory();

  const onChange = event => {
    let luser = { ...user };
    luser[event.target.name] = event.target.value;

    setUser(luser);
  };

  const onSubmit = event => {
    event.preventDefault();

    setIsLoading(true);

    register(user)
      .then(response => {
        setIsLoading(false);

        if (response.data.errors && response.data.errors.length > 0) {
          setError(response.data.errors[0].message);
        } else {
          setSuccess(
            f({
              id: 'success_signup',
              defaultMessage: 'Signed up successfully.'
            })
          );
          history.push('/login');
        }
      })
      .catch(error => {
        setIsLoading(false);
        setError(
          f({
            id: 'uknown_error_signup',
            defaultMessage:
              'There was some error signing you up. Please try again.'
          })
        );
      });
  };

  return (
    <AuthContainer route={location}>
      {error && (
        <Alert id="signup_error_alert" color="danger">
          {error}
        </Alert>
      )}
      {success && <Alert color="success">{success}</Alert>}
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label for="username">
            {f({ id: 'username', defaultMessage: 'Username' })}
          </Label>
          <Input
            id="username"
            type="text"
            placeholder={f({
              id: 'username',
              defaultMessage: 'Username'
            })}
            required="required"
            name="name"
            value={user.name}
            onChange={onChange}
          />
        </FormGroup>
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
            value={user.email}
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
            value={user.password}
            onChange={onChange}
          />
        </FormGroup>
        <Button type="submit" size="lg" block disabled={isLoading}>
          {f({ id: 'signup', defaultMessage: 'Signup' })}
        </Button>
      </Form>
      <AuthCheck />
    </AuthContainer>
  );
}

export default connect(
  null,
  { register }
)(Signup);
