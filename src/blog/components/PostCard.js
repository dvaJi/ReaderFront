import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

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

class PostCard extends Component {
  render() {
    const { post, children, thumbnail, onClick } = this.props;
    const category = blogCategoriesIdToName(post.category);

    return (
      <Card
        id={'post_card_' + post.id}
        to={'/blog/' + post.stub}
        onClick={() => onClick(post)}
      >
        <CardHero thumb={thumbnail}>
          <CardOverlay>
            <h3>
              <FormattedMessage id="read_more" defaultMessage="Read More" />
            </h3>
          </CardOverlay>
        </CardHero>
        <CardBody>
          <CardBodyTitle>{post.title}</CardBodyTitle>
          <CardBodyDescription>{children}</CardBodyDescription>
        </CardBody>
        <CardFooter>
          <CardFooterWrapper layout="row bottom-left">
            <CardFooterTag>
              <FormattedMessage id={category} defaultMessage={category} />
            </CardFooterTag>
          </CardFooterWrapper>
        </CardFooter>
      </Card>
    );
  }
}

export default PostCard;
