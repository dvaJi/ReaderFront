import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { Alert, Container, Form, FormGroup } from 'reactstrap';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, ButtonLink, Card, Input, Label } from 'common/ui';

import { UPDATE_PROFILE } from './mutation';
import { useGlobalState } from 'state';

function Profile() {
  const [newUser, setNewUser] = useState({});
  const [error, setError] = useState(null);
  const [user] = useGlobalState('user');
  const history = useHistory();
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const { formatMessage: f } = useIntl();

  useEffect(() => {
    if (!newUser.id) {
      setNewUser(user);
    }
  }, [user, newUser.id]);

  const handleOnChange = event => {
    let post = { ...newUser };
    post[event.target.name] = event.target.value;

    setNewUser(post);
  };

  const onSubmit = async event => {
    event.preventDefault();

    console.warn(newUser);
    if (newUser.password !== newUser.confirm_password) {
      setError(
        f({
          id: 'error_passwords_not_identical',
          defaultMessage: 'Passwords are not identical'
        })
      );
    } else {
      setError(null);
      try {
        await updateProfile({
          variables: {
            username: newUser.username,
            password: newUser.password
          }
        });
        history.push('/');
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <Container>
      <div style={{ marginTop: '1rem' }}>
        <ButtonLink to={'/dashboard'}>
          <FontAwesomeIcon icon="arrow-left" />{' '}
          {f({ id: 'go_back', defaultMessage: 'Go back' })}
        </ButtonLink>
      </div>
      <Card>
        <h4>{f({ id: 'edit_profile', defaultMessage: 'Edit Profile' })}</h4>
        {error && (
          <Alert id="error_alert" color="danger">
            {error}
          </Alert>
        )}
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Label htmlFor="username">
              {f({ id: 'username', defaultMessage: 'Username' })}
            </Label>
            <Input
              id="username"
              type="text"
              placeholder={f({
                id: 'username',
                defaultMessage: 'Username'
              })}
              name="username"
              value={newUser.username}
              onChange={handleOnChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">
              {f({ id: 'password', defaultMessage: 'Password' })}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder={f({
                id: 'password',
                defaultMessage: 'Password'
              })}
              name="password"
              value={newUser.password}
              onChange={handleOnChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirm_password">
              {f({
                id: 'confirm_password',
                defaultMessage: 'Confirm password'
              })}
            </Label>
            <Input
              id="confirm_password"
              type="password"
              placeholder={f({
                id: 'confirm_password',
                defaultMessage: 'Confirm password'
              })}
              name="confirm_password"
              value={newUser.confirm_password}
              onChange={handleOnChange}
            />
          </FormGroup>
          <Button type="submit" size="lg" block>
            {f({ id: 'save', defaultMessage: 'Save' })}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Profile;
