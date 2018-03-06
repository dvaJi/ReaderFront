import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import PostsList from "./PostsList";
import API from "../services/api";
import * as config from "../config";
import "./Blog.css";

export default class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isInitialLoading: true,
      isFetchingData: false,
      page: 1,
      posts: []
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  async componentDidMount() {
    try {
      window.addEventListener("scroll", this.handleOnScroll);
      this.setState({ isLoading: true, isFetchingData: true });

      const results = await API.getPosts(this.state.page);
      this.setState({ isFetchingData: false });

      results.map(rel => {
        const imgUrl = /src="([^"]+)"/.exec(rel.content.rendered);
        if (imgUrl !== null) {
          return (rel.thumb_blog = imgUrl[1]);
        } else {
          return rel;
        }
      });
      if (!this.state.isInitialLoading) {
        this.setState({
          posts: this.state.posts.concat(results),
          isLoading: false
        });
      } else {
        this.setState({
          posts: results,
          isLoading: false,
          isInitialLoading: false
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  async handleOnScroll() {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    if (!this.state.isLoading) {
      var scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      var scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      var clientHeight =
        document.documentElement.clientHeight || window.innerHeight;
      var scrolledToBottom =
        Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if (scrolledToBottom && !this.state.isFetchingData) {
        this.setState({ isFetchingData: true });
        this.setState({ page: this.state.page + 1 });

        const results = await API.getPosts(this.state.page);
        results.map(rel => {
          const imgUrl = /src="([^"]+)"/.exec(rel.content.rendered);
          if (imgUrl !== null) {
            return (rel.thumb_blog = imgUrl[1]);
          } else {
            return rel;
          }
        });
        if (!this.state.isInitialLoading) {
          this.setState({
            posts: this.state.posts.concat(results),
            isLoading: false,
            isFetchingData: false
          });
        } else {
          this.setState({
            posts: results,
            isInitialLoading: false,
            isFetchingData: false
          });
        }
      }
    }
  }

  render() {
    return (
      <div className="Blog">
        <MetaTags>
          <title>{config.APP_TITLE + " - Blog"}</title>
          <meta name="description" content={"Blog de " + config.APP_TITLE} />
          <meta property="og:title" content={config.APP_TITLE + " - Blog"} />
        </MetaTags>
        <PostsList
          loading={this.state.isLoading}
          isFetchingData={this.state.isFetchingData}
          posts={this.state.posts}
        />
      </div>
    );
  }
}
