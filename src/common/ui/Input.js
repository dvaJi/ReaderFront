import styled from 'styled-components';
import theme from 'styled-theming';
import { primaryColorRgba, background, toRgb } from '../../themes';

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

export const Input = styled.input`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${inputColor};
  background-color: ${inputBackgroundColor};
  background-clip: padding-box;
  border: 1px solid rgba(${inputBorderColor}, 0.4);
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  overflow: visible;

  &:focus {
    color: ${inputColor};
    background-color: ${inputBackgroundColor};
    border-color: rgba(${primaryColorRgba}, 0.7);
    box-shadow: 0 0 0 0.2rem rgba(${primaryColorRgba}, 0.25);
    outline: 0;
  }
`;

export const Textarea = styled.textarea`
  display: block;
  width: 100%;
  height: auto;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${inputColor};
  background-color: ${inputBackgroundColor};
  background-clip: padding-box;
  border: 1px solid rgba(${inputBorderColor}, 0.4);
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  overflow: visible;

  &:focus {
    color: ${inputColor};
    background-color: ${inputBackgroundColor};
    border-color: rgba(${primaryColorRgba}, 0.7);
    box-shadow: 0 0 0 0.2rem rgba(${primaryColorRgba}, 0.25);
    outline: 0;
  }
`;
