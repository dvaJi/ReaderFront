import React, { useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';

import { FormattedMessage, useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  DropdownItem,
  Dropdown
} from 'reactstrap';

import { APP_TITLE, LANGUAGES } from '../../config';
import { isAuthRoute } from '@readerfront/shared';

import {
  ChangeTheme,
  Navbar,
  ToggleTheme,
  UserLogged,
  UserLoggedMenu
} from './styles';
import { useGlobalState, setTheme, setLanguage } from 'state';
import RouteNavItem from './RouteNavItem';
import LangNavItem from './LangNavItem';

function LangNav({ isThemeLight }) {
  const [lighTheme, changeTheme] = useState(isThemeLight);
  const { locale } = useIntl();

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
            cookielang={locale}
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

function AdminNav() {
  const [isCollapse, toggleCollapse] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const history = useHistory();

  const [themeSelected] = useGlobalState('theme');
  const [user] = useGlobalState('user');

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
  const isThemeLight = themeSelected === 'light';
  return (
    <Navbar dark={!isThemeLight} light={isThemeLight} fixed="true" expand="md">
      <NavbarBrand to="/">{APP_TITLE}</NavbarBrand>
      <NavbarToggler onClick={() => toggleCollapse(!isCollapse)} />
      <LangNav isThemeLight={isThemeLight} />
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
        {user && (
          <Dropdown
            isOpen={dropdownOpen}
            toggle={toggleDropdown}
            data-toggle="dropdown"
            aria-expanded={dropdownOpen}
          >
            <UserLogged tag="span">
              <FontAwesomeIcon icon="user" />
            </UserLogged>
            <UserLoggedMenu>
              <DropdownItem header>{user.name}</DropdownItem>
              <DropdownItem>
                <Link to="/me/edit">Edit Profile</Link>
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  history.push('/auth/logout');
                }}
              >
                <FormattedMessage id="logout" defaultMessage="Logout" />
              </DropdownItem>
            </UserLoggedMenu>
          </Dropdown>
        )}
      </Collapse>
    </Navbar>
  );
}

function Header() {
  const location = useLocation();

  return !isAuthRoute(location) && <AdminNav />;
}

export default Header;
