import React, { Component } from "react";
import styled from "styled-components";

export default class SerieCover extends Component {

  render() {
    const Cover = styled.div`
      background-image: url(${this.props.cover});
      background-position: 50% 50%;
      background-size: cover;
      height: 212px;
      width: 150px;
    `;

    return (
      <div className="card-media">
        <Cover className="card-media-img" />
        {/*<span className="card-media-tag card-media-tag-orange">En Curso</span>*/}
      </div>
    );
  }
}
