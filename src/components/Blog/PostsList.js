import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Spinner } from 'reactstrap';

import { CardWrapper, ListRows, LoadingContainer } from './styles';
import PostCard from './PostCard';
import { getImage } from '../Image';
import { subString } from 'utils/helpers';
import useInfiniteScroll from '@hooks/useInfiniteScroll';

export default function PostsList({ maxPosts, posts, onLoadMore }) {
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

  function fetchMoreListItems() {
    if (isFetching && posts.length < maxPosts) {
      onLoadMore();
    }
    setIsFetching(false);
  }

  return (
    <div className="container--grid">
      <ListRows id="posts_list" layout="rows top-left">
        {posts.map((post, index) => (
          <CardWrapper key={post.uniqid}>
            <PostCard
              post={post}
              thumbnail={getImage(post.thumbnail_path, 310, 305, index, true)}
            >
              <ReactMarkdown
                source={subString(post.content, 150)}
                escapeHtml={true}
              />
            </PostCard>
          </CardWrapper>
        ))}
      </ListRows>
      <LoadingContainer>
        {isFetching && (
          <Spinner style={{ width: '4rem', height: '4rem' }} color="gray" />
        )}
      </LoadingContainer>
    </div>
  );
}
