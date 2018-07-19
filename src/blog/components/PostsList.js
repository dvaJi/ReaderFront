import React, { PureComponent } from 'react';
import PostCard from './PostCard';
import PostCardEmpty from './PostCardEmpty';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { getPostThumb } from '../../utils/common';
import { subString } from '../../utils/helpers';

const CardWrapper = styled.div`
  display: inline-block;
`;

export default class PostsList extends PureComponent {
  constructor(props) {
    super(props);
    this.doSelect = this.doSelect.bind(this);
  }

  doSelect(e) {
    this.props.doSelect(e);
  }

  thumbUrl(post) {
    const dir = post.stub + '_' + post.uniqid;
    return getPostThumb(dir, post.thumbnail);
  }

  render() {
    const { isLoading, page, posts } = this.props;
    let rows = [];

    if ((isLoading && posts.length === 0) || (isLoading && page === 0)) {
      for (let index = 0; index < 6; index++) {
        rows.push(<PostCardEmpty key={index} />);
      }
    } else {
      posts.forEach(post => {
        rows.push(
          <CardWrapper key={post.uniqid}>
            <PostCard onClick={this.doSelect} post={post} thumbnail={this.thumbUrl(post)}>
              <ReactMarkdown
                source={subString(post.content, 150)}
                escapeHtml={true}
              />
            </PostCard>
          </CardWrapper>
        );
      });

      if (isLoading && posts.length !== 0) {
        let postsIndex = posts.length;
        for (let index = postsIndex; index < postsIndex + 15; index++) {
          rows.push(<PostCardEmpty key={index} />);
        }
      }
    }

    return (
      <div className="container--grid">
        <ul layout="rows top-left">
          {rows}
        </ul>
      </div>
    );
  }
}
