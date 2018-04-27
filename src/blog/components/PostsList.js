import React, { PureComponent } from "react";
import PostCard from "./PostCard";
import PostCardEmpty from "./PostCardEmpty";

export default class PostsList extends PureComponent {
  constructor(props) {
    super(props);
    this.doSelect = this.doSelect.bind(this);
  }

  doSelect(e) {
    this.props.doSelect(e);
  }

  render() {
    let isLoading = this.props.loading;
    let page = this.props.page;
    let posts = this.props.posts;
    let rows = [];

    if ((isLoading && posts.length === 0) || (isLoading && page === 1)) {
      for (let index = 0; index < 15; index++) {
        rows.push(<PostCardEmpty key={index} />);
      }
    } else {
      posts.forEach(post => {
        const date = new Date(post.date);
        const url = `/blog/post/${
          post.id
        }/${date.getFullYear()}/${date.getMonth()}/${post.slug}`;
        rows.push(
          <PostCard
            onClick={this.doSelect}
            key={post.id}
            url={url}
            name={post.title.rendered}
            thumb={post.thumb_blog}
            post={post}
          />
        );
      });

      if (isLoading && posts.length !== 0) {
        let postsIndex = posts.length;
        for (let index = postsIndex; index < postsIndex + 15; index++) {
          rows.push(<PostCardEmpty key={index} />);
        }
      }
    }

    return rows;
  }
}
