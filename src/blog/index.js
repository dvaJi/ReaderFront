import React, { Component } from "react";
import { Container } from "reactstrap";
import BlogContainer from "./containers/BlogContainer";
import "./index.css";

class Blog extends Component {
  render() {
    return (
      <div id="Blog">
        <Container>
          <BlogContainer />
        </Container>
      </div>
    );
  }
}

export default Blog;
