import styled from 'styled-components';

import { Button, ButtonLink, buttonBorderRadius } from './Button';

export const ButtonGroup = styled.div`
  display: flex;

  & ${Button}, & ${ButtonLink} {
    border-radius: 0;
    margin: 0;

    &:first-child {
      border-radius: ${buttonBorderRadius} 0 0 ${buttonBorderRadius};
    }

    &:last-child {
      border-radius: 0 ${buttonBorderRadius} ${buttonBorderRadius} 0;
      margin: 0;
    }
  }
`;
