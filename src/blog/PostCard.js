import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PostCard extends Component {
  render() {
    const { post, postUrl } = this.props;
    return (
      <Link to={postUrl}>
        <div className="post-card col-md-2 col-xs-12">
          <div className="card-img" style={post.style}>
            {""}
          </div>
          <div className="card-data">
            <h5>{post.title.rendered}</h5>
            <span>
              <div title="Capítulo">
                
              </div>
            </span>
          </div>
        </div>
      </Link>
    );
  }
}
