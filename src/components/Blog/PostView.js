import React, { memo } from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { animated, useTransition } from 'react-spring';
import { Container } from 'reactstrap';

import { ButtonLink } from '../ui/Button';
import { getImage } from '../Image';
import { HeroBg, HeroContainer, CardView } from './styles';

function PostView({ post }) {
  const { title, content, thumbnail_path } = post;
  const portrait = getImage(thumbnail_path);
  const { formatMessage: f } = useIntl();
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
        <CardView>
          <Link href="/blog">
            <ButtonLink color="primary" size="sm">
              <FontAwesomeIcon icon="arrow-left" />
              {f({ id: 'go_back', defaultMessage: 'Back' })}
            </ButtonLink>
          </Link>
          {titleTransition.map(({ item, key, props }) => (
            <animated.div key={key} style={props}>
              <h1 id="post_title">{item}</h1>
            </animated.div>
          ))}
          <ReactMarkdown source={content} escapeHtml={true} />
        </CardView>
      </Container>
    </div>
  );
}

export default memo(PostView);
