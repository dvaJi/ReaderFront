import theme from 'styled-theming';
import { hexToRgb } from 'utils/helpers';

const lightColor = {
  darkest: '#1B123B',
  darker: '#372476',
  dark: '#5236B0',
  normal: '#5B3CC4',
  light: '#8C77D6',
  lighter: '#BDB1E7',
  lightest: '#EFECF9'
};

const darkColor = {
  darkest: '#261E42',
  darker: '#4C3C84',
  dark: '#725AC6',
  normal: '#7F64DC',
  light: '#A593E7',
  lighter: '#CCC1F1',
  lightest: '#F2F0FC'
};

const lightBackground = {
  darkest: '#4A4A4A',
  darker: '#959595',
  dark: '#DFDFDF',
  normal: '#F8F8F8',
  light: '#FAFAFA',
  lighter: '#FCFCFC',
  lightest: '#FEFEFE'
};

const darkBackground = {
  darkest: '#0A0A0B',
  darker: '#131416',
  dark: '#1D1F21',
  normal: '#202225',
  light: '#2f3136',
  lighter: '#A6A7A8',
  lightest: '#E9E9E9'
};

export const color = { dark: darkColor, light: lightColor };
export const background = { dark: darkBackground, light: lightBackground };
export const toRgb = hex => {
  const { r, g, b } = hexToRgb(hex);
  return `${r}, ${g}, ${b}`;
};

export const primaryColor = theme('mode', {
  light: color.light.normal,
  dark: color.dark.normal
});

export const primaryColorRgba = theme('mode', {
  light: toRgb(color.light.normal),
  dark: toRgb(color.dark.normal)
});

export const scrollBackground = theme('mode', {
  light: background.light.darker,
  dark: background.light.darkest
});

export const bodyBackgroundColor = theme('mode', {
  light: background.light.normal,
  dark: background.dark.normal
});

export const bodyColor = theme('mode', {
  light: background.light.darkest,
  dark: background.dark.lightest
});

export const cardBackgroundColor = theme('mode', {
  light: background.light.lightest,
  dark: background.dark.light
});

export const cardColor = theme('mode', {
  light: background.light.darkest,
  dark: background.dark.lighter
});
