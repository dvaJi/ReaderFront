import styled from 'styled-components';
import theme from 'styled-theming';
import { background } from 'lib/theme';
import {
  Modal as BootstrapModal,
  ModalHeader as BootstrapModalHeader,
  ModalFooter as BootstrapModalFooter
} from 'reactstrap';

const modalBackground = theme('mode', {
  light: background.light.light,
  dark: background.dark.dark
});

const modalBorder = theme('mode', {
  light: background.light.dark,
  dark: background.dark.darker
});

const modalClose = theme('mode', {
  light: background.dark.dark,
  dark: background.light.light
});

export const Modal = styled(BootstrapModal)`
  .modal-content {
    background-color: ${modalBackground};
  }
`;

export const ModalHeader = styled(BootstrapModalHeader)`
  border-color: ${modalBorder};

  .close {
    color: ${modalClose};
    text-shadow: 0 1px 0 ${modalBorder};
  }
`;

export const ModalFooter = styled(BootstrapModalFooter)`
  border-color: ${modalBorder};
`;
