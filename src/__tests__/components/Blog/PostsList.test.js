import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import PostsList from '@components/Blog/PostsList';
import PostCard from '@components/Blog/PostCard';
import PostCardEmpty from '@components/Blog/PostCardEmpty';

const posts = global.rfMocks.posts.getPostsNormalized;
const postsCard = generatePostCard(posts);

it('renders without crashing', () => {
  const wrapper = mountWithIntl(<PostsList loading={true} posts={[]} />);
  wrapper.unmount();
});

it('should render posts without crashing', () => {
  const wrapper = mountWithIntl(<PostsList loading={false} posts={posts} />);

  wrapper.unmount();
});

it('renders PostCard without crashing', () => {
  const wrapper = mountWithIntl(<PostsList loading={false} posts={posts} />);
  expect(wrapper.children().containsMatchingElement(postsCard)).toBeTruthy();
  wrapper.unmount();
});

it('renders PostCard and fetching data without crashing', () => {
  const wrapper = mountWithIntl(<PostsList loading={false} posts={posts} />);
  expect(wrapper.children().containsMatchingElement(postsCard)).toBeTruthy();
  wrapper.unmount();
});

it('renders PostCard and add PostCardEmpty while is loading without crashing', () => {
  const wrapper = mountWithIntl(<PostsList loading={true} posts={posts} />);
  expect(wrapper.children().containsMatchingElement(postsCard)).toBeTruthy();
  wrapper.unmount();
});

it('renders PostCardEmpty without crashing', () => {
  const wrapper = mountWithIntl(<PostsList loading={true} posts={[]} />);
  expect(wrapper.find(PostCardEmpty)).toBeTruthy();
  wrapper.unmount();
});

/**
 * Generate a PostCard mock
 *
 * @param {any} releases
 * @returns PostCard list
 */
function generatePostCard(posts) {
  let listPostCard = [];
  posts.forEach(post => {
    listPostCard.push(
      <PostCard
        key={post.id}
        onClick={on => ''}
        post={post}
        thumbnail={on => ''}
      />
    );
  });

  return listPostCard;
}
