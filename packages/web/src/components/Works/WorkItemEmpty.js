import React from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';

import { theme as rfTheme } from '@readerfront/ui';

const { background } = rfTheme;

export const coverBackgroundColor = theme('mode', {
  light: background.light.normal,
  dark: background.dark.dark
});

export const cardBackgroundColor = theme('mode', {
  light: background.light.light,
  dark: background.dark.light
});

const ListItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  border-radius: 0.25rem;
`;

const Media = styled.div`
  position: relative;
  display: block;
  padding: 0;
  flex-shrink: 0;
  border-radius: inherit;
  transition: box-shadow 0.15s linear;

  &:after {
    content: '';
    display: block;
    padding-top: 120%;
  }
`;

const MediaContent = styled.a`
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
`;

const ListContent = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: center;
`;

export default function WorkItemEmpty() {
  return (
    <div className="col-6 col-md-4 col-xl-3 shimme-card">
      <ListItem>
        <Media className="media show-loading-animation">
          <MediaContent className="media-content" />
        </Media>
        <ListContent />
      </ListItem>
    </div>
  );
}
