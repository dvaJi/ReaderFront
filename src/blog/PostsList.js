import React, { Component } from "react";
import PostCard from "./PostCard";
import PostCardEmpty from "./PostCardEmpty";

export default class PostsList extends Component {
  render() {
    let isLoading = this.props.loading;
    let isFetchingData = this.props.isFetchingData;
    let posts = this.props.posts;
    let rows = [];

    if (isLoading) {
      for (let index = 0; index < 15; index++) {
        rows.push(<PostCardEmpty key={index} />);
      }
    } else {
      posts.forEach(post => {
        const date = new Date(post.date);
        const url = `/blog/post/${post.id}/${date.getFullYear()}/${date.getMonth()}/${
          post.slug
        }`;
        rows.push(<PostCard key={post.id} postUrl={url} post={post} />);
      });

      if (isFetchingData) {
        let releasesIndex = posts.length;
        for (let index = releasesIndex; index < releasesIndex + 15; index++) {
          rows.push(<PostCardEmpty key={index} />);
        }
      }
    }

    return rows;
  }
}
