import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import ReactMarkdown from 'react-markdown';

const Container = styled.div`
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  display: inline-block;
  width: 100%;
  text-align: left;
  margin-bottom: 15px;
  margin-top: 10px;
  padding: 15px 20px;
  position: relative;
  vertical-align: top;
  white-space: normal;
`;

export default class PostCard extends Component {
  render() {
    const { title, content } = this.props.post;

    return (
      <Container>
        <Button color="primary" size="sm" onClick={this.props.onClickBack}>
          Volver
        </Button>
        <h1>{title}</h1>
        <ReactMarkdown source={content} escapeHtml={true} />
      </Container>
    );
  }
}
