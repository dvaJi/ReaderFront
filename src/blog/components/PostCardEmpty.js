import React, { Component } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  display: inline-block;
  position: relative;
  width: 355px;
  background-color: #ddd;
  vertical-align: top;
  text-align: left;
  height: 480px;
  margin: 20px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  white-space: normal;
`;

export default class PostCardEmpty extends Component {
  render() {
    return (
      <Card className="show-loading-animation" />
    );
  }
}
