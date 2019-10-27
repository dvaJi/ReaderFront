import React, { memo } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import { LazyImage } from '../../common/Image';

const CoverStyle = styled(LazyImage)`
  box-shadow: 0 0px 20px rgba(0, 0, 0, 0.18);
  border-radius: 4px;
`;

function Cover({ work, name }) {
  const props = useSpring({
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    from: { opacity: 0, transform: 'translate3d(0,10px,0)' }
  });
  const thumbnail =
    work.thumbnail !== ''
      ? `works/${work.uniqid}/${work.thumbnail}`
      : 'images/default-cover.png';
  return (
    <CoverStyle
      src={thumbnail}
      tag={animated.img}
      width={340}
      height={510}
      style={props}
      crop={true}
      alt={name}
    />
  );
}

export default memo(Cover);
