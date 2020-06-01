import React from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import {
  Card,
  CardOverlay,
  CardHero,
  CardBody,
  CardBodyTitle,
  CardBodyDescription,
  CardFooter,
  CardFooterWrapper,
  CardFooterTag,
  FlagWrapper
} from './styles';
import Flag from '@components/Flag';

function PostCard({ post, children, thumbnail }) {
  const { formatMessage: f } = useIntl();
  const router = useRouter();

  return (
    <Card
      id={'post_card_' + post.id}
      onClick={() => {
        router.push('/blog/' + post.stub);
      }}
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
            {f({ id: post.category_name, defaultMessage: post.category_name })}
          </CardFooterTag>
          <FlagWrapper>
            <Flag language={post.language_name} />
          </FlagWrapper>
        </CardFooterWrapper>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
