import styled from 'styled-components';
import theme from 'styled-theming';

import { cardBackgroundColor, background } from '../../themes';

const cardColor = theme('mode', {
  light: background.light.darkest,
  dark: background.dark.lightest
});

const cardContentColor = theme('mode', {
  light: background.light.darker,
  dark: background.dark.lighter
});

const borderColor = theme('mode', {
  light: background.light.dark,
  dark: background.dark.normal
});

export const ListRows = styled.ul`
  text-align: center;
  padding-left: 0;
`;

export const CardWrapper = styled.div`
  display: inline-block;
`;

export const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transition: 0.5s ease;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);

  h3 {
    padding: 130px 0;
  }
`;

export const Card = styled.div`
  color: ${cardColor};
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: 310px;
  background-color: ${cardBackgroundColor};
  vertical-align: top;
  text-align: left;
  height: 480px;
  margin: 20px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  white-space: normal;
  transition: all 250ms cubic-bezier(0.02, 0.01, 0.47, 1);

  &:hover {
    box-shadow: 0 40px 40px rgba(0, 0, 0, 0.16);
    transform: translate(0, -20px);
    transition-delay: 0s !important;

    ${CardOverlay} {
      opacity: 1;
    }
  }
`;

export const CardHero = styled.div`
  background-image: url('${props => props.thumb}');
  background-color: ${cardBackgroundColor};
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  position: relative;
  clear: both;
  float: left;
  overflow: auto;
  width: 100%;
  height: 296px;
  padding: 20px;
`;

export const CardBody = styled.div`
  position: relative;
  clear: both;
  float: left;
  width: 100%;
  overflow: visible;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  z-index: 2;
`;

export const CardBodyTitle = styled.div`
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  margin-bottom: 12px;
  color: ${cardColor};
`;

export const CardBodyDescription = styled.div`
  height: 74px;
  color: ${cardContentColor};
  display: block;
  display: -webkit-box;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  line-height: 20px;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
`;

export const CardFooter = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  position: absolute;
  padding-left: 20px;
  padding-right: 20px;
  bottom: 0px;
  margin: 0 auto;
  width: 100%;
`;

export const CardFooterWrapper = styled.div`
  height: 46px;
  line-height: 46px;
  border-top: 1px solid ${borderColor};
`;

export const CardFooterTag = styled.div`
  color: #90949c;
  display: inline-block;
`;

export const HeroContainer = styled.div`
  position: relative;
  padding: 20px 0;
  margin: -20px 0 20px;
  height: 150px;
`;

export const HeroBg = styled.div`
  background-image: url('${props => props.portrait}');
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  z-index: 1;

  &::before {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.4;
    content: '';
  }
`;

export const CardView = styled.div`
  background-color: ${cardBackgroundColor};
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
  margin-top: -110px;
  z-index: 2;
`;

export const LoadingContainer = styled.div`
  height: 4.2rem;
  width: 100%;
  text-align: center;
  opacity: 0.5;
`;
