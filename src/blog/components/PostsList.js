import React, { PureComponent } from 'react';
import ReactMarkdown from 'react-markdown';

import { CardWrapper, ListRows } from './styles';
import PostCard from './PostCard';
import { getImage } from '../../common/Image';
import { subString } from '../../utils/helpers';

export default class PostsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false
    };
    this.doSelect = this.doSelect.bind(this);
    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.posts.length < nextProps.posts.length) {
      this.setState({ isFetching: false });
    }
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
    const { maxPosts, posts, onLoadMore } = this.props;
    if (posts.length < maxPosts) {
      let scrolledToBottom = this.isScrolledToBottom();
      if (scrolledToBottom && !this.state.isFetching) {
        onLoadMore();
        this.setState({ isFetching: true });
      }
    } else {
      window.removeEventListener('scroll', this.handleOnScroll);
    }
  }

  doSelect(e) {
    this.props.doSelect(e);
  }

  render() {
    const { posts } = this.props;

    return (
      <div className="container--grid">
        <ListRows id="posts_list" layout="rows top-left">
          {posts.map((post, index) => (
            <CardWrapper key={post.uniqid}>
              <PostCard
                onClick={this.doSelect}
                post={post}
                thumbnail={getImage(
                  `images/blog/${post.uniqid}/${post.thumbnail}`,
                  310,
                  305,
                  index,
                  true
                )}
              >
                <ReactMarkdown
                  source={subString(post.content, 150)}
                  escapeHtml={true}
                />
              </PostCard>
            </CardWrapper>
          ))}
        </ListRows>
      </div>
    );
  }
}
