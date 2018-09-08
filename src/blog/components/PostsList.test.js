import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import PostsList from './PostsList';
import PostCard from './PostCard';
import PostCardEmpty from './PostCardEmpty';
import { BrowserRouter } from 'react-router-dom';
import { getPosts } from '../../utils/mocks/getBlogMock';

const posts = getPosts();
const postsCard = generatePostCard(posts);

it('renders without crashing', () => {
  const wrapper = mountWithIntl(<PostsList loading={true} posts={[]} />);
  wrapper.unmount();
});

it('should render posts without crashing', () => {
  const wrapper = mountWithIntl(
    <BrowserRouter>
      <PostsList loading={false} posts={posts} />
    </BrowserRouter>
  );

  wrapper.unmount();
});

it('renders PostCard without crashing', () => {
  const wrapper = mountWithIntl(
    <BrowserRouter>
      <PostsList loading={false} posts={posts} />
    </BrowserRouter>
  );
  expect(wrapper.children().containsMatchingElement(postsCard)).toBeTruthy();
  wrapper.unmount();
});

it('renders PostCard and fetching data without crashing', () => {
  const wrapper = mountWithIntl(
    <BrowserRouter>
      <PostsList loading={false} posts={posts} />
    </BrowserRouter>
  );
  expect(wrapper.children().containsMatchingElement(postsCard)).toBeTruthy();
  wrapper.unmount();
});

it('renders PostCard and add PostCardEmpty while is loading without crashing', () => {
  const wrapper = mountWithIntl(
    <BrowserRouter>
      <PostsList loading={true} posts={posts} />
    </BrowserRouter>
  );
  expect(wrapper.children().containsMatchingElement(postsCard)).toBeTruthy();
  wrapper.unmount();
});

it('renders PostCardEmpty without crashing', () => {
  const wrapper = mountWithIntl(
    <BrowserRouter>
      <PostsList loading={true} posts={[]} />
    </BrowserRouter>
  );
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
  posts.map(post => {
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
