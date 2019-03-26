import React, { memo } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { animated, useTransition } from 'react-spring';
import { Button, Container } from 'reactstrap';

import { getImage } from '../../common/Image';
import { HeroBg, HeroContainer } from './styles';

const Card = styled.div`
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  display: inline-block;
  width: 100%;
  text-align: left;
  margin-bottom: 15px;
  margin-top: 10px;
  padding: 15px 20px;
  position: relative;
  vertical-align: top;
  white-space: normal;
  margin-top: -110px;
  z-index: 2;
`;

export default memo(function PostView({ post, onClickBack }) {
  const { title, content, uniqid, thumbnail } = post;
  const portrait = getImage(`images/blog/${uniqid}/${thumbnail}`);
  const heroTransition = useTransition([portrait], null, {
    from: { transform: 'translate3d(0,-10px,0)', opacity: '0.2' },
    enter: { transform: 'translate3d(0,0px,0)', opacity: '1' },
    leave: { transform: 'translate3d(0,-10px,0)', opacity: '0.2' }
  });
  const titleTransition = useTransition([title], null, {
    from: { transform: 'translate3d(0,5px,0)', opacity: '0.4' },
    enter: { transform: 'translate3d(0,0px,0)', opacity: '1' },
    leave: { transform: 'translate3d(0,5px,0)', opacity: '0.4' }
  });

  return (
    <div>
      {heroTransition.map(({ item, key, props }) => (
        <animated.div key={key} style={props}>
          <HeroContainer style={props}>
            <HeroBg portrait={item} />
          </HeroContainer>
        </animated.div>
      ))}
      <Container>
        <Card>
          <Button
            tag={Link}
            color="primary"
            size="sm"
            onClick={onClickBack}
            to={'/blog'}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Volver
          </Button>
          {titleTransition.map(({ item, key, props }) => (
            <animated.div key={key} style={props}>
              <h1 id="post_title">{item}</h1>
            </animated.div>
          ))}
          <ReactMarkdown source={content} escapeHtml={true} />
        </Card>
      </Container>
    </div>
  );
});
