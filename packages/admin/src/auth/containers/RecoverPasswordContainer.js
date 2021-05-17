import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import gql from 'graphql-tag';

import AuthCheck from '../AuthCheck';
import AuthContainer from '../components/AuthContainer';
import { useMutation } from '@apollo/client';
import { useIntl } from 'react-intl';

export const RECOVER_PASSWORD = gql`
  mutation UserRecoverPassword($email: String) {
    userRecoverPassword(email: $email) {
      message
    }
  }
`;

function RecoverPasswordContainer() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [recoverPassword] = useMutation(RECOVER_PASSWORD);
  const location = useLocation();
  const { formatMessage: f } = useIntl();

  const onSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await recoverPassword({ variables: { email } });
      if (data.errors && data.errors.length > 0) {
        setError(data.errors[0].message);
      } else if (data.userRecoverPassword.message !== '') {
        setError(null);
        setSuccess(
          f({
            id: 'reset_password_msg',
            defaultMessage:
              'An email has been sent with the instructions to change your password.'
          })
        );
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
      {success && (
        <Alert id="signup_success_alert" color="success">
          {success}
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
            value={email}
            onChange={ev => setEmail(ev.target.value)}
          />
        </FormGroup>
        <Button type="submit" size="lg" block disabled={isLoading}>
          {f({ id: 'reset_password', defaultMessage: 'Reset Password' })}
        </Button>
      </Form>
      <AuthCheck />
    </AuthContainer>
  );
}

export default RecoverPasswordContainer;
