import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { FormattedMessage, useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse, NavbarToggler, NavbarBrand, Nav } from 'reactstrap';

import { APP_TITLE, LANGUAGES } from '../../config';
import { isAuthRoute } from '../../../../shared/is';

import { ChangeTheme, Navbar, ToggleTheme } from './styles';
import { useGlobalState, setTheme, setLanguage } from 'state';
import RouteNavItem from './RouteNavItem';
import LangNavItem from './LangNavItem';

function LangNav({ language, isThemeLight }) {
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
            onClick={() => setLanguage(lang)}
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

function AdminNav({ language, themeSelected }) {
  const [isCollapse, toggleCollapse] = useState(false);
  const isThemeLight = themeSelected === 'light';
  return (
    <Navbar dark={!isThemeLight} light={isThemeLight} fixed="true" expand="md">
      <NavbarBrand to="/">{APP_TITLE}</NavbarBrand>
      <NavbarToggler onClick={() => toggleCollapse(!isCollapse)} />
      <LangNav isThemeLight={isThemeLight} language={language} />
      <Collapse isOpen={isCollapse} navbar>
        <Nav className="ml-auto" navbar>
          <RouteNavItem to="/" exact>
            <FormattedMessage id="dashboard" defaultMessage="Dashboard" />
          </RouteNavItem>
          <RouteNavItem to="/work">
            <FormattedMessage id="projects" defaultMessage="Projects" />
          </RouteNavItem>
          <RouteNavItem to="/blog">
            <FormattedMessage id="blog" defaultMessage="Blog" />
          </RouteNavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

function Header() {
  const [themeSelected] = useGlobalState('theme');
  const location = useLocation();
  const { locale } = useIntl();

  return (
    !isAuthRoute(location) && (
      <AdminNav themeSelected={themeSelected} language={locale} />
    )
  );
}

export default Header;
