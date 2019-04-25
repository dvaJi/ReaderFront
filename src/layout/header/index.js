import React, { useState } from "react";

import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { doChangeLanguage } from "../actions/doChangeLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
import { faDiscord, faPatreon } from "@fortawesome/free-brands-svg-icons";
import {
  faBook,
  faThList,
  faRss,
  faHome,
  faSun,
  faMoon
} from "@fortawesome/free-solid-svg-icons";
import { APP_TITLE, DISCORD_URL, PATREON_URL } from "../../config";
import { isAuthRoute, isAdminRoute } from "../../utils/helpers";

import { ChangeTheme, Navbar, ToggleTheme } from "./styles";
import { useGlobalState, setTheme } from "../../state";
import RouteNavItem from "./RouteNavItem";
import LangNavItem from "./LangNavItem";

function LangNav({ language, onChangeLanguage, isThemeLight }) {
  const [lighTheme, changeTheme] = useState(isThemeLight);
  const toggleTheme = () => {
    changeTheme(!lighTheme);
    setTheme(!lighTheme ? "light" : "dark");
  };
  return (
    <Nav className="ml-auto" navbar style={{ display: "contents" }}>
      <LangNavItem
        cookielang={language}
        language="es"
        onClick={() => onChangeLanguage("es")}
      >
        ES
      </LangNavItem>
      <LangNavItem
        cookielang={language}
        language="en"
        onClick={() => onChangeLanguage("en")}
      >
        EN
      </LangNavItem>
      <ChangeTheme>
        <ToggleTheme
          type="switch"
          id="change-theme"
          name="switchTheme"
          defaultChecked={lighTheme}
          onChange={toggleTheme}
        />
        {lighTheme && <FontAwesomeIcon icon={faSun} />}
        {!lighTheme && <FontAwesomeIcon icon={faMoon} />}
      </ChangeTheme>
    </Nav>
  );
}

function AdminNav({ changeLanguage, language, themeSelected }) {
  const [isCollapse, toggleCollapse] = useState(false);
  const isThemeLight = themeSelected === "light";
  return (
    <Navbar dark={!isThemeLight} light={isThemeLight} fixed="true" expand="md">
      <NavbarBrand to="/">{APP_TITLE}</NavbarBrand>
      <NavbarToggler onClick={() => toggleCollapse(!isCollapse)} />
      <LangNav
        isThemeLight={isThemeLight}
        language={language}
        onChangeLanguage={changeLanguage}
      />
      <Collapse isOpen={isCollapse} navbar>
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

function PublicNav({ changeLanguage, language, themeSelected }) {
  const [isCollapse, toggleCollapse] = useState(false);
  const isThemeLight = themeSelected === "light";
  return (
    <Navbar dark={!isThemeLight} light={isThemeLight} fixed="true" expand="md">
      <NavbarBrand to="/">{APP_TITLE}</NavbarBrand>
      <NavbarToggler onClick={() => toggleCollapse(!isCollapse)} />
      <LangNav
        isThemeLight={isThemeLight}
        language={language}
        onChangeLanguage={changeLanguage}
      />
      <Collapse isOpen={isCollapse} navbar>
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
          {DISCORD_URL && (
            <RouteNavItem to={DISCORD_URL} target="_blank" rel="noopener">
              <FontAwesomeIcon icon={faDiscord} />
              Discord
            </RouteNavItem>
          )}
          {PATREON_URL && (
            <RouteNavItem to={PATREON_URL} target="_blank" rel="noopener">
              <FontAwesomeIcon icon={faPatreon} />
              Patreon
            </RouteNavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

function Header({ route, language, doChangeLanguage }) {
  const [themeSelected] = useGlobalState("theme");
  const showPublicNav = !isAuthRoute(route) && !isAdminRoute(route);
  const showAdminNav = !isAuthRoute(route) && isAdminRoute(route);

  return (
    (showPublicNav && (
      <PublicNav
        themeSelected={themeSelected}
        language={language}
        changeLanguage={doChangeLanguage}
      />
    )) ||
    (showAdminNav && (
      <AdminNav
        themeSelected={themeSelected}
        language={language}
        changeLanguage={doChangeLanguage}
      />
    ))
  );
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
