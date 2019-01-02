import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// App imports
import { fetchPosts, blogSelectPost, blogPage } from '../actions/doBlog';
import PostsList from '../components/PostsList';
import PostView from '../components/PostView';
import * as config from '../../config';

class BlogContainer extends Component {
  constructor(props) {
    super(props);

    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.handleSelectPost = this.handleSelectPost.bind(this);
    this.handleDeselectPost = this.handleDeselectPost.bind(this);
  }

  componentDidMount() {
    const { posts, page, language, getPosts } = this.props;
    window.addEventListener('scroll', this.handleOnScroll);
    if (posts.length === 0) {
      try {
        getPosts(language, 'DESC', 15, 'id', page);
      } catch (e) {
        console.error(e);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      params,
      posts,
      post,
      language,
      selectPost,
      changePage,
      getPosts
    } = this.props;
    if (language !== nextProps.language) {
      changePage(0);
      getPosts(nextProps.language, 'DESC', 15, 'id', 0);
    }

    if (params.stub !== undefined && posts.length === 0 && post === null) {
      const postSelected = nextProps.posts.find(p => p.stub === params.stub);
      selectPost(postSelected);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
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
        ? (Math.ceil(scrollTop + clientHeight) * 100) / scrollHeight
        : 0;

    return perScroll >= 85;
  }

  handleOnScroll() {
    if (!this.props.isLoading) {
      let scrolledToBottom = this.isScrolledToBottom();
      if (scrolledToBottom && !this.props.isLoading) {
        this.props.getPosts(
          this.props.language,
          'DESC',
          15,
          'id',
          this.props.page
        );
      }
    }
  }

  renderPost() {
    return (
      <div className="Post">
        <Helmet>
          <title>{this.props.post.title + ' - ' + config.APP_TITLE}</title>
          <meta
            name="description"
            content={
              'Todos los capítulos y más recientes de ' + this.props.post.title
            }
          />
          <meta
            property="og:title"
            content={this.props.post.title + ' - ' + config.APP_TITLE}
          />
        </Helmet>
        <PostView
          post={this.props.post}
          onClickBack={this.handleDeselectPost}
        />
      </div>
    );
  }

  renderPostsList() {
    return (
      <div className="Blog">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{config.APP_TITLE + ' - Blog'}</title>
          <meta name="description" content={'Blog de ' + config.APP_TITLE} />
          <meta property="og:title" content={config.APP_TITLE + ' - Blog'} />
        </Helmet>
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
    const { post, params } = this.props;
    //return this.props.post ? this.renderPost() : this.renderPostsList();
    return params.stub !== undefined && post
      ? this.renderPost()
      : this.renderPostsList();
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.blog.posts,
    post: state.blog.post,
    page: state.blog.blogPage,
    isLoading: state.blog.blogIsLoading,
    hasErrored: state.blog.blogHasErrored,
    language: state.layout.language,
    params: ownProps.match.params
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: (lang, sort, perPage, sortBy, page) =>
      dispatch(fetchPosts(lang, sort, perPage, sortBy, page)),
    changePage: page => dispatch(blogPage(page)),
    selectPost: post => dispatch(blogSelectPost(post))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BlogContainer)
);
