import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from 'reactstrap';
import RouteNavItem from './RouteNavItem';
import LangNavItem from './LangNavItem';
import { connect } from 'react-redux';
import { doChangeLanguage } from '../actions/doChangeLanguage';
import { setLanguage } from 'redux-i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faPatreon } from '@fortawesome/free-brands-svg-icons';
import {
  faBook,
  faThList,
  faRss,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import * as config from '../../config';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleChangeLanguage(lang) {
    this.props.doChangeLanguage(lang);
    this.props.setLanguage(lang);
  }

  render() {
    return (
      <Navbar
        color="white"
        fixed="true"
        light
        expand="md"
        style={{ padding: '0.1rem 1rem 0 1rem' }}
      >
        <NavbarBrand to="/">{config.APP_TITLE}</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Nav className="ml-auto" navbar>
          <LangNavItem
            cookielang={this.props.language}
            language="es"
            onClick={e => this.handleChangeLanguage('es')}
          >
            ES
          </LangNavItem>
          <LangNavItem
            cookielang={this.props.language}
            language="en"
            onClick={e => this.handleChangeLanguage('en')}
          >
            EN
          </LangNavItem>
        </Nav>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <RouteNavItem to="/" exact>
              <FontAwesomeIcon icon={faHome} />
              {this.context.t('Inicio')}
            </RouteNavItem>
            <RouteNavItem to="/releases">
              <FontAwesomeIcon icon={faThList} />
              Releases
            </RouteNavItem>
            <RouteNavItem to="/work/all">
              <FontAwesomeIcon icon={faBook} />
              {this.context.t('projects')}
            </RouteNavItem>
            <RouteNavItem to="/blog">
              <FontAwesomeIcon icon={faRss} />Blog
            </RouteNavItem>
            <RouteNavItem
              to={config.DISCORD_URL}
              target="_blank"
              rel="noopener"
            >
              <FontAwesomeIcon icon={faDiscord} />Discord
            </RouteNavItem>
            <RouteNavItem
              to={config.PATREON_URL}
              target="_blank"
              rel="noopener"
            >
              <FontAwesomeIcon icon={faPatreon} />Patreon
            </RouteNavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

Header.contextTypes = {
  t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    language: state.i18nState.lang
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doChangeLanguage: lang => dispatch(doChangeLanguage(lang)),
    setLanguage: lang => dispatch(setLanguage(lang))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false
  }
)(Header);
