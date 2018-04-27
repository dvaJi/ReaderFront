import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { fetchPosts, blogSelectPost, blogPage } from "../actions/doBlog";
import PostsList from "../components/PostsList";
import * as config from "../../config";

class BlogContainer extends Component {
  constructor(props) {
    super(props);

    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.handleSelectPost = this.handleSelectPost.bind(this);
    this.handleDeselectPost = this.handleDeselectPost.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll);
    if (this.props.posts.length === 0) {
      try {
        this.props.getPosts(this.props.language, this.props.page);
      } catch (e) {
        console.error(e);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.language !== nextProps.language) {
      this.props.changePage(0);
      this.props.getPosts(this.props.language, this.props.page);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  handleSelectPost(e) {
    this.props.selectPost(e);
  }

  handleDeselectPost() {
    this.props.selectPost(null);
  }

  isScrolledToBottom() {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    var scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    var clientHeight =
      document.documentElement.clientHeight || window.innerHeight;

    var perScroll =
      scrollHeight > 0
        ? Math.ceil(scrollTop + clientHeight) * 100 / scrollHeight
        : 0;

    return perScroll >= 85;
  }

  handleOnScroll() {
    if (!this.props.isLoading) {
      let scrolledToBottom = this.isScrolledToBottom();
      if (scrolledToBottom && !this.props.isLoading) {
        this.props.getPosts(this.props.language, this.props.page);
      }
    }
  }

  renderPost() {
    return (
      <div className="Post">
        <Button color="primary" size="sm" onClick={this.handleDeselectPost}>
          Volver
        </Button>
        <MetaTags>
          <title>
            {this.props.post.title.rendered + " - " + config.APP_TITLE}
          </title>
          <meta
            name="description"
            content={
              "Todos los capítulos y más recientes de " +
              this.props.post.title.rendered
            }
          />
          <meta
            property="og:title"
            content={this.props.post.title.rendered + " - " + config.APP_TITLE}
          />
        </MetaTags>
        <h1>{this.props.post.title.rendered}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: this.props.post.content.rendered }}
        />
      </div>
    );
  }

  renderPostsList() {
    return (
      <div className="Blog">
        <MetaTags>
          <title>{config.APP_TITLE + " - Blog"}</title>
          <meta name="description" content={"Blog de " + config.APP_TITLE} />
          <meta property="og:title" content={config.APP_TITLE + " - Blog"} />
        </MetaTags>
        <PostsList
          isLoading={this.props.isLoading}
          posts={this.props.posts}
          page={this.props.page}
          doSelect={this.handleSelectPost}
        />
      </div>
    );
  }

  render() {
    return this.props.post ? this.renderPost() : this.renderPostsList();
  }
}

const mapStateToProps = state => {
  return {
    posts: state.blog.posts,
    post: state.blog.post,
    page: state.blog.blogPage,
    isLoading: state.blog.blogIsLoading,
    hasErrored: state.blog.blogHasErrored,
    language: state.layout.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: (lang, page) => dispatch(fetchPosts(lang, page)),
    changePage: page => dispatch(blogPage(page)),
    selectPost: (post) => dispatch(blogSelectPost(post))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogContainer);
