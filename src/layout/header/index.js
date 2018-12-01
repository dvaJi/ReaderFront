import React, { Component } from "react";
import { Layout, Menu } from 'antd';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// App imports
import * as config from "../../config";
import { doChangeLanguage } from "../actions/doChangeLanguage";
import { ADMIN_ROUTES, PUBLIC_ROUTES } from "./routesNav";
import { renderIf, isAuthRoute, isAdminRoute } from "../../utils/helpers";

const { Header } = Layout;

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      languages: ['es', 'en']
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.renderNav = this.renderNav.bind(this);
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleChangeLanguage(lang) {
    this.props.doChangeLanguage(lang);
  }

  renderLanguageNav() {
    return this.state.languages.map(lang => (
      <Menu.Item
        key={"lang_" + lang}
        language={lang}
        onClick={e => this.handleChangeLanguage(lang)}
      >
        {lang.toUpperCase()}
      </Menu.Item>
    ));
  }

  renderNav(routes) {
    return routes
    .sort((r1, r2) => r2.position - r1.position)
    .map(route => {
      return (
        route.show && (
          <Menu.Item key={route.to} style={{ float: "right" }}>
            <NavLink
              to={route.to}
              activeClassName="active"
              exact={true}
            >
              {route.icon && <FontAwesomeIcon style={{marginRight: '3px'}} icon={route.icon} />}
              <FormattedMessage
                id={route.msgId}
                defaultMessage={route.msgDefault}
              />
            </NavLink>
          </Menu.Item>
        )
      );
    });
  }

  render() {
    const langSelected = 'lang_' + this.props.language;
    return renderIf(!isAuthRoute(this.props.route), () => (
      <Header style={{ zIndex: 1, width: "100%", padding: "0px" }}>
        <div style={{ fontSize: "large", float: "left", paddingLeft: "10px" }}>
          {config.APP_TITLE}
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[this.props.currentPath, langSelected]}
          style={{ lineHeight: "64px" }}
        >
          {this.renderNav(
            isAdminRoute(this.props.route) ? ADMIN_ROUTES : PUBLIC_ROUTES
          )}
          {this.renderLanguageNav()}
        </Menu>
      </Header>
    ));
  }
}

const mapStateToProps = state => {
  return {
    language: state.layout.language,
    route: state.router.location,
    currentPath: state.router.location.pathname
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
)(Navbar);
