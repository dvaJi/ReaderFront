import styled from 'styled-components';
import theme from 'styled-theming';

import { theme as rfTheme } from '@readerfront/ui';
const { background, toRgb } = rfTheme;

const borderColor = theme('mode', {
  light: background.light.dark,
  dark: background.dark.normal
});

export const contentColor = theme('mode', {
  light: background.light.darkest,
  dark: background.dark.lighter
});

const shadowColor = theme('mode', {
  light: toRgb(background.light.darkest),
  dark: toRgb(background.dark.lighter)
});

export const Media = styled.div`
  position: relative;
  display: block;
  padding: 0;
  flex-shrink: 0;
  border-radius: inherit;
  transition: box-shadow 0.15s linear;

  &:hover {
    box-shadow: 0 0 20px rgba(${shadowColor}, 0.5);
  }

  &:after {
    content: '';
    display: block;
    padding-top: 120%;
  }
`;

export const MediaContent = styled.a`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 0;
  border-radius: inherit;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color: hsla(0, 0%, 47.1%, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const MediaOverlay = styled.div`
  position: absolute;
  top: ${({ top }) => (top ? '0' : 'auto')};
  left: 0;
  right: 0;
  bottom: ${({ bottom }) => (bottom ? '0' : 'auto')};
  padding: 1rem;
  z-index: 2;
  display: flex;
  align-items: center;
  color: #fff;
`;

export const Badge = styled.div`
  padding: 0.3em 0.45em;
  margin-right: 5px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.51);

  & > .status {
    line-height: 2em;
  }
`;

export const ListContent = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: center;
`;

export const ListBody = styled.div`
  flex: 1 1 auto;
`;

export const ListTitle = styled.a`
  line-height: 1.4285714286;
  font-weight: 500;
  display: block;
  color: inherit;
  cursor: pointer;
`;

export const LastUpdate = styled.div`
  font-size: 0.8rem;
`;

export const Paginator = styled.div`
  height: 38px;
  margin-bottom: 10px;
`;

export const ReleaseTitle = styled.h6`
  border-bottom: 1px solid ${borderColor};
`;
