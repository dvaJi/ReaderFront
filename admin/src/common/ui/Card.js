import styled from 'styled-components';
import theme from 'styled-theming';

import { background, cardBackgroundColor } from 'themes';

const contentColor = theme('mode', {
  light: background.light.darkest,
  dark: background.dark.lighter
});

const borderColor = theme('mode', {
  light: background.light.dark,
  dark: background.dark.normal
});

export const Card = styled.div`
  background-color: ${cardBackgroundColor};
  color: ${contentColor};
  border-radius: 6px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  display: inline-block;
  width: 100%;
  text-align: left;
  margin-bottom: 15px;
  margin-top: 10px;
  padding: 15px 20px;
  position: relative;
  vertical-align: top;
  white-space: normal;

  & .border-bottom {
    border-color: ${borderColor} !important;
  }
`;
