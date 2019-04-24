import styled from 'styled-components';
import theme from 'styled-theming';
import { animated } from 'react-spring';

import { primaryColorRgba, background, toRgb } from '../../themes';

const coverBackgroundColor = theme('mode', {
  light: background.light.normal,
  dark: background.dark.dark
});

const inputBackgroundColor = theme('mode', {
  light: background.light.lightest,
  dark: background.dark.light
});

const inputBorderColor = theme('mode', {
  light: toRgb(background.light.darker),
  dark: toRgb(background.dark.lighter)
});

const inputColor = theme('mode', {
  light: background.light.darkest,
  dark: background.dark.lighter
});

export const CardMedia = styled.div`
  float: left;
  padding: ${props => (props.size === 'small' ? '0' : '0 0 25px 25px')};
  position: relative;
  width: ${props => (props.size === 'small' ? '100%' : '145px')};
  ${props =>
    props.size === 'small'
      ? 'height: 180px; margin-bottom: -20px;'
      : ''} @media (max-width: 990px) {
    width: 100%;
    height: 180px;
    padding: 0;
    margin-bottom: 0px;
  }
`;

export const Cover = styled(animated.div)`
  background-color: ${coverBackgroundColor};
  ${props => `background-image: url(${props.thumb});`}
  background-position: 50% 50%;
  background-size: cover;
  border-radius: ${props =>
    props.size === 'small' ? '2px 2px 0px 0px' : '2px'};
  box-shadow: ${props =>
    props.size === 'small'
      ? '2px 2px 0px 0px rgba(0, 0, 0, 0.02)'
      : '0 3px 6px rgba(0, 0, 0, 0.2)'};
  height: ${props => (props.size === 'small' ? '100%' : '212px')};
  width: ${props => (props.size === 'small' ? '100%' : '150px')};
  flex-direction: column;
  float: left;
  margin-top: -25px;
  position: relative;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 990px) {
    border-radius: 2px 2px 0px 0px;
    box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.02);
    margin-top: 0;
    width: 100%;
    height: 100%;
  }
`;

export const Overlay = styled.div`
  background: rgba(31, 38, 49, 0.8);
  color: rgb(237, 241, 245);
  font-size: 1.4rem;
  padding: 12px;
  width: 100%;

  .title {
    line-height: 17px;
    color: inherit;
    text-decoration: none;
    transition: 0.15s;
    outline: 0;
  }
`;

export const Tag = styled(animated.div)`
  border-radius: 2px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.22);
  display: inline-block;
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 0.4px;
  padding: 5px 8px;
  position: absolute;
  left: 100px;
  text-align: center;
  text-transform: uppercase;
  top: -10px;
  width: 73px;
`;

export const FilterCardComp = styled.div`
  border-radius: 2px;
  margin-bottom: 65px;
  width: 100%;
  margin-right: 3%;
  max-height: 210px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);

  input {
    color: ${inputColor};
    background-color: ${inputBackgroundColor};
    border-color: rgba(${inputBorderColor}, 0.4);
  }

  .form-control:focus {
    color: ${inputColor};
    background-color: ${inputBackgroundColor};
    border-color: rgba(${primaryColorRgba}, 0.7);
    box-shadow: 0 0 0 0.2rem rgba(${primaryColorRgba}, 0.25);
  }
`;
