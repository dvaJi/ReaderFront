import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { register } from '../actions/doUser';
import AuthCheck from '../../auth/AuthCheck';
import AuthContainer from '../components/AuthContainer';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      success: '',
      isLoading: false,
      user: {
        name: '',
        email: '',
        password: ''
      }
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

    this.setState({
      isLoading: true
    });

    this.props
      .register(this.state.user)
      .then(response => {
        this.setState({
          isLoading: false
        });

        if (response.data.errors && response.data.errors.length > 0) {
          this.setState({
            error: response.data.errors[0].message
          });
        } else {
          this.setState({
            success: 'Signed up successfully.'
          });
          this.props.history.push('/login');
        }
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          error: 'There was some error signing you up. Please try again.'
        });
      });
  };

  render() {
    return (
      <AuthContainer route={this.props.router.location}>
        {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
        {this.state.success && (
          <Alert color="success">{this.state.success}</Alert>
        )}
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="username">{this.context.t('Nombre de usuario')}</Label>
            <Input
              id="username"
              type="text"
              placeholder={this.context.t('Nombre de usuario')}
              required="required"
              name="name"
              value={this.state.user.name}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">{this.context.t('Correo electrónico')}</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder={this.context.t('Correo electrónico')}
              required="required"
              value={this.state.user.email}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">{this.context.t('Contraseña')}</Label>
            <Input
              id="password"
              type="password"
              placeholder={this.context.t('Contraseña')}
              required="required"
              name="password"
              value={this.state.user.password}
              onChange={this.onChange}
            />
          </FormGroup>
          <Button type="submit" size="lg" block disabled={this.state.isLoading}>
            {this.context.t('Iniciar sesión')}
          </Button>
        </Form>
        <AuthCheck />
      </AuthContainer>
    );
  }
}

Signup.propTypes = {
  register: PropTypes.func.isRequired
};

Signup.contextTypes = {
  t: PropTypes.func.isRequired
};

export default connect(
  null,
  { register }
)(withRouter(Signup));
