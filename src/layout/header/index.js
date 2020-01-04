import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { doChangeLanguage } from '../actions/doChangeLanguage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse, NavbarToggler, NavbarBrand, Nav } from 'reactstrap';

import { APP_TITLE, DISCORD_URL, PATREON_URL, LANGUAGES } from '../../config';
import { isAuthRoute, isAdminRoute, isReaderRoute } from '../../utils/helpers';

import { ChangeTheme, Navbar, ToggleTheme } from './styles';
import { useGlobalState, setTheme } from '../../state';
import RouteNavItem from './RouteNavItem';
import LangNavItem from './LangNavItem';

function LangNav({ language, onChangeLanguage, isThemeLight }) {
  const [lighTheme, changeTheme] = useState(isThemeLight);
  const toggleTheme = () => {
    changeTheme(!lighTheme);
    setTheme(!lighTheme ? 'light' : 'dark');
  };
  return (
    <Nav className="ml-auto" navbar style={{ display: 'contents' }}>
      {LANGUAGES.length > 1 &&
        LANGUAGES.map(lang => (
          <LangNavItem
            key={`nav-${lang}`}
            cookielang={language}
            language={lang}
            onClick={() => onChangeLanguage(lang)}
          >
            {lang.toUpperCase()}
          </LangNavItem>
        ))}
      <ChangeTheme>
        <ToggleTheme
          type="switch"
          id="change-theme"
          name="switchTheme"
          defaultChecked={lighTheme}
          onChange={toggleTheme}
        />
        {lighTheme && <FontAwesomeIcon icon="sun" />}
        {!lighTheme && <FontAwesomeIcon icon="moon" />}
      </ChangeTheme>
    </Nav>
  );
}

function AdminNav({ changeLanguage, language, themeSelected }) {
  const [isCollapse, toggleCollapse] = useState(false);
  const isThemeLight = themeSelected === 'light';
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

function PublicNav({ changeLanguage, language, themeSelected, hidden }) {
  const [isCollapse, toggleCollapse] = useState(false);
  const isThemeLight = themeSelected === 'light';
  return (
    <Navbar
      dark={!isThemeLight}
      light={isThemeLight}
      fixed="true"
      expand="md"
      style={{ display: hidden ? 'none' : 'flex' }}
    >
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
            <FontAwesomeIcon icon="home" />
            <FormattedMessage id="home" defaultMessage="Home" />
          </RouteNavItem>
          <RouteNavItem to="/releases">
            <FontAwesomeIcon icon="th-list" />
            <FormattedMessage id="releases" defaultMessage="Releases" />
          </RouteNavItem>
          <RouteNavItem to="/work/all">
            <FontAwesomeIcon icon="book" />
            <FormattedMessage id="projects" defaultMessage="Projects" />
          </RouteNavItem>
          <RouteNavItem to="/blog">
            <FontAwesomeIcon icon="rss" />
            Blog
          </RouteNavItem>
          {DISCORD_URL && (
            <RouteNavItem to={DISCORD_URL} target="_blank" rel="noopener">
              <FontAwesomeIcon icon={['fab', 'discord']} />
              Discord
            </RouteNavItem>
          )}
          {PATREON_URL && (
            <RouteNavItem to={PATREON_URL} target="_blank" rel="noopener">
              <FontAwesomeIcon icon={['fab', 'patreon']} />
              Patreon
            </RouteNavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

function Header({ doChangeLanguage }) {
  const [themeSelected] = useGlobalState('theme');
  const location = useLocation();
  const { locale } = useIntl();
  const showPublicNav = !isAuthRoute(location) && !isAdminRoute(location);
  const showAdminNav = !isAuthRoute(location) && isAdminRoute(location);

  return (
    (showPublicNav && (
      <PublicNav
        themeSelected={themeSelected}
        language={locale}
        changeLanguage={doChangeLanguage}
        hidden={isReaderRoute(location)}
      />
    )) ||
    (showAdminNav && (
      <AdminNav
        themeSelected={themeSelected}
        language={locale}
        changeLanguage={doChangeLanguage}
      />
    ))
  );
}

const mapDispatchToProps = dispatch => {
  return {
    doChangeLanguage: lang => dispatch(doChangeLanguage(lang))
  };
};

export default connect(null, mapDispatchToProps, null, {
  pure: false
})(Header);
