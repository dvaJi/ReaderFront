import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import ReactMarkdown from 'react-markdown';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { animated, useTransition } from 'react-spring';
import { Container } from 'reactstrap';

import { ButtonLink } from '../../common/ui/Button';
import { getImage } from '../../common/Image';
import { HeroBg, HeroContainer, CardView } from './styles';

export default memo(function PostView({ post, onClickBack }) {
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
          <ButtonLink
            color="primary"
            size="sm"
            onClick={onClickBack}
            to={'/blog'}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            {f({ id: 'go_back', defaultMessage: 'Back' })}
          </ButtonLink>
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
});
