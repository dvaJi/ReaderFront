import styled from 'styled-components';
import theme from 'styled-theming';

import { cardBackgroundColor, background } from '../../themes';

const borderColor = theme('mode', {
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
  overflow: hidden;
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
  padding: 10px 20px;
  margin: 0;
  border-bottom: 1px solid ${borderColor};
`;
