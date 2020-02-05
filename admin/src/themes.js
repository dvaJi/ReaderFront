import theme from 'styled-theming';
import { hexToRgb } from '../../shared/theme/hex-to-rgb';
import { color, background } from '../../shared/theme/theme-color';

export { color, background };

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
