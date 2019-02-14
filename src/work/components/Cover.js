import React, { memo } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const CoverStyle = styled(animated.img)`
  box-shadow: 0 0px 20px rgba(0, 0, 0, 0.18);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

function Cover({ cover, name }) {
  const props = useSpring({
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    from: { opacity: 0, transform: 'translate3d(0,10px,0)' }
  });
  return <CoverStyle src={cover} style={props} alt={name} />;
}

export default memo(Cover);
