import React, { memo } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
`;

const CenteredMessage = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default memo(CenteredMessage);
