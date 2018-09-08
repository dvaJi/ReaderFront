import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { login } from '../actions/doUser';
import AuthCheck from '../../auth/AuthCheck';
import AuthContainer from '../components/AuthContainer';

// Component
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: ''
      },
      error: null
    };
  }

  onChange = event => {
    let user = this.state.user;
    user[event.target.name] = event.target.value;

    this.setState({
      user
    });
  };

  onSubmit = event => {
    event.preventDefault();

    this.props
      .login(this.state.user)
      .then(response => {
        if (this.props.user.error && this.props.user.error.length > 0) {
          this.setState({ error: this.props.user.error });
        } else {
          this.setState({ error: null });
        }
      })
      .catch(error => {
        this.setState({ error: this.props.user.error });
      });
  };

  render() {
    const { isLoading, error } = this.props.user;

    return (
      <AuthContainer route={this.props.router.location}>
        {this.state.error && <Alert color="danger">{error}</Alert>}
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="email">
              <FormattedMessage id="email" defaultMessage="Email" />
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder={this.props.intl.formatMessage({
                id: 'email',
                defaultMessage: 'Email'
              })}
              required="required"
              value={this.state.user.email}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">
              <FormattedMessage id="password" defaultMessage="Password" />
            </Label>
            <Input
              id="password"
              type="password"
              placeholder={this.props.intl.formatMessage({
                id: 'password',
                defaultMessage: 'Password'
              })}
              required="required"
              name="password"
              value={this.state.user.password}
              onChange={this.onChange}
            />
          </FormGroup>
          <Button type="submit" size="lg" block disabled={isLoading}>
            <FormattedMessage id="login" defaultMessage="Login" />
          </Button>
        </Form>
        <AuthCheck />
      </AuthContainer>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

function loginState(state) {
  return {
    user: state.user,
    router: state.router
  };
}

export default injectIntl(
  connect(
    loginState,
    { login }
  )(withRouter(Login))
);
