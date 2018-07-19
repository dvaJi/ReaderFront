import React from 'react';
import I18n from 'redux-i18n';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { render, mount } from 'enzyme';
import PostsList from './PostsList';
import PostCard from './PostCard';
import PostCardEmpty from './PostCardEmpty';
import { BrowserRouter } from 'react-router-dom';
import { translations } from '../../translations';
import store from '../../store';

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <I18n translations={translations}>
        <PostsList loading={true} posts={[]} />
      </I18n>
    </Provider>
  );
});

it('should render posts without crashing', () => {
  const posts = generatePosts();
  mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <BrowserRouter>
          <PostsList loading={false} posts={posts} />
        </BrowserRouter>
      </I18n>
    </Provider>
  );
});

it('renders PostCard without crashing', () => {
  const posts = generatePosts();
  const listPostCard = generatePostCard(posts);
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <BrowserRouter>
          <PostsList loading={false} posts={posts} />
        </BrowserRouter>
      </I18n>
    </Provider>
  );
  expect(wrapper.children().containsMatchingElement(listPostCard)).toBeTruthy();
});

it('renders PostCard and fetching data without crashing', () => {
  const posts = generatePosts();
  const listPostCard = generatePostCard(posts);
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <BrowserRouter>
          <PostsList loading={false} posts={posts} />
        </BrowserRouter>
      </I18n>
    </Provider>
  );
  expect(wrapper.children().containsMatchingElement(listPostCard)).toBeTruthy();
});

it('renders PostCard and add PostCardEmpty while is loading without crashing', () => {
  const posts = generatePosts();
  const listPostCard = generatePostCard(posts);
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <BrowserRouter>
          <PostsList loading={true} posts={posts} />
        </BrowserRouter>
      </I18n>
    </Provider>
  );
  expect(wrapper.children().containsMatchingElement(listPostCard)).toBeTruthy();
});

it('renders PostCardEmpty without crashing', () => {
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <BrowserRouter>
          <PostsList loading={true} posts={[]} />
        </BrowserRouter>
      </I18n>
    </Provider>
  );
  expect(wrapper.find(PostCardEmpty)).toBeTruthy();
});

/**
 * Genera mock de publicaciones
 *
 * @returns lista de publicaciones
 */
function generatePosts() {
  let posts = [];
  for (let index = 0; index < 10; index++) {
    posts.push({
      id: index,
      userId: 1,
      uniqid: '9a0s9298l20' + index * 2,
      type: 1,
      title: 'Primera publicación!',
      stub: 'primera-publicacion',
      status: 1,
      sticky: false,
      content:
        'Primera publicación dentro del blog, podrás **Publicar**, **Editar**, **Guardar**, **Eliminar** tus publicaciones.',
      category: 1,
      language: 1,
      thumbnail: 'cover_goblinslayer.png',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  return posts;
}

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
