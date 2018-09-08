import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { getQueryParams } from '../../utils/helpers';
import { activate } from '../actions/doUser';
import AuthCheck from '../../auth/AuthCheck';
import AuthContainer from '../components/AuthContainer';

class ActivateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      success: '',
      isLoading: false,
      user: {
        email: '',
        token: ''
      }
    };
  }

  componentDidMount = () => {
    this.setState({
      isLoading: true
    });
    const searchLocation = getQueryParams(this.props.searchLocation);
    const userActivate = {
      email: searchLocation.email,
      activatedToken: searchLocation.token
    };

    this.props
      .activate(userActivate)
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
            success: 'Account activated.'
          });
          this.props.history.push('/login');
        }
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          error: 'There was some error. Please try again.'
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
        <AuthCheck />
      </AuthContainer>
    );
  }
}

ActivateAccount.propTypes = {
  activate: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    searchLocation: ownProps.location.search
  };
};

export default connect(
  mapStateToProps,
  { activate }
)(withRouter(ActivateAccount));
