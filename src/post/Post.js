import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import API from "../services/api";
import * as config from "../config";
import "./Post.css";

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      post: {}
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  async componentDidMount() {
    try {
      const results = await API.getPost(this.props.match.params.id);
      this.setState({ post: results, isLoading: false });
    } catch (e) {
      console.error(e);
    }
  }
  
  renderPost() {
    return (
      <div className="Post">
        <MetaTags>
          <title>
            {this.state.post.title.rendered + " - " + config.APP_TITLE}
          </title>
          <meta
            name="description"
            content={
              "Todos los capítulos y más recientes de " +
              this.state.post.title.rendered
            }
          />
          <meta
            property="og:title"
            content={this.state.post.title.rendered + " - " + config.APP_TITLE}
          />
        </MetaTags>
        <h1>{this.state.post.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{__html: this.state.post.content.rendered}} />
      </div>
    );
  }

  render() {
    if (!this.state.isLoading) {
      return this.renderPost();
    } else {
      return ""; //<SerieEmpty />;
    }
  }
}
