import styled from 'styled-components';
import theme from 'styled-theming';

import {
  DropdownToggle as RDropdownToggle,
  DropdownMenu as RDropdownMenu,
  DropdownItem as RDropdownItem
} from 'reactstrap';

import { cardBackgroundColor, background, primaryColor } from 'lib/theme';

const borderColor = theme('mode', {
  light: background.light.dark,
  dark: background.dark.normal
});

const menuBackground = theme('mode', {
  light: background.light.light,
  dark: background.dark.dark
});

const menuHoverBackground = theme('mode', {
  light: background.light.dark,
  dark: background.dark.normal
});

export const ChapterListStyle = styled.div`
  text-align: left;
  margin: 2rem 0 1rem 0;
`;

export const List = styled.div`
  border: 1px solid ${borderColor};
  border-radius: 2px;
  text-align: left;
  margin: 0.5rem 0 1rem 0;
  position: relative;
  padding-left: 0;
  list-style-type: none;
`;

export const NoChapters = styled.div`
  font-size: 1.5rem;
  margin-left: 10px;
`;

export const Title = styled.h2`
  margin-left: 10px;
`;

export const ChapterRow = styled.div`
  background-color: ${cardBackgroundColor};
  list-style-type: none;
  line-height: 1.5rem;
  padding: 10px 20px 10px 2px;
  margin: 0;
  border-bottom: 1px solid ${borderColor};
  ${props => (props.isSeen ? `opacity: 0.8:` : '')};
`;

export const ChapterIsSeen = styled.button`
  border: 0;
  background: transparent;
  margin-right: 3px;
  font-size: 0.8em;

  &:hover {
    color: ${primaryColor};
  }
`;

export const EndBadge = styled.span`
  margin-left: 5px;
  text-transform: uppercase;
`;

export const DropdownToggle = styled(RDropdownToggle)`
  border-radius: 10px !important;
  background-color: rgba(0, 0, 0, 0.3);
  border-color: transparent;
`;

export const DropdownMenu = styled(RDropdownMenu)`
  background-color: ${menuBackground};
`;

export const DropdownItem = styled(RDropdownItem)`
  background-color: ${menuBackground};

  &:active,
  &:hover {
    background-color: ${menuHoverBackground};
  }
`;
