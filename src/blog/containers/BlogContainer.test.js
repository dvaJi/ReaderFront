import React from "react";
import { mountWithIntl } from "enzyme-react-intl";
import { Provider } from "react-redux";
import BlogContainer from "./BlogContainer";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { doChangeLanguage } from "../../layout/actions/doChangeLanguage";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const posts = global.rfMocks.posts.getPostsNormalized;

it("should render without throwing an error", () => {
  const store = mockStore({
    blog: {
      posts: posts,
      post: null,
      blogPage: 0,
      blogIsLoading: false,
      blogHasErrored: false
    },
    layout: {
      language: "es"
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <BlogContainer />
    </Provider>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it("should render a post", () => {
  const store = mockStore({
    blog: {
      posts: posts,
      post: posts[0],
      blogPage: 0,
      blogIsLoading: false,
      blogHasErrored: false
    },
    layout: {
      language: "es"
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <BlogContainer />
    </Provider>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it("should show a selected post", async () => {
  const store = mockStore({
    blog: {
      posts: posts,
      post: posts[0],
      blogPage: 0,
      blogIsLoading: false,
      blogHasErrored: false
    },
    layout: {
      language: "es"
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <BlogContainer />
    </Provider>
  );

  await store.dispatch(doChangeLanguage("en"));
  await wrapper.update();
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it("should render new items if user scroll to bottom", async () => {
  const store = mockStore({
    blog: {
      posts: posts,
      post: null,
      blogPage: 0,
      blogIsLoading: false,
      blogHasErrored: false
    },
    layout: {
      language: "es"
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <BlogContainer />
    </Provider>
  );

  document.body.scrollTop = 40;
  window.dispatchEvent(new window.UIEvent("scroll", { detail: 0 }));

  await wrapper.update();
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
