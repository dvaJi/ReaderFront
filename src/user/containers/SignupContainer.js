import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";

import { register } from "../actions/doUser";
import AuthCheck from "../../auth/AuthCheck";
import AuthContainer from "../components/AuthContainer";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      success: "",
      isLoading: false,
      user: {
        name: "",
        email: "",
        password: ""
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
            success: this.props.intl.formatMessage({
              id: "success_signup",
              defaultMessage: "Signed up successfully."
            })
          });
          this.props.history.push("/login");
        }
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          error: this.props.intl.formatMessage({
            id: "uknown_error_signup",
            defaultMessage:
              "There was some error signing you up. Please try again."
          })
        });
      });
  };

  render() {
    return (
      <AuthContainer route={this.props.router.location}>
        {this.state.error && (
          <Alert id="signup_error_alert" color="danger">
            {this.state.error}
          </Alert>
        )}
        {this.state.success && (
          <Alert color="success">{this.state.success}</Alert>
        )}
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="username">
              <FormattedMessage id="username" defaultMessage="Username" />
            </Label>
            <Input
              id="username"
              type="text"
              placeholder={this.props.intl.formatMessage({
                id: "username",
                defaultMessage: "Username"
              })}
              required="required"
              name="name"
              value={this.state.user.name}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">
              <FormattedMessage id="email" defaultMessage="Email" />
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder={this.props.intl.formatMessage({
                id: "email",
                defaultMessage: "Email"
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
                id: "password",
                defaultMessage: "Password"
              })}
              required="required"
              name="password"
              value={this.state.user.password}
              onChange={this.onChange}
            />
          </FormGroup>
          <Button type="submit" size="lg" block disabled={this.state.isLoading}>
            <FormattedMessage id="signup" defaultMessage="Signup" />
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

export default injectIntl(
  connect(
    null,
    { register }
  )(withRouter(Signup))
);
