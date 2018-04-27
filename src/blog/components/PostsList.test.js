import React from "react";
import { render, mount } from "enzyme";
import PostsList from "./PostsList";
import ReleaseCard from "../../releases/components/ReleaseCard";
import PostCardEmpty from "./PostCardEmpty";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  render(<PostsList loading={true} posts={[]} />);
});

it("should render posts without crashing", () => {
  const posts = generatePosts();
  mount(
    <BrowserRouter>
      <PostsList loading={false} posts={posts} />
    </BrowserRouter>
  );
});

it("renders PostCard without crashing", () => {
  const posts = generatePosts();
  const listPostCard = generatePostCard(posts);
  const wrapper = mount(
    <BrowserRouter>
      <PostsList loading={false} posts={posts} />
    </BrowserRouter>
  );
  expect(wrapper.children().containsMatchingElement(listPostCard)).toBeTruthy();
});

it("renders PostCard and fetching data without crashing", () => {
  const posts = generatePosts();
  const listPostCard = generatePostCard(posts);
  const wrapper = mount(
    <BrowserRouter>
      <PostsList loading={false} posts={posts} />
    </BrowserRouter>
  );
  expect(wrapper.children().containsMatchingElement(listPostCard)).toBeTruthy();
});

it("renders PostCard and add PostCardEmpty while is loading without crashing", () => {
  const posts = generatePosts();
  const listPostCard = generatePostCard(posts);
  const wrapper = mount(
    <BrowserRouter>
      <PostsList loading={true} posts={posts} />
    </BrowserRouter>
  );
  expect(wrapper.children().containsMatchingElement(listPostCard)).toBeTruthy();
});

it("renders PostCardEmpty without crashing", () => {
  const wrapper = mount(
    <BrowserRouter>
      <PostsList loading={true} posts={[]} />
    </BrowserRouter>
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
      date: "2017-01-01",
      slug: "aa_a",
      title: { rendered: "aaa" }
    });
  }
  return posts;
}

/**
 * Genera mock de ReleaseCard
 *
 * @param {any} releases
 * @returns lista de ReleaseCard
 */
function generatePostCard(posts) {
  let listPostCard = [];
  posts.map(post => {
    listPostCard.push(
      <ReleaseCard
        key={post.id}
        url={""}
        name={post.title.rendered}
        thumb={post.thumb_blog}
        chapter={null}
        subchapter={null}
      />
    );
  });

  return listPostCard;
}
