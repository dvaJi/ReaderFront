import styled from 'styled-components';
import theme from 'styled-theming';

import { background, cardBackgroundColor } from '../../themes';

const contentColor = theme('mode', {
  light: background.light.darkest,
  dark: background.dark.lighter
});

export const CommentsStyle = styled.div`
  background-color: ${cardBackgroundColor};
  color: ${contentColor};
  border-radius: 2px;
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
`;

export const ReaderControlsContainer = styled.div`
  padding: 0 !important;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
`;

export const ReaderControlsWrapper = styled.div`
  z-index: 1;
  flex-wrap: nowrap !important;
  display: flex;
  margin-right: 0;
  margin-left: 0;
  order: 1;

  & > div {
    position: relative;
  }
`;

export const ReaderControlsCol = styled.div`
  display: flex;
  width: 100%;
  min-height: 1px;
  margin-right: 0;
  margin-left: 0;
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  flex-direction: column !important;
  flex-wrap: nowrap !important;
  padding-right: 0;
  padding-left: 0;

  & > div {
    position: relative;
  }
`;

export const ReaderControlsTitle = styled.div`
  text-align: center !important;
  padding: 0.5rem !important;
  flex: 0 0 auto;
  width: auto;
  max-width: none;
  min-height: 1px;
`;

export const ReaderControlsChapters = styled.div`
  border-top: 1px solid rgba(128, 128, 128, 0.5);
  padding-right: 0;
  padding-left: 0;
  align-items: center !important;
  flex: 0 0 auto;
  width: auto;
  max-width: none;
  min-height: 1px;
  margin-right: 0;
  margin-left: 0;
  display: flex;
  flex-wrap: wrap;

  .chapter-link {
    position: relative;
    min-height: 1px;
    flex: 0 0 auto;
    width: auto;
    max-width: none;
    padding-right: 5px;
    padding-left: 5px;
    font-size: 30px;
  }
`;

export const ReaderControlsActions = styled.div`
  padding: 0.25rem !important;

  button {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    position: relative;
    width: 100%;
    min-height: 1px;
    margin: 0.25rem !important;
  }
`;
