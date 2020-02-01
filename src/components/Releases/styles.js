import styled from 'styled-components';
import theme from 'styled-theming';

import { background, cardBackgroundColor, toRgb } from 'lib/theme';

const hoverRow = theme('mode', {
  light: toRgb(background.light.darkest),
  dark: toRgb(background.dark.lighter)
});

const borderColor = theme('mode', {
  light: background.light.dark,
  dark: background.dark.normal
});

export const contentColor = theme('mode', {
  light: background.light.darkest,
  dark: background.dark.lighter
});

export const Paginator = styled.div`
  height: 38px;
  margin-bottom: 10px;
`;

export const ReleaseRow = styled.a`
  display: inherit;
  color: inherit;
  text-decoration: none !important;
  cursor: pointer;

  &:hover {
    background: rgba(${hoverRow}, 0.06);
  }
`;

export const ReleaseCard = styled.div`
  background-color: ${cardBackgroundColor};
`;

export const ReleaseContent = styled.p`
  border-bottom: 1px solid ${borderColor};

  strong {
    color: ${contentColor};
  }
`;

export const ReleaseChapterBlock = styled.span`
  height: 32px;
  width: 32px;
  text-align: center;
  color: ${contentColor};
`;

export const ReleaseTitle = styled.h6`
  border-bottom: 1px solid ${borderColor};
`;

export const ReleaseSkeletonLoading = styled.div`
  background-color: ${cardBackgroundColor};

  .media > span {
    height: 32px;
    width: 32px;
  }

  .media > p {
    border-bottom: 1px solid ${borderColor};
  }

  h6,
  strong,
  .media > span {
    background-color: rgba(${hoverRow}, 0.2);
  }

  h6 {
    height: 21px;
    width: 350px;
  }

  strong {
    height: 15px;
  }
`;
