import React from 'react';
import { useIntl } from 'react-intl';

import {
  Card,
  CardOverlay,
  CardHero,
  CardBody,
  CardBodyTitle,
  CardBodyDescription,
  CardFooter,
  CardFooterWrapper,
  CardFooterTag
} from './styles';
import { blogCategoriesIdToName } from '../../utils/common';

function PostCard({ post, children, thumbnail, onClick }) {
  const category = blogCategoriesIdToName(post.category);
  const { formatMessage: f } = useIntl();

  return (
    <Card
      id={'post_card_' + post.id}
      to={'/blog/' + post.stub}
      onClick={() => onClick(post)}
    >
      <CardHero thumb={thumbnail}>
        <CardOverlay>
          <h3>{f({ id: 'read_more', defaultMessage: 'Read More' })}</h3>
        </CardOverlay>
      </CardHero>
      <CardBody>
        <CardBodyTitle>{post.title}</CardBodyTitle>
        <CardBodyDescription>{children}</CardBodyDescription>
      </CardBody>
      <CardFooter>
        <CardFooterWrapper layout="row bottom-left">
          <CardFooterTag>
            {f({ id: category, defaultMessage: category })}
          </CardFooterTag>
        </CardFooterWrapper>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
