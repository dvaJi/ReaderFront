import React, { Component } from "react";
import PropTypes from "prop-types";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
import RouteNavItem from "./RouteNavItem";
import LangNavItem from "./LangNavItem";
import { connect } from "react-redux";
import { doChangeLanguage } from "../actions/doChangeLanguage";
import { setLanguage } from "redux-i18n";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBook from "@fortawesome/fontawesome-free-solid/faBook";
import faThList from "@fortawesome/fontawesome-free-solid/faThList";
import faRss from "@fortawesome/fontawesome-free-solid/faRss";
import faDiscord from "@fortawesome/fontawesome-free-brands/faDiscord";
import faPatreon from "@fortawesome/fontawesome-free-brands/faPatreon";
import * as config from "../../config";

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
      <Navbar color="white" fixed="true" light expand="md">
        <NavbarBrand to="/">{config.APP_TITLE}</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <LangNavItem
              cookielang={this.props.language}
              language="es"
              onClick={e => this.handleChangeLanguage("es")}
            >
              ES
            </LangNavItem>
            <LangNavItem
              cookielang={this.props.language}
              language="en"
              onClick={e => this.handleChangeLanguage("en")}
            >
              EN
            </LangNavItem>
            <RouteNavItem href="/">
              <FontAwesomeIcon icon={faThList} />
              Releases
            </RouteNavItem>
            <RouteNavItem href="/series">
              <FontAwesomeIcon icon={faBook} />Series
            </RouteNavItem>
            <RouteNavItem href="/blog">
              <FontAwesomeIcon icon={faRss} />Blog
            </RouteNavItem>
            <RouteNavItem href={config.DISCORD_URL} target="_blank">
              <FontAwesomeIcon icon={faDiscord} />Discord
            </RouteNavItem>
            <RouteNavItem href={config.PATREON_URL} target="_blank">
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
