import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse, NavbarToggler, NavbarBrand, Nav } from 'reactstrap';
import styled from 'styled-components';

import { isReaderRoute } from '@readerfront/shared';
import { useGlobalState } from 'lib/state';
import { APP_TITLE, DISCORD_URL, PATREON_URL } from 'lib/config';
import { Navbar } from './styles';

import RouteNavItem from './RouteNavItem';

import { theme as rfTheme } from '@readerfront/ui';
const { cardColor, primaryColor } = rfTheme;

const AppSettings = dynamic(() => import('./AppSettings'));

const SettingsButton = styled.button`
  border: 0;
  background: transparent;
  outline: none;
  font-size: 0.8em;
  color ${cardColor};
  transition: color 0.2s ease;

  &:hover {
    color ${primaryColor};
  }
`;

const Separator = styled.span`
  margin: 0 6px;
  color: #00000096;
  font-weight: 100;
`;

function Header({ theme }) {
  const [isCollapse, toggleCollapse] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [themeSelected] = useGlobalState('theme');
  const router = useRouter();

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const isThemeLight = themeSelected === 'light' || theme === 'light';

  return (
    <Navbar
      dark={!isThemeLight}
      light={isThemeLight}
      style={{ display: isReaderRoute(router) ? 'none' : 'flex' }}
      fixed="true"
      expand="md"
    >
      <NavbarBrand to="/">{APP_TITLE}</NavbarBrand>
      <NavbarToggler onClick={() => toggleCollapse(!isCollapse)} />
      <Collapse isOpen={isCollapse} navbar>
        <Nav className="ml-auto" navbar>
          <RouteNavItem href="/">
            <FontAwesomeIcon icon="home" />
            <FormattedMessage id="home" defaultMessage="Home" />
          </RouteNavItem>
          <RouteNavItem href="/releases">
            <FontAwesomeIcon icon="th-list" />
            <FormattedMessage id="releases" defaultMessage="Releases" />
          </RouteNavItem>
          <RouteNavItem href="/work/all">
            <FontAwesomeIcon icon="book" />
            <FormattedMessage id="projects" defaultMessage="Projects" />
          </RouteNavItem>
          <RouteNavItem href="/blog">
            <FontAwesomeIcon icon="rss" />
            Blog
          </RouteNavItem>
          {DISCORD_URL && (
            <RouteNavItem href={DISCORD_URL} target="_blank" rel="noopener">
              <FontAwesomeIcon icon={['fab', 'discord']} />
              Discord
            </RouteNavItem>
          )}
          {PATREON_URL && (
            <RouteNavItem href={PATREON_URL} target="_blank" rel="noopener">
              <FontAwesomeIcon icon={['fab', 'patreon']} />
              Patreon
            </RouteNavItem>
          )}
        </Nav>
      </Collapse>
      <Nav className="ml-auto" navbar style={{ display: 'contents' }}>
        <Separator>|</Separator>
        <SettingsButton
          title="Reader settings"
          id="settings-button"
          onClick={() => toggle(!dropdownOpen)}
        >
          <FontAwesomeIcon icon="cog" size="lg" />
        </SettingsButton>
        <AppSettings isOpen={dropdownOpen} toggle={toggle} />
      </Nav>
    </Navbar>
  );
}

export default Header;
