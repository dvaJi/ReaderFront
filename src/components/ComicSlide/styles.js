import styled from 'styled-components';
import theme from 'styled-theming';
import { background } from 'lib/theme';

const backgroundWrapper = theme('mode', {
  light: background.light.dark,
  dark: background.dark.lighter
});

const borderWrapper = theme('mode', {
  light: background.light.darker,
  dark: background.dark.light
});

export const SlideWrapper = styled.div`
  position: relative;
  min-width: 1004px;
  background: ${backgroundWrapper};
  border-top: 1px solid ${borderWrapper};
  border-bottom: 1px solid ${borderWrapper};
  padding: 8px 0;
  height: 352px;
  box-sizing: border-box;
`;
