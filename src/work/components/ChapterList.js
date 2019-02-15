import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useTrail, animated } from 'react-spring';
import Chapter from './Chapter';

export const ChapterListStyle = styled.div`
  text-align: left;
  margin: 3rem 0 1rem 0;
`;

export const List = styled.div`
  text-align: left;
  margin: 0.5rem 0 1rem 0;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  padding-left: 0;
  list-style-type: none;
`;

const Title = styled.h2`
  margin-left: 10px;
`;

const config = { mass: 5, tension: 2000, friction: 200 };

function ChapterList({ work, language }) {
  const trail = useTrail(work.chapters.length, {
    config,
    opacity: 1,
    x: 0,
    from: { opacity: 0, x: 5 }
  });
  return (
    <ChapterListStyle className="col-md-12">
      <Title>
        <FormattedMessage id="chapters_list" defaultMessage="Chapters" />
      </Title>
      <List>
        {trail.map(({ x, height, ...rest }, index) => (
          <animated.div
            key={work.chapters[index].id}
            style={{
              ...rest,
              transform: x.interpolate(x => `translate3d(0,${x}px,0)`)
            }}
          >
            <animated.div style={{ height }}>
              <Chapter
                key={work.chapters[index].id}
                work={work}
                chapter={work.chapters[index]}
                language={language}
              />
            </animated.div>
          </animated.div>
        ))}
      </List>
    </ChapterListStyle>
  );
}

export default injectIntl(ChapterList);
