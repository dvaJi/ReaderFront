import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import ReactMarkdown from 'react-markdown';
import { Transition } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { HeroContainer, HeroBg } from './styles';
import { getPostThumb } from '../../utils/common';

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
  const { title, content, stub, uniqid, thumbnail } = post;
  const dir = stub + '_' + uniqid;
  const portrait = getPostThumb(dir, thumbnail, 'medium');

  return (
    <div>
      <Transition
        items={true}
        from={{ transform: 'translate3d(0,-10px,0)', opacity: '0.2' }}
        enter={{ transform: 'translate3d(0,0px,0)', opacity: '1' }}
        leave={{ transform: 'translate3d(0,-10px,0)', opacity: '0.2' }}
      >
        {show =>
          show &&
          (props => (
            <HeroContainer style={props}>
              <HeroBg portrait={portrait} />
            </HeroContainer>
          ))
        }
      </Transition>
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
          <Transition
            items={true}
            from={{ transform: 'translate3d(0,5px,0)', opacity: '0.4' }}
            enter={{ transform: 'translate3d(0,0px,0)', opacity: '1' }}
            leave={{ transform: 'translate3d(0,5px,0)', opacity: '0.4' }}
          >
            {show =>
              show &&
              (props => (
                <div style={props}>
                  <h1 id="post_title">{title}</h1>
                </div>
              ))
            }
          </Transition>
          <ReactMarkdown source={content} escapeHtml={true} />
        </Card>
      </Container>
    </div>
  );
});
