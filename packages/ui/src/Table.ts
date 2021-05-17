import styled from 'styled-components';
import theme from 'styled-theming';
import { background, cardBackgroundColor } from './theme';

const contentColor = theme('mode', {
  light: background.light.darkest,
  dark: background.dark.lightest
});

const borderColor = theme('mode', {
  light: background.light.dark,
  dark: background.dark.normal
});

const hoverBackgroundColor = theme('mode', {
  light: background.light.normal,
  dark: background.dark.normal
});

export const Table = styled.table`
  background-color: ${cardBackgroundColor};
  color: ${contentColor};
  border: 1px solid ${borderColor};
  border-radius: 2px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  margin-bottom: 1rem;
  border-collapse: collapse;

  th,
  td {
    padding: 0.75rem;
    vertical-align: top;
    border: 1px solid ${borderColor};
  }

  tr:hover {
    background-color: ${hoverBackgroundColor};
  }

  thead th {
    vertical-align: bottom;
    border-bottom: 2px solid ${borderColor};
  }
`;
