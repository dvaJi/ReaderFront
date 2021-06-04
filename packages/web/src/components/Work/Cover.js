import React, { memo } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import { getImage } from '../Image';

const Media = styled(animated.div)`
  position: relative;
  display: block;
  padding: 0;
  flex-shrink: 0;
  border-radius: inherit;
  align-items: flex-start;

  &:after {
    content: '';
    display: block;
    padding-top: 150%;
  }
`;

const MediaContent = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 0;
  border-radius: inherit;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color: hsla(0, 0%, 47.1%, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Cover({ work }) {
  const props = useSpring({
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    from: { opacity: 0, transform: 'translate3d(0, 10px,0)' }
  });
  const thumbnail = getImage(work.thumbnail_path, 600, 350, 1, true);

  return (
    <Media className="mb-4" style={props}>
      <MediaContent
        style={{
          backgroundImage: `url('${thumbnail}')`
        }}
      ></MediaContent>
    </Media>
  );
}

export default memo(Cover);
