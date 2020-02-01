import React, { memo, useState } from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import { getImage } from '../Image';

const Overlay = styled.div`
  background: rgba(31, 38, 49, 0.8);
  color: rgb(237, 241, 245);
  font-size: 1.4rem;
  padding: 12px;
  width: 100%;
  transition: all 0.15s ease;
  transform: translate3d(0px, 130px, 0px);

  .title {
    line-height: 17px;
    color: inherit;
    text-decoration: none;
    transition: 0.15s;
    outline: 0;
  }

  .desc {
    opacity: 0;
    height: 0;
    font-size: 12px;
    max-height: 100px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    transition: opacity 0.6s linear;
  }
`;

const Serie = styled.a`
  background-image: url(${props => props.cover});
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 350px;
  position: relative;
  overflow: hidden;

  &:hover {
    text-decoration: none !important;

    ${Overlay} {
      transform: translate3d(0px, 0px, 0px);

      .desc {
        opacity: 1;
        height: auto;
      }
    }
  }
`;

const LoadingCover = styled.div`
  min-height: 350px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

function RecommendedWork({ work, isLoading, description }) {
  const [isHover, setHover] = useState(false);
  const { formatMessage: f } = useIntl();
  const props = useSpring({
    opacity: isHover ? 1 : 0.3,
    transform: isHover ? 'translate3d(0,0,0)' : 'translate3d(0,10px,0)'
  });
  return (
    <div className="Recommended mb-4">
      <h3>{f({ id: 'random', defaultMessage: 'Random' })}</h3>
      {!isLoading ? (
        <Link href="/work/[slug]" as={`/work/${work.stub}`}>
          <Serie
            cover={getImage(work.thumbnail_path, 350, 350, work.id, true)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Overlay>
              <animated.span style={props} className="title">
                {work.name}
              </animated.span>
              <animated.span style={props} className="desc">
                {description}
              </animated.span>
            </Overlay>
          </Serie>
        </Link>
      ) : (
        <LoadingCover className="show-loading-animation" />
      )}
    </div>
  );
}

export default memo(RecommendedWork);
