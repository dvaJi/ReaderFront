import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { doChangeLanguage } from "../actions/doChangeLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
import { faDiscord, faPatreon } from "@fortawesome/free-brands-svg-icons";
import {
  faBook,
  faThList,
  faRss,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import * as config from "../../config";
import { renderIf, isAuthRoute, isAdminRoute } from "../../utils/helpers";
import RouteNavItem from "./RouteNavItem";
import LangNavItem from "./LangNavItem";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.renderNav = this.renderNav.bind(this);
    this.renderAdminNav = this.renderAdminNav.bind(this);
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleChangeLanguage(lang) {
    this.props.doChangeLanguage(lang);
  }

  renderLangNav() {
    return (
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
      </Nav>
    );
  }

  renderNav() {
    return (
      <Navbar
        color="white"
        fixed="true"
        light
        expand="md"
        style={{ padding: "0.1rem 1rem 0 1rem" }}
      >
        <NavbarBrand to="/">{config.APP_TITLE}</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        {this.renderLangNav()}
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <RouteNavItem to="/" exact>
              <FontAwesomeIcon icon={faHome} />
              <FormattedMessage id="home" defaultMessage="Home" />
            </RouteNavItem>
            <RouteNavItem to="/releases">
              <FontAwesomeIcon icon={faThList} />
              <FormattedMessage id="releases" defaultMessage="Releases" />
            </RouteNavItem>
            <RouteNavItem to="/work/all">
              <FontAwesomeIcon icon={faBook} />
              <FormattedMessage id="projects" defaultMessage="Projects" />
            </RouteNavItem>
            <RouteNavItem to="/blog">
              <FontAwesomeIcon icon={faRss} />
              Blog
            </RouteNavItem>
            {config.DISCORD_URL && (
              <RouteNavItem
                to={config.DISCORD_URL}
                target="_blank"
                rel="noopener"
              >
                <FontAwesomeIcon icon={faDiscord} />
                Discord
              </RouteNavItem>
            )}
            {config.PATREON_URL && (
              <RouteNavItem
                to={config.PATREON_URL}
                target="_blank"
                rel="noopener"
              >
                <FontAwesomeIcon icon={faPatreon} />
                Patreon
              </RouteNavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }

  renderAdminNav() {
    return (
      <Navbar
        color="white"
        fixed="true"
        light
        expand="md"
        style={{ padding: "0.1rem 1rem 0 1rem" }}
      >
        <NavbarBrand to="/">{config.APP_TITLE}</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        {this.renderLangNav()}
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <RouteNavItem to="/admincp/dashboard" exact>
              <FormattedMessage id="dashboard" defaultMessage="Dashboard" />
            </RouteNavItem>
            <RouteNavItem to="/admincp/work">
              <FormattedMessage id="projects" defaultMessage="Projects" />
            </RouteNavItem>
            <RouteNavItem to="/admincp/blog">
              <FormattedMessage id="blog" defaultMessage="Blog" />
            </RouteNavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }

  render() {
    return (
      renderIf(
        !isAuthRoute(this.props.route) && !isAdminRoute(this.props.route),
        this.renderNav
      ) ||
      renderIf(
        !isAuthRoute(this.props.route) && isAdminRoute(this.props.route),
        this.renderAdminNav
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.layout.language,
    route: state.router.location
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doChangeLanguage: lang => dispatch(doChangeLanguage(lang))
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
