import React from "react";
import { mount, shallow } from "enzyme";
import renderer from "react-test-renderer";
import { spy } from "sinon";
import { MemoryRouter } from "react-router-dom";
import Blog from "./Blog";
import PostCardEmpty from "../../components/Blog/PostCardEmpty";

it("renders without crashing", () => {
  mount(<Blog />);
});

it("calls componentDidMount", async () => {
  spy(Blog.prototype, "componentDidMount");
  const wrapper = shallow(<Blog />);
  expect(Blog.prototype.componentDidMount.calledOnce).toEqual(true);
});

it("should render 15 posts while is loading", async () => {
  const wrapper = mount(<Blog />);
  expect(wrapper.find(PostCardEmpty).length).toBe(15);
});

it("should render 15 posts while is loading", async () => {
  const wrapper = mount(
    <MemoryRouter>
      <Blog />
    </MemoryRouter>
  );
  wrapper.setState({ isLoading: false });
  wrapper.setState({ isFetchingData: false });
  wrapper.setState({ isInitialLoading: false });
  wrapper.setState({ posts: generatePosts() });
  await wrapper.update();
  document.body.scrollTop = 1400;
  window.dispatchEvent(new window.UIEvent("scroll", { detail: 0 }));
});

/**
 * Genera mock de publicaciones
 *
 * @returns lista de publicaciones
 */
const generatePosts = () => {
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
};
