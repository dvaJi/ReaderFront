import React, { Component } from 'react';
import { Container } from 'reactstrap';
import BlogContainer from './containers/BlogContainer';
import './index.css';

class Blog extends Component {
  render() {
    return (
      <div id="Blog">
        <Container style={{ maxWidth: '80%' }}>
          <BlogContainer />
        </Container>
      </div>
    );
  }
}

export default Blog;
